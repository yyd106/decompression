import type { OutlineCourse, OutlineLesson } from "../../lib/outline-types";
import { ArrowIcon } from "./ArrowIcon";

type OutlineLessonReaderProps = {
  course: OutlineCourse;
  lesson: OutlineLesson;
};

export function OutlineLessonReader({ course, lesson }: OutlineLessonReaderProps) {
  const coursePath = `/courses/${course.disciplineSlug}/${course.slug}`;
  const lessonIndex = course.lessons.findIndex((item) => item.slug === lesson.slug);
  const previousLesson = course.lessons[lessonIndex - 1];
  const nextLesson = course.lessons[lessonIndex + 1];

  return (
    <article className="catalog-lesson-page">
      <div className="site-container catalog-lesson-topbar">
        <nav className="catalog-breadcrumb" aria-label="面包屑">
          <a href="/">知识解压</a>
          <span>/</span>
          <a href={`/courses/${course.disciplineSlug}`}>{course.disciplineName}</a>
          <span>/</span>
          <a href={coursePath}>{course.title}</a>
          <span>/</span>
          <span>第 {lesson.number} 章</span>
        </nav>
        <span className="catalog-lesson-progress">
          {lesson.number} / {course.lessons.length}
        </span>
      </div>

      <div className="site-container catalog-lesson-layout">
        <aside className="catalog-lesson-sidebar">
          <a className="catalog-sidebar-course" href={coursePath}>
            <span>{course.disciplineName} · 课程大纲</span>
            <strong>{course.title}</strong>
          </a>
          <nav aria-label={`${course.title}章节目录`}>
            {course.lessons.map((item) => (
              <a
                aria-current={item.slug === lesson.slug ? "page" : undefined}
                className={item.slug === lesson.slug ? "catalog-active" : undefined}
                href={`${coursePath}/${item.slug}`}
                key={item.slug}
              >
                <span>{item.number.toString().padStart(2, "0")}</span>
                {item.title}
              </a>
            ))}
          </nav>
        </aside>

        <div className="catalog-lesson-content">
          <header className="catalog-lesson-heading">
            <p className="eyebrow">
              {course.status === "complete" ? "完整教程" : "章节大纲"} · CHAPTER {lesson.number
                .toString()
                .padStart(2, "0")}
            </p>
            <h1>{lesson.title}</h1>
            <p className="catalog-lesson-question">{lesson.question}</p>
          </header>

          <section className="catalog-lesson-concepts">
            <p className="catalog-label">这一章需要建立的概念</p>
            <h2>关键概念</h2>
            <ul>
              {lesson.concepts.map((concept) => (
                <li key={concept}>{concept}</li>
              ))}
            </ul>
          </section>

          <section className="catalog-completion-card">
            <p className="catalog-label">完成标志</p>
            <h2>不是“看过”，而是能完成这个判断。</h2>
            <p>{lesson.completion}</p>
          </section>

          <aside className="catalog-outline-note">
            <p>
              {course.status === "complete"
                ? "这门课已有完整教程；如果你从课程目录进入对应章节，可以继续阅读机制解释、案例和练习。"
                : "当前页面提供章节的学习边界。完整教程展开后，会在这里补充机制解释、案例、练习和自查。"}
            </p>
          </aside>

          <nav className="catalog-lesson-nav" aria-label="章节前后导航">
            {previousLesson ? (
              <a href={`${coursePath}/${previousLesson.slug}`}>
                <span>上一章</span>
                <strong>{previousLesson.title}</strong>
              </a>
            ) : (
              <a href={coursePath}>
                <span>返回</span>
                <strong>课程大纲</strong>
              </a>
            )}
            {nextLesson ? (
              <a className="catalog-next" href={`${coursePath}/${nextLesson.slug}`}>
                <span>下一章</span>
                <strong>{nextLesson.title}</strong>
                <ArrowIcon />
              </a>
            ) : (
              <a
                className="catalog-next"
                href={`/courses/${course.disciplineSlug}`}
              >
                <span>完成大纲</span>
                <strong>返回{course.disciplineName}课程</strong>
                <ArrowIcon />
              </a>
            )}
          </nav>
        </div>
      </div>
    </article>
  );
}
