# Yukomon Demo 0.2.0

在线演示：https://zev668.github.io/yukomon-demo/

像素界面与 ReflectiveCard 玻璃卡片的钓鱼收藏原型。详情、翻面、解锁与分享大卡使用 WebGL 反射；图鉴和尺寸榜小卡独立保留原有样式与 5:7 比例。

本版包含可本地运行的服务端：登录会话、媒体、渔获、图鉴结算、排行、点赞、分享、导出和删除。GitHub Pages 运行本机演示；真实多人功能需要连接部署后的后端。产品正式路线是微信原生小程序，当前可操作演示仍是 H5。

## 启动

需要 Node.js 24+：

```sh
npm ci
npm start
```

打开 http://127.0.0.1:8787/ 。本地客户端会自动连接开发后端，新账号从空图鉴开始。“设置 → 服务连接”可查看连接状态、导出和断开。

## 验证

```sh
npm test
npm run test:e2e
```

浏览器测试使用已安装的 Google Chrome，覆盖桌面和移动视口、正反面与解锁、双账号发布/排行/点赞、独立浏览器分享、响应丢失后的幂等重试、编辑与删除、真实 WebM 上传、声音渲染和静音。测试输出写入本机 `output/playwright/`。

## 卡片源码

`ReflectiveCard.jsx` 和 `YukomonFishCard.jsx` 保留最新组件。`reflective-card-preview/src/app-card.jsx` 负责接入主应用，打包结果在 `vendor/reflective-card/`（本地完整工作区对应 `demo/vendor/reflective-card/`）。

```sh
npm --prefix reflective-card-preview ci
npm run build:cards
```

`reflective-card-preview/src/app-material.json` 保存已确认的 App 材质参数。反射使用随仓库提供的慢水波视频，独立参数面板可通过 `npm --prefix reflective-card-preview run dev` 打开。

大卡交互及材质回归检查：

```sh
node tools/check-card-motion.mjs
node tools/check-tuned-card.mjs
node tools/check-card-material.mjs
```

最后一项需要先启动独立参数面板，默认地址为 http://127.0.0.1:4320/ 。

本地完整设计工作区的主网站在 `demo/`，GitHub 发布仓库的网站在根目录；构建与服务端兼容这两种布局。

完整功能与接口、环境变量、部署和边界见 [服务端说明](server/README.md)。本版验收见 [发布记录](docs/RELEASE-0.2.0.md)。微信原生传输层在 `clients/wechat/api.js`；真实微信登录仍需 AppID/secret，公网部署需要服务器、HTTPS 域名与微信配置。

不包含签名密钥、私有媒体、APK、本机数据库、令牌或内部设计资料。程序生成的鱼体仍是演示素材，物种与巨物线须在正式发布前专业复核。
