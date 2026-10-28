/* Native WeChat Mini Program transport. Keep AppSecret on the server only. */
function createYukomonApi(baseUrl) {
  const base = baseUrl.replace(/\/$/, '');
  if (!/^https:\/\//.test(base)) throw new Error('正式小程序服务需要 HTTPS');
  const storageKey = 'yukomon-session:' + base;
  let token = wx.getStorageSync(storageKey) || '';
  function request(path, { method = 'GET', data, key, timeout = 20000 } = {}) {
    return new Promise((resolve, reject) => wx.request({
      url: base + '/api' + path, method, data, timeout,
      header: { Authorization: 'Bearer ' + token, ...(key ? { 'Idempotency-Key': key } : {}) },
      success(response) {
        if (response.statusCode >= 200 && response.statusCode < 300) resolve(response.data);
        else { const error = new Error(response.data?.error?.message || '请求未完成'); error.code = response.data?.error?.code; reject(error); }
      }, fail() { reject(new Error('网络连接失败，请重试')); }
    }));
  }
  async function login() {
    const code = await new Promise((resolve, reject) => wx.login({ success: r => r.code ? resolve(r.code) : reject(new Error('微信登录未完成')), fail: reject }));
    const session = await request('/auth/wechat', { method: 'POST', data: { code } });
    token = session.token; wx.setStorageSync(storageKey, token); return session.me;
  }
  function upload(filePath) {
    return new Promise((resolve, reject) => wx.uploadFile({
      url: base + '/api/media', filePath, name: 'file', timeout: 120000, header: { Authorization: 'Bearer ' + token },
      success(response) {
        let body; try { body = JSON.parse(response.data); } catch { return reject(new Error('上传响应无效')); }
        if (response.statusCode >= 200 && response.statusCode < 300) resolve(body);
        else reject(new Error(body.error?.message || '上传失败'));
      }, fail() { reject(new Error('上传失败，请重试')); }
    }));
  }
  return {
    login, request, upload,
    bootstrap: () => request('/bootstrap'),
    recognize: (mediaId) => request('/recognition', { method: 'POST', data: { mediaId }, timeout: 60000 }),
    reverseGeocode: (lat, lng) => request('/map/reverse-geocode', { method: 'POST', data: { lat, lng, coordType: 'gcj02' } }),
    createCatch: (data, idempotencyKey) => request('/catches', { method: 'POST', data, key: idempotencyKey }),
    like: (id, liked) => request('/catches/' + id + '/like', { method: 'PUT', data: { liked } }),
    share: (catchId) => request('/shares', { method: 'POST', data: { catchId } }),
    async logout() { await request('/auth/logout', { method: 'POST' }); token = ''; wx.removeStorageSync(storageKey); }
  };
}
module.exports = { createYukomonApi };
