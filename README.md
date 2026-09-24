# Wren Wilkerson — Portfolio

My personal portfolio site: an earthy, tree-themed one-pager built with plain HTML, CSS, and JavaScript — no frameworks, no build step.

**Live site:** [wrenwilkerson.com](https://wrenwilkerson.com)

## About

A single-page site covering my background, work experience, and a couple of personal projects, built while I finish my B.S. in Software Engineering at Western Governors University. I work in IT support by day and I'm learning to build the systems I spend my days keeping running.

## Features

- Warm, earthy color palette (forest green, rust, bark) with a light/dark mode that follows system preference
- A hand-drawn Douglas fir in the hero, with a "Shake the tree" button that sets off a shower of falling leaves
- Section headings that shed a little 🌿 as you scroll past them, which drifts down and piles up by the footer, then regrows
- A playable Snake game, built in JavaScript, embedded right in the Projects section
- Fully responsive, with a collapsing hamburger nav on mobile

## Built with

- HTML5
- CSS3 (custom properties, flexbox, grid, `prefers-color-scheme` for dark mode, CSS animations)
- Vanilla JavaScript (no dependencies) — mobile nav, scroll-triggered leaf animation, the falling-leaf shower, and the Snake game

## Project structure

```
portfolio-website/
├── index.html          # page structure and content
├── styles.css          # colors, layout, typography, animations
├── mediaqueries.css     # responsive breakpoints
├── scripts.js           # nav toggle, scroll-triggered leaves, tree-shake effect
├── snake.js              # the playable Snake game
└── CNAME                 # custom domain for GitHub Pages
```


## Deployment

Hosted with GitHub Pages, deployed automatically from the `main` branch, served at the custom domain [wrenwilkerson.com](https://wrenwilkerson.com).

## Related

The Python version of the Snake game featured in the Projects section lives in its own repo: [snake_game](https://github.com/wrenwilkerson/snake_game).

## Contact

- Email: wilkersonwren144@gmail.com
- LinkedIn: [linkedin.com/in/wren-wilkerson-349813230](https://linkedin.com/in/wren-wilkerson-349813230)
- GitHub: [@wrenwilkerson](https://github.com/wrenwilkerson)
