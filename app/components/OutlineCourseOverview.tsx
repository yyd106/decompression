import type { OutlineCourse } from "../../lib/outline-types";
import { ArrowIcon } from "./ArrowIcon";

type OutlineCourseOverviewProps = {
  course: OutlineCourse;
};

export function OutlineCourseOverview({ course }: OutlineCourseOverviewProps) {
  const disciplinePath = `/courses/${course.disciplineSlug}`;
  const coursePath = `${disciplinePath}/${course.slug}`;
  const status =
    course.status === "complete"
      ? {
          label: "完整教程",
          description: "这门课已经展开为可以逐节学习、练习和自查的完整教程。",
        }
      : {
          label: "章节大纲",
          description:
            "这门课目前开放完整学习骨架。每一章都给出问题、关键概念和完成标志，完整教程将沿这条路径继续展开。",
        };

  return (
    <>
      <section className="catalog-course-hero">
        <div className="site-container">
          <nav className="catalog-breadcrumb" aria-label="面包屑">
            <a href="/">知识解压</a>
            <span>/</span>
            <a href="/courses">课程</a>
            <span>/</span>
            <a href={disciplinePath}>{course.disciplineName}</a>
            <span>/</span>
            <span>{course.title}</span>
          </nav>

          <div className="catalog-course-hero-grid">
            <header className="catalog-course-heading">
              <p className="eyebrow">{course.disciplineName} · 入门课程</p>
              <h1>{course.title}</h1>
              <p className="catalog-course-question">{course.question}</p>
            </header>

            <aside className="catalog-course-model" aria-label="课程解压模型">
              <p className="catalog-label">课程解压模型</p>
              <p>{course.model}</p>
              <dl className="catalog-course-facts">
                <div>
                  <dt>开放状态</dt>
                  <dd>{status.label}</dd>
                </div>
                <div>
                  <dt>课程规模</dt>
                  <dd>{course.duration}</dd>
                </div>
              </dl>
            </aside>
          </div>
        </div>
      </section>

      <section className="catalog-course-start">
        <div className="site-container catalog-course-start-grid">
          <div>
            <p className="eyebrow">BEFORE YOU START</p>
            <h2>先知道这门课会带你走到哪里。</h2>
          </div>
          <div className="catalog-course-start-copy">
            <p>{status.description}</p>
            <p>
              <strong>前置要求：</strong>
              {course.prerequisite}
            </p>
            <ul aria-label="课程学习成果">
              {course.outcomes.map((outcome) => (
                <li key={outcome}>{outcome}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="catalog-course-map">
        <div className="site-container">
          <div className="catalog-section-heading">
            <p className="eyebrow">LEARNING MAP</p>
            <h2>学习地图</h2>
            <p>先建立模型，再展开机制，最后换一个问题检验它。</p>
          </div>
          <ol className="catalog-learning-map">
            {course.learningMap.map((step, index) => (
              <li key={step}>
                <span>{(index + 1).toString().padStart(2, "0")}</span>
                <p>{step}</p>
              </li>
            ))}
          </ol>

          <div className="catalog-variable-panel">
            <div>
              <p className="catalog-label">贯穿全课的变量</p>
              <h3>遇到新案例时，先检查这些位置。</h3>
            </div>
            <ul>
              {course.variables.map((variable) => (
                <li key={variable}>{variable}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="catalog-syllabus">
        <div className="site-container">
          <div className="catalog-section-heading catalog-section-heading-split">
            <div>
              <p className="eyebrow">{course.lessons.length}-LESSON OUTLINE</p>
              <h2>课程章节</h2>
            </div>
            <p>
              每章先给出要回答的问题。进入章节大纲后，还能看到关键概念和判断自己是否学会的完成标志。
            </p>
          </div>

          <ol className="catalog-lesson-list">
            {course.lessons.map((lesson) => (
              <li key={lesson.slug}>
                <a href={`${coursePath}/${lesson.slug}`}>
                  <span className="catalog-lesson-number">
                    {lesson.number.toString().padStart(2, "0")}
                  </span>
                  <span className="catalog-lesson-copy">
                    <strong>{lesson.title}</strong>
                    <small>{lesson.question}</small>
                  </span>
                  <span className="catalog-lesson-action">
                    {course.status === "complete" ? "进入教程" : "查看大纲"}
                    <ArrowIcon />
                  </span>
                </a>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="catalog-project">
        <div className="site-container catalog-project-card">
          <header>
            <p className="eyebrow">FINAL PROJECT</p>
            <h2>用一个作品检验整门课。</h2>
            <p>{course.project.task}</p>
          </header>
          <div className="catalog-project-details">
            <section>
              <h3>你需要交付</h3>
              <ul>
                {course.project.deliverables.map((deliverable) => (
                  <li key={deliverable}>{deliverable}</li>
                ))}
              </ul>
            </section>
            <section>
              <h3>怎样算完成</h3>
              <ul>
                {course.project.acceptance.map((criterion) => (
                  <li key={criterion}>{criterion}</li>
                ))}
              </ul>
            </section>
          </div>
        </div>
      </section>

      <section className="catalog-boundaries">
        <div className="site-container">
          <div className="catalog-section-heading">
            <p className="eyebrow">COURSE BOUNDARIES</p>
            <h2>这门入门课讲到哪里。</h2>
          </div>
          <dl className="catalog-boundary-grid">
            <div>
              <dt>本课包含</dt>
              <dd>{course.boundaries.includes}</dd>
            </div>
            <div>
              <dt>暂不包含</dt>
              <dd>{course.boundaries.excludes}</dd>
            </div>
            <div>
              <dt>学完以后</dt>
              <dd>{course.boundaries.next}</dd>
            </div>
          </dl>
        </div>
      </section>
    </>
  );
}
