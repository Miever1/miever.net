---
slug: "/from-code-to-cloud-personal-site-deployment-pipeline"
date: "2025-10-30 21:00"
title: "From Code to Cloud: My End-to-End Personal Site Deployment Pipeline"
type: "blogs"
language: "en"
tags: [Web Architecture, CI/CD, Performance, DevOps]
home_image: "https://miever.s3.ap-east-1.amazonaws.com/static/blogs/from-code-to-cloud.webp"
description: A deep dive into the architecture, CI/CD pipeline, and performance auditing of miever.net. A fully automated, monitored, and scalable personal site built with React, Gatsby, AWS, and GitHub Actions.
---

# From Code to Cloud: My End-to-End Personal Site Deployment Pipeline

## Why I Built This

As a developer, I wanted more than just a static portfolio. I needed a site that reflected how I approach modern web engineering, something automated, scalable, and performance-monitored. 
So I built **[miever.net](https://miever.net)**, a personal site hosted on AWS, powered by GitHub Actions, and monitored through **[Lighthouse](https://developer.chrome.com/docs/lighthouse)** and **[Datadog RUM](https://www.datadoghq.com/)**.

![This dashboard tracks real sessions via Datadog RUM](https://miever.s3.ap-east-1.amazonaws.com/static/blogs/datadog-tracking.webp)

---

## Architecture Overview

![Architecture of miever.net](https://miever.s3.ap-east-1.amazonaws.com/static/blogs/from-code-to-cloud.webp)

### Architecture of miever.net

Here’s how the site is structured, from frontend to deployment and observability:

- **Frontend:**  
  Built with **React + Gatsby**, using my own component library **![Miever UI](https://components.miever.net/)**. It’s a lightweight internal component library designed for reusability and maintainability. Although it’s still in early development with limited components and no responsive support yet, I’m actively improving it.  

- **Static Assets:**  
  Images (in WebP), PDFs, and videos are served directly from **AWS S3**.

- **Content Delivery:**  
  The main site is delivered via **CloudFront CDN**, pulling content from an **EC2 origin** (`blog.miever.net`, running **Nginx**).

- **CI/CD Pipeline:**  
  **GitHub Actions** handle the full deployment workflow:
  - On code pushes → automatic testing and deployment to staging/production  
  - Daily **Lighthouse** performance reports via SFTP upload  

- **Monitoring & Observability:**  
  - **Datadog RUM** for real user monitoring (RUM sessions, errors, interaction tracking)  
  - **Lighthouse CI** for automated audits on performance, accessibility, and SEO

---

## Enhancing the User Experience

To improve user experience, I added:

- 🌗 **Theme Switching** — light/dark modes that respect system preference, with manual toggle support.  
- 🌐 **Internationalization (i18n)** — supports **English** and **Chinese**.  
- ⚡ **Progressive Web App (PWA)** — offline support and installability via `gatsby-plugin-manifest` and `gatsby-plugin-offline`.  
- 💬 **Comments System** — powered by **Giscus**, using GitHub Discussions.

---

## What’s Next

- 📱 Improve **mobile responsiveness** in Miever UI  
- 🧪 Add **unit tests** with React Testing Library  
- 🎨 Continue refining **design consistency** and **content quality**

---

## How It Started

I just wanted to set up a simple blog at first.  
But then I thought, *“Hey, why not automate the deployment?”*  

I just wanted to set up a simple blog at first. But then I thought, “Hey, why not automate the deployment?” That got me into cloud stuff, because if I was gonna do it, I might as well do it right. Then came performance monitoring, a custom UI library… and before I knew it, I was building a full-on web architecture.

Turns out, building something solid isn’t about rushing.  
It’s about **patience, iteration, and attention to detail**.  

Turns out, building something solid isn’t about rushing. It’s about patience, iteration, and paying attention to the little details. Getting it to work is one thing, making it great takes time.

---