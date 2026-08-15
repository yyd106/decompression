# 知识解压

“知识解压”是一套面向 AI 时代的入门课程方法：先用真实案例跑通机制，让概念在解决问题时依次出现，再用新案例检验理解是否能够迁移。

网站目前包含 5 个学习板块、18 门入门课程大纲，以及已经完整展开的 16 节《机器学习入门》。

## 项目结构

- `app/`：首页、课程页与全站组件。
- `lib/`：课程数据和板块介绍。
- `content/overall.md`：项目总论。
- `content/curriculum/`：18 门课程的大纲与总索引。
- `worker/`：共享密码访问与站点服务入口。
- `tests/`：密码访问、首页和课程渲染测试。

## 本地运行

需要 Node.js 22.13 或更高版本。

```bash
npm install
npm run dev
```

站点通过 `SITE_PASSWORD` 环境变量设置共享访问密码。不要把实际密码提交到仓库。

## 验证

```bash
npm test
npm run lint
```

`npm test` 会先完成生产构建，再检查密码入口、首页、课程目录和单课页面。

## 部署

项目保留 `.openai/hosting.json` 和 Cloudflare Worker 兼容的构建输出，可继续通过 Sites 发布。生产部署前需要配置 `SITE_PASSWORD`。
