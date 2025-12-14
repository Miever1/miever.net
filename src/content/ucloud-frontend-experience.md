---
slug: "/ucloud-frontend-experience"
date: "2025-11-24 16:00"
title: "Three Years as a Frontend Engineer at UCloud"
type: "blogs"
pinned: true
language: "en"
tags: ["Frontend Engineering", "Cloud Computing", "Work Experience"]
home_image: "https://miever.s3.ap-east-1.amazonaws.com/static/projects/ucloud/ucloud-1.webp"
description: "My three-year journey as a frontend engineer at UCloud, working on cloud console networking products, monitoring systems, and growing from a newcomer into a professional engineer."
---

# Three Years as a Frontend Engineer at UCloud

![UCloud](https://miever.s3.ap-east-1.amazonaws.com/static/projects/ucloud/ucloud-1.webp)

In this post, I want to share a part of my journey as a frontend engineer at UCloud. It is a record of what I worked on, what I learned, and how I grew within a large cloud console ecosystem.

UCloud is a neutral and security-focused cloud service provider, offering services across IaaS, PaaS, AI, and big data. Like most cloud companies, its console is one of the most critical products. Almost all cloud resources are created, configured, and managed through it. The console contains around one hundred different products, with compute, networking, and storage forming the core categories. During my time at UCloud, I mainly worked on networking-related products, as well as parts of the monitoring system on the frontend side.

The [UCloud Console](https://console.ucloud.cn) is built on a micro-frontend architecture, where a single host application mounts hundreds of sub-applications. The architecture itself is maintained by a dedicated platform team, but as a business frontend engineer, my daily work involved developing features, coordinating with other teams, and pushing releases within this framework. All UI components follow UCloud’s in-house design system, [UDesign](https://udesign.ucloud.cn), which ensures consistent interaction patterns and visual language across products. The main tech stack is React and TypeScript, supported by a highly automated CI/CD pipeline and gradual rollout process.

![UDesign](https://miever.s3.ap-east-1.amazonaws.com/static/projects/ucloud/ucloud-8.webp)

---

## Working on Core Networking Products

![Product Dashboard](https://miever.s3.ap-east-1.amazonaws.com/static/projects/ucloud/ucloud-2.webp)

I was responsible for several core networking products, including EIP, ULB, and VPC. These are some of the most frequently used and business-critical parts of the console. Among them, ULB, the load balancing product, stood out for its complexity. A single ULB instance may include listeners, backend resource pools, health checks, and multiple layers of configuration, all tightly coupled with each other. If anything goes wrong during the process, whether it is form validation, state handling, or an API call, the entire creation flow can fail.

Because of this, frontend work in this area was never just about rendering pages. It required a solid understanding of networking concepts, resource dependencies, and the underlying business model. Over time, I learned to think less about isolated pages and more about how different resources relate to each other within the system.

![Network Product](https://miever.s3.ap-east-1.amazonaws.com/static/projects/ucloud/ucloud-5.webp)

---

## Stability, Responsibility, and a Real Incident

Frontend development for cloud networking products comes with much higher pressure than typical B-side applications. Cloud services demand extremely high stability, and even small mistakes can affect a large number of enterprise users. When issues occur, the first step is always to identify where the problem lies. It could be frontend logic, backend behavior, or cross-product dependencies. After that, multiple teams often need to work together to resolve it. Even when the issue is not caused by the frontend, we still actively help push things forward, because from a user’s perspective, the only thing that matters is whether the service works.

Development also requires extra caution, because every operation in the console corresponds to real cloud resources and real costs. One incident that left a deep impression on me happened while I was working on the EIP creation flow. I missed a conditional check in the logic, which caused the creation API to be triggered repeatedly under certain conditions. Within a very short time, hundreds of EIPs were created, quickly consuming the balance of a test account. That experience made me fully realize how serious cloud resource operations are. Since then, I have been much more careful with workflow validation and edge-case handling.

---

## Component Reuse and Business Abstraction

As I took ownership of more networking products, I gradually noticed that many of them shared similar interaction patterns and resource models. For example, EIP binding logic appeared across instances, ULBs, and NAT gateways. Firewall configurations were reused by multiple products. Region, availability zone, and subnet selectors showed up in almost every networking workflow.

Problems in these shared components would not only affect a single product, but could also impact multiple sub-applications across the entire console. Because of this, I became especially cautious when designing, developing, and testing them. I paid close attention to consistency, clarity of logic, and edge cases.

Based on these shared patterns, I abstracted and maintained several reusable business components. This helped reduce repetitive work and made the experience more consistent across products. Over time, my focus shifted from simply completing individual features to understanding the broader networking product line and keeping interactions coherent across different products.

![Business Components](https://miever.s3.ap-east-1.amazonaws.com/static/projects/ucloud/ucloud-3.webp)

---

## Monitoring System Refactoring

In monitoring-related work, my main responsibility was refactoring and unifying frontend components. Monitoring capabilities require close collaboration across teams. Metric definitions, data structures, and API contracts are usually discussed and agreed on together by frontend and backend engineers. My role was to turn those agreements into a stable, extensible, and reusable monitoring component on the frontend.

![Monitoring Components](https://miever.s3.ap-east-1.amazonaws.com/static/projects/ucloud/ucloud-6.webp)

Monitoring metrics vary widely across products. Some focus on bandwidth, others on packet counts, disk read and write operations, or percentage-based indicators. To handle these differences, I designed a configurable data mapping and unit conversion mechanism based on shared interface conventions. This allowed different teams to integrate monitoring charts through configuration rather than rewriting formatting logic each time.

Chart rendering turned out to be one of the most fragile parts of monitoring. When monitoring is not enabled, data can be missing or structurally invalid, and charting libraries like ECharts may throw runtime errors that break the entire page. To prevent this, I introduced Error Boundaries in the monitoring components. This ensured that a single chart failure would not crash the whole page, and a fallback UI could be shown instead.

Monitoring pages often need to render many charts at the same time. I also worked on performance optimizations, reducing unnecessary re-renders, caching processed data, and updating only when needed. These changes helped keep the page responsive even under heavy rendering loads.

After refactoring, the monitoring components were reused across multiple product lines. This significantly reduced duplicated work and made the monitoring experience more consistent. It was much a cross-team effort, with interfaces and data definitions designed together and frontend responsibilities focused on maintainability and reliability.

---

## Honors, Mentorship, and Growth

During my time at UCloud, I tried to approach every requirement and detail seriously, aiming to make things a bit more stable and reliable each time. Through this long-term effort, I was honored multiple times as an Outstanding Employee, ranking within the top 10% company-wide in 2021 H1, 2021 H2, 2022 H2, and 2024 H1.

![Honors in UCloud](https://miever.s3.ap-east-1.amazonaws.com/static/blogs/ucloud-honor.webp)

These recognitions were not about doing one particular thing right. They were the result of continuous effort and steady improvement alongside the team. I was fortunate to work with leaders and senior engineers who knew how to guide newcomers and were genuinely willing to invest time and patience. When I first joined, I knew very little about real-world engineering and business. Over time, with their trust and support, I grew into someone who could independently handle complex modules and understand the system as a whole.

![Team in UCloud](https://miever.s3.ap-east-1.amazonaws.com/static/blogs/ucloud-team.webp)

The years I spent with the frontend team were the most dedicated, and honestly the happiest, period of my early career. We faced complex problems together and found real satisfaction in getting things right. Looking back now, these honors belong not only to me, but to the team that helped me grow from knowing almost nothing into a professional engineer.

---

## Closing Thoughts

This experience gave me a much deeper understanding of what frontend engineering means in the context of cloud products. It taught me how to reason about complex business models, how to maintain consistency at scale, and how to balance user experience with system stability. More importantly, it shaped the way I think about engineering as a long-term craft rather than just a set of tasks.

---

## Epilogue: Upon Leaving UCloud  
(Written on August 5, 2024)

> July 6, 2020 — August 5, 2024

![Office at UCloud](https://miever.s3.ap-east-1.amazonaws.com/static/blogs/ucloud-office.webp)

I still remember the nervousness of my campus interview, the novelty of my first day at work, and the small details of onboarding training. In what feels like a moment, four years passed, and it became time to say goodbye.

These four years were neither short nor long, but they left behind many meaningful memories. The first three years as a frontend engineer helped me transition from university to the workplace, slowly moving from uncertainty to a clearer understanding of engineering and responsibility. The following year in a business role gave me a different perspective and allowed me to meet many wonderful people.

Over time, I also spent a lot of effort reflecting on my own direction and what I truly want to pursue. Today, I am closing this chapter and preparing for the next one.

Looking back, the boat has already passed countless mountains.  
Looking ahead, the road is long, and it is bright.

Grateful for every encounter over these four years, and wishing all the best for the future.