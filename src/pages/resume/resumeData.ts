/**
 * Structured résumé content, mirrored from the canonical PDF. Each prose field
 * is bilingual ({ en, zh }); the page picks the active language and falls back
 * to English. Update here — the native résumé page renders from this data.
 */

export interface Localized {
    en: string;
    zh: string;
}

const L = (en: string, zh: string): Localized => ({ en, zh });

export const profile = {
    name: "Aerman Huofuer",
    role: L("Front-End Engineer", "前端工程师"),
    location: L("Helsinki, Finland", "芬兰 · 赫尔辛基"),
    email: "aerman.huofuer@gmail.com",
    website: "https://miever.net/",
    linkedin: "https://www.linkedin.com/in/aerman-huofuer-413328280/",
    github: "https://github.com/Miever1",
    pdf: {
        en: "https://miever.s3.ap-east-1.amazonaws.com/static/resume/miever.pdf",
        zh: "https://miever.s3.ap-east-1.amazonaws.com/static/resume/miever-zh.pdf",
    },
    summary: L(
        "Front-end engineer with 4+ years of hands-on experience building scalable cloud platforms and component-based UI systems, specialised in React and TypeScript. Currently pursuing a dual master's in Human-Computer Interaction through EIT Digital at Aalto University and UPM. Seeking front-end roles in Europe, bringing strong engineering skills and a user-centred approach to accessible, scalable web applications.",
        "前端工程师，4 年以上构建可扩展云平台与组件化 UI 系统的实战经验，专注 React 与 TypeScript。目前通过 EIT Digital 在 Aalto University 与 UPM 攻读人机交互（HCI）双学位硕士。正在欧洲寻找前端岗位，以扎实的工程能力与以人为本的设计思维，打造可访问、可扩展的 Web 应用。"
    ),
};

export interface EducationItem {
    degree: Localized;
    org: Localized;
    note: Localized;
    period: string;
}

export const education: EducationItem[] = [
    {
        degree: L(
            "M.Sc., Human-Computer Interaction & Design",
            "人机交互与设计 硕士"
        ),
        org: L("Aalto University · UPM Madrid (EIT Digital)", "Aalto University · UPM 马德里（EIT Digital）"),
        note: L("EIT Digital Scholarship recipient", "EIT Digital 奖学金获得者"),
        period: "2024 – 2026",
    },
    {
        degree: L("B.Sc., Computer Science & Technology", "计算机科学与技术 学士"),
        org: L(
            "Nanjing University of Aeronautics and Astronautics",
            "南京航空航天大学"
        ),
        note: L("Second-Class Scholarship · Outstanding Student Leader", "二等奖学金 · 优秀学生干部"),
        period: "2016 – 2020",
    },
];

export interface SkillGroup {
    label: Localized;
    items: string[];
}

export const skills: SkillGroup[] = [
    {
        label: L("Languages & Markup", "语言与标记"),
        items: ["HTML5", "CSS3 / SCSS", "JavaScript (ES6+)", "TypeScript"],
    },
    {
        label: L("Frameworks & Libraries", "框架与库"),
        items: ["React", "NestJS", "Gatsby", "Chakra UI"],
    },
    {
        label: L("Tooling & Testing", "工具与测试"),
        items: ["Git", "Jest", "ESLint", "Figma", "GitHub Actions", "Storybook"],
    },
    {
        label: L("Cloud & DevOps", "云与 DevOps"),
        items: ["AWS", "Nginx", "CI/CD"],
    },
];

export interface ExperienceItem {
    company: Localized;
    title: Localized;
    period: string;
    location: Localized;
    highlights: Localized[];
}

export const experience: ExperienceItem[] = [
    {
        company: L("Shanghai UCloud Technology Co., Ltd", "上海优刻得科技股份有限公司"),
        title: L("Front-End Engineer", "前端工程师"),
        period: "Jul 2020 – May 2023",
        location: L("Shanghai", "上海"),
        highlights: [
            L(
                "Recognised as “Outstanding Employee” (Top 10%) across four performance reviews.",
                "四次绩效评估获评「优秀员工」（前 10%）。"
            ),
            L(
                "Built and maintained front-end modules for 10+ cloud networking products (UNet, VPC, ULB) in React.",
                "用 React 开发并维护 10+ 云网络产品（UNet、VPC、ULB）的前端模块。"
            ),
            L(
                "Resolved critical release-cycle bugs, improving platform stability and UX.",
                "解决发布周期中的关键缺陷，提升平台稳定性与用户体验。"
            ),
            L(
                "Partnered with cross-functional teams on features, UX/API reviews and tech-debt reduction.",
                "与跨职能团队协作交付功能、评审 UX/API 规范并降低技术债。"
            ),
        ],
    },
];

export const internships: ExperienceItem[] = [
    {
        company: L("Huawei Suomi (Finland)", "华为芬兰研究所"),
        title: L("Graphics Intern", "图形学实习生"),
        period: "Feb 2026 – Present",
        location: L("Helsinki, Finland", "芬兰 · 赫尔辛基"),
        highlights: [
            L(
                "Built a 2D-to-3D photo-album prototype with ArkUI and the Huawei AR Engine for interactive 3D visualisation.",
                "用 ArkUI 与华为 AR Engine 构建 2D 转 3D 相册原型，实现交互式三维可视化。"
            ),
            L(
                "Exploring AI upscaling and artifact reduction for impostor rendering, weighing memory against quality.",
                "探索基于 AI 的超分与去伪影（impostor 渲染），权衡显存与画质。"
            ),
        ],
    },
    {
        company: L("Ericsson (China) Communications Co., Ltd.", "爱立信（中国）通信有限公司"),
        title: L("Front-End Engineer (Intern)", "前端工程师（实习）"),
        period: "Oct 2019 – Apr 2020",
        location: L("Nanjing, China", "中国 · 南京"),
        highlights: [
            L(
                "Developed core front-end modules for the IMA system in React.",
                "用 React 开发 IMA 系统的前端核心模块。"
            ),
            L(
                "Integrated RESTful APIs with the backend team and optimised data flow.",
                "与后端团队对接 RESTful API 并优化数据流。"
            ),
        ],
    },
];

export interface AwardItem {
    title: Localized;
    event: Localized;
    period: string;
    note: Localized;
}

export const awards: AwardItem[] = [
    {
        title: L("First Place, Huawei Finland TechArena 2025", "华为芬兰 TechArena 2025 冠军"),
        event: L("Huawei Finland Research Center", "华为芬兰研究中心"),
        period: "Dec 2025",
        note: L(
            "Team lead. Guided the team from concept to a 3D interactive prototype, focused on UX and interaction design.",
            "担任组长，带队从概念走到 3D 交互原型，聚焦用户体验与交互设计。"
        ),
    },
    {
        title: L("First Place, The Startup Hack", "The Startup Hack 冠军"),
        event: L("24-hour hackathon", "24 小时黑客松"),
        period: "Apr 2026",
        note: L(
            "Built an AI-powered gameplay-analysis prototype in 24 hours, generating multi-persona player reactions from video with LLMs and TTS.",
            "24 小时内做出 AI 游戏体验分析原型：用 LLM + TTS 从视频生成多人格玩家反应。"
        ),
    },
];

export interface ProjectItem {
    name: Localized;
    period: string;
    link?: string;
    points: Localized[];
}

export const projects: ProjectItem[] = [
    {
        name: L("Miever UI, a React component library", "Miever UI，React 组件库"),
        period: "2024 – Present",
        link: "https://components.miever.net",
        points: [
            L(
                "A published component library with a unified design-token system, theming, dark mode and Storybook docs.",
                "已发布的组件库，具备统一设计 token 体系、主题定制、暗色模式与 Storybook 文档。"
            ),
        ],
    },
    {
        name: L("Monitoring & micro-frontend platform", "监控与微前端平台"),
        period: "2022 – 2023",
        points: [
            L(
                "Built a micro-frontend shell for a multi-cloud control system, embedding Grafana and visualising topology with AntV G6.",
                "为多云管控系统搭建微前端框架，嵌入 Grafana，并用 AntV G6 可视化产品拓扑。"
            ),
        ],
    },
    {
        name: L("Personal website (miever.net)", "个人网站（miever.net）"),
        period: "2022 – Present",
        link: "https://miever.net/",
        points: [
            L(
                "Gatsby + React site on a custom UI library, with a GitHub Actions CI/CD pipeline and AWS (S3, CloudFront, Route 53) delivery.",
                "基于自研 UI 库的 Gatsby + React 站点，配 GitHub Actions CI/CD 流水线与 AWS（S3、CloudFront、Route 53）分发。"
            ),
        ],
    },
];

export interface LanguageItem {
    name: Localized;
    level: Localized;
}

export const languages: LanguageItem[] = [
    { name: L("English", "英语"), level: L("Professional working proficiency", "专业工作能力") },
    { name: L("Chinese", "中文"), level: L("Native", "母语") },
    { name: L("Uyghur", "维吾尔语"), level: L("Native", "母语") },
];

export const labels = {
    summary: L("Summary", "简介"),
    experience: L("Experience", "工作经历"),
    internships: L("Internships", "实习经历"),
    awards: L("Awards", "获奖"),
    projects: L("Selected Projects", "精选项目"),
    education: L("Education", "教育背景"),
    skills: L("Skills", "技能"),
    languages: L("Languages", "语言"),
    download: L("Download PDF", "下载 PDF"),
};
