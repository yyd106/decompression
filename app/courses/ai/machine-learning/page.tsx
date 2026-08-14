import type { Metadata } from "next";
import Link from "next/link";
import { ArrowIcon } from "../../../components/ArrowIcon";
import {
  courseModules,
  lessons,
  machineLearningCourse,
} from "../../../../lib/machine-learning";

export const metadata: Metadata = {
  title: "机器学习入门",
  description: "16 节课，从真实案例开始理解样本、训练、评估与泛化。",
};

export default function MachineLearningCoursePage() {
  return (
    <>
      <section className="course-hero">
        <div className="site-container">
          <nav className="breadcrumb" aria-label="面包屑">
            <Link href="/">知识解压</Link>
            <span>/</span>
            <Link href="/#fields">AI</Link>
            <span>/</span>
            <span>机器学习</span>
          </nav>
          <div className="course-hero-grid">
            <div>
              <p className="eyebrow">{machineLearningCourse.eyebrow}</p>
              <h1>{machineLearningCourse.title}</h1>
              <p className="course-question">{machineLearningCourse.question}</p>
            </div>
            <div className="course-summary">
              <p className="course-summary-label">全课解压模型</p>
              <p>{machineLearningCourse.model}</p>
              <div className="course-facts">
                <span>{machineLearningCourse.duration}</span>
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
            <h2>不用先学公式，先让每个概念有来处。</h2>
          </div>
          <div className="course-intro-copy">
            <p>{machineLearningCourse.prerequisite}</p>
            <p>
              每节只回答一个主要问题：先看真实现象，再跑通案例、提取机制，最后用一个新判断检查自己是否真的会用。
            </p>
          </div>
        </div>
      </section>

      <section className="syllabus-section section-pad-small">
        <div className="site-container">
          <div className="syllabus-heading">
            <p className="eyebrow">16-LESSON SYLLABUS</p>
            <h2>课程目录</h2>
          </div>
          <div className="module-list">
            {courseModules.map((module) => {
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
                        <Link href={`/courses/ai/machine-learning/${lesson.slug}`}>
                          <span className="lesson-number">
                            {lesson.number.toString().padStart(2, "0")}
                          </span>
                          <span className="lesson-card-copy">
                            <strong>{lesson.title}</strong>
                            <small>{lesson.question}</small>
                          </span>
                          <span className="lesson-duration">{lesson.duration}</span>
                          <ArrowIcon />
                        </Link>
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
            <h2>不是做一次测验，<br />而是亲手设计一个判断系统。</h2>
          </div>
          <div>
            <p>{machineLearningCourse.project}</p>
            {lessons[0] && (
              <Link
                className="button button-primary"
                href={`/courses/ai/machine-learning/${lessons[0].slug}`}
              >
                开始第一课
                <ArrowIcon />
              </Link>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
