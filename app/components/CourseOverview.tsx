import type { Course, CourseModule, Lesson } from "../../lib/course-types";
import { ArrowIcon } from "./ArrowIcon";

type CourseOverviewProps = {
  course: Course;
  modules: CourseModule[];
  lessons: Lesson[];
  areaLabel: string;
  areaHref: string;
  howToTitle: string;
  howToDescription: string;
  projectHeading: string;
};

export function CourseOverview({
  course,
  modules,
  lessons,
  areaLabel,
  areaHref,
  howToTitle,
  howToDescription,
  projectHeading,
}: CourseOverviewProps) {
  const coursePath = `${areaHref}/${course.slug}`;

  return (
    <>
      <section className="course-hero">
        <div className="site-container">
          <nav className="breadcrumb" aria-label="面包屑">
            <a href="/">知识解压</a>
            <span>/</span>
            <a href={areaHref}>{areaLabel}</a>
            <span>/</span>
            <span>{course.title}</span>
          </nav>
          <div className="course-hero-grid">
            <div>
              <p className="eyebrow">{course.eyebrow}</p>
              <h1 className={course.title.length >= 5 ? "course-title-long" : undefined}>
                {course.title}
              </h1>
              <p className="course-question">{course.question}</p>
            </div>
            <div className="course-summary">
              <p className="course-summary-label">全课解压模型</p>
              <p>{course.model}</p>
              <div className="course-facts">
                <span>{course.duration}</span>
                <span>零代码起步</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="course-intro section-pad-small">
        <div className="site-container course-intro-grid">
          <div>
            <p className="eyebrow">HOW TO LEARN</p>
            <h2>{howToTitle}</h2>
          </div>
          <div className="course-intro-copy">
            <p>{course.prerequisite}</p>
            <p>{howToDescription}</p>
          </div>
        </div>
      </section>

      <section className="syllabus-section section-pad-small">
        <div className="site-container">
          <div className="syllabus-heading">
            <p className="eyebrow">{lessons.length}-LESSON SYLLABUS</p>
            <h2>课程目录</h2>
          </div>
          <div className="module-list">
            {modules.map((module) => {
              const moduleLessons = lessons.filter(
                (lesson) =>
                  lesson.number >= module.range[0] && lesson.number <= module.range[1],
              );

              return (
                <section className="course-module" key={module.index}>
                  <div className="module-heading">
                    <span>{module.index}</span>
                    <div>
                      <h3>{module.title}</h3>
                      <p>{module.subtitle}</p>
                    </div>
                  </div>
                  <ol className="lesson-list" start={module.range[0]}>
                    {moduleLessons.map((lesson) => (
                      <li key={lesson.slug}>
                        <a href={`${coursePath}/${lesson.slug}`}>
                          <span className="lesson-number">
                            {lesson.number.toString().padStart(2, "0")}
                          </span>
                          <span className="lesson-card-copy">
                            <strong>{lesson.title}</strong>
                            <small>{lesson.question}</small>
                          </span>
                          <span className="lesson-duration">{lesson.duration}</span>
                          <ArrowIcon />
                        </a>
                      </li>
                    ))}
                  </ol>
                </section>
              );
            })}
          </div>
        </div>
      </section>

      <section className="course-project section-pad-small">
        <div className="site-container project-card">
          <div>
            <p className="eyebrow">FINAL PROJECT</p>
            <h2>{projectHeading}</h2>
          </div>
          <div>
            <p>{course.project}</p>
            {lessons[0] && (
              <a className="button button-primary" href={`${coursePath}/${lessons[0].slug}`}>
                开始第一课
                <ArrowIcon />
              </a>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
