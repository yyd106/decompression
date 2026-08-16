import type { DisciplinePageCopy } from "../../lib/discipline-page-copy";
import type { OutlineCourse } from "../../lib/outline-types";
import type { Discipline } from "../../lib/site-data";
import { ArrowIcon } from "./ArrowIcon";

type DisciplineOverviewProps = {
  discipline: Discipline;
  copy: DisciplinePageCopy;
  courses: OutlineCourse[];
};

export function DisciplineOverview({
  discipline,
  copy,
  courses,
}: DisciplineOverviewProps) {
  const completeCount = courses.filter((course) => course.status === "complete").length;

  return (
    <>
      <section className={`catalog-field-hero accent-${discipline.accent}`}>
        <div className="site-container">
          <nav className="catalog-breadcrumb" aria-label="面包屑">
            <a href="/">知识解压</a>
            <span>/</span>
            <a href="/courses">课程</a>
            <span>/</span>
            <span>{discipline.name}</span>
          </nav>
          <div className="catalog-field-hero-grid">
            <header>
              <p className="eyebrow">{copy.eyebrow}</p>
              <h1>{copy.title}</h1>
              <p className="catalog-field-question">{discipline.question}</p>
            </header>
            <aside className="catalog-field-model">
              <p className="catalog-label">领域主线</p>
              <p>{discipline.model}</p>
              <p className="catalog-field-status">
                {courses.length} 门课程
                {completeCount > 0
                  ? ` · ${completeCount} 门完整教程`
                  : " · 章节大纲全部开放"}
              </p>
            </aside>
          </div>
        </div>
      </section>

      <section className="catalog-field-intro">
        <div className="site-container catalog-field-intro-grid">
          <div>
            <p className="eyebrow">WHY THIS FIELD</p>
            <h2>这个领域究竟在研究什么？</h2>
          </div>
          <div className="catalog-field-intro-copy">
            {copy.introduction.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>

      <section className="catalog-field-path">
        <div className="site-container">
          <div className="catalog-section-heading catalog-section-heading-split">
            <div>
              <p className="eyebrow">LEARNING PATH</p>
              <h2>{copy.pathTitle}</h2>
            </div>
            <p>{copy.pathDescription}</p>
          </div>

          <ol className="catalog-course-grid">
            {courses.map((course, index) => (
              <li key={course.slug}>
                <a href={`/courses/${course.disciplineSlug}/${course.slug}`}>
                  <article className="catalog-course-card">
                    <div className="catalog-card-meta">
                      <span>{(index + 1).toString().padStart(2, "0")}</span>
                      <span>{course.lessons.length} 节</span>
                    </div>
                    <p className="catalog-course-status">
                      {course.status === "complete" ? "完整教程" : "章节大纲"}
                    </p>
                    <h3>{course.title}</h3>
                    <p className="catalog-card-question">{course.question}</p>
                    <p>{course.model}</p>
                    <div className="catalog-card-action">
                      {course.status === "complete" ? "进入教程" : "进入课程大纲"}
                      <ArrowIcon />
                    </div>
                  </article>
                </a>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="catalog-field-outcomes">
        <div className="site-container catalog-field-outcomes-card">
          <div>
            <p className="eyebrow">AFTER THE PATH</p>
            <h2>学完这个领域，你应该多出三种能力。</h2>
          </div>
          <ol>
            {copy.outcomes.map((outcome, index) => (
              <li key={outcome}>
                <span>{(index + 1).toString().padStart(2, "0")}</span>
                <p>{outcome}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}
