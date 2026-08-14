import lessons01to08 from "./ml-lessons-01-08";
import lessons09to16 from "./ml-lessons-09-16";

export type Lesson = {
  slug: string;
  number: number;
  title: string;
  question: string;
  duration: string;
  opening: string[];
  sections: Array<{
    title: string;
    paragraphs: string[];
    bullets?: string[];
  }>;
  example: {
    title: string;
    intro: string;
    steps: Array<{ label: string; text: string }>;
    conclusion: string;
  };
  takeaway: string;
  exercise: {
    prompt: string;
    checks: string[];
  };
  terms: Array<{ term: string; definition: string }>;
};

export const machineLearningCourse = {
  title: "机器学习",
  eyebrow: "AI · 入门课",
  question: "机器怎样从案例中找到可泛化的规律？",
  model:
    "人会从过去的例子里慢慢形成判断，机器学习也从这里开始。它把经验表示成数据，依据目标、内部结构或奖励调整规则，再用没见过的案例检验这些规则能否复用。",
  duration: "16 节 · 每节 30–45 分钟",
  prerequisite: "不要求编程基础，只需会基础算术、百分比和表格阅读。",
  project:
    "为客服升级场景手工设计一个小型分类器：定义目标、制作样本、选择特征、设定阈值，并用新案例解释它为什么会成功或失败。",
};

export const courseModules = [
  {
    index: "I",
    title: "先看见学习问题",
    subtitle: "从规则、目标、样本和特征出发，搭起最小学习系统。",
    range: [1, 5] as const,
  },
  {
    index: "II",
    title: "让模型形成判断",
    subtitle: "理解训练、预测、评估与泛化，而不是把算法当黑箱。",
    range: [6, 12] as const,
  },
  {
    index: "III",
    title: "在真实世界里校验",
    subtitle: "处理泄漏、失衡和无标签问题，并认识奖励驱动的学习。",
    range: [13, 16] as const,
  },
];

export const lessons: Lesson[] = [...lessons01to08, ...lessons09to16];

export function getLesson(slug: string) {
  return lessons.find((lesson) => lesson.slug === slug);
}
