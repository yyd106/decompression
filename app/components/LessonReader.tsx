import type { Course, Lesson } from "../../lib/course-types";
import { ArrowIcon } from "./ArrowIcon";

type CompletionLink = {
  href: string;
  overline: string;
  label: string;
};

type LessonReaderProps = {
  course: Course;
  lessons: Lesson[];
  lesson: Lesson;
  areaLabel: string;
  areaHref: string;
  completionLink: CompletionLink;
};

export function LessonReader({
  course,
  lessons,
  lesson,
  areaLabel,
  areaHref,
  completionLink,
}: LessonReaderProps) {
  const coursePath = `${areaHref}/${course.slug}`;
  const lessonIndex = lessons.findIndex((item) => item.slug === lesson.slug);
  const previousLesson = lessons[lessonIndex - 1];
  const nextLesson = lessons[lessonIndex + 1];

  return (
    <div className="lesson-page">
      <div className="site-container lesson-topbar">
        <nav className="breadcrumb" aria-label="面包屑">
          <a href="/">知识解压</a>
          <span>/</span>
          <a href={areaHref}>{areaLabel}</a>
          <span>/</span>
          <a href={coursePath}>{course.title}</a>
          <span>/</span>
          <span>第 {lesson.number} 课</span>
        </nav>
        <span className="lesson-progress">
          {lesson.number} / {lessons.length}
        </span>
      </div>

      <div className="site-container lesson-layout">
        <aside className="lesson-sidebar">
          <a className="sidebar-course" href={coursePath}>
            <span>{course.eyebrow}</span>
            <strong>{course.title}</strong>
          </a>
          <nav aria-label={`${course.title}课程目录`}>
            {lessons.map((item) => (
              <a
                aria-current={item.slug === lesson.slug ? "page" : undefined}
                className={item.slug === lesson.slug ? "active" : ""}
                href={`${coursePath}/${item.slug}`}
                key={item.slug}
              >
                <span>{item.number.toString().padStart(2, "0")}</span>
                {item.title}
              </a>
            ))}
          </nav>
        </aside>

        <article className="lesson-article">
          <header className="lesson-heading">
            <p className="eyebrow">LESSON {lesson.number.toString().padStart(2, "0")}</p>
            <h1>{lesson.title}</h1>
            <p className="lesson-question">{lesson.question}</p>
            <div className="lesson-meta">
              <span>{lesson.duration}</span>
              <span>入门</span>
              <span>含练习</span>
            </div>
          </header>

          <section className="lesson-opening">
            {lesson.opening.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </section>

          {lesson.sections.map((section, index) => (
            <section className="lesson-section" key={section.title}>
              <div className="lesson-section-number">{index + 1}</div>
              <h2>{section.title}</h2>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              {section.bullets && (
                <ul>
                  {section.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              )}
            </section>
          ))}

          <section className="worked-example">
            <p className="example-label">跟着案例走一遍</p>
            <h2>{lesson.example.title}</h2>
            <p>{lesson.example.intro}</p>
            <ol>
              {lesson.example.steps.map((step, index) => (
                <li key={`${step.label}-${index}`}>
                  <span>{(index + 1).toString().padStart(2, "0")}</span>
                  <div>
                    <strong>{step.label}</strong>
                    <p>{step.text}</p>
                  </div>
                </li>
              ))}
            </ol>
            <p className="example-conclusion">{lesson.example.conclusion}</p>
          </section>

          <aside className="takeaway-card">
            <p>带走这一句</p>
            <blockquote>{lesson.takeaway}</blockquote>
          </aside>

          <section className="exercise-card">
            <p className="example-label">轮到你判断</p>
            <h2>小练习</h2>
            <p>{lesson.exercise.prompt}</p>
            <details>
              <summary>完成后，展开自查线索</summary>
              <ul>
                {lesson.exercise.checks.map((check) => (
                  <li key={check}>{check}</li>
                ))}
              </ul>
            </details>
          </section>

          <section className="terms-section">
            <p className="example-label">本节词汇</p>
            <dl>
              {lesson.terms.map((item) => (
                <div key={item.term}>
                  <dt>{item.term}</dt>
                  <dd>{item.definition}</dd>
                </div>
              ))}
            </dl>
          </section>

          <nav className="lesson-nav" aria-label="课程前后导航">
            {previousLesson ? (
              <a href={`${coursePath}/${previousLesson.slug}`}>
                <span>上一课</span>
                <strong>{previousLesson.title}</strong>
              </a>
            ) : (
              <a href={coursePath}>
                <span>返回</span>
                <strong>课程目录</strong>
              </a>
            )}
            {nextLesson ? (
              <a className="next" href={`${coursePath}/${nextLesson.slug}`}>
                <span>下一课</span>
                <strong>{nextLesson.title}</strong>
                <ArrowIcon />
              </a>
            ) : (
              <a className="next" href={completionLink.href}>
                <span>{completionLink.overline}</span>
                <strong>{completionLink.label}</strong>
                <ArrowIcon />
              </a>
            )}
          </nav>
        </article>
      </div>
    </div>
  );
}
