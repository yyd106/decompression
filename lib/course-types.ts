export type Lesson = {
  slug: string;
  number: number;
  title: string;
  question: string;
  duration: string;
  opening: string[];
  sections: Array<{
    title: string;
    paragraphs: string[];
    bullets?: string[];
  }>;
  example: {
    title: string;
    intro: string;
    steps: Array<{ label: string; text: string }>;
    conclusion: string;
  };
  takeaway: string;
  exercise: {
    prompt: string;
    checks: string[];
  };
  terms: Array<{ term: string; definition: string }>;
};

export type CourseModule = {
  index: string;
  title: string;
  subtitle: string;
  range: readonly [number, number];
};

export type Course = {
  slug: string;
  title: string;
  eyebrow: string;
  question: string;
  model: string;
  duration: string;
  prerequisite: string;
  project: string;
};
