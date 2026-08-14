export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="site-container header-inner">
        <a className="brand" href="/" aria-label="知识解压首页">
          <span className="brand-mark" aria-hidden="true">
            解
          </span>
          <span>
            <b>知识解压</b>
            <small>KNOWLEDGE DECOMPRESSION</small>
          </span>
        </a>
        <nav className="main-nav" aria-label="主导航">
          <a href="/#why">为什么</a>
          <a href="/#method">怎么学</a>
          <a href="/#fields">课程地图</a>
        </nav>
        <a className="header-cta" href="/courses/ai/machine-learning">
          开始机器学习
          <span aria-hidden="true">↗</span>
        </a>
      </div>
    </header>
  );
}
