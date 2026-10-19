import React, { useEffect, useRef, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { ArrowReloadHorizontalIcon, Copy01Icon, Download01Icon, Image01Icon, Sun01Icon, Moon02Icon, Cancel01Icon, PlayIcon } from '@hugeicons/core-free-icons';
import ReflectiveCard from '../../ReflectiveCard.jsx';
import YukomonFishCard from '../../YukomonFishCard.jsx';
import { GROUPS, PRESETS, STORAGE_KEY, restoreSettings } from './material-settings.js';
import '../../ReflectiveCard.css';
import './preview.css';

const icon = item => <HugeiconsIcon icon={item} size={18} strokeWidth={1.6} />;

function IconButton({ label, children, ...props }) {
  return <button type="button" className="tool-icon" title={label} aria-label={label} {...props}>{children}<span className="tool-tip" role="tooltip">{label}</span></button>;
}

function Segments({ label, value, options, onChange }) {
  return <div className="segments" role="group" aria-label={label}>{options.map(([key, text]) => <button type="button" key={key} aria-pressed={value === key} onClick={() => onChange(key)}>{text}</button>)}</div>;
}

function Toggle({ label, checked, onChange, ...props }) {
  return <label className="toggle-row"><span>{label}</span><input type="checkbox" role="switch" aria-label={label} checked={checked} onChange={e => onChange(e.target.checked)} {...props} /><span className="toggle-track" aria-hidden="true" /></label>;
}

function Slider({ spec, value, onChange, disabled }) {
  const [key, label, min, max, step, unit = ''] = spec;
  const digits = step < 0.1 ? 2 : step < 1 ? 1 : 0;
  const [draft, setDraft] = useState(String(Number(value.toFixed(digits))));
  const editing = useRef(false);
  useEffect(() => { if (!editing.current) setDraft(String(Number(value.toFixed(digits)))); }, [value, digits]);
  return <div className={`slider-row${disabled ? ' disabled' : ''}`}>
    <div className="slider-caption"><label htmlFor={key}>{label}</label><span className="number-field"><input type="number" aria-label={`${label}数值`} value={draft} min={min} max={max} step={step} disabled={disabled} onFocus={() => { editing.current = true; }} onBlur={() => { editing.current = false; setDraft(String(Number(value.toFixed(digits)))); }} onChange={e => {
      setDraft(e.target.value);
      const next = e.target.valueAsNumber;
      if (Number.isFinite(next)) onChange(Math.max(min, Math.min(max, next)));
    }} />{unit && <small>{unit}</small>}</span></div>
    <input id={key} type="range" min={min} max={max} step={step} value={value} disabled={disabled} style={{ '--fill': `${(value - min) / (max - min) * 100}%` }} onChange={e => onChange(Number(e.target.value))} />
  </div>;
}

function ColorField({ label, value, onChange }) {
  const [draft, setDraft] = useState(value);
  useEffect(() => setDraft(value), [value]);
  return <div className="color-field"><span>{label}</span><input type="color" aria-label={`${label}颜色`} value={value} onChange={e => onChange(e.target.value)} /><input className="hex-input" aria-label={`${label}色值`} value={draft} maxLength={7} onBlur={() => setDraft(value)} onChange={e => { setDraft(e.target.value); if (/^#[\da-f]{6}$/i.test(e.target.value)) onChange(e.target.value); }} /></div>;
}

export default function MaterialLab() {
  const [settings, setSettings] = useState(restoreSettings);
  const [notice, setNotice] = useState('');
  const [saved, setSaved] = useState(true);
  const [referenceOpen, setReferenceOpen] = useState(false);
  const [draftJson, setDraftJson] = useState('');
  const [mobileTilt, setMobileTilt] = useState(false);
  const [scale, setScale] = useState(1);
  const [generation, setGeneration] = useState(0);
  const viewportRef = useRef(null), subjectRef = useRef(null), referenceRef = useRef(null), jsonRef = useRef(null);
  const live = useRef(settings); live.current = settings;
  const set = (key, value) => setSettings(current => ({ ...current, [key]: value }));
  const effect = settings.edgeMode;
  const setEffect = value => set('edgeMode', value);
  const setValue = (key, value) => setSettings(current => ({ ...current, values: { ...current.values, [key]: value } }));
  const setContent = (key, value) => setSettings(current => ({ ...current, content: { ...current.content, [current.subject]: { ...current.content[current.subject], [key]: value } } }));
  const params = effect === 'original' ? { ...settings.values, rimIntensity: 0, bevelStrength: 1 } : settings.values;
  const content = settings.content[settings.subject];
  const preset = Object.entries(PRESETS).find(([, p]) => Object.entries(p.values).every(([key, value]) => value === settings.values[key]))?.[0] || 'custom';

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(settings)); setSaved(true); }
    catch { setSaved(false); setNotice('参数未能保存'); }
  }, [settings]);
  useEffect(() => {
    if (!notice) return;
    const timer = setTimeout(() => setNotice(''), 3000);
    return () => clearTimeout(timer);
  }, [notice]);
  useEffect(() => {
    const node = viewportRef.current;
    const resize = () => {
      const box = node.getBoundingClientRect();
      setScale(Math.max(0.2, Math.min(1.25, (box.width - 56) / settings.values.width, (box.height - 56) / settings.values.height)));
    };
    const observer = new ResizeObserver(resize); observer.observe(node); resize();
    return () => observer.disconnect();
  }, [settings.values.width, settings.values.height]);
  useEffect(() => {
    if (referenceOpen) referenceRef.current?.showModal();
    else if (referenceRef.current?.open) referenceRef.current.close();
  }, [referenceOpen]);
  useEffect(() => {
    if (draftJson) jsonRef.current?.showModal();
    else if (jsonRef.current?.open) jsonRef.current.close();
  }, [draftJson]);
  useEffect(() => {
    const node = subjectRef.current;
    const onError = e => { if (e.target.tagName === 'VIDEO' && e.target.src) setNotice('视频无法读取，已使用摄影棚反射'); };
    node.addEventListener('error', onError, true);
    return () => node.removeEventListener('error', onError, true);
  }, []);
  useEffect(() => {
    if (!settings.autoRotate || !settings.enableTilt || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let raf, last = 0, started = performance.now();
    const frame = now => {
      const root = subjectRef.current?.querySelector('.reflective-card');
      if (root && !document.hidden && now - last > 40) {
        const rect = root.getBoundingClientRect(), t = (now - started) / 1000;
        root.dispatchEvent(new PointerEvent('pointermove', {
          bubbles: true, pointerType: 'mouse',
          clientX: rect.left + rect.width * (0.5 + Math.sin(t * 0.55) * 0.34),
          clientY: rect.top + rect.height * (0.5 + Math.cos(t * 0.43) * 0.29),
        }));
        last = now;
      }
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(raf);
      subjectRef.current?.querySelector('.reflective-card')?.dispatchEvent(new PointerEvent('pointerleave', { pointerType: 'mouse' }));
    };
  }, [settings.autoRotate, settings.enableTilt, settings.subject, generation]);

  const exported = () => ({ version: 1, material: 'ReflectiveCard', ...live.current, sourceUrl: 'https://reactbits.dev/components/reflective-card' });
  const copy = async () => {
    const text = JSON.stringify(exported(), null, 2);
    try { await navigator.clipboard.writeText(text); setNotice('参数已复制'); }
    catch { setDraftJson(text); }
  };
  const download = () => {
    const url = URL.createObjectURL(new Blob([JSON.stringify(exported(), null, 2)], { type: 'application/json' }));
    const link = document.createElement('a'); link.href = url; link.download = 'yukomon-card-material.json'; link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };
  const enableGyro = async checked => {
    if (!checked) return setMobileTilt(false);
    try {
      if (typeof DeviceOrientationEvent === 'undefined') throw new Error('此设备未提供陀螺仪');
      if (typeof DeviceOrientationEvent.requestPermission === 'function' && await DeviceOrientationEvent.requestPermission() !== 'granted') throw new Error('未获得陀螺仪权限');
      setMobileTilt(true);
    } catch (error) { setNotice(error.message); }
  };
  const applyPreset = key => { if (PRESETS[key]) { setSettings(current => ({ ...current, values: { ...current.values, ...PRESETS[key].values } })); setEffect('enhanced'); } };
  const Component = settings.subject === 'fish' ? YukomonFishCard : ReflectiveCard;
  const textFields = settings.subject === 'fish'
    ? [['number', '编号', 20], ['name', '中文名', 16], ['englishName', '英文名', 32], ['description', '简介', 50]]
    : [['name', 'Name', 28], ['role', 'Role', 32], ['badge', 'Badge', 16], ['status', 'Status', 16], ['idLabel', 'ID Label', 24], ['idValue', 'ID Value', 32]];

  return <div className="material-lab">
    <header className="lab-header"><div className="lab-title"><span className="lab-mark" aria-hidden="true">Y</span><h1>卡片材质</h1><span className="lab-tag">LAB</span></div>
      <div className="header-tools"><span className="save-state">{saved ? '已保存' : '未保存'}</span><IconButton label="重播入场" onClick={() => setGeneration(n => n + 1)}>{icon(PlayIcon)}</IconButton><IconButton label="查看参考截图" onClick={() => setReferenceOpen(true)}>{icon(Image01Icon)}</IconButton><IconButton label="复制参数" onClick={copy}>{icon(Copy01Icon)}</IconButton><IconButton label="导出参数" onClick={download}>{icon(Download01Icon)}</IconButton></div>
    </header>
    <main className="lab-workspace">
      <section className={`lab-stage backdrop-${settings.backdrop}`} aria-label="卡片预览">
        <div className="stage-toolbar"><Segments label="卡片内容" value={settings.subject} options={[["reference", "原卡"], ["fish", "鱼卡"]]} onChange={value => set('subject', value)} /><Segments label="边缘版本" value={effect} options={[["original", "原版"], ["enhanced", "优化"]]} onChange={setEffect} /><div className="backdrop-picker" role="group" aria-label="背景"><IconButton label="深色背景" aria-pressed={settings.backdrop === 'dark'} onClick={() => set('backdrop', 'dark')}>{icon(Moon02Icon)}</IconButton><IconButton label="浅色背景" aria-pressed={settings.backdrop === 'light'} onClick={() => set('backdrop', 'light')}>{icon(Sun01Icon)}</IconButton></div></div>
        <div className="card-viewport" ref={viewportRef} onPointerEnter={e => { if (e.pointerType === 'mouse' && settings.autoRotate) set('autoRotate', false); }} style={{ '--card-aspect': settings.values.height / settings.values.width }}>
          <div className="card-footprint" style={{ width: params.width * scale, height: params.height * scale }}><div ref={subjectRef} className="card-scale" style={{ width: params.width, height: params.height, transform: `scale(${scale})` }}>
            <Component key={`${settings.subject}-${generation}`} {...params} {...content} className="lab-card" theme={settings.theme} enableTilt={settings.enableTilt} intro={settings.intro} enableMobileTilt={mobileTilt} videoSrc={settings.source === 'studio' ? undefined : settings.videoSrc} webcam={settings.source === 'camera'} onWebcamError={() => { set('source', 'video'); setNotice('摄像头不可用，已切回视频反射'); }} />
          </div></div>
        </div>
        <div className="stage-footer"><span>{params.width} × {params.height}</span><span>{Math.round(scale * 100)}%</span><span>{settings.subject === 'fish' ? 'Yukomon' : 'ReflectiveCard'}</span></div>
      </section>
      <aside className="lab-controls" aria-label="材质参数">
        <div className="preset-row"><label htmlFor="preset">Preset</label><select id="preset" value={preset} onChange={e => applyPreset(e.target.value)}>{Object.entries(PRESETS).map(([key, item]) => <option key={key} value={key}>{item.label}</option>)}<option value="custom" disabled>Custom</option></select><IconButton label="恢复原版参数" onClick={() => { setSettings(restoreSettingsFromDefaults()); setEffect('original'); setMobileTilt(false); setGeneration(n => n + 1); }}>{icon(ArrowReloadHorizontalIcon)}</IconButton></div>
        <div className="select-grid"><label className="select-field">Reflection<select aria-label="Reflection" value={settings.source} onChange={e => set('source', e.target.value)}><option value="video">Video</option><option value="studio">Studio</option><option value="camera">Camera</option></select></label><label className="select-field">Theme<select aria-label="Theme" value={settings.theme} onChange={e => set('theme', e.target.value)}><option value="dark">Dark</option><option value="light">Light</option></select></label></div>
        <ColorField label="Tint" value={params.tint} onChange={value => setValue('tint', value)} />
        <details open className="control-section"><summary>原版材质</summary><div className="param-grid">{GROUPS[0].controls.map(spec => <Slider key={spec[0]} spec={spec} value={params[spec[0]]} onChange={value => setValue(spec[0], value)} />)}</div><div className="toggle-grid"><Toggle label="Tilt" checked={settings.enableTilt} onChange={value => set('enableTilt', value)} /><Toggle label="Intro" checked={settings.intro} onChange={value => { set('intro', value); setGeneration(n => n + 1); }} /></div></details>
        <details open className="control-section"><summary>亮边优化</summary><div className="param-grid">{GROUPS[1].controls.map(spec => <Slider key={spec[0]} spec={spec} value={params[spec[0]]} disabled={effect === 'original'} onChange={value => setValue(spec[0], value)} />)}</div></details>
        <details className="control-section"><summary>卡片内容</summary><div className="content-fields">{textFields.map(([key, label, max]) => <label className="text-field" key={key}>{label}<input aria-label={label} maxLength={max} value={content[key]} onChange={e => setContent(key, e.target.value)} /></label>)}{settings.subject === 'reference' ? <ColorField label="Status Color" value={content.statusColor} onChange={value => setContent('statusColor', value)} /> : <label className="select-field">品级<select aria-label="品级" value={content.rarity} onChange={e => setContent('rarity', e.target.value)}>{['N', 'R', 'SR', 'SSR', 'UR'].map(r => <option key={r}>{r}</option>)}</select></label>}</div></details>
        <details className="control-section"><summary>尺寸与交互</summary><div className="param-grid">{GROUPS[2].controls.map(spec => <Slider key={spec[0]} spec={spec} value={params[spec[0]]} disabled={spec[0] === 'holo' && settings.subject !== 'fish'} onChange={value => setValue(spec[0], value)} />)}</div><Toggle label="自动转动" checked={settings.autoRotate} disabled={!settings.enableTilt} onChange={value => set('autoRotate', value)} /><Toggle label="陀螺仪" checked={mobileTilt} onChange={enableGyro} /><label className="text-field video-field">Video Source<input aria-label="Video Source" value={settings.videoSrc} onChange={e => set('videoSrc', e.target.value)} /></label></details>
      </aside>
    </main>
    <div className="lab-notice" role="status">{notice}</div>
    <dialog ref={referenceRef} className="reference-dialog" onClose={() => setReferenceOpen(false)} onClick={e => { if (e.target === e.currentTarget) setReferenceOpen(false); }}><div className="dialog-head"><span>参考截图</span><IconButton label="关闭参考截图" onClick={() => setReferenceOpen(false)}>{icon(Cancel01Icon)}</IconButton></div><img src="/assets/reflective-card-reference.png" alt="用户提供的 ReflectiveCard 原效果截图" /></dialog>
    <dialog ref={jsonRef} className="json-dialog" onClose={() => setDraftJson('')}><div className="dialog-head"><span>材质参数</span><IconButton label="关闭参数" onClick={() => setDraftJson('')}>{icon(Cancel01Icon)}</IconButton></div><textarea aria-label="材质参数 JSON" readOnly value={draftJson} onFocus={e => e.target.select()} /></dialog>
  </div>;
}

function restoreSettingsFromDefaults() {
  const initial = restoreSettings(null);
  return { ...initial, values: { ...initial.values, ...PRESETS.steel.values } };
}
