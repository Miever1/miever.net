---
slug: "/grafana-deploy-issue"
date: "2022-05-06 15:34"
title: "Grafana 部署遇到的问题及解决方案"
tags: ["Issue Resolve"]
home_image: "https://mattermost.com/wp-content/uploads/2022/07/01_Grafana_Dashboard_K8s@2x.webp"
description: "Grafana 部署遇到的问题及解决方案"
---

# Docker 部署

* 报错： Field 'browser' doesn't contain a valid alias configuration
![15b4b0542beb30a336bb9100a0d9e161.jpg](/grafana-issue-1.jpg)

具体issue: [Custom Docker build Fails while running exec](https://github.com/grafana/grafana/issues/26959)

.gitignore 文件去掉 vendor/

![1e3ba439649c14e4623277fc298bfd40.jpg](/grafana-issue-2.jpg)
