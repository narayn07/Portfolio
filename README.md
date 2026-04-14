# ⚡ Narayan Prabhu — Portfolio

A personal portfolio website built with React. Features an immersive dark UI with animated backgrounds, custom cursor, and smooth scroll animations.

## Live Sections
- **Hero** — Typewriter role animation, animated code card, parallax scroll
- **About** — Profile image with scan line + corner bracket animations, stat cards
- **Skills** — Colorful tech logo grid with official doc links, animated progress bars
- **Projects** — 3D tilt cards with per-project modal and canvas animation
- **Contact** — Contact form with toast notification

## Tech Stack
- React 19
- Framer Motion
- Canvas API (particle background, cursor trail, project modals)
- React Toastify
- CSS custom properties + animations

## Run Locally

```bash
cd client
npm install
npm start
```

Opens at **http://localhost:3001**

## Project Structure

```
client/src/
├── App.js                      # Root — assembles all sections
├── index.css                   # Global styles
├── index.js                    # Entry point
├── components/
│   ├── Cursor.js               # Custom animated cursor
│   ├── Cursor.css              # Cursor styles
│   ├── Footer.js               # Footer
│   ├── Navbar.js               # Sticky navbar with active section detection
│   └── ParticleBackground.js   # Canvas bg (stars, grid, orbs, shooting stars)
└── sections/
    ├── Hero.js                 # Landing screen
    ├── About.js                # About me + image
    ├── Skills.js               # Tech logos + progress bars
    ├── Projects.js             # Project cards + modal
    └── Contact.js              # Contact form
```

## Customisation
| What | Where |
|---|---|
| Your name, bio, links | `sections/Hero.js`, `sections/About.js` |
| Projects | `sections/Projects.js` → `projects` array |
| Skills & levels | `sections/Skills.js` → `skills` array |
| Social links | `sections/Contact.js`, `sections/Hero.js` |
| Colors / fonts | `src/index.css` → `:root` variables |
| Profile photo | `sections/About.js` → `<img src=...>` |
