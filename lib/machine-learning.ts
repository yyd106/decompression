import lessons01to08 from "./ml-lessons-01-08";
import lessons09to16 from "./ml-lessons-09-16";
import type { Course, CourseModule, Lesson } from "./course-types";

export type { Lesson } from "./course-types";

export const machineLearningCourse: Course = {
  slug: "machine-learning",
  title: "机器学习",
  eyebrow: "AI · 入门课",
  question: "机器怎样从案例中找到可泛化的规律？",
  model:
    "垃圾邮件过滤器把旧邮件全分对，也不代表它认得下一封新邮件。机器学习用经验和评价标准调整一条从输入到结果的规则，再拿没参与调整的新情况验收；数据让它看见什么、标准奖励什么，共同限制了它能学到什么。",
  duration: "16 节 · 每节 30–45 分钟",
  prerequisite: "不要求编程基础，只需会基础算术、百分比和表格阅读。",
  project:
    "为客服升级场景手工设计一个小型分类器：定义目标、制作样本、选择特征、设定阈值，并用新案例解释它为什么会成功或失败。",
};

export const courseModules: CourseModule[] = [
  {
    index: "I",
    title: "先看见学习问题",
    subtitle: "从规则、目标、样本和特征出发，搭起最小学习系统。",
    range: [1, 5],
  },
  {
    index: "II",
    title: "让模型形成判断",
    subtitle: "理解训练、预测、评估与泛化，而不是把算法当黑箱。",
    range: [6, 12],
  },
  {
    index: "III",
    title: "在真实世界里校验",
    subtitle: "处理泄漏、失衡和无标签问题，并认识奖励驱动的学习。",
    range: [13, 16],
  },
];

export const lessons: Lesson[] = [...lessons01to08, ...lessons09to16];

export function getLesson(slug: string) {
  return lessons.find((lesson) => lesson.slug === slug);
}
