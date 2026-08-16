/** Cloudflare Worker entry point for the knowledge decompression site. */
import {
  DEFAULT_DEVICE_SIZES,
  DEFAULT_IMAGE_SIZES,
  handleImageOptimization,
} from "vinext/server/image-optimization";
import handler from "vinext/server/app-router-entry";

interface Env {
  ASSETS?: Fetcher;
  DB?: D1Database;
  SITE_PASSWORD?: string;
  IMAGES?: {
    input(stream: ReadableStream): {
      transform(options: Record<string, unknown>): {
        output(options: {
          format: string;
          quality: number;
        }): Promise<{ response(): Response }>;
      };
    };
  };
}

interface ExecutionContext {
  waitUntil(promise: Promise<unknown>): void;
  passThroughOnException(): void;
}

const ACCESS_COOKIE = "knowledge_decompression_access";
const ACCESS_MAX_AGE = 60 * 60 * 24 * 30;
const PUBLIC_ASSET = /\.(?:css|js|mjs|png|jpe?g|webp|svg|ico|woff2?|ttf|map)$/i;

function readSitePassword(env?: Env) {
  if (env?.SITE_PASSWORD) return env.SITE_PASSWORD;
  if (typeof process !== "undefined") return process.env.SITE_PASSWORD;
  return undefined;
}

function readCookie(request: Request, name: string): string | undefined {
  const cookieHeader = request.headers.get("cookie");
  if (!cookieHeader) return undefined;

  for (const item of cookieHeader.split(";")) {
    const [key, ...valueParts] = item.trim().split("=");
    if (key === name) return valueParts.join("=");
  }

  return undefined;
}

function safeReturnTo(value: FormDataEntryValue | string | null, fallback = "/") {
  if (typeof value !== "string") return fallback;
  if (!value.startsWith("/") || value.startsWith("//")) return fallback;
  return value;
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function constantTimeEqual(left: string, right: string) {
  if (left.length !== right.length) return false;
  let difference = 0;
  for (let index = 0; index < left.length; index += 1) {
    difference |= left.charCodeAt(index) ^ right.charCodeAt(index);
  }
  return difference === 0;
}

async function accessToken(password: string) {
  const bytes = new TextEncoder().encode(`knowledge-decompression:${password}`);
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(digest), (byte) =>
    byte.toString(16).padStart(2, "0"),
  ).join("");
}

async function hasAccess(request: Request, password: string) {
  const current = readCookie(request, ACCESS_COOKIE);
  if (!current) return false;
  return constantTimeEqual(current, await accessToken(password));
}

function passwordPage(requestUrl: URL, returnTo: string) {
  const hasError = requestUrl.searchParams.get("error") === "1";
  const errorMessage = hasError
    ? '<p class="error" role="alert">密码不正确，请再试一次。</p>'
    : "";

  return new Response(
    `<!doctype html>
<html lang="zh-CN">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="robots" content="noindex, nofollow" />
    <title>访问知识解压</title>
    <style>
      :root { color-scheme: light; --paper:#f4f1e9; --soft:#faf8f2; --ink:#18211c; --muted:#5b675f; --line:#c9cdc2; --sage:#285c45; --red:#d85b3f; }
      * { box-sizing:border-box; }
      body { min-height:100vh; margin:0; display:grid; place-items:center; padding:28px; background:var(--paper); color:var(--ink); font-family:-apple-system,BlinkMacSystemFont,"Segoe UI","PingFang SC","Microsoft YaHei",sans-serif; }
      body::before { position:fixed; inset:0; pointer-events:none; content:""; background:radial-gradient(circle at 80% 10%,rgba(40,92,69,.09),transparent 32%),radial-gradient(circle at 12% 90%,rgba(216,91,63,.06),transparent 28%); }
      main { position:relative; width:min(100%,470px); padding:42px 42px 38px; border:1px solid var(--line); border-top:4px solid var(--sage); background:var(--soft); box-shadow:0 24px 70px rgba(24,33,28,.1); }
      .brand { display:flex; align-items:center; gap:12px; margin-bottom:52px; font-family:"Songti SC","STSong",serif; font-weight:700; letter-spacing:.08em; }
      .mark { display:grid; width:38px; height:38px; place-items:center; border-radius:3px 10px 3px 10px; background:var(--ink); color:var(--soft); font-size:20px; }
      .eyebrow { margin:0 0 12px; color:var(--sage); font-size:11px; font-weight:800; letter-spacing:.16em; }
      h1 { margin:0; font-family:"Songti SC","STSong",serif; font-size:38px; line-height:1.28; letter-spacing:-.03em; }
      .intro { margin:18px 0 30px; color:var(--muted); font-size:15px; line-height:1.8; }
      label { display:block; margin-bottom:9px; font-size:13px; font-weight:700; }
      input[type="password"] { width:100%; height:52px; padding:0 14px; border:1px solid var(--line); border-radius:2px; outline:none; background:white; color:var(--ink); font-size:16px; }
      input[type="password"]:focus { border-color:var(--sage); box-shadow:0 0 0 3px rgba(40,92,69,.12); }
      button { width:100%; min-height:52px; margin-top:14px; border:0; border-radius:2px; background:var(--ink); color:var(--soft); cursor:pointer; font-size:14px; font-weight:750; letter-spacing:.04em; }
      button:hover { background:var(--sage); }
      .error { margin:12px 0 0; color:#a23f2c; font-size:13px; }
      .note { margin:25px 0 0; padding-top:18px; border-top:1px solid var(--line); color:var(--muted); font-size:12px; line-height:1.7; }
      @media (max-width:520px) { main { padding:34px 24px 30px; } .brand { margin-bottom:40px; } h1 { font-size:32px; } }
    </style>
  </head>
  <body>
    <main>
      <div class="brand"><span class="mark">解</span><span>知识解压</span></div>
      <p class="eyebrow">PRIVATE READING</p>
      <h1>输入密码，<br />继续阅读课程。</h1>
      <p class="intro">无需登录或注册。通过一次后，这台设备会记住你的访问权限。</p>
      <form method="post" action="/unlock">
        <input type="hidden" name="return_to" value="${escapeHtml(returnTo)}" />
        <label for="password">访问密码</label>
        <input id="password" name="password" type="password" autocomplete="current-password" required autofocus />
        <button type="submit">进入知识解压</button>
        ${errorMessage}
      </form>
      <p class="note">密码只用于验证访问权限，不会保存到浏览器。</p>
    </main>
  </body>
</html>`,
    {
      status: 200,
      headers: {
        "cache-control": "no-store",
        "content-type": "text/html; charset=utf-8",
        "content-security-policy":
          "default-src 'none'; style-src 'unsafe-inline'; form-action 'self'; base-uri 'none'; frame-ancestors 'none'",
        "referrer-policy": "no-referrer",
        "x-content-type-options": "nosniff",
      },
    },
  );
}

async function handleUnlock(request: Request, url: URL, password: string) {
  if (request.method === "GET") {
    const returnTo = safeReturnTo(url.searchParams.get("return_to"));
    if (await hasAccess(request, password)) {
      return Response.redirect(new URL(returnTo, url), 303);
    }
    return passwordPage(url, returnTo);
  }

  if (request.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  const form = await request.formData();
  const submittedPassword = form.get("password");
  const returnTo = safeReturnTo(form.get("return_to"));

  if (
    typeof submittedPassword !== "string" ||
    !constantTimeEqual(submittedPassword, password)
  ) {
    const retryUrl = new URL("/unlock", url);
    retryUrl.searchParams.set("error", "1");
    retryUrl.searchParams.set("return_to", returnTo);
    return Response.redirect(retryUrl, 303);
  }

  return new Response(null, {
    status: 303,
    headers: {
      "cache-control": "no-store",
      location: new URL(returnTo, url).toString(),
      "set-cookie": `${ACCESS_COOKIE}=${await accessToken(password)}; Path=/; Max-Age=${ACCESS_MAX_AGE}; HttpOnly; SameSite=Lax${url.protocol === "https:" ? "; Secure" : ""}`,
    },
  });
}

const worker = {
  async fetch(
    request: Request,
    env?: Env,
    ctx?: ExecutionContext,
  ): Promise<Response> {
    const url = new URL(request.url);
    const password = readSitePassword(env);

    if (!password) {
      return new Response("Site access is temporarily unavailable.", {
        status: 503,
        headers: { "cache-control": "no-store" },
      });
    }

    if (url.pathname === "/unlock") {
      return handleUnlock(request, url, password);
    }

    const isPublicAsset =
      url.pathname.startsWith("/_next/") ||
      url.pathname === "/favicon.svg" ||
      url.pathname === "/og.png" ||
      PUBLIC_ASSET.test(url.pathname);

    if (!isPublicAsset && !(await hasAccess(request, password))) {
      if (url.pathname.startsWith("/api/")) {
        return Response.json({ error: "Unauthorized" }, { status: 401 });
      }
      const returnTo = `${url.pathname}${url.search}`;
      return passwordPage(url, returnTo);
    }

    const assets = env?.ASSETS;
    const images = env?.IMAGES;

    if (url.pathname === "/_vinext/image" && assets && images) {
      const allowedWidths = [...DEFAULT_DEVICE_SIZES, ...DEFAULT_IMAGE_SIZES];
      return handleImageOptimization(
        request,
        {
          fetchAsset: (path) =>
            assets.fetch(new Request(new URL(path, request.url))),
          transformImage: async (body, { width, format, quality }) => {
            const result = await images
              .input(body)
              .transform(width > 0 ? { width } : {})
              .output({ format, quality });
            return result.response();
          },
        },
        allowedWidths,
      );
    }

    return handler.fetch(request, env, ctx);
  },
};

export default worker;
