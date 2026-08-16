export type OutlineLesson = {
  number: number;
  slug: string;
  title: string;
  question: string;
  concepts: string[];
  completion: string;
};

export type OutlineProject = {
  task: string;
  deliverables: string[];
  acceptance: string[];
};

export type OutlineBoundaries = {
  includes: string;
  excludes: string;
  next: string;
};

export type OutlineCourseStatus = "complete" | "outline";

export type OutlineCourse = {
  disciplineSlug: string;
  disciplineName: string;
  slug: string;
  title: string;
  duration: string;
  prerequisite: string;
  question: string;
  model: string;
  variables: string[];
  outcomes: string[];
  learningMap: string[];
  lessons: OutlineLesson[];
  project: OutlineProject;
  boundaries: OutlineBoundaries;
  status: OutlineCourseStatus;
};
