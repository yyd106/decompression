import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-container footer-inner">
        <div>
          <p className="footer-name">知识解压</p>
          <p className="footer-note">先建立模型，再吸收细节。</p>
        </div>
        <div className="footer-links">
          <Link href="/#why">学习主张</Link>
          <Link href="/#fields">五个板块</Link>
          <Link href="/courses/ai/machine-learning">机器学习</Link>
        </div>
        <p className="footer-year">AI 时代的学习实验 · 2026</p>
      </div>
    </footer>
  );
}
