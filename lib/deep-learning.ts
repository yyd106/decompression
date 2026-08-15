import type { Course, CourseModule, Lesson } from "./course-types";
import lessons01to07 from "./dl-lessons-01-07";
import lessons08to14 from "./dl-lessons-08-14";

export const deepLearningCourse: Course = {
  slug: "deep-learning",
  title: "深度学习",
  eyebrow: "AI · 入门课",
  question: "神经网络怎样把原始数字逐层变成可复用的表示？",
  model:
    "深度学习把原始数字送入一串可调整的变换，逐层形成更适合任务的表示并产生预测。预测与目标的差距会沿同一条计算路径反向分配给各层参数；只有这套变换在未见样本上仍有用，才说明学到的表示可以复用。",
  duration: "14 节 · 每节 35–45 分钟",
  prerequisite:
    "不要求编程、微积分或机器学习经验，只需会日常加减乘除、比较大小并阅读简单表格。",
  project:
    "选择一个图像、声音或文字识别应用，制作一份模型解剖报告：画出从原始输入到预测的表示链，标明损失与参数更新路径，再用训练曲线、结构选择和六个边界案例检查它。",
};

export const deepLearningModules: CourseModule[] = [
  {
    index: "I",
    title: "建立表示链",
    subtitle: "从位置变化进入数字输入、人工神经元、多层表示和前向计算。",
    range: [1, 6],
  },
  {
    index: "II",
    title: "建立调整链",
    subtitle: "从损失出发，理解梯度、反向传播与未见样本检验。",
    range: [7, 10],
  },
  {
    index: "III",
    title: "选择可复用的关系",
    subtitle: "按局部、顺序、远距离读取和已有经验选择结构与训练起点。",
    range: [11, 14],
  },
];

export const deepLearningLessons: Lesson[] = [
  ...lessons01to07,
  ...lessons08to14,
];

export function getDeepLearningLesson(slug: string) {
  return deepLearningLessons.find((lesson) => lesson.slug === slug);
}
