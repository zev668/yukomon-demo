import test from 'node:test';
import assert from 'node:assert/strict';
import { parseCandidates, parseRecognition, extractJsonObject, matchSpeciesName, createProviders, recognitionPrompt } from '../providers.mjs';
import { species } from '../catalog.mjs';

const idOf = name => species.find(s => s.name === name)?.no;

test('parses Hunyuan reply with trailing role token', () => {
  assert.deepEqual(parseCandidates('{"candidates":[]}\n<\uFF5Chy_Assistant\uFF5C>'), []);
  assert.deepEqual(parseCandidates('```json\n{"candidates":[{"speciesId":"002","confidence":0.9}]}\n```'), [{ speciesId: '002', confidence: 0.9 }]);
});
test('normalizes numeric ids and percentage confidence', () => {
  assert.deepEqual(parseCandidates('\u7ED3\u679C\uFF1A{"candidates":[{"speciesId":2,"confidence":90}]} \u4EE5\u4E0A'), [{ speciesId: '002', confidence: 0.9 }]);
});
test('rejects replies without JSON', () => {
  assert.throws(() => extractJsonObject('\u65E0\u6CD5\u8BC6\u522B'));
});
test('reads the final JSON after free-form observations', () => {
  const r = parseRecognition('\u4F53\u4FA7\u6709\u6697\u8272\u7EB5\u5E26 {\u6CE8\u610F} \u53E3\u88C2\u5927\u3002\n{"fish":true,"seen":"\u5927\u53E3\u9ED1\u9C88 Micropterus salmoides","protected":null,"candidates":[{"speciesId":"039","confidence":0.85}]}');
  assert.equal(r.fish, true);
  assert.equal(r.candidates[0].speciesId, '039');
});
test('the named species is offered first even when the id list omits it', () => {
  const r = parseRecognition('{"fish":true,"seen":"\u52A0\u5DDE\u9C88","candidates":[{"speciesId":"055","confidence":0.5}]}');
  assert.equal(r.candidates[0].speciesId, idOf('\u5927\u53E3\u9ED1\u9C88'));
  assert.ok(r.candidates.some(c => c.speciesId === '055'));
});
test('latin names and aliases resolve to catalog ids', () => {
  assert.equal(matchSpeciesName('Cyprinus carpio'), idOf('\u9CA4'));
  assert.equal(matchSpeciesName('\u767D\u6761'), idOf('\u4C57'));
  assert.equal(matchSpeciesName('\u5927\u53E3\u9ED1\u9C88\uFF08Micropterus salmoides\uFF09'), idOf('\u5927\u53E3\u9ED1\u9C88'));
  assert.equal(matchSpeciesName('\u5149\u6CFD\u9EC4\u98A1\u9C7C'), idOf('\u5149\u6CFD\u9EC4\u98A1\u9C7C'));
});
test('no fish and protected species produce no candidates', () => {
  const none = parseRecognition('{"fish":false,"seen":"","candidates":[]}');
  assert.equal(none.fish, false);
  assert.deepEqual(none.candidates, []);
  const prot = parseRecognition('{"fish":true,"seen":"\u4E2D\u534E\u9C9F","protected":"\u4E2D\u534E\u9C9F","candidates":[{"speciesId":"002","confidence":0.3}]}');
  assert.equal(prot.protectedName, '\u4E2D\u534E\u9C9F');
  assert.deepEqual(prot.candidates, []);
});
test('prompt lists every species with aliases', () => {
  const p = recognitionPrompt();
  for (const s of species) assert.ok(p.includes(`${s.no} ${s.name}`), s.no);
  assert.ok(p.includes('\u52A0\u5DDE\u9C88'));
});
test('retries once after a malformed reply', async () => {
  let calls = 0;
  const fetchFn = async () => { calls++; return { ok: true, json: async () => ({ choices: [{ message: { content: calls === 1 ? 'oops' : '{"fish":true,"seen":"\u9CA4","candidates":[{"speciesId":"002","confidence":0.8}]}' } }] }) }; };
  const p = createProviders({ AI_BASE_URL: 'https://example.test/v1', AI_API_KEY: 'k', AI_MODEL: 'm' }, fetchFn);
  const r = await p.recognize(Buffer.from('x'));
  assert.equal(calls, 2);
  assert.deepEqual(r.candidates, [{ speciesId: '002', confidence: 0.8 }]);
  assert.equal(r.fish, true);
  assert.equal(r.seen, '\u9CA4');
});
