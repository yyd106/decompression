import type { Metadata } from "next";
import { headers } from "next/headers";
import { SiteFooter } from "./components/SiteFooter";
import { SiteHeader } from "./components/SiteHeader";
import "./globals.css";

async function requestOrigin() {
  const headerList = await headers();
  const host =
    headerList.get("x-forwarded-host") ??
    headerList.get("host") ??
    "localhost:3000";
  const forwardedProto = headerList.get("x-forwarded-proto");
  const protocol = forwardedProto ?? (host.includes("localhost") ? "http" : "https");
  return `${protocol}://${host}`;
}

export async function generateMetadata(): Promise<Metadata> {
  const origin = await requestOrigin();

  return {
    title: {
      default: "知识解压｜AI 时代的学习方式",
      template: "%s｜知识解压",
    },
    description:
      "先用真实案例跑通机制，再让概念逐个出现，并用新案例检验理解。",
    icons: {
      icon: "/favicon.svg",
      shortcut: "/favicon.svg",
    },
    openGraph: {
      title: "知识解压：AI 时代的学习方式",
      description: "先跑通一个真实问题，再展开一门学科。",
      type: "website",
      locale: "zh_CN",
      url: origin,
      images: [
        {
          url: `${origin}/og-v2.png`,
          width: 1200,
          height: 630,
          alt: "知识解压：AI 时代的学习方式",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "知识解压：AI 时代的学习方式",
      description: "先跑通一个真实问题，再展开一门学科。",
      images: [`${origin}/og-v2.png`],
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
