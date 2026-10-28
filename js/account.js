(function () {
  'use strict';
  const api = () => window.YK_API;
  const app = () => window.YK_APP;
  const AI_KEY = 'yukomon-ai-photo-consent-v1';
  const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const notice = detail => document.dispatchEvent(new CustomEvent('yk-notice', { detail }));
  const legal = () => `<a href="${esc(api().base || location.origin)}/terms" target="_blank" rel="noopener" data-external>用户协议</a>与<a href="${esc(api().base || location.origin)}/privacy" target="_blank" rel="noopener" data-external>隐私政策</a>`;
  let authLayer, aiPending;

  function recovery(code) {
    const rec = app().sheet('保存账号恢复码', `<div class="account-form"><p>忘记密码时，用账号和恢复码找回。此码仅显示本次，新的恢复码会使旧码失效。</p><output class="recovery-code">${esc(code)}</output><button class="btn" data-save-code>保存恢复码</button><label class="account-check"><input type="checkbox" data-code-saved>我已妥善保存恢复码</label><button class="btn primary block" data-code-done disabled>完成</button></div>`, 'account-sheet');
    // Prevent accidentally discarding the only copy before the user acknowledges it.
    rec.canClose = () => rec.node.querySelector('[data-code-saved]').checked;
    rec.node.querySelectorAll('[data-close]').forEach(b => { b.hidden = true; });
    rec.node.querySelector('.scrim').onclick = () => notice('请先保存恢复码');
    rec.node.querySelector('[data-code-saved]').onchange = e => { rec.node.querySelector('[data-code-done]').disabled = !e.target.checked; };
    rec.node.querySelector('[data-code-done]').onclick = () => app().closeLayer(rec);
    rec.node.querySelector('[data-save-code]').onclick = async () => {
      try {
        if (window.YK_NATIVE?.exportText) await window.YK_NATIVE.exportText('yukomon-recovery.txt', `Yukomon\nAccount: ${window.YK_STORE.db.me.username || ''}\nRecovery code: ${code}\n`);
        else { await navigator.clipboard.writeText(code); notice('恢复码已复制，请存到安全位置'); }
      } catch { notice('未保存，可长按恢复码复制'); }
    };
  }

  function open(mode = 'login') {
    if (!app()) return;
    if (authLayer?.node.isConnected) app().closeLayer(authLayer, true);
    const titles = { login: '欢迎回来', register: '创建账号', recover: '找回账号', password: '修改密码', 'recovery-code': '更换恢复码' };
    const submitLabels = { ...titles, login: '登录' };
    const hasUsername = ['login', 'register', 'recover'].includes(mode);
    const wechatBlock = ['login', 'register'].includes(mode) ? `<div class="wechat-login" ${window.YK_NATIVE?.wechat ? '' : 'hidden'}>
        <button type="button" class="btn block wechat-btn" data-wechat-login><svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M8.7 3C4.9 3 1.8 5.6 1.8 8.8c0 1.8 1 3.4 2.6 4.5l-.7 2.1 2.5-1.3c.8.2 1.6.3 2.5.3h.6a5.6 5.6 0 0 1-.2-1.5c0-3.2 3-5.8 6.8-5.8h.6C15.8 4.8 12.6 3 8.7 3Zm-2.4 3.4a.9.9 0 1 1 0 1.8.9.9 0 0 1 0-1.8Zm4.8 0a.9.9 0 1 1 0 1.8.9.9 0 0 1 0-1.8ZM15.8 9c-3.2 0-5.8 2.2-5.8 4.9s2.6 4.9 5.8 4.9c.7 0 1.4-.1 2-.3l2 1.1-.5-1.8c1.4-.9 2.3-2.3 2.3-3.9 0-2.7-2.6-4.9-5.8-4.9Zm-1.9 2.6a.8.8 0 1 1 0 1.5.8.8 0 0 1 0-1.5Zm3.8 0a.8.8 0 1 1 0 1.5.8.8 0 0 1 0-1.5Z"/></svg>微信一键登录</button>
        <label class="account-check"><input type="checkbox" data-wechat-terms><span>登录即同意${legal()}，首次登录自动创建账号</span></label>
        <p class="wechat-hint" data-wechat-hint hidden></p>
        <div class="account-divider"><span>或使用账号密码</span></div></div>` : '';
    const rec = app().sheet(titles[mode], `<form class="account-form" data-account-form>
      ${wechatBlock}
      ${hasUsername ? `<label>账号<input name="username" autocomplete="username" autocapitalize="none" spellcheck="false" pattern="[a-zA-Z0-9_]{3,32}" minlength="3" maxlength="32" placeholder="${mode === 'register' ? '3–32 位字母、数字或下划线' : '账号'}" required></label>` : ''}
      ${mode === 'register' ? '<label>昵称<input name="nickname" autocomplete="nickname" maxlength="12" placeholder="你的钓友昵称"></label>' : ''}
      ${mode === 'recover' ? '<label>恢复码<input name="recoveryCode" autocomplete="off" autocapitalize="characters" spellcheck="false" maxlength="35" required></label>' : ''}
      ${mode !== 'recover' ? `<label>${mode === 'password' ? '当前密码' : '密码'}<input name="password" type="password" autocomplete="${mode === 'register' ? 'new-password' : 'current-password'}" minlength="10" maxlength="128" placeholder="${mode === 'login' ? '密码' : '至少 10 个字符'}" required></label>` : ''}
      ${['recover', 'password'].includes(mode) ? '<label>新密码<input name="newPassword" type="password" autocomplete="new-password" minlength="10" maxlength="128" placeholder="至少 10 个字符" required></label>' : ''}
      ${['register', 'recover', 'password'].includes(mode) ? '<label>确认密码<input name="confirmPassword" type="password" autocomplete="new-password" minlength="10" maxlength="128" required></label>' : ''}
      ${mode === 'register' ? `<label class="account-check"><input type="checkbox" name="terms" required><span>我已阅读并同意${legal()}</span></label>` : ''}
      <p class="account-error" role="alert" hidden></p><button type="submit" class="btn primary block">${submitLabels[mode]}</button>
      ${['login', 'register', 'recover'].includes(mode) ? `<div class="account-links">${mode !== 'login' ? '<button type="button" data-auth="login">返回登录</button>' : '<button type="button" data-auth="register">创建账号</button><button type="button" data-auth="recover">忘记密码</button>'}</div>` : ''}
      </form>`, 'account-sheet');
    authLayer = rec;
    rec.node.querySelectorAll('[data-auth]').forEach(b => { b.onclick = () => open(b.dataset.auth); });
    const form = rec.node.querySelector('form');
    mountWeChat(rec, form);
    form.onsubmit = async e => {
      e.preventDefault();
      const button = form.querySelector('[type=submit]'), error = form.querySelector('[role=alert]');
      if (button.disabled) return;
      const fields = Object.fromEntries(new FormData(form));
      if (fields.confirmPassword !== undefined && fields.confirmPassword !== (fields.newPassword ?? fields.password)) { error.textContent = '两次输入的密码不一致'; error.hidden = false; return; }
      delete fields.confirmPassword; delete fields.terms;
      if (!fields.nickname) delete fields.nickname;
      button.disabled = true; button.setAttribute('aria-busy', 'true'); error.hidden = true;
      try {
        const result = await api().account(mode, fields);
        form.reset(); app().closeLayer(rec, true); authLayer = null;
        if (result.recoveryCode) recovery(result.recoveryCode);
        else notice('已登录');
      } catch (err) { error.textContent = err.message; error.hidden = false; }
      finally { button.disabled = false; button.removeAttribute('aria-busy'); }
    };
  }

  // WeChat login: native SDK obtains a one-time code, the server exchanges it.
  // Availability = app has the SDK + AppID AND server has the secret.
  async function wechatAvailability() {
    const native = window.YK_NATIVE?.wechat;
    if (!native) return { ok: false, reason: '请在鱼可梦 App 中使用微信登录' };
    const status = await native.status();
    if (!api().services?.wechatLogin && !window.YK_RUNTIME?.wechatLogin) { try { await api().refreshServices?.(); } catch {} }
    if (!status.configured || !(api().services?.wechatLogin || window.YK_RUNTIME?.wechatLogin)) return { ok: false, reason: '微信登录即将开通，现在可先用账号密码登录' };
    if (!status.installed) return { ok: false, reason: '未检测到微信，请安装微信后重试' };
    return { ok: true };
  }
  function mountWeChat(rec, form) {
    const button = rec.node.querySelector('[data-wechat-login]');
    if (!button) return;
    const hint = rec.node.querySelector('[data-wechat-hint]'), terms = rec.node.querySelector('[data-wechat-terms]');
    const say = text => { hint.textContent = text; hint.hidden = !text; };
    wechatAvailability().then(state => {
      if (state.ok) return;
      // 不可用时不展示一个点不了的按钮：收起微信区，只在表单底部留一行说明
      const block = rec.node.querySelector('.wechat-login');
      if (block) block.hidden = true;
      const links = rec.node.querySelector('.account-links') || form.lastElementChild;
      if (links && !rec.node.querySelector('.wechat-later')) links.insertAdjacentHTML('afterend', `<p class="wechat-later">${window.YK_NATIVE?.wechat ? '微信一键登录即将开通' : '在鱼可梦 App 里可以一键微信登录'}</p>`);
    }).catch(() => {});
    button.onclick = async () => {
      if (button.disabled) return;
      if (!terms.checked) { say('请先勾选同意用户协议与隐私政策'); terms.focus(); return; }
      const state = await wechatAvailability().catch(() => ({ ok: false, reason: '微信暂不可用' }));
      if (!state.ok) return say(state.reason);
      button.disabled = true; button.setAttribute('aria-busy', 'true'); say('');
      try {
        const { code } = await window.YK_NATIVE.wechat.login();
        await api().account('wechat', { code });
        form.reset(); app().closeLayer(rec, true); authLayer = null;
        notice('已通过微信登录');
      } catch (err) {
        say(err?.code === 'WECHAT_CANCELLED' ? '已取消微信登录' : err?.message || '微信登录失败，请重试');
      } finally { button.disabled = false; button.removeAttribute('aria-busy'); }
    };
  }

  function confirmAction(title, body, label, action) {
    const rec = app().sheet(title, `<div class="account-form"><p>${body}</p><button class="btn danger block" data-confirm>${label}</button><p class="account-error" role="alert" hidden></p></div>`, 'account-sheet');
    rec.node.querySelector('[data-confirm]').onclick = async e => {
      const b = e.currentTarget; if (b.disabled) return; b.disabled = true;
      try { await action(); app().closeLayer(rec, true); notice(label + '成功'); }
      catch (error) { const p = rec.node.querySelector('[role=alert]'); p.hidden = false; p.textContent = error.message; }
      finally { b.disabled = false; }
    };
  }

  function mountMapSharing(group, signedIn) {
    const toggle = group.querySelector('[data-map-sharing]'), status = group.querySelector('[data-map-sharing-status]'), retry = group.querySelector('[data-map-sharing-retry]');
    let ready = false;
    const show = enabled => { toggle.classList.toggle('on', enabled); toggle.setAttribute('aria-checked', String(enabled)); };
    const label = enabled => enabled ? '地图共享已开启' : '地图共享已关闭';
    const load = async () => {
      toggle.disabled = true; toggle.setAttribute('aria-busy', 'true'); retry.hidden = true;
      if (!signedIn) { show(false); status.textContent = '登录后可设置，默认关闭'; toggle.setAttribute('aria-busy', 'false'); return; }
      ready = false; status.textContent = '正在读取服务器设置';
      try {
        const settings = await api().mapSettings();
        if (!group.isConnected) return;
        show(settings.enabled); status.textContent = label(settings.enabled); ready = true;
      } catch (error) { if (group.isConnected) { status.textContent = error.message; retry.hidden = false; } }
      finally { toggle.disabled = !ready; toggle.setAttribute('aria-busy', 'false'); }
    };
    show(false);
    retry.onclick = load;
    toggle.onclick = async () => {
      if (toggle.disabled || !ready) return;
      const previous = toggle.getAttribute('aria-checked') === 'true';
      toggle.disabled = true; toggle.setAttribute('aria-busy', 'true'); status.textContent = '正在保存服务器设置';
      try {
        const settings = await api().setMapSharing(!previous);
        if (group.isConnected) { show(settings.enabled); status.textContent = label(settings.enabled); }
      } catch (error) { if (group.isConnected) { show(previous); status.textContent = error.message; } }
      finally { toggle.disabled = !ready; toggle.setAttribute('aria-busy', 'false'); }
    };
    return load();
  }

  function mountSettings(body) {
    const group = document.createElement('section'); group.className = 'settings-group account-settings';
    const signedIn = api().authenticated;
    group.innerHTML = `<span class="eyebrow">账号与隐私</span><div class="box">
      <div class="set-row"><span>${esc(window.YK_STORE.db.me.username || (signedIn ? '当前账号' : '尚未登录'))}</span><button class="btn sm" data-account="${signedIn ? 'password' : 'login'}">${signedIn ? '修改密码' : '登录'}</button></div>
      ${signedIn ? '<div class="set-row"><span>账号恢复码</span><button class="btn sm" data-account="recovery-code">更换</button></div>' : ''}
      <div class="set-row"><span>AI 照片识别授权</span><button class="switch" data-ai-consent role="switch" aria-label="AI 照片识别授权"></button></div>
      <div class="set-row col"><div class="row"><span class="grow">钓点地图共享</span><button class="switch" data-map-sharing role="switch" aria-label="钓点地图共享" aria-checked="false" disabled></button></div><small class="muted">仅共享现场拍摄、有 GPS 定位且设为“钓点地图”的记录；延迟 2 小时显示模糊网格。关闭后已有记录也会隐藏。</small><small class="muted" data-map-sharing-status role="status">默认关闭</small><button class="btn sm" data-map-sharing-retry hidden>重新读取</button></div>
      <div class="set-row"><span>个人数据</span><button class="btn sm" data-export-records>导出</button></div>
      <div class="set-row"><span>${legal()}</span></div>
      ${signedIn ? '<div class="set-row"><button class="btn sm" data-logout>退出登录</button><button class="btn sm danger" data-delete-account>注销账号</button></div>' : ''}</div>`;
    body.prepend(group);
    mountMapSharing(group, signedIn);
    group.querySelectorAll('[data-account]').forEach(b => { b.onclick = () => open(b.dataset.account); });
    const ai = group.querySelector('[data-ai-consent]');
    const update = () => { const on = localStorage.getItem(AI_KEY) === 'yes'; ai.classList.toggle('on', on); ai.setAttribute('aria-checked', String(on)); };
    update(); ai.onclick = async () => { if (localStorage.getItem(AI_KEY) === 'yes') localStorage.removeItem(AI_KEY); else await consentAI(); update(); };
    group.querySelector('[data-export-records]').onclick = async () => { try { await api().exportData(); } catch (e) { notice(e.message); } };
    if (signedIn) {
      group.querySelector('[data-logout]').onclick = () => confirmAction('退出登录', '云端记录将保留。重新登录后可继续查看。', '退出登录', () => api().logout());
      group.querySelector('[data-delete-account]').onclick = () => confirmAction('注销账号', '账号、渔获、照片、分享和点赞将从在线服务删除，操作无法撤销。备份最长保留 30 天后轮换清除。', '永久注销', () => api().deleteAccount());
    }
  }

  function consentAI() {
    if (localStorage.getItem(AI_KEY) === 'yes') return Promise.resolve(true);
    if (aiPending) return aiPending;
    aiPending = new Promise(resolve => {
      const rec = app().sheet('允许 AI 分析这张照片？', '<div class="account-form"><p>选择识别时，渔获照片会上传至鱼可梦服务器，并发送给腾讯混元（TokenHub）分析鱼种。不发送账号密码、恢复码或精确定位。识别结果仅供参考。</p><p>可以手动选择鱼种，也可随时在设置中撤回授权。</p><button class="btn primary block" data-ai-allow>同意并识别</button><button class="btn block" data-ai-deny>手动选择</button></div>', 'account-sheet');
      let answered = false;
      const finish = yes => { if (answered) return; answered = true; if (yes) localStorage.setItem(AI_KEY, 'yes'); app().closeLayer(rec); resolve(yes); };
      rec.node.querySelector('[data-ai-allow]').onclick = () => finish(true);
      rec.node.querySelector('[data-ai-deny]').onclick = () => finish(false);
      rec.cleanups.push(() => { if (!answered) { answered = true; resolve(false); } });
    }).finally(() => { aiPending = null; });
    return aiPending;
  }
  document.addEventListener('yk-auth-required', () => { if (!document.body.classList.contains('share-landing-on')) open(); });
  window.YK_ACCOUNT = { open, mountSettings, consentAI };
})();
