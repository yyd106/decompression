import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="site-container header-inner">
        <Link className="brand" href="/" aria-label="知识解压首页">
          <span className="brand-mark" aria-hidden="true">
            解
          </span>
          <span>
            <b>知识解压</b>
            <small>KNOWLEDGE DECOMPRESSION</small>
          </span>
        </Link>
        <nav className="main-nav" aria-label="主导航">
          <Link href="/#why">为什么</Link>
          <Link href="/#method">怎么学</Link>
          <Link href="/#fields">课程地图</Link>
        </nav>
        <Link className="header-cta" href="/courses/ai/machine-learning">
          开始机器学习
          <span aria-hidden="true">↗</span>
        </Link>
      </div>
    </header>
  );
}
