import assert from "node:assert/strict";
import test from "node:test";

const testPassword = "test-password";

async function accessCookie() {
  const bytes = new TextEncoder().encode(
    `knowledge-decompression:${testPassword}`,
  );
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  const token = Array.from(new Uint8Array(digest), (byte) =>
    byte.toString(16).padStart(2, "0"),
  ).join("");
  return `knowledge_decompression_access=${token}`;
}

async function render(pathname = "/", options = {}) {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  const unlocked = options.unlocked ?? true;
  const headers = new Headers({ accept: "text/html" });
  if (unlocked) headers.set("cookie", await accessCookie());
  if (options.body) {
    headers.set("content-type", "application/x-www-form-urlencoded");
  }

  return worker.fetch(
    new Request(`http://localhost${pathname}`, {
      method: options.method ?? "GET",
      headers,
      body: options.body,
      redirect: "manual",
    }),
    {
      SITE_PASSWORD: testPassword,
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

test("shows a password gate without requiring sign-in", async () => {
  const response = await render("/", { unlocked: false });
  const html = await response.text();

  assert.equal(response.status, 200);
  assert.match(html, /输入密码/);
  assert.match(html, /无需登录或注册/);
  assert.match(html, /type="password"/);
  assert.doesNotMatch(html, /Sign in with ChatGPT|登录 ChatGPT/);
});

test("accepts the shared password and returns to the requested course", async () => {
  const body = new URLSearchParams({
    password: testPassword,
    return_to: "/courses/ai/machine-learning",
  });
  const response = await render("/unlock", {
    unlocked: false,
    method: "POST",
    body,
  });

  assert.equal(response.status, 303);
  assert.equal(
    response.headers.get("location"),
    "http://localhost/courses/ai/machine-learning",
  );
  assert.match(
    response.headers.get("set-cookie") ?? "",
    /knowledge_decompression_access=/,
  );
  assert.doesNotMatch(response.headers.get("set-cookie") ?? "", /test-password/);
});

test("renders the finished knowledge decompression homepage", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /知识解压/);
  assert.match(html, /先跑通一个真实问题/);
  assert.match(html, /固定内容只能预设一条主要路径/);
  assert.match(html, /id="example"/);
  assert.match(html, /id="why"/);
  assert.match(html, /id="method"/);
  assert.match(html, /id="fields"/);
  assert.match(html, /机器学习/);
  assert.match(html, /AI/);
  assert.match(html, /金融/);
  assert.match(html, /艺术/);
  assert.match(html, /人文/);
  assert.match(html, /语言/);
  assert.match(html, /href="\/courses\/ai"/);
  assert.match(html, /href="\/courses\/ai\/machine-learning"/);
  assert.match(html, /机器学习与深度学习 · 共 30 节/);
  assert.doesNotMatch(html, /世界模型|三次认知转换|实践验证/);
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
  assert.match(lessonHtml, /记录形成模型/);

  const finalLessonResponse = await render(
    "/courses/ai/machine-learning/16-reinforcement-learning",
  );
  const finalLessonHtml = await finalLessonResponse.text();
  assert.equal(finalLessonResponse.status, 200);
  assert.match(finalLessonHtml, /href="\/courses\/ai\/deep-learning"/);
  assert.match(finalLessonHtml, /继续学习深度学习/);
});

test("renders the AI course map with two complete tutorials", async () => {
  const response = await render("/courses/ai");
  const html = await response.text();

  assert.equal(response.status, 200);
  assert.match(html, /四个问题，逐层深入/);
  assert.match(html, /href="\/courses\/ai\/machine-learning"/);
  assert.match(html, /href="\/courses\/ai\/deep-learning"/);
  assert.match(html, /大语言模型/);
  assert.match(html, /AI Agent/);
  assert.match(html, /完整教程/);
  assert.match(html, /大纲就绪/);
});

test("renders the deep learning course and its first, middle, and last lessons", async () => {
  const courseResponse = await render("/courses/ai/deep-learning");
  const courseHtml = await courseResponse.text();
  assert.equal(courseResponse.status, 200);
  assert.match(courseHtml, /建立表示链/);
  assert.match(courseHtml, /同一只猫换个位置/);
  assert.match(courseHtml, /什么时候复用已有模型/);

  const lessonPaths = [
    "/courses/ai/deep-learning/01-pattern-after-moving",
    "/courses/ai/deep-learning/08-gradient-direction",
    "/courses/ai/deep-learning/14-transfer-learning",
  ];

  for (const lessonPath of lessonPaths) {
    const lessonResponse = await render(lessonPath);
    const lessonHtml = await lessonResponse.text();
    assert.equal(lessonResponse.status, 200);
    assert.match(lessonHtml, /跟着案例走一遍/);
    assert.match(lessonHtml, /轮到你判断/);
    assert.match(lessonHtml, /本节词汇/);
  }
});
