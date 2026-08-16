import assert from "node:assert/strict";
import test from "node:test";

const testPassword = "test-password";

const workerUrl = new URL("../dist/server/index.js", import.meta.url);
workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
const workerPromise = import(workerUrl.href).then((module) => module.default);

const outlineCourseSpecs = [
  ["ai", "ai-agents", 14],
  ["finance", "money", 14],
  ["finance", "payment-systems", 16],
  ["finance", "investing", 16],
  ["finance", "financial-institutions", 14],
  ["art", "music", 14],
  ["art", "visual-art", 14],
  ["art", "film", 14],
  ["art", "design", 14],
  ["humanities", "psychology", 16],
  ["humanities", "philosophy", 15],
  ["humanities", "history", 14],
  ["language", "english", 16],
  ["language", "chinese", 14],
  ["language", "writing", 15],
];

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
  const worker = await workerPromise;
  const unlocked = options.unlocked ?? true;
  const headers = new Headers({ accept: "text/html" });
  if (options.cookie) {
    headers.set("cookie", options.cookie);
  } else if (unlocked) {
    headers.set("cookie", await accessCookie());
  }
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
    options.node
      ? undefined
      : {
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

test("supports password access when the Node server provides no Worker env", async () => {
  const previousPassword = process.env.SITE_PASSWORD;
  process.env.SITE_PASSWORD = testPassword;

  try {
    const coursePath = "/courses/ai/machine-learning";
    const gateResponse = await render(coursePath, {
      node: true,
      unlocked: false,
    });
    const gateHtml = await gateResponse.text();

    assert.equal(gateResponse.status, 200);
    assert.match(gateHtml, /输入密码/);

    const unlockResponse = await render("/unlock", {
      node: true,
      unlocked: false,
      method: "POST",
      body: new URLSearchParams({
        password: testPassword,
        return_to: coursePath,
      }),
    });

    assert.equal(unlockResponse.status, 303);
    assert.equal(
      unlockResponse.headers.get("location"),
      `http://localhost${coursePath}`,
    );

    const cookie = unlockResponse.headers.get("set-cookie")?.split(";", 1)[0];
    assert.ok(cookie);

    const courseResponse = await render(coursePath, {
      node: true,
      unlocked: false,
      cookie,
    });
    const courseHtml = await courseResponse.text();

    assert.equal(courseResponse.status, 200);
    assert.match(courseHtml, /机器学习/);
  } finally {
    if (previousPassword === undefined) {
      delete process.env.SITE_PASSWORD;
    } else {
      process.env.SITE_PASSWORD = previousPassword;
    }
  }
});

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
  assert.match(html, /href="\/courses\/finance"/);
  assert.match(html, /href="\/courses\/art"/);
  assert.match(html, /href="\/courses\/humanities"/);
  assert.match(html, /href="\/courses\/language"/);
  assert.match(html, /href="\/courses\/ai\/machine-learning"/);
  assert.match(html, /已完整展开 3 门 AI 教程 · 共 45 节/);
  assert.doesNotMatch(html, /世界模型|三次认知转换|实践验证/);
  assert.doesNotMatch(html, /codex-preview|Building your site|react-loading-skeleton/i);
});

test("renders the machine learning course and a lesson", async () => {
  const courseResponse = await render("/courses/ai/machine-learning");
  const courseHtml = await courseResponse.text();
  assert.equal(courseResponse.status, 200);
  assert.match(courseHtml, /垃圾邮件过滤器怎样从标记记录中改进/);
  assert.match(courseHtml, /没有标准答案时怎样从行动结果学习/);
  const machineLessonLinks = [
    ...new Set(
      Array.from(
        courseHtml.matchAll(
          /href="(\/courses\/ai\/machine-learning\/[^"#?]+)"/g,
        ),
        (match) => match[1],
      ),
    ),
  ];
  assert.equal(machineLessonLinks.length, 16);
  for (const lessonPath of machineLessonLinks) {
    assert.equal((await render(lessonPath)).status, 200, lessonPath);
  }

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

test("renders the course catalog and all five discipline outlines", async () => {
  const catalogResponse = await render("/courses");
  const catalogHtml = await catalogResponse.text();

  assert.equal(catalogResponse.status, 200);
  assert.match(catalogHtml, /COURSE CATALOG · 5 FIELDS/);
  assert.match(catalogHtml, /18 门入门课程/);

  const disciplineSpecs = [
    ["ai", "AI", 4, "面对当前情况，机器凭什么决定下一步？"],
    [
      "finance",
      "金融",
      4,
      "人们怎样把资源交给别人或带到未来，并说清谁得到什么、谁承担损失？",
    ],
    [
      "art",
      "艺术",
      4,
      "怎样用线索，引导别人的注意、理解和行动？",
    ],
    [
      "humanities",
      "人文",
      3,
      "关于人和社会的说法，怎样才算站得住？",
    ],
    [
      "language",
      "语言",
      3,
      "人怎样用声音和文字，让别人重建自己脑中的意思？",
    ],
  ];

  for (const [slug, title, courseCount, question] of disciplineSpecs) {
    assert.match(catalogHtml, new RegExp(`href="/courses/${slug}"`));

    const response = await render(`/courses/${slug}`);
    const html = await response.text();
    assert.equal(response.status, 200);
    assert.match(html, new RegExp(title));
    assert.ok(html.includes(question));
    assert.match(html, /最小回答/);
    assert.match(html, new RegExp(`${courseCount}(?:<!-- -->)? 门课程`));

    const courseLinks = Array.from(
      html.matchAll(new RegExp(`href="(/courses/${slug}/[^"#?]+)"`, "g")),
      (match) => match[1],
    );
    assert.equal(new Set(courseLinks).size, courseCount);
  }
});

test("renders the AI course map with three complete tutorials and one outline", async () => {
  const response = await render("/courses/ai");
  const html = await response.text();

  assert.equal(response.status, 200);
  assert.match(html, /href="\/courses\/ai\/machine-learning"/);
  assert.match(html, /href="\/courses\/ai\/deep-learning"/);
  assert.match(html, /href="\/courses\/ai\/large-language-models"/);
  assert.match(html, /href="\/courses\/ai\/ai-agents"/);
  assert.match(html, /大语言模型/);
  assert.match(html, /面对当前情况，机器凭什么决定下一步？/);
  assert.match(html, /最小回答/);
  assert.match(html, /同一个问题逐步加入复杂条件/);
  assert.doesNotMatch(html, /\bToken\b/);
  assert.match(html, /AI Agent/);
  assert.match(html, /4(?:<!-- -->)? 门课程/);
  assert.match(html, /完整教程/);
  assert.match(html, /章节大纲/);
});

test("renders every outline course and every chapter outline", async () => {
  for (const [discipline, course, lessonCount] of outlineCourseSpecs) {
    const coursePath = `/courses/${discipline}/${course}`;
    const response = await render(coursePath);
    const html = await response.text();

    assert.equal(response.status, 200, coursePath);
    assert.match(html, /章节大纲/, coursePath);
    assert.match(html, /课程章节/, coursePath);
    assert.match(html, /完成标志/, coursePath);

    const lessonLinks = Array.from(
      html.matchAll(
        new RegExp(`href="(${coursePath}/lesson-[0-9]{2})"`, "g"),
        (match) => match[1],
      ),
    );
    assert.equal(new Set(lessonLinks).size, lessonCount, coursePath);

    for (let lessonNumber = 1; lessonNumber <= lessonCount; lessonNumber += 1) {
      const lessonPath = `${coursePath}/lesson-${String(lessonNumber).padStart(2, "0")}`;
      const lessonResponse = await render(lessonPath);
      const lessonHtml = await lessonResponse.text();

      assert.equal(lessonResponse.status, 200, lessonPath);
      assert.match(lessonHtml, /章节大纲/, lessonPath);
      assert.match(lessonHtml, /关键概念/, lessonPath);
      assert.match(lessonHtml, /完成标志/, lessonPath);
    }
  }
});

test("renders the deep learning course and its first, middle, and last lessons", async () => {
  const courseResponse = await render("/courses/ai/deep-learning");
  const courseHtml = await courseResponse.text();
  assert.equal(courseResponse.status, 200);
  assert.match(courseHtml, /建立表示链/);
  assert.match(courseHtml, /同一只猫换个位置/);
  assert.match(courseHtml, /什么时候复用已有模型/);
  const deepLessonLinks = [
    ...new Set(
      Array.from(
        courseHtml.matchAll(
          /href="(\/courses\/ai\/deep-learning\/[^"#?]+)"/g,
        ),
        (match) => match[1],
      ),
    ),
  ];
  assert.equal(deepLessonLinks.length, 14);
  for (const lessonPath of deepLessonLinks) {
    assert.equal((await render(lessonPath)).status, 200, lessonPath);
  }

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

  const finalLessonResponse = await render(
    "/courses/ai/deep-learning/14-transfer-learning",
  );
  const finalLessonHtml = await finalLessonResponse.text();
  assert.equal(finalLessonResponse.status, 200);
  assert.match(finalLessonHtml, /href="\/courses\/ai\/large-language-models"/);
  assert.match(finalLessonHtml, /继续学习大语言模型/);
});

test("renders the large language model course and its first, middle, and last lessons", async () => {
  const courseResponse = await render("/courses/ai/large-language-models");
  const courseHtml = await courseResponse.text();
  assert.equal(courseResponse.status, 200);
  assert.match(courseHtml, /建立生成循环/);
  assert.match(courseHtml, /看见概率怎样形成/);
  assert.match(courseHtml, /改变行为并连接外部世界/);
  assert.match(courseHtml, /大语言模型/);

  const lessonLinks = Array.from(
    courseHtml.matchAll(
      /href="(\/courses\/ai\/large-language-models\/[^"#?]+)"/g,
    ),
    (match) => match[1],
  );
  const uniqueLessonLinks = [...new Set(lessonLinks)];
  assert.equal(uniqueLessonLinks.length, 15);
  for (const lessonPath of uniqueLessonLinks) {
    assert.equal(
      (await render(lessonPath)).status,
      200,
      lessonPath,
    );
  }

  const lessonPaths = [
    "/courses/ai/large-language-models/01-autocomplete-loop",
    "/courses/ai/large-language-models/08-transformer-layers",
    "/courses/ai/large-language-models/15-tools-and-agents",
  ];

  for (const lessonPath of lessonPaths) {
    const lessonResponse = await render(lessonPath);
    const lessonHtml = await lessonResponse.text();
    assert.equal(lessonResponse.status, 200);
    assert.match(lessonHtml, /跟着案例走一遍/);
    assert.match(lessonHtml, /轮到你判断/);
    assert.match(lessonHtml, /本节词汇/);
  }

  const finalLessonHtml = await (await render(lessonPaths[2])).text();
  assert.match(finalLessonHtml, /href="\/courses\/ai"/);
  assert.match(finalLessonHtml, /返回 AI 课程地图/);
});
