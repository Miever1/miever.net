/**
 * Structured, bilingual project case-study data — the single source of truth for
 * both the /projects listing and the per-project detail pages (/projects/<id>).
 *
 * Each prose field is bilingual ({ en, zh }); pages pick the active language with
 * the `pickLang` helper and fall back to English. Mirrors the resumeData pattern.
 *
 * Content is grounded in the résumé, the related blog posts and the live
 * projects — update facts/metrics here as they evolve.
 */

export interface Localized {
    en: string;
    zh: string;
}

const L = (en: string, zh: string): Localized => ({ en, zh });

export type Lang = "en" | "zh";

/** Pick the active language from a Localized value, falling back to English. */
export const pickLang = (value: Localized, lang: Lang): string => value[lang] || value.en;

/** Coarse domains used for filtering and the detail-page eyebrow. */
export type ProjectDomain = "ai" | "graphics" | "hci" | "frontend" | "design_system";

export interface ProjectLinks {
    /** Public live site / playable demo. */
    liveDemo?: string;
    /** Source repository. */
    github?: string;
    /** Internal long-form write-up (a /blogs/... slug). */
    relatedBlog?: string;
    /** External reference (e.g. a LinkedIn post) when there's no live site. */
    external?: string;
    /** Custom label for the external link (defaults to "View post"). */
    externalLabel?: Localized;
}

export interface ProjectCaseStudy {
    id: string;
    domain: ProjectDomain;
    /** Brand/title — Localized so non-brand titles translate. */
    title: Localized;
    subTitle: Localized;
    /** Short blurb shown on the listing card. */
    summary: Localized;
    /** My role on the project. */
    role: Localized;
    /** Free-form period/affiliation line, e.g. "Aalto University · 2024". */
    period: string;
    /** What it is / why it exists (the "Overview"). */
    context: Localized;
    /** The hard problem (the "Challenge"). */
    challenge: Localized;
    /** What I actually did, as scannable bullets (the "Approach"). */
    approach: Localized[];
    /** Result / impact (the "Outcome"). */
    outcome: Localized;
    tech: string[];
    links: ProjectLinks;
    /** Thumbnail switch key — matches ProjectThumb's StaticImage cases. */
    thumbId: string;
    /** Surfaced more prominently on the listing (and eligible for home). */
    featured?: boolean;
}

/**
 * Ordered strongest-first for an AI/graphics-leaning portfolio. The listing and
 * the prev/next detail navigation both follow this order.
 */
export const projects: ProjectCaseStudy[] = [
    {
        id: "huawei",
        domain: "graphics",
        title: L("Real-time 3D & AR at Huawei", "华为实时 3D 与 AR"),
        subTitle: L(
            "Turning a photo into a little 3D object with one tap",
            "一拍,就把照片变成一个小小的 3D 物件",
        ),
        summary: L(
            "A five-day hackathon project: take a photo, or pick one from your album, and turn it into a little 3D object you can save, share and play with. Built in React Native, and later rebuilt with ArkUI for my master's thesis.",
            "一个五天黑客松项目:拍一张照片,或从相册里选一张,把它变成一个能保存、分享、把玩的小 3D 物件。用 React Native 做的,后来在硕士毕业论文里又用 ArkUI 重新实现了一遍。",
        ),
        role: L(
            "Team lead, owning the concept and interaction design",
            "组长,负责概念和交互设计",
        ),
        period: "Huawei Finland TechArena · 2025",
        context: L(
            "At Huawei Finland's TechArena, a five-day hackathon, we started from a simple idea: what if you could take a photo of something you like and turn it into a tiny 3D object with one tap, then save it, share it, and play with it like a little digital toy?",
            "在华为芬兰 TechArena(一个五天的黑客松),我们从一个简单的想法出发:如果你能把喜欢的东西拍下来,一拍就变成一个小小的 3D 物件,还能保存、分享,像小玩具一样把玩,会怎么样?",
        ),
        challenge: L(
            "Getting from a rough idea to a working prototype in five days, and making 'one tap to 3D' feel simple and playful instead of technical. As an HCI student, the harder part for me was learning to think like a product person, not just an engineer.",
            "五天内把一个粗糙的想法做成能用的原型,还要让「一拍变 3D」感觉简单好玩,而不是很技术。作为 HCI 学生,对我更难的是学着像做产品的人那样思考,而不只是个工程师。",
        ),
        approach: [
            L(
                "Led the team from the idea to a working prototype, and owned the concept and interaction design.",
                "带着团队从想法做到能用的原型,负责概念和交互设计。",
            ),
            L(
                "Built the app in React Native, turning a chosen photo into a small 3D object you can view and play with in AR.",
                "用 React Native 做出应用,把选中的照片变成一个能在 AR 里查看、把玩的小 3D 物件。",
            ),
            L(
                "Kept the focus on the product and the experience, with teammates who kept pushing us toward a simpler, friendlier design.",
                "始终盯着产品和体验,队友也一直推着我们往更简单、更友好的方向走。",
            ),
        ],
        outcome: L(
            "We won first place at Huawei Finland TechArena 2025. I later rebuilt the idea with ArkUI as part of my master's thesis.",
            "拿了华为芬兰 TechArena 2025 冠军。后来我在硕士毕业论文里用 ArkUI 把这个想法又实现了一遍。",
        ),
        tech: ["React Native", "AR", "Real-time 3D", "ArkUI"],
        links: {
            external:
                "https://www.linkedin.com/posts/aerman-huofuer-413328280_hackathon-huawei-huaweitecharena-activity-7401337849121599489-0lKg",
            externalLabel: L("See the post", "查看动态"),
        },
        thumbId: "huawei",
        featured: true,
    },
    {
        id: "ai_game",
        domain: "ai",
        title: L("Caster AI", "Caster AI"),
        subTitle: L(
            "Synthetic playtesting with AI player personas",
            "用 AI 玩家人格做的合成玩测",
        ),
        summary: L(
            "Watch one gameplay clip through four different AI player personas, each reacting in its own way, using GPT-4o-mini and ElevenLabs voices.",
            "用四个不同的 AI 玩家人格看同一段游戏录像,每个都有自己的反应,背后是 GPT-4o-mini 和 ElevenLabs 语音。",
        ),
        role: L(
            "Solo project: concept, full-stack and AI integration",
            "独立完成:概念、全栈和 AI 集成",
        ),
        period: "The Startup Hack · 2026",
        context: L(
            "Playtesting is expensive. Caster AI tries a cheaper version: give a gameplay video to a few LLM-driven player personas and hear, out loud, how different kinds of players might react as it plays.",
            "玩测很花钱。Caster AI 试了个更便宜的办法:把游戏视频交给几个 LLM 驱动的玩家人格,让它们边看边出声说出不同玩家可能会有的反应。",
        ),
        challenge: L(
            "Turning raw video into timed, in-character spoken reactions meant juggling the visual context, prompts that keep each persona consistent, and fast text-to-speech, all inside a 24-hour hackathon.",
            "把原始视频变成定时、有人设、能开口的反应,要同时搞定视觉上下文、让人设保持一致的 prompt,还有够快的 TTS,而且都得在 24 小时黑客松里做完。",
        ),
        approach: [
            L(
                "Wrote four distinct player personas and the prompts that keep each one in character through a clip.",
                "写了四个不同的玩家人格,以及能让它们在整段录像里保持人设的 prompt。",
            ),
            L(
                "Used GPT-4o-mini to generate each persona's reactions from the video and lined them up with the timeline.",
                "用 GPT-4o-mini 从视频生成每个人格的反应,并对齐到时间轴。",
            ),
            L(
                "Gave each persona a voice with ElevenLabs and built a React front end that plays the reactions over the clip.",
                "用 ElevenLabs 给每个人格配音,再用 React 做了个前端,在录像上叠着播反应。",
            ),
        ],
        outcome: L(
            "It won first place at The Startup Hack, and you can try the live demo in your browser.",
            "拿了 The Startup Hack 冠军,现在也能在浏览器里直接试玩。",
        ),
        tech: ["LLM (GPT-4o-mini)", "TTS (ElevenLabs)", "React", "Node.js"],
        links: {
            liveDemo: "https://caster-ai.miever.net/",
            github: "https://github.com/Miever1/caster-ai",
        },
        thumbId: "ai_game",
        featured: true,
    },
    {
        id: "mindflow",
        domain: "hci",
        title: L("MindFlow", "MindFlow"),
        subTitle: L(
            "An AI task planner that looks after your well-being",
            "会照顾你身心状态的 AI 任务规划",
        ),
        summary: L(
            "An AI task planner with mental-health tracking built in, taken from user research all the way to a high-fidelity prototype we usability-tested.",
            "一个内建心理状态追踪的 AI 任务规划工具,从用户研究一直做到经过可用性测试的高保真原型。",
        ),
        role: L(
            "HCI design and prototyping, on a team",
            "HCI 设计与原型(团队项目)",
        ),
        period: "Aalto University · 2024–2025",
        context: L(
            "Most productivity tools push output and ignore how you actually feel. MindFlow started from a simple question: what would a planner look like if well-being mattered as much as the to-do list?",
            "大多数效率工具只顾产出,不太管你实际感受如何。MindFlow 从一个简单的问题出发:如果身心状态和待办清单一样重要,规划工具会长成什么样?",
        ),
        challenge: L(
            "Two goals that often pull against each other: getting things done and protecting well-being. And then checking the design actually helped real people, rather than adding one more thing to worry about.",
            "两个常常互相拉扯的目标:把事做完,和保护身心状态。还要验证这个设计真的帮到了人,而不是又多添一份压力。",
        ),
        approach: [
            L(
                "Ran interviews and built personas so the problem stayed grounded in real behaviour and needs.",
                "做了访谈、建了人物画像,让问题扎根在真实的行为和需求上。",
            ),
            L(
                "Designed an AI planning flow that adjusts the day's task load to the user's tracked mental state.",
                "设计了一套 AI 规划流程,根据用户记录的心理状态调整当天的任务量。",
            ),
            L(
                "Built a high-fidelity Figma prototype, ran usability testing, and iterated on what we found.",
                "用 Figma 做了高保真原型,跑了可用性测试,再照结果迭代。",
            ),
        ],
        outcome: L(
            "We ended up with a validated high-fidelity prototype and a full HCI write-up, which is on the blog.",
            "最后做出了经过验证的高保真原型,还有一篇完整的 HCI 记录,发在了博客上。",
        ),
        tech: ["HCI", "User Research", "Figma", "AI"],
        links: { relatedBlog: "/blogs/ai-smart-planner-hci-project-journey/" },
        thumbId: "mindflow",
    },
    {
        id: "vr_worlds",
        domain: "graphics",
        title: L("VR Worlds at Aalto", "Aalto VR 世界"),
        subTitle: L("Unity VR built around interaction and presence", "围绕交互和临场感做的 Unity VR"),
        summary: L(
            "A set of small VR projects built in Unity for Aalto's Coding Virtual Worlds course, focused on interaction, presence and playful mechanics.",
            "为 Aalto《Coding Virtual Worlds》课用 Unity 做的一组 VR 小项目,聚焦交互、临场感和好玩的机制。",
        ),
        role: L("Designer and developer, course projects", "设计与开发(课程项目)"),
        period: "Aalto University · 2024",
        context: L(
            "In VR, feel is everything. These small projects were a hands-on way to figure out what makes interaction in a virtual world feel real and fun.",
            "在 VR 里,「手感」几乎就是全部。这些小项目是动手去摸索:虚拟世界里的交互怎样才真实、才好玩。",
        ),
        challenge: L(
            "Designing interactions that feel natural in 3D space, comfortable, clear and responsive, while learning Unity and the constraints of VR at the same time.",
            "在 3D 空间里设计自然的交互,要舒服、清楚、跟手,同时还在现学 Unity 和 VR 的各种限制。",
        ),
        approach: [
            L(
                "Built several Unity/C# VR experiences to try out grabbing, moving around and playful mechanics.",
                "用 Unity/C# 做了几个 VR 体验,试了抓取、移动和一些好玩的机制。",
            ),
            L(
                "Iterated on interaction and presence, tuning the feedback so actions read clearly in the headset.",
                "围绕交互和临场感反复调,把反馈调到在头显里一眼就能看懂。",
            ),
            L(
                "Looked back at what worked and what broke the immersion, and wrote it up.",
                "复盘了哪些有效、哪些破坏了沉浸感,并写成了记录。",
            ),
        ],
        outcome: L(
            "A handful of working VR prototypes and a reflective write-up about coding virtual worlds.",
            "几个能跑的 VR 原型,和一篇关于「写虚拟世界」的复盘。",
        ),
        tech: ["Unity", "C#", "VR", "Interaction Design"],
        links: { relatedBlog: "/blogs/coding-virtual-worlds-vr-projects/" },
        thumbId: "vr_worlds",
    },
    {
        id: "ucloud_console",
        domain: "frontend",
        title: L("UCloud Cloud Console", "UCloud 云控制台"),
        subTitle: L(
            "Front-end for a large-scale cloud console",
            "大型云控制台前端",
        ),
        summary: L(
            "Three years of front-end work on UCloud's console, across networking products, monitoring components and keeping things consistent at scale.",
            "在 UCloud 控制台做了三年前端,涉及云网络产品、监控组件,以及在规模下保持一致性。",
        ),
        role: L("Front-End Engineer", "前端工程师"),
        period: "Shanghai UCloud · 2020–2023",
        context: L(
            "A public-cloud console is a huge product: dozens of services, each with dense, data-heavy screens that operators use every day. Consistency and stability matter as much as features.",
            "公有云控制台是个很大的产品:几十个服务,每个都是运维每天都在用的、数据密集的复杂界面。一致性和稳定性和功能一样重要。",
        ),
        challenge: L(
            "Shipping and maintaining a lot of data-heavy interfaces across more than ten networking products, without letting quality, consistency or release stability slip.",
            "在十几个云网络产品上交付和维护大量数据密集的界面,同时不让质量、一致性和发布稳定性掉下去。",
        ),
        approach: [
            L(
                "Built and maintained the React front-end for more than ten networking products, including UNet, VPC and ULB.",
                "用 React 开发和维护了十几个云网络产品的前端,比如 UNet、VPC、ULB。",
            ),
            L(
                "Fixed critical bugs in the release cycle, which made the platform more stable and nicer to use.",
                "解决了发布周期里的关键 bug,让平台更稳、也更好用。",
            ),
            L(
                "Worked with other teams on features, UX and API reviews, and paying down tech debt.",
                "和其他团队一起做功能、评审 UX 和 API,并偿还技术债。",
            ),
        ],
        outcome: L(
            "I was rated 'Outstanding Employee' (top 10%) in four reviews over the three years.",
            "三年里四次绩效都被评为「优秀员工」(前 10%)。",
        ),
        tech: ["React", "TypeScript", "Monitoring", "Data-dense UI"],
        links: { relatedBlog: "/blogs/ucloud-frontend-experience/" },
        thumbId: "ucloud_console",
    },
    {
        id: "miever_ui",
        domain: "design_system",
        title: L("Miever UI", "Miever UI"),
        subTitle: L("My own React component library", "我自己的 React 组件库"),
        summary: L(
            "A React component library I built for my own projects: reusable, themeable, accessible components, published to npm.",
            "为自己的项目做的 React 组件库:可复用、可换肤、可访问的组件,发布到了 npm。",
        ),
        role: L("Solo: design, build and release", "独立完成:设计、开发和发布"),
        period: "2023 – present",
        context: L(
            "Rebuilding the same buttons, modals and inputs for every project got old. Miever UI is my own design system, one consistent, well-tested toolkit I can drop into anything.",
            "每个项目都重写一遍按钮、弹窗、输入框太烦了。Miever UI 是我自己的设计系统,一套一致、测试到位、能随手接进任何项目的工具箱。",
        ),
        challenge: L(
            "Making a library that's actually reusable: ESM and CJS builds, full TypeScript types, theming, accessibility, and a release process I trust enough to publish in public.",
            "做一个真的能复用的库:ESM 和 CJS 两种产物、完整的 TypeScript 类型、主题、可访问性,还有一套我敢公开发布的发布流程。",
        ),
        approach: [
            L(
                "Built the components with React and Vite's library mode, shipping ESM and CJS bundles with generated TypeScript types.",
                "用 React 和 Vite 的库模式做组件,产出 ESM 和 CJS 包,以及自动生成的 TypeScript 类型。",
            ),
            L(
                "Wired accessibility through everything, including focus management, ARIA and focus-visible, and covered the components with tests.",
                "把可访问性做进了每个组件,包括焦点管理、ARIA 和 focus-visible,并给组件写了测试。",
            ),
            L(
                "Published to npm with Trusted Publishing (OIDC) and documented the components in Storybook.",
                "用 Trusted Publishing(OIDC)发布到 npm,并用 Storybook 写了组件文档。",
            ),
        ],
        outcome: L(
            "It's on npm, and I used it to build this site, so it's a design system I actually run on.",
            "已经发到 npm 上,而且这个网站就是用它搭的,算是我真的在用的设计系统。",
        ),
        tech: ["React", "Vite", "TypeScript", "Storybook"],
        links: {
            liveDemo: "https://components.miever.net",
            github: "https://github.com/Miever1/miever_ui",
        },
        thumbId: "miever_ui",
    },
    {
        id: "miever_net",
        domain: "frontend",
        title: L("Miever.net", "Miever.net"),
        subTitle: L("My personal site, built on Miever UI", "用 Miever UI 搭的个人网站"),
        summary: L(
            "This site: a bilingual, themeable Gatsby portfolio, and a real product I keep working on to try out what I learn.",
            "就是这个网站:一个双语、可换肤的 Gatsby 作品集,也是我一直在做、用来实践所学的产品。",
        ),
        role: L("Solo: design, build and ops", "独立完成:设计、开发和运维"),
        period: "2022 – present",
        context: L(
            "A portfolio shouldn't only describe my work, it should be part of it. This site is where I take an idea from design through build, deploy, and seeing how it does.",
            "作品集不该只是「描述」我的工作,它本身就该是其中一部分。这个网站就是我把一个想法从设计做到上线、再看它表现如何的地方。",
        ),
        challenge: L(
            "Building a content-heavy site that stays fast, accessible, bilingual and themeable, and keeping it maintainable as it grows.",
            "做一个内容不少、又要快、可访问、双语、可换肤的网站,并在它越长越大时保持可维护。",
        ),
        approach: [
            L(
                "Built on Gatsby 5 with a markdown pipeline for blogs and designs, responsive WebP images and SEO and structured data.",
                "基于 Gatsby 5,用 markdown 管线做博客和设计,配响应式 WebP 图片和 SEO/结构化数据。",
            ),
            L(
                "Added client-side EN/ZH i18n, light and dark themes and accessibility throughout, all on my own Miever UI.",
                "加了客户端中英 i18n、深浅色主题和全站可访问性,全部基于自研的 Miever UI。",
            ),
            L(
                "Deployed on AWS and watched performance with Lighthouse and Datadog.",
                "部署在 AWS,用 Lighthouse 和 Datadog 盯着性能。",
            ),
        ],
        outcome: L(
            "A live product I keep shipping to, and the site you're reading this on.",
            "一个我一直在更新的上线产品,也就是你现在正在看的这个网站。",
        ),
        tech: ["Gatsby", "React", "TypeScript", "AWS"],
        links: {
            liveDemo: "https://miever.net",
            github: "https://github.com/Miever1/miever.net",
        },
        thumbId: "miever_net",
    },
    {
        id: "news_project",
        domain: "frontend",
        title: L("News Project", "News 项目"),
        subTitle: L(
            "A news app in Angular, then Electron",
            "先 Angular、后 Electron 的新闻应用",
        ),
        summary: L(
            "A news app with listing, filtering and management, first a web app in Angular and later a desktop app with Electron.",
            "一个能列表、筛选、管理的新闻应用,先是 Angular 的 Web 应用,后来用 Electron 做成了桌面应用。",
        ),
        role: L("Solo build", "独立完成"),
        period: "2019",
        context: L(
            "An early project to learn a second framework end to end, and to see how the same app stretches from the browser to the desktop.",
            "一个早期项目,用来端到端学第二个框架,也看看同一个应用怎么从浏览器延伸到桌面。",
        ),
        challenge: L(
            "Structuring a real app in Angular, then repackaging it to run natively without rewriting the core.",
            "用 Angular 把一个真实应用搭起来,再在不重写核心的前提下重新打包成原生桌面运行。",
        ),
        approach: [
            L(
                "Built article listing, filtering and management as an Angular single-page app.",
                "用 Angular 单页应用实现文章列表、筛选与管理。",
            ),
            L(
                "Wrapped it with Electron to ship the same codebase as a desktop application.",
                "用 Electron 封装,让同一套代码以桌面应用形式交付。",
            ),
        ],
        outcome: L(
            "A working news app that runs both in the browser and as a native desktop build.",
            "一个既能在浏览器、又能作为原生桌面构建运行的新闻应用。",
        ),
        tech: ["Angular", "Electron", "TypeScript"],
        links: {
            liveDemo: "https://news.miever.net",
            github: "https://github.com/Miever1/news-manager",
        },
        thumbId: "news_project",
    },
];

/** i18n key per domain, for the listing filter chips and detail eyebrow. */
export const DOMAIN_KEYS: Record<ProjectDomain, string> = {
    ai: "project_domain_ai",
    graphics: "project_domain_graphics",
    hci: "project_domain_hci",
    frontend: "project_domain_frontend",
    design_system: "project_domain_design_system",
};

/** Display order of domain filters. */
export const DOMAIN_ORDER: ProjectDomain[] = [
    "ai",
    "graphics",
    "hci",
    "frontend",
    "design_system",
];

/** Look up a single project by id (used by the detail template). */
export const getProject = (id: string): ProjectCaseStudy | undefined =>
    projects.find((p) => p.id === id);

/** Map a related-blog slug back to its project (used by blog detail pages). */
export const getProjectByBlogSlug = (slug: string): ProjectCaseStudy | undefined => {
    const norm = (s: string) => s.replace(/\/+$/, "");
    return projects.find(
        (p) => p.links.relatedBlog && norm(p.links.relatedBlog).endsWith(norm(slug)),
    );
};
