# 知识解压

“知识解压”是一套面向 AI 时代的入门课程方法：先用真实案例跑通机制，让概念在解决问题时依次出现，再用新案例检验理解是否能够迁移。

网站包含 5 个领域大纲页、18 门入门课程大纲和 265 个章节入口。其中三门 AI 课程已经展开为完整教程：《机器学习入门》16 节、《深度学习入门》14 节、《大语言模型入门》15 节，共 45 节；其余 15 门课程开放 220 个章节大纲，明确列出每章要回答的问题、关键概念与完成标志。

## 继续课程写作

无论换到哪个新聊天，先阅读 [AGENTS.md](AGENTS.md) 和 [content/CONTINUATION.md](content/CONTINUATION.md)。前者保存长期有效的课程与协作规则，后者保存当前进度、下一门课、分批流程和最近一次交接。下一步从 `CONTINUATION.md` 的明确记录继续，不依赖旧聊天记录。

## 项目结构

- `app/`：首页、课程总地图、领域页、课程页、章节页与全站组件。
- `lib/`：领域介绍、统一课程目录和三门完整教程的数据。
- `content/overall.md`：项目总论。
- `content/CONTINUATION.md`：当前进度、下一批任务和跨聊天交接记录。
- `content/curriculum/`：18 门课程的大纲与总索引。
- `scripts/`：从课程 Markdown 生成网站课程目录的确定性脚本。
- `worker/`：共享密码访问与站点服务入口。
- `tests/`：密码访问、首页和课程渲染测试。

## 本地运行

需要 Node.js 22.13 或更高版本。

```bash
npm install
npm run dev
```

站点通过 `SITE_PASSWORD` 环境变量设置共享访问密码。不要把实际密码提交到仓库。

## Railway 部署

Railway 使用仓库根目录构建，并需要 Node.js 22.13 或更高版本：

- 构建命令：`npm run build`
- 启动命令：`npm start`
- 环境变量：`SITE_PASSWORD`

服务会读取 Railway 提供的 `PORT` 并监听所有网络接口。启动命令同时信任 Railway 代理提供的原始协议，因此解锁后会直接跳回 HTTPS，并设置只通过 HTTPS 发送的授权 Cookie。Cloudflare Worker 部署仍从绑定读取密码；Railway 的 Node 运行环境则从进程环境变量读取同名密码。

## 验证

```bash
npm test
npm run lint
```

`npm test` 会先完成生产构建，再检查密码入口、首页、5 个领域页、18 门课程页、220 个章节大纲入口，以及三门完整教程的关键页面。

每次生产构建都会先从 `content/curriculum/` 重新生成课程目录；修改课程 Markdown 后不需要手工维护页面数据。

## 部署

项目保留 `.openai/hosting.json` 和 Cloudflare Worker 兼容的构建输出，可继续通过 Sites 发布。生产部署前需要配置 `SITE_PASSWORD`。
