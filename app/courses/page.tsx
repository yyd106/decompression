import type { Metadata } from "next";
import { ArrowIcon } from "../components/ArrowIcon";
import { getCoursesForDiscipline } from "../../lib/outline-catalog.generated";
import { disciplines } from "../../lib/site-data";

export const metadata: Metadata = {
  title: "课程地图",
  description: "从 AI、金融、艺术、人文和语言五个领域进入 18 门入门课程。",
};

export default function CourseCatalogPage() {
  return (
    <>
      <section className="catalog-index-hero">
        <div className="site-container">
          <nav className="catalog-breadcrumb" aria-label="面包屑">
            <a href="/">知识解压</a>
            <span>/</span>
            <span>课程</span>
          </nav>
          <div className="catalog-index-heading">
            <p className="eyebrow">COURSE CATALOG · 5 FIELDS</p>
            <h1>从一个想弄明白的问题，进入一门学科。</h1>
            <p>
              这里汇集 5 个领域、18 门入门课程和 265 个章节入口。每个领域先说明它反复研究哪类问题，再把问题分成可以逐门进入的课程。
            </p>
          </div>
        </div>
      </section>

      <section className="catalog-index-fields">
        <div className="site-container catalog-discipline-grid">
          {disciplines.map((discipline) => {
            const courses = getCoursesForDiscipline(discipline.slug);
            const completeCount = courses.filter(
              (course) => course.status === "complete",
            ).length;

            return (
              <a
                className={`catalog-discipline-card accent-${discipline.accent}`}
                href={`/courses/${discipline.slug}`}
                key={discipline.slug}
              >
                <article>
                  <div className="catalog-card-meta">
                    <span>{discipline.index}</span>
                    <span>{courses.length} 门课</span>
                  </div>
                  <h2>{discipline.name}</h2>
                  <p className="catalog-card-question">{discipline.question}</p>
                  <p>{discipline.model}</p>
                  <ul aria-label={`${discipline.name}课程`}>
                    {courses.map((course) => (
                      <li key={course.slug}>{course.title}</li>
                    ))}
                  </ul>
                  <div className="catalog-card-action">
                    {completeCount > 0
                      ? `${completeCount} 门完整教程 · 其余大纲开放`
                      : "全部课程大纲开放"}
                    <ArrowIcon />
                  </div>
                </article>
              </a>
            );
          })}
        </div>
      </section>
    </>
  );
}
