---
slug: "/grafana-deploy-issue"
date: "2022-05-06 15:34"
title: "Grafana 部署遇到的问题及解决方案"
type: "blogs"
language: "zh"
tags: ["编程实践"]
home_image: "https://mattermost.com/wp-content/uploads/2022/07/01_Grafana_Dashboard_K8s@2x.webp"
description: "Grafana 部署遇到的问题及解决方案"
---

# Docker 部署

* 报错： Field 'browser' doesn't contain a valid alias configuration
![15b4b0542beb30a336bb9100a0d9e161.jpg](https://miever.s3.ap-east-1.amazonaws.com/static/grafana-issue-1.webp)

具体issue: [Custom Docker build Fails while running exec](https://github.com/grafana/grafana/issues/26959)

.gitignore 文件去掉 vendor/

![1e3ba439649c14e4623277fc298bfd40.jpg](https://miever.s3.ap-east-1.amazonaws.com/static/grafana-issue-2.webp)
