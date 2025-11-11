---
slug: "/from-code-to-cloud-personal-site-deployment-pipeline-zh"
date: "2025-10-30 21:00"
title: "从代码到云端：我的个人网站端到端部署概览"
type: "blogs"
language: "zh"
tags: [网站架构, CI/CD, 性能优化, DevOps]
home_image: "https://miever.s3.ap-east-1.amazonaws.com/static/blogs/from-code-to-cloud.webp"
description: 深入解析 miever.net 的架构设计、CI/CD 流程与性能检查。这是一个基于 React、Gatsby、AWS 与 GitHub Actions 构建的自动化、可监控且可扩展的个人网站。
---

# 从代码到云端：我的个人网站端到端部署流水线

## 为什么要做这个项目

作为一名开发者，我想要的不只是一个静态作品集。我希望我的网站能体现我在现代 Web 工程上的思考方式——自动化、可扩展、并且可持续监控。  
于是我构建了 **[miever.net](https://miever.net)** —— 一个托管在 **AWS** 上，由 **GitHub Actions** 驱动部署，并通过 **[Lighthouse](https://developer.chrome.com/docs/lighthouse)** 与 **[Datadog RUM](https://www.datadoghq.com/)** 进行性能与用户体验监控的个人网站。

![Datadog RUM 实时会话监控面板](https://miever.s3.ap-east-1.amazonaws.com/static/blogs/datadog-tracking.webp)

---

## 架构概览

![miever.net 的架构图](https://miever.s3.ap-east-1.amazonaws.com/static/blogs/from-code-to-cloud.webp)

### miever.net 的整体架构

网站从前端到部署与可观测性，整体结构如下：

- **前端（Frontend）：**  
  使用 **React + Gatsby** 构建，并搭配我自研的组件库 **[Miever UI](https://components.miever.net/)**。  
  这是一个轻量级的内部组件库，专注于可复用性与可维护性。虽然目前组件数量有限且暂未支持响应式设计，但我正在持续改进中。  

- **静态资源（Static Assets）：**  
  图片（WebP 格式）、PDF、视频等文件通过 **AWS S3** 进行分发。

- **内容分发（Content Delivery）：**  
  主站通过 **CloudFront CDN** 提供服务，源站为运行 **Nginx** 的 **EC2 实例**（`blog.miever.net`）。

- **CI/CD 流水线（Pipeline）：**  
  由 **GitHub Actions** 全自动处理部署流程：  
  - 代码推送后 → 自动测试与部署到测试或生产环境  
  - 每日执行 **Lighthouse** 检查，并通过 SFTP 上传报告  

- **监控与可观测性（Monitoring & Observability）：**  
  - **Datadog RUM**：用于真实用户行为监控（会话、错误、交互事件）  
  - **Lighthouse CI**：自动化的性能、可访问性与 SEO 评估

---

## 用户体验优化

为了提升用户体验，我为网站添加了以下功能：

- 🌗 **主题切换** —— 支持浅色 / 深色模式，自动检测系统偏好，同时允许手动切换。  
- 🌐 **国际化（i18n）** —— 支持 **英文** 与 **中文** 两种语言。  
- ⚡ **渐进式 Web 应用（PWA）** —— 通过 `gatsby-plugin-manifest` 与 `gatsby-plugin-offline` 实现离线访问与安装支持。  
- 💬 **评论系统** —— 使用 **Giscus**，基于 GitHub Discussions 搭建。

---

## 接下来计划做的事情

- 📱 改进 **Miever UI** 的移动端响应式布局  
- 🧪 使用 **React Testing Library** 添加单元测试  
- 🎨 优化整体设计一致性与内容质量  

---

## 项目总结

最开始，我只是想搭一个简单的博客。但后来我想，“既然要做，为什么不自动化部署呢？”  

于是我开始研究云端架构——因为如果要做，那就要**做好**。接着我加上了性能监控、自定义组件库……  不知不觉间，我已经在搭建一整套完整的 Web 架构。

事实证明，**构建一个稳定的系统并不是一蹴而就的**, 它需要**耐心、不断迭代、以及对细节的关注**, 让它“能跑起来”很容易, 但要让它“真正优秀”，则需要时间。

每一次迭代，都是一次探索，让我离理想中的“自我驱动、可观测、可成长”的网站更近一步。

---