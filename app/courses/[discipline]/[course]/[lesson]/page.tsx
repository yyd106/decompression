import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { OutlineLessonReader } from "../../../../components/OutlineLessonReader";
import {
  getOutlineCourse,
  getOutlineLesson,
  outlineCourses,
} from "../../../../../lib/outline-catalog.generated";

type OutlineLessonPageProps = {
  params: Promise<{ discipline: string; course: string; lesson: string }>;
};

export function generateStaticParams() {
  return outlineCourses
    .filter((course) => course.status === "outline")
    .flatMap((course) =>
      course.lessons.map((lesson) => ({
        discipline: course.disciplineSlug,
        course: course.slug,
        lesson: lesson.slug,
      })),
    );
}

export async function generateMetadata({
  params,
}: OutlineLessonPageProps): Promise<Metadata> {
  const { discipline, course: courseSlug, lesson: lessonSlug } = await params;
  const course = getOutlineCourse(discipline, courseSlug);
  const lesson = getOutlineLesson(discipline, courseSlug, lessonSlug);

  if (!course || !lesson) return { title: "章节未找到" };

  return {
    title: `第 ${lesson.number} 章：${lesson.title}`,
    description: lesson.question,
  };
}

export default async function OutlineLessonPage({ params }: OutlineLessonPageProps) {
  const { discipline, course: courseSlug, lesson: lessonSlug } = await params;
  const course = getOutlineCourse(discipline, courseSlug);
  const lesson = getOutlineLesson(discipline, courseSlug, lessonSlug);

  if (!course || !lesson) notFound();

  return <OutlineLessonReader course={course} lesson={lesson} />;
}
