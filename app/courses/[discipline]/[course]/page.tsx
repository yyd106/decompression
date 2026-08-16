import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { OutlineCourseOverview } from "../../../components/OutlineCourseOverview";
import {
  getOutlineCourse,
  outlineCourses,
} from "../../../../lib/outline-catalog.generated";

type OutlineCoursePageProps = {
  params: Promise<{ discipline: string; course: string }>;
};

export function generateStaticParams() {
  return outlineCourses
    .filter((course) => course.status === "outline")
    .map((course) => ({
      discipline: course.disciplineSlug,
      course: course.slug,
    }));
}

export async function generateMetadata({
  params,
}: OutlineCoursePageProps): Promise<Metadata> {
  const { discipline, course: courseSlug } = await params;
  const course = getOutlineCourse(discipline, courseSlug);

  if (!course) return { title: "课程未找到" };

  return {
    title: `${course.title}入门课程大纲`,
    description: course.question,
  };
}

export default async function OutlineCoursePage({ params }: OutlineCoursePageProps) {
  const { discipline, course: courseSlug } = await params;
  const course = getOutlineCourse(discipline, courseSlug);

  if (!course) notFound();

  return <OutlineCourseOverview course={course} />;
}
