import type { Metadata } from "next";
import { DisciplineOverview } from "../../components/DisciplineOverview";
import { disciplinePageCopy } from "../../../lib/discipline-page-copy";
import { getCoursesForDiscipline } from "../../../lib/outline-catalog.generated";
import { disciplines } from "../../../lib/site-data";

export const metadata: Metadata = {
  title: "AI 入门课程",
  description:
    "从机器学习、深度学习和大语言模型的完整教程，进入 AI Agent 的章节大纲。",
};

const aiDiscipline = disciplines.find((discipline) => discipline.slug === "ai");
if (!aiDiscipline) throw new Error("AI discipline is missing from site data.");

export default function AiCourseHubPage() {
  return (
    <DisciplineOverview
      copy={disciplinePageCopy.ai}
      courses={getCoursesForDiscipline("ai")}
      discipline={aiDiscipline}
    />
  );
}
