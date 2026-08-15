import type { Metadata } from "next";
import { CourseOverview } from "../../../components/CourseOverview";
import {
  deepLearningCourse,
  deepLearningLessons,
  deepLearningModules,
} from "../../../../lib/deep-learning";

export const metadata: Metadata = {
  title: "深度学习入门",
  description: "14 节课，跑通表示、前向计算、损失、反向传播与常见网络结构。",
};

export default function DeepLearningCoursePage() {
  return (
    <CourseOverview
      areaHref="/courses/ai"
      areaLabel="AI"
      course={deepLearningCourse}
      howToDescription="每节都把抽象结构落到一组可手算的数字上：先追踪信息怎样向前形成预测，再追踪误差怎样向后影响参数，最后换一个案例检查规律是否还能成立。"
      howToTitle="先看清两条计算路径，再给结构起名字。"
      lessons={deepLearningLessons}
      modules={deepLearningModules}
      projectHeading="不是背诵模型名称，而是解剖一条完整的学习链。"
    />
  );
}
