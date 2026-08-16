import type { Metadata } from "next";
import { CourseOverview } from "../../../components/CourseOverview";
import {
  largeLanguageModelLessons,
  largeLanguageModelModules,
  largeLanguageModelsCourse,
} from "../../../../lib/large-language-models";

export const metadata: Metadata = {
  title: "大语言模型入门",
  description: "15 节课，从下一词元预测进入注意力、预训练、对齐、检索与工具调用。",
};

export default function LargeLanguageModelsCoursePage() {
  return (
    <CourseOverview
      areaHref="/courses/ai"
      areaLabel="AI"
      course={largeLanguageModelsCourse}
      howToDescription="每节都从一段可观察的文字行为进入，再手工跑通词元切分、概率选择、注意力权重或上下文预算。遇到事实主张时，课程会继续追问证据来自参数、当前上下文、检索资料还是工具结果。"
      howToTitle="先跑通逐词元生成，再区分什么真正改变了回答。"
      lessons={largeLanguageModelLessons}
      modules={largeLanguageModelModules}
      projectHeading="不以文字流畅为终点，亲手完成一次可追溯问答。"
    />
  );
}
