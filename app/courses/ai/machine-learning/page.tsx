import type { Metadata } from "next";
import { CourseOverview } from "../../../components/CourseOverview";
import {
  courseModules,
  lessons,
  machineLearningCourse,
} from "../../../../lib/machine-learning";

export const metadata: Metadata = {
  title: "机器学习入门",
  description: "16 节课，从真实案例开始理解样本、训练、评估与泛化。",
};

export default function MachineLearningCoursePage() {
  return (
    <CourseOverview
      areaHref="/courses/ai"
      areaLabel="AI"
      course={machineLearningCourse}
      howToDescription="每节只回答一个主要问题：先看真实现象，再跑通案例、提取机制，最后用一个新判断检查自己是否真的会用。"
      howToTitle="不用先学公式，先让每个概念有来处。"
      lessons={lessons}
      modules={courseModules}
      projectHeading="不是做一次测验，而是亲手设计一个判断系统。"
    />
  );
}
