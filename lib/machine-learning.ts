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
    "机器学习反复做一件事：用过去的案例调整从输入到输出的规则，再拿未见案例检查这条规则能否复用。监督学习、无监督学习和强化学习的主要差别，在于调整依据分别来自目标标签、数据中呈现的结构或行动后的奖励。",
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
