export type Discipline = {
  slug: string;
  name: string;
  index: string;
  question: string;
  model: string;
  courses: string[];
  accent: string;
  active?: boolean;
};

export const disciplines: Discipline[] = [
  {
    slug: "ai",
    name: "AI",
    index: "01",
    question: "机器如何从经验中形成规律，并把规律用于预测、生成与行动？",
    model:
      "智能系统先把经验或当前状态表示成数据，再依据目标与反馈学习模型、调整行动。",
    courses: ["机器学习", "深度学习", "大语言模型", "AI Agent"],
    accent: "sage",
    active: true,
  },
  {
    slug: "finance",
    name: "金融",
    index: "02",
    question: "价值怎样跨主体、跨时间流动？风险又由谁承担？",
    model:
      "金融用账本记录当下权利，用契约分配未来现金流与风险，再用价格和机构协调资源。",
    courses: ["货币", "支付系统", "投资", "金融机构"],
    accent: "gold",
  },
  {
    slug: "art",
    name: "艺术",
    index: "03",
    question: "人怎样把内在体验，变成别人可以感知和重建的形式？",
    model:
      "艺术与设计在媒介和现实约束中选择、组织感知材料，让别人重建体验、关系或行动路径。",
    courses: ["音乐", "美术", "电影", "设计"],
    accent: "red",
  },
  {
    slug: "humanities",
    name: "人文",
    index: "04",
    question: "个人、观念与社会为什么会形成现在的样子？",
    model:
      "人文从证据出发，建立对心理、观念和社会变化的解释，再检验这些解释如何影响判断。",
    courses: ["心理学", "哲学", "历史"],
    accent: "blue",
  },
  {
    slug: "language",
    name: "语言",
    index: "05",
    question: "经验和意图，怎样跨越两个不同的大脑？",
    model:
      "语言把经验和意图编码成共享形式，接收者结合语境重建意义；写作则主动安排这条路径。",
    courses: ["英语", "中文", "写作"],
    accent: "violet",
  },
];

export const courseStats = [
  { value: "5", label: "个知识板块" },
  { value: "18", label: "门入门课程" },
  { value: "265", label: "节课程大纲" },
];
