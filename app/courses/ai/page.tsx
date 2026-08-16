import type { Metadata } from "next";
import { ArrowIcon } from "../../components/ArrowIcon";

export const metadata: Metadata = {
  title: "AI 入门课程",
  description: "从机器学习、深度学习到大语言模型与 AI Agent，沿着智能系统的生成关系逐层学习。",
};

const aiCourses = [
  {
    index: "01",
    title: "机器学习",
    question: "机器怎样从过去的案例中形成规则，并在新案例上检验它？",
    description:
      "从垃圾邮件过滤器出发，依次理解任务、样本、特征、训练、评估与泛化，再比较监督学习、无监督学习和强化学习。",
    lessons: "16 节",
    href: "/courses/ai/machine-learning",
    status: "完整教程",
  },
  {
    index: "02",
    title: "深度学习",
    question: "多层网络怎样形成表示，又怎样根据最终误差改变内部参数？",
    description:
      "从同一只猫的位置变化出发，跑通数字输入、前向传播、损失、梯度与反向传播，再解释卷积、循环和注意力为何适合不同数据关系。",
    lessons: "14 节",
    href: "/courses/ai/deep-learning",
    status: "完整教程",
  },
  {
    index: "03",
    title: "大语言模型",
    question: "预测下一个词元，怎样连续生成回答，并进一步接入检索与工具？",
    description:
      "从自动续写进入词元、上下文、注意力、预训练与生成控制，再比较提示、对齐、事实核验、检索和工具调用。",
    lessons: "15 节",
    href: "/courses/ai/large-language-models",
    status: "完整教程",
  },
  {
    index: "04",
    title: "AI Agent",
    question: "模型怎样把一次回答变成一连串可检查的行动？",
    description:
      "课程将展开目标、规划、记忆、工具、反馈与权限边界，重点观察任务如何被拆分、执行、检查和纠正。",
    lessons: "14 节",
    status: "大纲就绪",
  },
];

export default function AiCourseHubPage() {
  return (
    <>
      <section className="ai-hub-hero">
        <div className="site-container">
          <nav className="breadcrumb" aria-label="面包屑">
            <a href="/">知识解压</a>
            <span>/</span>
            <span>AI</span>
          </nav>
          <div className="ai-hub-hero-grid">
            <div>
              <p className="eyebrow">COURSE PATH · 3 COMPLETE / 4 TOTAL</p>
              <h1>AI</h1>
              <p className="ai-hub-lead">
                先看机器怎样从案例中形成规则，再进入多层网络怎样学习表示；之后才讨论语言模型如何生成，以及 Agent 如何把模型连接到工具与行动。
              </p>
            </div>
            <aside className="ai-hub-model">
              <p className="course-summary-label">板块主线</p>
              <p>
                AI 系统不是凭空“获得智能”。数据提供经验，目标或反馈指出改进方向，模型把经验组织成可复用的内部结构；当模型接入上下文、工具与执行循环，它才进一步从预测走向行动。
              </p>
            </aside>
          </div>
        </div>
      </section>

      <section className="ai-path-section section-pad-small">
        <div className="site-container">
          <div className="section-heading split-heading ai-path-heading">
            <div>
              <p className="eyebrow">RECOMMENDED PATH</p>
              <h2>四个问题，逐层深入。</h2>
            </div>
            <p>
              这是一条推荐路径，不是硬性前置。已有基础的读者可以直接进入任一课程，再沿课程中的概念链接补回缺失环节。
            </p>
          </div>

          <div className="ai-course-grid">
            {aiCourses.map((course) => {
              const card = (
                <article className={`ai-course-card${course.href ? " active" : ""}`}>
                  <div className="ai-course-meta">
                    <span>{course.index}</span>
                    <span>{course.lessons}</span>
                  </div>
                  <p className="ai-course-status">{course.status}</p>
                  <h3>{course.title}</h3>
                  <p className="ai-course-question">{course.question}</p>
                  <p className="ai-course-description">{course.description}</p>
                  <div className="ai-course-action">
                    {course.href ? "进入课程" : "暂未展开"}
                    {course.href && <ArrowIcon />}
                  </div>
                </article>
              );

              return course.href ? (
                <a className="ai-course-link" href={course.href} key={course.title}>
                  {card}
                </a>
              ) : (
                <div className="ai-course-link" key={course.title}>
                  {card}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
