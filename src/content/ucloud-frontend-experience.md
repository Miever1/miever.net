---
slug: "/ucloud-frontend-experience"
date: "2025-11-24 16:00"
title: "Three Years as a Frontend Engineer at UCloud: Console, Network Products, and Monitoring Systems"
type: "blogs"
language: "en"
tags: ["Frontend Engineering", "Cloud Computing", "Work Experience"]
home_image: "https://miever.s3.ap-east-1.amazonaws.com/static/projects/ucloud/ucloud-1.webp"
description: "A record of my three-year experience as a frontend engineer at UCloud: developing network products, abstracting shared components, refactoring monitoring modules, and growing within a large cloud console ecosystem."
---

# Three Years as a Frontend Engineer at UCloud: Console, Network Products, and Monitoring Systems

![UCloud](https://miever.s3.ap-east-1.amazonaws.com/static/projects/ucloud/ucloud-1.webp)

Today, I’d like to briefly share my frontend development experience at UCloud and the main areas I worked on within the console ecosystem.

UCloud is a neutral and secure cloud computing service provider offering a full range of cloud services from IaaS and PaaS to AI and big data. As a cloud provider, the console is unquestionably one of its core products—nearly all cloud resources are managed through it. The entire console consists of around 100 product modules, with compute, network, and storage forming the core categories. I was mainly responsible for network-related products and part of the monitoring system’s frontend implementation.

The UCloud console (https://console.ucloud.cn) uses a micro-frontend architecture: one main application mounts hundreds of sub-applications. Although the architecture itself is maintained by a dedicated platform team, business-side frontend engineers must complete development, integration, and deployment within this ecosystem. All UI follows UCloud’s in-house design system, UDesign (https://udesign.ucloud.cn/), meaning each product must not only function correctly but also deliver consistent interaction patterns and visual style. The core tech stack is React and TypeScript, with a highly automated CI/CD and progressive deployment pipeline.

![UDesign](https://miever.s3.ap-east-1.amazonaws.com/static/projects/ucloud/ucloud-8.webp)

---

## 🌐 Responsible for Core Network Products: EIP / ULB / VPC

![Product Dashboard](https://miever.s3.ap-east-1.amazonaws.com/static/projects/ucloud/ucloud-2.webp)

I was responsible for several network products, including EIP, ULB, and VPC—some of the most frequently used and essential modules in the console. Products like ULB (load balancing) involve complex business logic: a single ULB may contain listeners, backend resource pools, health checks, and other hierarchical structures, all of which have strong dependencies. If any form validation or API call is incorrect, the entire creation workflow can fail. As a result, frontend engineers must handle complex data structures while also understanding the underlying business model, networking concepts, and resource relationships.

![Network Product](https://miever.s3.ap-east-1.amazonaws.com/static/projects/ucloud/ucloud-5.webp)

---

## ⚠️ High Stability Requirements & Real Incidents

Developing frontend for network-related cloud products is more stressful than typical B2B applications. Cloud services demand extremely high stability—small mistakes can impact many enterprise users. When incidents occur, we must quickly determine whether the issue originates from the frontend, backend, or cross-product dependencies, then collaborate with backend teams, SPT, and user support to resolve it. Even if the root cause lies outside frontend, we proactively drive the solution process—users only care whether it works.

Development requires equal caution because every operation in the console triggers real resources and incurs real costs. One memorable case occurred when I missed a conditional check during the EIP creation flow. As a result, the creation API was mistakenly triggered multiple times under certain conditions, creating over a hundred EIPs within seconds and consuming the test account’s balance. That incident made me fully aware of how critical cloud resource operations are, and since then I’ve become much more careful about process validation and edge-case handling.

---

## 🔧 Component Reuse & Business Abstraction

As I became responsible for more network products, I started summarizing shared patterns in their interactions and resource models. For example:

- **EIP binding logic** appears across hosts, ULB, NAT gateways, etc.  
- **Firewall component** is reused by multiple network products  
- **Region / Availability Zone / Subnet selectors** are used across nearly every network workflow  

These shared components affect not just my own products—any issue could impact multiple sub-applications across the entire console. Therefore, when designing, developing, and testing these components, I exercised extra caution to ensure consistent behavior, clear logic, and correct boundary handling.

Based on these patterns, I abstracted and maintained several reusable business components, reducing repetitive work and ensuring consistent cross-product experiences. This process shifted my focus from “implementing a product” toward “understanding the business model across the entire network product line and ensuring unified interactions among them.”

![Business Components](https://miever.s3.ap-east-1.amazonaws.com/static/projects/ucloud/ucloud-3.webp)

---

## 📊 Monitoring Component Refactoring: Unification, Reuse, and Performance Optimization

Within the monitoring domain, I was primarily responsible for refactoring and unifying frontend components. Monitoring requires collaboration across multiple teams: metric definitions, data structures, and API specifications are generally co-designed by frontend and backend engineers, while my responsibility was to turn these specifications into a stable, extensible, and reusable monitoring component.

![Monitoring Components](https://miever.s3.ap-east-1.amazonaws.com/static/projects/ucloud/ucloud-6.webp)

Monitoring metrics vary greatly across products, such as:

- Bandwidth (Kbps)
- Packet count (count/s)
- Disk read/write (Ops/s)
- Various percentage or multi-dimensional metrics

To adapt to different formats, I designed a **configurable data mapping and unit conversion system** based on a unified API contract. This allows different teams to integrate monitoring with simple configuration instead of repeatedly implementing formatting logic.

Chart rendering is the most error-prone part of monitoring. Since metric data may have missing fields, empty values, or invalid structure when monitoring isn’t enabled, charting libraries (like ECharts) can throw errors and break the entire page. To prevent this, I added an **Error Boundary** in the component layer, ensuring that a single chart failure would not crash the whole page and instead display fallback UI.

Monitoring pages often need to display many charts at once—bandwidth, packets, disk IO, read/write operations, etc. I optimized performance by reducing unnecessary re-renders, caching processed data, and updating only when needed, ensuring smooth performance despite heavy rendering loads.

The final refactored monitoring component was reused across multiple product lines, significantly reducing duplication and improving consistency. This project required close multi-team collaboration: API structure and definitions were co-designed by frontend and backend engineers, and I ensured maintainability, reliability, and reusability on the frontend.

---

## 🎯 Summary

This experience taught me a lot about the complexity and responsibility involved in cloud product frontend development:

- Understanding complex business models  
- Maintaining product consistency and long-term maintainability  
- Collaborating across teams, roles, and product domains  
- Balancing user experience with platform stability  

These challenges deepened my interest in B2B interaction design, design systems, and business modeling—and have continued to influence my career direction since.