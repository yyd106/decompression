import { readFile, readdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(scriptDirectory, "..");
const curriculumRoot = path.join(projectRoot, "content", "curriculum");
const outputPath = path.join(projectRoot, "lib", "outline-catalog.generated.ts");

const disciplines = [
  { directory: "01-ai", slug: "ai", name: "AI" },
  { directory: "02-finance", slug: "finance", name: "金融" },
  { directory: "03-art", slug: "art", name: "艺术" },
  { directory: "04-humanities", slug: "humanities", name: "人文" },
  { directory: "05-language", slug: "language", name: "语言" },
];

const completeLessonSources = {
  "machine-learning": ["lib/ml-lessons-01-08.ts", "lib/ml-lessons-09-16.ts"],
  "deep-learning": ["lib/dl-lessons-01-07.ts", "lib/dl-lessons-08-14.ts"],
  "large-language-models": ["lib/llm-lessons-01-08.ts", "lib/llm-lessons-09-15.ts"],
};

function cleanValue(value) {
  return value.trim().replace(/\s{2,}$/u, "");
}

function stripTerminalPunctuation(value) {
  return cleanValue(value).replace(/[。；;]$/u, "");
}

function splitOutsideParentheses(value, separators) {
  const parts = [];
  let current = "";
  let depth = 0;

  for (const character of value) {
    if (character === "（" || character === "(") depth += 1;
    if (character === "）" || character === ")") depth = Math.max(0, depth - 1);

    if (depth === 0 && separators.has(character)) {
      if (cleanValue(current)) parts.push(stripTerminalPunctuation(current));
      current = "";
      continue;
    }

    current += character;
  }

  if (cleanValue(current)) parts.push(stripTerminalPunctuation(current));
  return parts;
}

function splitClauses(value) {
  const clauses = splitOutsideParentheses(value, new Set(["；", ";"]));
  return clauses.length > 0 ? clauses : [stripTerminalPunctuation(value)];
}

function splitConcepts(value) {
  const concepts = splitOutsideParentheses(value, new Set(["、"]));
  return concepts.length > 0 ? concepts : [stripTerminalPunctuation(value)];
}

function getSection(markdown, heading) {
  const lines = markdown.split(/\r?\n/u);
  const start = lines.findIndex((line) => line.trim() === `## ${heading}`);
  if (start === -1) throw new Error(`Missing section: ${heading}`);

  let end = lines.length;
  for (let index = start + 1; index < lines.length; index += 1) {
    if (/^##\s+/u.test(lines[index])) {
      end = index;
      break;
    }
  }

  return lines.slice(start + 1, end);
}

function getInlineField(lines, label) {
  const prefix = `- ${label}：`;
  const line = lines.find((candidate) => candidate.startsWith(prefix));
  if (!line) throw new Error(`Missing field: ${label}`);
  const value = cleanValue(line.slice(prefix.length));
  if (!value) throw new Error(`Field has no inline value: ${label}`);
  return value;
}

function getListField(lines, label, splitInline = splitClauses) {
  const prefix = `- ${label}：`;
  const index = lines.findIndex((candidate) => candidate.startsWith(prefix));
  if (index === -1) throw new Error(`Missing field: ${label}`);

  const inline = cleanValue(lines[index].slice(prefix.length));
  if (inline) return splitInline(inline);

  const values = [];
  for (let cursor = index + 1; cursor < lines.length; cursor += 1) {
    const line = lines[cursor];
    if (!line.trim()) {
      if (values.length > 0) break;
      continue;
    }

    if (/^-\s+[^：]+：/u.test(line)) break;

    const match = line.match(/^\s*-\s+(.+)$/u);
    if (!match) break;
    values.push(stripTerminalPunctuation(match[1]));
  }

  if (values.length === 0) throw new Error(`List field is empty: ${label}`);
  return values;
}

function getQuoteField(markdown, label) {
  const expression = new RegExp(`^> ${label}：(.+?)(?:\\s{2})?$`, "mu");
  const match = markdown.match(expression);
  if (!match) throw new Error(`Missing quoted field: ${label}`);
  return cleanValue(match[1]);
}

function parseLessons(lines, lessonSlugs) {
  const lessons = [];
  const headingPattern = /^### 第\s*(\d{2})\s*课(?:\u3000|\s+)(.+)$/u;

  for (let index = 0; index < lines.length; index += 1) {
    const heading = lines[index].match(headingPattern);
    if (!heading) continue;

    let end = lines.length;
    for (let cursor = index + 1; cursor < lines.length; cursor += 1) {
      if (headingPattern.test(lines[cursor])) {
        end = cursor;
        break;
      }
    }

    const number = Number(heading[1]);
    const body = lines.slice(index + 1, end);
    lessons.push({
      number,
      slug: lessonSlugs[number - 1] ?? `lesson-${String(number).padStart(2, "0")}`,
      title: cleanValue(heading[2]),
      question: getInlineField(body, "本节回答"),
      concepts: splitConcepts(getInlineField(body, "关键概念")),
      completion: getInlineField(body, "完成标志"),
    });
  }

  return lessons;
}

async function getCompleteLessonSlugs(courseSlug) {
  const sources = completeLessonSources[courseSlug];
  if (!sources) return [];

  const slugs = [];
  for (const source of sources) {
    const text = await readFile(path.join(projectRoot, source), "utf8");
    for (const match of text.matchAll(/\bslug:\s*["']([^"']+)["']/gu)) {
      slugs.push(match[1]);
    }
  }
  return slugs;
}

async function parseCourse(discipline, filename) {
  const sourcePath = path.join(curriculumRoot, discipline.directory, filename);
  const markdown = await readFile(sourcePath, "utf8");
  const titleMatch = markdown.match(/^# (.+?)：入门课程大纲$/mu);
  if (!titleMatch) throw new Error(`${filename}: invalid title`);

  const statedDiscipline = getQuoteField(markdown, "所属板块");
  if (statedDiscipline !== discipline.name) {
    throw new Error(`${filename}: discipline is ${statedDiscipline}, expected ${discipline.name}`);
  }

  const slug = filename.replace(/^\d+-/u, "").replace(/\.md$/u, "");
  const positioning = getSection(markdown, "课程定位");
  const learningMap = getSection(markdown, "学习地图")
    .map((line) => line.match(/^\d+\.\s+(.+)$/u)?.[1])
    .filter(Boolean)
    .map(stripTerminalPunctuation);
  const projectLines = getSection(markdown, "结课项目");
  const boundaryLines = getSection(markdown, "课程边界");
  const completeSlugs = await getCompleteLessonSlugs(slug);
  const lessons = parseLessons(getSection(markdown, "课程大纲"), completeSlugs);

  if (completeSlugs.length > 0 && completeSlugs.length !== lessons.length) {
    throw new Error(
      `${filename}: ${completeSlugs.length} complete lesson slugs for ${lessons.length} outline lessons`,
    );
  }

  return {
    disciplineSlug: discipline.slug,
    disciplineName: discipline.name,
    slug,
    title: titleMatch[1],
    duration: getQuoteField(markdown, "建议课时"),
    prerequisite: getQuoteField(markdown, "前置要求"),
    question: getInlineField(positioning, "核心问题"),
    model: getInlineField(positioning, "解压模型"),
    variables: getListField(positioning, "核心变量"),
    outcomes: getListField(positioning, "学完以后"),
    learningMap,
    lessons,
    project: {
      task: getInlineField(projectLines, "任务"),
      deliverables: getListField(projectLines, "交付物"),
      acceptance: getListField(projectLines, "验收标准"),
    },
    boundaries: {
      includes: getInlineField(boundaryLines, "本课包含"),
      excludes: getInlineField(boundaryLines, "本课暂不包含"),
      next: getInlineField(boundaryLines, "下一步"),
    },
    status: completeSlugs.length > 0 ? "complete" : "outline",
  };
}

function assertNonEmptyString(value, location) {
  if (typeof value !== "string" || value.trim() === "") {
    throw new Error(`${location} must be a non-empty string`);
  }
}

function assertNonEmptyStringArray(value, location) {
  if (!Array.isArray(value) || value.length === 0) {
    throw new Error(`${location} must be a non-empty array`);
  }
  value.forEach((item, index) => assertNonEmptyString(item, `${location}[${index}]`));
}

function validateCatalog(courses) {
  if (courses.length !== 18) throw new Error(`Expected 18 courses, found ${courses.length}`);

  const lessonCount = courses.reduce((sum, course) => sum + course.lessons.length, 0);
  if (lessonCount !== 265) throw new Error(`Expected 265 lessons, found ${lessonCount}`);

  const expectedDisciplineCounts = new Map([
    ["ai", 4],
    ["finance", 4],
    ["art", 4],
    ["humanities", 3],
    ["language", 3],
  ]);
  for (const [disciplineSlug, expectedCount] of expectedDisciplineCounts) {
    const actualCount = courses.filter(
      (course) => course.disciplineSlug === disciplineSlug,
    ).length;
    if (actualCount !== expectedCount) {
      throw new Error(
        `Expected ${expectedCount} ${disciplineSlug} courses, found ${actualCount}`,
      );
    }
  }

  const courseKeys = new Set();
  for (const course of courses) {
    const courseKey = `${course.disciplineSlug}/${course.slug}`;
    if (courseKeys.has(courseKey)) throw new Error(`Duplicate course: ${courseKey}`);
    courseKeys.add(courseKey);

    for (const field of [
      "disciplineSlug",
      "disciplineName",
      "slug",
      "title",
      "duration",
      "prerequisite",
      "question",
      "model",
      "status",
    ]) {
      assertNonEmptyString(course[field], `${courseKey}.${field}`);
    }

    assertNonEmptyStringArray(course.variables, `${courseKey}.variables`);
    assertNonEmptyStringArray(course.outcomes, `${courseKey}.outcomes`);
    assertNonEmptyStringArray(course.learningMap, `${courseKey}.learningMap`);
    assertNonEmptyString(course.project.task, `${courseKey}.project.task`);
    assertNonEmptyStringArray(course.project.deliverables, `${courseKey}.project.deliverables`);
    assertNonEmptyStringArray(course.project.acceptance, `${courseKey}.project.acceptance`);
    assertNonEmptyString(course.boundaries.includes, `${courseKey}.boundaries.includes`);
    assertNonEmptyString(course.boundaries.excludes, `${courseKey}.boundaries.excludes`);
    assertNonEmptyString(course.boundaries.next, `${courseKey}.boundaries.next`);

    const lessonSlugs = new Set();
    course.lessons.forEach((lesson, index) => {
      const expectedNumber = index + 1;
      if (lesson.number !== expectedNumber) {
        throw new Error(
          `${courseKey}: expected lesson ${expectedNumber}, found ${lesson.number}`,
        );
      }
      if (lessonSlugs.has(lesson.slug)) {
        throw new Error(`${courseKey}: duplicate lesson slug ${lesson.slug}`);
      }
      lessonSlugs.add(lesson.slug);
      assertNonEmptyString(lesson.slug, `${courseKey}.lessons[${index}].slug`);
      assertNonEmptyString(lesson.title, `${courseKey}.lessons[${index}].title`);
      assertNonEmptyString(lesson.question, `${courseKey}.lessons[${index}].question`);
      assertNonEmptyStringArray(lesson.concepts, `${courseKey}.lessons[${index}].concepts`);
      assertNonEmptyString(lesson.completion, `${courseKey}.lessons[${index}].completion`);
    });
  }

  const completeCourses = courses.filter((course) => course.status === "complete");
  if (completeCourses.length !== 3) {
    throw new Error(`Expected 3 complete courses, found ${completeCourses.length}`);
  }

  const completeLessonCount = completeCourses.reduce(
    (sum, course) => sum + course.lessons.length,
    0,
  );
  if (completeLessonCount !== 45) {
    throw new Error(`Expected 45 complete lessons, found ${completeLessonCount}`);
  }

  const outlineCourses = courses.filter((course) => course.status === "outline");
  const outlineLessonCount = outlineCourses.reduce(
    (sum, course) => sum + course.lessons.length,
    0,
  );
  if (outlineCourses.length !== 15 || outlineLessonCount !== 220) {
    throw new Error(
      `Expected 15 outline courses and 220 outline lessons, found ${outlineCourses.length} and ${outlineLessonCount}`,
    );
  }

  return { courses: courses.length, lessons: lessonCount, complete: completeCourses.length };
}

async function buildCatalog() {
  const courses = [];

  for (const discipline of disciplines) {
    const directory = path.join(curriculumRoot, discipline.directory);
    const filenames = (await readdir(directory))
      .filter((filename) => /^\d+-.+\.md$/u.test(filename))
      .sort();

    for (const filename of filenames) {
      courses.push(await parseCourse(discipline, filename));
    }
  }

  const summary = validateCatalog(courses);
  const generated = `// Generated by scripts/generate-outline-catalog.mjs. Do not edit directly.\n\nimport type { OutlineCourse, OutlineLesson } from "./outline-types";\n\nexport const outlineCourses: OutlineCourse[] = ${JSON.stringify(courses, null, 2)};\n\nexport function getCoursesForDiscipline(disciplineSlug: string): OutlineCourse[] {\n  return outlineCourses.filter((course) => course.disciplineSlug === disciplineSlug);\n}\n\nexport function getOutlineCourse(\n  disciplineSlug: string,\n  courseSlug: string,\n): OutlineCourse | undefined {\n  return outlineCourses.find(\n    (course) => course.disciplineSlug === disciplineSlug && course.slug === courseSlug,\n  );\n}\n\nexport function getOutlineLesson(\n  disciplineSlug: string,\n  courseSlug: string,\n  lessonSlug: string,\n): OutlineLesson | undefined {\n  return getOutlineCourse(disciplineSlug, courseSlug)?.lessons.find(\n    (lesson) => lesson.slug === lessonSlug,\n  );\n}\n`;

  await writeFile(outputPath, generated, "utf8");
  process.stdout.write(
    `Generated ${path.relative(projectRoot, outputPath)}: ${summary.courses} courses, ${summary.lessons} lessons, ${summary.complete} complete courses.\n`,
  );
}

await buildCatalog();
