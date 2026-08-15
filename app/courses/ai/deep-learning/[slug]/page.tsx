import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LessonReader } from "../../../../components/LessonReader";
import {
  deepLearningCourse,
  deepLearningLessons,
  getDeepLearningLesson,
} from "../../../../../lib/deep-learning";

type LessonPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return deepLearningLessons.map((lesson) => ({ slug: lesson.slug }));
}

export async function generateMetadata({ params }: LessonPageProps): Promise<Metadata> {
  const { slug } = await params;
  const lesson = getDeepLearningLesson(slug);

  if (!lesson) {
    return { title: "课程未找到" };
  }

  return {
    title: `第 ${lesson.number} 课：${lesson.title}`,
    description: lesson.question,
  };
}

export default async function DeepLearningLessonPage({ params }: LessonPageProps) {
  const { slug } = await params;
  const lesson = getDeepLearningLesson(slug);

  if (!lesson) notFound();

  return (
    <LessonReader
      areaHref="/courses/ai"
      areaLabel="AI"
      completionLink={{
        href: "/courses/ai",
        overline: "完成",
        label: "返回 AI 课程地图",
      }}
      course={deepLearningCourse}
      lesson={lesson}
      lessons={deepLearningLessons}
    />
  );
}
