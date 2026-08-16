import type { Course, CourseModule, Lesson } from "./course-types";
import lessons01to08 from "./llm-lessons-01-08";
import lessons09to15 from "./llm-lessons-09-15";

export const largeLanguageModelsCourse: Course = {
  slug: "large-language-models",
  title: "大语言模型",
  eyebrow: "AI · 入门课",
  question: "大语言模型怎样从当前可见的文字一步步生成回答，又怎样接入参数之外的证据与行动？",
  model:
    "你看到的是一整段回答，大语言模型却只是根据眼前文字，一小段一小段地续写。训练塑造长期规则，眼前信息和选择方法决定这次文字走向；通顺不代表有事实依据，说“已完成”也不代表真的执行。",
  duration: "15 节 · 每节 30–45 分钟",
  prerequisite: "不要求编程或概率论基础，只需会阅读短文本并比较简单概率。",
  project:
    "围绕一份自选短资料完成一次可追溯问答实验：比较三版提示和输出，把每条事实主张对应到资料证据，再判断应补充上下文、增加检索还是连接工具。",
};

export const largeLanguageModelModules: CourseModule[] = [
  {
    index: "I",
    title: "建立生成循环",
    subtitle: "从自动续写进入词元、训练样本、概率选择与数字表示。",
    range: [1, 5],
  },
  {
    index: "II",
    title: "看见概率怎样形成",
    subtitle: "从上下文窗口、注意力、Transformer 和预训练理解每一步概率。",
    range: [6, 10],
  },
  {
    index: "III",
    title: "改变行为并连接外部世界",
    subtitle: "比较提示与对齐，再用事实核验、检索和工具连接外部世界。",
    range: [11, 15],
  },
];

export const largeLanguageModelLessons: Lesson[] = [
  ...lessons01to08,
  ...lessons09to15,
];

export function getLargeLanguageModelLesson(slug: string) {
  return largeLanguageModelLessons.find((lesson) => lesson.slug === slug);
}
