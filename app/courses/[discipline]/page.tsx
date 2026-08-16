import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DisciplineOverview } from "../../components/DisciplineOverview";
import { disciplinePageCopy } from "../../../lib/discipline-page-copy";
import type { DisciplineKey } from "../../../lib/discipline-page-copy";
import { getCoursesForDiscipline } from "../../../lib/outline-catalog.generated";
import { disciplines } from "../../../lib/site-data";

type DisciplinePageProps = {
  params: Promise<{ discipline: string }>;
};

export function generateStaticParams() {
  return disciplines
    .filter((discipline) => discipline.slug !== "ai")
    .map((discipline) => ({ discipline: discipline.slug }));
}

export async function generateMetadata({
  params,
}: DisciplinePageProps): Promise<Metadata> {
  const { discipline: disciplineSlug } = await params;
  const discipline = disciplines.find((item) => item.slug === disciplineSlug);

  if (!discipline) return { title: "领域未找到" };

  return {
    title: `${discipline.name}入门课程`,
    description: discipline.question,
  };
}

export default async function DisciplinePage({ params }: DisciplinePageProps) {
  const { discipline: disciplineSlug } = await params;
  const discipline = disciplines.find((item) => item.slug === disciplineSlug);

  if (!discipline) notFound();

  const copy = disciplinePageCopy[discipline.slug as DisciplineKey];
  const courses = getCoursesForDiscipline(discipline.slug);

  if (!copy || courses.length === 0) notFound();

  return (
    <DisciplineOverview copy={copy} courses={courses} discipline={discipline} />
  );
}
