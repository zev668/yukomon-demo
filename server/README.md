# Yukomon Server 0.5.1

2026-10-27：产品已按用户决定改为 Android / iOS 安装应用，`mobile/` 使用 Capacitor 打包现有 `demo/` 客户端。Node/SQLite 后端部署在腾讯轻量服务器，测试地址为 https://115.159.39.250/ 。当前源码增加账号密码登录、恢复码、隐私授权和官网安装包分发；云端版本以 `/api/health` 为准。混元视觉模型已完成真实调用，腾讯地图按用户要求暂缓。

本次云端配置与待办见 [LIGHTHOUSE.md](LIGHTHOUSE.md)。`yukomon.cn` 已购买并配置 DNS 和 HTTPS，网站与 APP 备案尚待完成。IP 地址仅用于内部测试。

## 功能清单

| 功能 | 第一版实现 |
| --- | --- |
| 登录 | 账号密码注册与登录、加盐 scrypt、恢复码重置、会话撤销；生产环境禁用设备开发登录 |
| 用户 | 昵称、签名、城市、声音/震动设置、数据导出、账号删除 |
| 名录 | 82 种鱼、32 种保护鱼，与客户端共用数据 |
| 媒体 | 图片重新解码、旋转、去元信息和压缩；视频实际探测；单文件 60MiB，图片 10MiB，视频 60 秒、最高 4K；每账号 512MiB |
| AI 识别 | 服务端视觉模型适配、媒体归属校验、持久缓存、并发 2、每账号每日 20 次；无法识别时手动选鱼，不伪造候选 |
| 地址解析 | 服务端腾讯逆地理编码；在线草稿不预填演示钓点或虚构坐标，地图密钥缺失时如实提示 |
| 渔获 | 创建、分页读取、修改描述/放流/装备、删除、照片防重复、客户端草稿保留 |
| 图鉴 | 相册和现场记录按鱼种解锁一张卡；重复记录只增加次数；删除后重新聚合 |
| 段位 | 长期积分账本；稀有度、尺寸、同日重复递减、首次鱼种和套组奖励；积分不重置 |
| 保护鱼类 | 只记录遇见、强制放归，不发卡、不计段位分；不公开遇见记录 |
| 套组 | 6 个主套组进度、一次性完成奖励和缺口查询 |
| 排行 | 全国/同城长期段位榜，按积分、有效鱼种数、套组数和达成时间排序 |
| 钓点地图 | 主动公开的现场记录按约 1 公里网格聚合，延迟展示，不返回他人精确坐标 |
| 钓友 | 真实图鉴、公开渔获；他人只返回城市级位置，不返回坐标或装备 |
| 点赞 | 明确设为赞/取消赞，重复请求不重复计数；禁止自己点赞 |
| 分享 | 服务端随机短 ID，未登录可查看真实照片及城市级资料；可撤销，删除渔获后失效 |
| 可靠性 | SQLite 事务、提交幂等、每分钟 3 条/每天北京时间 30 条、失败不占配额；删除不退配额 |
| 运维 | 健康检查、请求 ID、结构化错误、持久数据卷、热备份脚本、24 小时未引用媒体回收 |

## 本地运行

需要 Node.js 24 或以上。

```powershell
npm ci
npm start
```

打开 http://127.0.0.1:8787/ 。本地同源客户端自动连接开发账号，新账号从空图鉴开始。设备密钥保存在当前浏览器，不是正式跨设备登录方式。GitHub Pages 根目录对应本地 `demo/`。

客户端“设置 → 服务连接”支持连接、断开和导出。断开时恢复连接前的本机演示记录，云端数据保留。在线写入必须成功到达服务端，不会离线假结算；失败保留草稿，请求结果不明时使用原提交标识重试。

需要测试数据时打开 http://127.0.0.1:8787/?demo=1 ，或点击左上角头像进入“设置 → 填充测试数据”。此操作切换到本机演示，保留在线账号和已有本机记录，补齐样本渔获、鱼卡、段位事件、套组进度、模拟钓友和模糊钓点。重复填充不会叠加样本，刷新后保持演示模式；需要联调真实接口时，再从“服务连接”手动连接服务器。

```powershell
npm test
npm run test:e2e
npm --prefix reflective-card-preview ci
npm run build:cards
npm run backup
```

浏览器验收使用已安装的 Google Chrome。报告与截图保存在 `output/playwright/`；测试数据库创建在临时目录并清理。网站自带卡片构建产物，运行网站无需构建 React。

## HTTP 接口

受保护接口使用 `Authorization: Bearer <token>`。错误格式 `{error:{code,message,requestId}}`。

| 方法 / 路径 | 说明 |
| --- | --- |
| GET /api/health, /api/species | 健康与名录，无需登录 |
| GET /api/runtime.js | 公开服务状态和浏览器地图 Key，不包含服务端密钥 |
| POST /api/auth/dev | 仅开发环境，输入 deviceKey（至少 32 字符） |
| POST /api/auth/wechat | 输入 wx.login 的 code；secret 仅在服务端 |
| POST /api/auth/logout | 当前会话失效 |
| GET /api/bootstrap | 当前账号、设置、图鉴、渔获与排行快照 |
| GET/PATCH/DELETE /api/me | 个人资料 / 编辑 / 注销删除 |
| GET /api/me/export | 个人数据 JSON |
| DELETE /api/me/catches | 清空自己的渔获与对应媒体、分享、点赞 |
| POST /api/media | multipart 字段 file；返回 id/url/mime/size/duration |
| GET/DELETE /api/media/:id | 读取 / 删除自己未引用的媒体；视频支持 Range |
| POST /api/recognition | `{mediaId}`；返回名录内候选，最终鱼种由用户确认 |
| POST /api/map/reverse-geocode | `{lat,lng,coordType}`；支持 wgs84/gcj02 |
| POST /api/catches | 创建并结算；必须带 Idempotency-Key（16–100 字符） |
| GET /api/catches?limit=30&offset=0 | 自己的渔获分页，最大每页 100 条 |
| PATCH/DELETE /api/catches/:id | 只可操作自己的记录 |
| PUT /api/catches/:id/like | `{liked:true/false}` |
| GET /api/dex | 图鉴鱼种卡与记录次数 |
| GET /api/rank/me | 当前长期段位、星级和下一段位进度 |
| GET /api/rank/events?limit=20 | 当前账号积分账本 |
| GET /api/ranks/ladder?scope=nation/city | 长期段位榜 |
| GET /api/species-sets, /api/me/sets | 套组定义与当前进度 |
| GET /api/map/cells, /api/map/cells/:cellId | 模糊钓点聚合与公开记录摘要 |
| GET/PATCH /api/me/map-settings | 账号地图公开总开关 |
| GET /api/users/:id | 钓友公开图鉴 |
| POST /api/shares | `{catchId}` |
| GET/DELETE /api/shares/:id | 无登录读取 / 所有者撤销 |

创建记录示例：

```json
{
  "mediaId": "上传返回的 UUID",
  "speciesId": "001",
  "source": "album",
  "desc": "清晨的一条鲫鱼",
  "location": {"city": "杭州"},
  "lengthCm": 22.5,
  "released": true,
  "gear": {"rod":"", "reel":"", "line":"", "bait":""}
}
```

保护遇见使用 `protectedIndex` 替代 `speciesId`。视频先单独上传，以 `videoId` 关联，并用 `mediaId` 提供封面。`source` 支持 `camera/album/sample`；示例来源不计段位。`verified`、积分、段位、ID、时间、配额、保护状态由服务端生成。`mapVisibility` 只有现场记录可设置为 `private/city/grid`，公开网格默认延迟两小时。

## 购买服务器后的部署

初期可用一台支持 Docker 的 Linux 主机，建议 2 核、2GB 以上内存，并预留媒体磁盘。SQLite 仅用于当前单进程单实例，不要让多个副本共享 SQLite 文件。

1. 克隆仓库，复制 `server/.env.example` 为 `server/.env`。
2. 设置真实 `WECHAT_APP_ID/WECHAT_APP_SECRET` 和 `CORS_ORIGINS`。CORS 是逗号分隔的完整来源，例如 `https://zev668.github.io,https://api.example.com`。不要提交 `.env`。
3. 执行 `docker compose up -d --build`。容器固定生产模式，关闭开发登录，端口仅绑定主机 `127.0.0.1:8787`。
4. 域名通过 Caddy/Nginx 反向代理并启用 HTTPS，按主机和微信要求备案，并在微信公众平台配置 request/uploadFile/downloadFile 合法域名。
5. 小程序使用 `clients/wechat/api.js` 登录与调用接口。Pages 演示不能通过设备密钥登录生产账号。
6. 检查 `/api/health`；用真实微信 code 登录、上传、发布，再做 iOS/Android 微信真机验收。
7. 用 `npm run backup` 或容器内 `node server/backup.mjs` 备份数据库、媒体及签名 key，并先演练一次恢复。

Caddy 示例：

```caddyfile
api.example.com {
    request_body { max_size 65MB }
    reverse_proxy 127.0.0.1:8787
}
```

备份脚本使用 SQLite online backup 生成一致数据库，再复制媒体。严格的数据库/媒体同一时刻快照需要暂停写入后备份整卷。恢复时停止应用，把备份的数据库、media 目录、media-signing-key 一起放回数据卷，然后启动并检查健康接口与图片。不要仅复制正在写入的 SQLite 主文件而遗漏 WAL。

## 已知边界

- 微信登录接口已实现，但没有本项目 AppID/secret，无法完成真实微信授权测试。
- `camera` 是客户端声明的现场来源，不是防作弊证明。正式竞赛前需要可信取证策略。
- 媒体使用本机持久卷；未接 COS/S3、转码、CDN、付费内容安全。腾讯地图逆地理编码适配已实现，仍需真实 Key 验证。校验视频容器、实际时长、像素数，但不转码；客户端需使用可解码的编码。
- 排行快照适合小规模联调，随用户量增长需要数据库聚合、查询分页与缓存。
- 普通渔获及其媒体是公开内容，精确地点仅本人返回。保护遇见和未发布媒体通过私有签名读取，持有签名即可访问，删除媒体后失效。
- 删除账号不能删除已导出的文件、第三方缓存或用户保存的照片。
- 当前云端使用 systemd 和隔离 Node 24 运行，未通过 Docker 部署；Docker 容器构建仍未实跑。
