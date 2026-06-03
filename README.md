# Miever's Website

Everyone needs their own little spot on the interwebs, and this is mine.

Welcome to my personal website!

## Introduction
 
As a Front-end engineer, a descent personal website is required! It's been a long time that I want to build a personal website, but I always delay it because of some excuses, busy work for example. When it comes to the end of 2022, I realized that i need change. As you see, I'm changing.

You can check the live version on [miever.net](https://miever.net/)

## Project

The main purpose of this project is that I want to show my true self, here you can see my resume, blog, and other information about me. Of course, I also want to apply what I know in technology to my personal web page, if you want to know, please check out the source code.

## Building from Source

I used Gatsby to create my website. Gatsby is a React-based open source framework for creating websites. About how to use gatsby, please check out official documents [gatsbyjs](https://www.gatsbyjs.com/docs)

### develop

#### requirements: 

* node version > 18

#### install dependencies

```
  npm run install
```

#### dev

Start the local development server with

```
  npm run develop
```

Gatsby will start a hot-reloading development environment accessible by default at http://localhost:8000.

### build

```
  run with gatsby build
```

## Developing the miever_ui component library locally

This site is built on [miever_ui](https://github.com/Miever1/miever_ui). To work
on the library and see changes here live (instead of waiting for an npm
release), link it locally:

```bash
# 1. in the miever_ui repo (once)
npm run build
npm link

# 2. here, in miever.net
npm link miever_ui

# 3. run both watchers
#   - miever_ui:  npm run watch     (rebuilds dist on change)
#   - miever.net: npm run develop   (dev server, picks up changes on reload)
```

`gatsby-node.ts` aliases `react`/`react-dom` to this project's copy so the
linked library doesn't pull in a second React instance ("Invalid hook call").

To go back to the published version:

```bash
npm unlink miever_ui && npm install
```


🍷 🍷 🍷 

&emsp;&emsp; Cheers !!! 
