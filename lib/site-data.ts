export type Discipline = {
  slug: string;
  name: string;
  index: string;
  question: string;
  model: string;
  courses: string[];
  accent: string;
};

export const disciplines: Discipline[] = [
  {
    slug: "ai",
    name: "AI",
    index: "01",
    question: "面对当前情况，机器凭什么决定下一步？",
    model:
      "机器只能根据它此刻能看到的信息、过去形成的规则和当前目标作出下一步判断。结果回来后，系统才能检查这一步是否有效，并决定继续、调整还是停止。",
    courses: ["机器学习", "深度学习", "大语言模型", "AI Agent"],
    accent: "sage",
  },
  {
    slug: "finance",
    name: "金融",
    index: "02",
    question: "人们怎样把资源交给别人或带到未来，并说清谁得到什么、谁承担损失？",
    model:
      "金融用一项项可以记录、转移和等待兑现的权利，安排资源在不同人和时间之间流动。看懂任何金融安排，只要追问：谁现在交出什么，谁在什么时候有权得到什么，这项权利怎样兑现，承诺落空时损失先落到谁身上。",
    courses: ["货币", "支付系统", "投资", "金融机构"],
    accent: "gold",
  },
  {
    slug: "art",
    name: "艺术",
    index: "03",
    question: "怎样用线索，引导别人的注意、理解和行动？",
    model:
      "创作者不能把感受或意图直接放进别人脑中，只能选择线索，并安排它们的关系和出现顺序。别人据此决定注意什么、怎样理解、下一步做什么；真实的观看、聆听和使用会检验这种安排是否奏效。",
    courses: ["音乐", "美术", "电影", "设计"],
    accent: "red",
  },
  {
    slug: "humanities",
    name: "人文",
    index: "04",
    question: "关于人和社会的说法，怎样才算站得住？",
    model:
      "人文不把直觉答案直接当成结论。它从人的言行和留下的材料出发，检查一种说法用了什么概念、理由和证据，能解释到哪里；遇到反例或新材料，就缩小或修改原来的说法。",
    courses: ["心理学", "哲学", "历史"],
    accent: "blue",
  },
  {
    slug: "language",
    name: "语言",
    index: "05",
    question: "人怎样用声音和文字，让别人重建自己脑中的意思？",
    model:
      "意思不能直接搬进另一个人的脑中。说话或写作的人只能留下声音、文字和场景线索，听或读的人再用这些线索重建意思；交流是否成功，要看对方重建出的内容是否接近原意，并用反馈继续校正。",
    courses: ["英语", "中文", "写作"],
    accent: "violet",
  },
];

export const courseStats = [
  { value: "5", label: "个学习板块" },
  { value: "18", label: "门入门课程" },
  { value: "265", label: "节课程大纲" },
];
