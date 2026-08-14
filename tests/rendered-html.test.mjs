import assert from "node:assert/strict";
import test from "node:test";

async function render(pathname = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${pathname}`, {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("renders the finished knowledge decompression homepage", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /知识解压/);
  assert.match(html, /为什么现在需要/);
  assert.match(html, /机器学习/);
  assert.match(html, /AI/);
  assert.match(html, /金融/);
  assert.match(html, /艺术/);
  assert.match(html, /人文/);
  assert.match(html, /语言/);
  assert.doesNotMatch(html, /codex-preview|Building your site|react-loading-skeleton/i);
});

test("renders the machine learning course and a lesson", async () => {
  const courseResponse = await render("/courses/ai/machine-learning");
  const courseHtml = await courseResponse.text();
  assert.equal(courseResponse.status, 200);
  assert.match(courseHtml, /垃圾邮件过滤器怎样从标记记录中改进/);
  assert.match(courseHtml, /没有标准答案时怎样从行动结果学习/);

  const lessonResponse = await render(
    "/courses/ai/machine-learning/01-spam-filter",
  );
  const lessonHtml = await lessonResponse.text();
  assert.equal(lessonResponse.status, 200);
  assert.match(lessonHtml, /跟着案例走一遍/);
  assert.match(lessonHtml, /轮到你判断/);
  assert.match(lessonHtml, /经验形成模型/);
});
