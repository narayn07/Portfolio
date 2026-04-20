import { useRef, useEffect, useState } from 'react';

const skills = [
  { name: 'React / Next.js',   level: 92, color: '#61dafb' },
  { name: 'Node.js / Express', level: 85, color: '#68d391' },
  { name: 'Python',            level: 82, color: '#3b82f6' },
  { name: 'Java',              level: 75, color: '#f97316' },
  { name: 'MongoDB / SQL',     level: 80, color: '#f6ad55' },
  { name: 'TypeScript',        level: 78, color: '#4299e1' },
  { name: 'UI/UX & CSS',       level: 90, color: '#ec4899' },
  { name: 'Git & DevOps',      level: 75, color: '#a78bfa' },
];

const logos = {
  React:      <svg viewBox="0 0 128 128"><circle cx="64" cy="64" r="11.4" fill="#61dafb"/><g fill="none" stroke="#61dafb" strokeWidth="5.5"><ellipse rx="46" ry="18" cx="64" cy="64"/><ellipse rx="46" ry="18" cx="64" cy="64" transform="rotate(60 64 64)"/><ellipse rx="46" ry="18" cx="64" cy="64" transform="rotate(120 64 64)"/></g></svg>,
  'Node.js':  <svg viewBox="0 0 128 128"><path fill="#83cd29" d="M112.8 85.3L67.2 111a6.4 6.4 0 01-6.4 0L15.2 85.3A6.4 6.4 0 0112 79.7V28.3a6.4 6.4 0 013.2-5.6L60.8 1a6.4 6.4 0 016.4 0l45.6 21.7a6.4 6.4 0 013.2 5.6v51.4a6.4 6.4 0 01-3.2 5.6z"/><path fill="#fff" d="M64 24.5L32 42v35l32 17.5L96 77V42z"/></svg>,
  MongoDB:    <svg viewBox="0 0 128 128"><path fill="#589636" d="M64 8C38 8 17 29 17 55c0 20 12 37 29 45l4 20h28l4-20c17-8 29-25 29-45C111 29 90 8 64 8z"/><path fill="#fff" d="M64 20v72l-8-8V28z"/></svg>,
  MySQL:      <svg viewBox="0 0 128 128"><path fill="#00758f" d="M17 95c0 10 8 18 18 18s18-8 18-18V48h-12v46c0 4-2 6-6 6s-6-2-6-6V48H17v47zm58-47l-18 70h13l3-14h16l3 14h13L87 48H75zm-1 46l6-26 6 26H74zm38-46v70h12V75l16 43h12V48h-12v43L124 48h-13z"/><path fill="#f29111" d="M8 38h112v8H8z"/></svg>,
  TypeScript: <svg viewBox="0 0 128 128"><rect width="128" height="128" rx="6" fill="#3178c6"/><path fill="#fff" d="M22 68h22v-8H22v8zm0 16h14v-8H22v8zm28-16v32h8V68h14v-8H36v8h14zm22 0h22v-8H72v8zm0 16h14v-8H72v8z"/></svg>,
  JavaScript: <svg viewBox="0 0 128 128"><rect width="128" height="128" fill="#f7df1e"/><path d="M116 96c0 12-7 18-18 18-10 0-16-5-19-13l10-6c2 4 4 7 9 7s7-2 7-9V48h11v48zM74 95c0 14-8 20-21 20-11 0-18-6-21-14l10-6c2 5 5 9 11 9s9-3 9-9V48h12v47z"/></svg>,
  'HTML/CSS': <svg viewBox="0 0 128 128"><path fill="#e44d26" d="M19.6 112L8 8h112l-11.6 104L64 120z"/><path fill="#f16529" d="M64 111.5l38.5-10.7 9.9-88.8H64z"/><path fill="#ebebeb" d="M64 66H45.5l-1.3-14H64V38.5H29.5l3.5 39H64zm0 24.5l-.1.1-16.2-4.4-1-11.5H32.5l2 22.5 29.4 8.1.1-.1z"/><path fill="#fff" d="M64 66v13.5h17l-1.6 17.6L64 101.1v14.1l29.5-8.2 2.2-24.4H64zm3.5-27.5H64V52h19.5l-1.5 16.5H64V82h18.5l-2 22.5-16.5 4.5V123l29.5-8.2 4-44.8H64z"/></svg>,
  Python:     <svg viewBox="0 0 128 128"><path fill="#3776ab" d="M63.4 5C41 5 42.6 14.5 42.6 14.5l.1 9.8h21.2v3H26.5S5 24.8 5 47.5s18.8 21.9 18.8 21.9h11.2v-10.5s-.6-18.8 18.5-18.8h31.8s17.9.3 17.9-17.3V22.4S105.8 5 63.4 5zm-17.6 10.2c3.2 0 5.8 2.6 5.8 5.8s-2.6 5.8-5.8 5.8-5.8-2.6-5.8-5.8 2.6-5.8 5.8-5.8z"/><path fill="#ffd43b" d="M64.6 123c22.4 0 20.8-9.5 20.8-9.5l-.1-9.8H64.1v-3h37.4s21.5 2.5 21.5-20.2-18.8-21.9-18.8-21.9H93v10.5s.6 18.8-18.5 18.8H42.7s-17.9-.3-17.9 17.3v14.3S22.2 123 64.6 123zm17.6-10.2c-3.2 0-5.8-2.6-5.8-5.8s2.6-5.8 5.8-5.8 5.8 2.6 5.8 5.8-2.6 5.8-5.8 5.8z"/></svg>,
  Java:       <svg viewBox="0 0 128 128"><path fill="#ea2d2e" d="M47.6 98.4s-3.2 1.9 2.3 2.5c6.7.8 10.1.7 17.5-.8 0 0 1.9 1.2 4.6 2.3-16.5 7.1-37.3-.4-24.4-4zm-2-9.2s-3.6 2.7 1.9 3.2c7.1.7 12.7.8 22.4-1.1 0 0 1.3 1.4 3.4 2.1-19.8 5.8-41.9.5-27.7-4.2z"/><path fill="#ea2d2e" d="M69.3 62.8c4 4.6-1 8.8-1 8.8s10.2-5.3 5.5-11.9c-4.4-6.2-7.8-9.3 10.5-19.9 0 0-28.7 7.2-15 23z"/><path fill="#ea2d2e" d="M98.3 108.7s2.4 2-2.6 3.5c-9.5 2.9-39.5 3.7-47.8.1-3-.1.3-2.8 2.3-3.1 1-.2 1.5-.2 1.5-.2-1.7-1.2-11.2 2.4-4.8 3.4 17.4 2.8 44.8-1.3 51.4-3.7zm-30.5-23.3s-7.7 1.8-2.7 2.5c2.1.3 6.2.2 10.1-.1 3.2-.3 6.3-.9 6.3-.9s-1.1.5-1.9.9c-7.6 2-22.3 1.1-18.1-.9 3.6-1.7 6.3-1.5 6.3-1.5zm13.6 7.6c7.7-4 4.1-7.8 1.6-7.3-.6.1-.9.3-.9.3s.2-.4.7-.5c5.3-1.9 9.4 5.5-1.6 8.4 0 0 .1-.1.2-.9z"/><path fill="#ea2d2e" d="M74.5 5S84 14.5 65.4 28.8c-15.1 11.9-3.4 18.7 0 26.4-8.8-7.9-15.2-14.9-10.9-21.4C60.7 24.3 77.5 19.9 74.5 5z"/><path fill="#ea2d2e" d="M52.1 121.2c7.4.5 18.8-.3 19.1-3.8 0 0-.5 1.3-6.1 2.3-6.4 1.2-14.3 1.1-19-.3 0 0 1 .8 6 1.8z"/></svg>,
  Git:        <svg viewBox="0 0 128 128"><path fill="#f34f29" d="M124.7 58.4L69.6 3.3a11.2 11.2 0 00-15.8 0L42.1 15l15.8 15.8a13.3 13.3 0 0116.8 16.9l15.2 15.2a13.3 13.3 0 11-8 7.6L66.8 55.4v34.1a13.3 13.3 0 11-10.9-.4V54.6a13.3 13.3 0 01-7.2-17.4L33 21.5 3.3 51.2a11.2 11.2 0 000 15.8l55.1 55.1a11.2 11.2 0 0015.8 0l50.5-50.5a11.2 11.2 0 000-13.2z"/></svg>,
  Figma:      <svg viewBox="0 0 128 128"><path fill="#f24e1e" d="M44 128c11 0 20-9 20-20V88H44c-11 0-20 9-20 20s9 20 20 20z"/><path fill="#ff7262" d="M24 64c0-11 9-20 20-20h20v40H44c-11 0-20-9-20-20z"/><path fill="#a259ff" d="M24 24c0-11 9-20 20-20h20v40H44c-11 0-20-9-20-20z"/><path fill="#1abcfe" d="M64 4h20c11 0 20 9 20 20s-9 20-20 20H64V4z"/><path fill="#0acf83" d="M104 64c0 11-9 20-20 20s-20-9-20-20 9-20 20-20 20 9 20 20z"/></svg>,
  'REST API': <svg viewBox="0 0 128 128"><rect width="128" height="128" rx="8" fill="#1e1b4b"/><text x="50%" y="46%" dominantBaseline="middle" textAnchor="middle" fill="#818cf8" fontSize="22" fontFamily="monospace" fontWeight="bold">REST</text><text x="50%" y="68%" dominantBaseline="middle" textAnchor="middle" fill="#6366f1" fontSize="14" fontFamily="monospace">API</text></svg>,
  Redux:      <svg viewBox="0 0 128 128"><path fill="#764abc" d="M88.7 84.6c4.8-.6 8.5-4.8 8.3-9.8-.2-5-4.4-9-9.4-9h-.6c-5.2.2-9.2 4.5-9 9.7.2 2.5 1.2 4.7 2.8 6.3-5.9 11.6-14.9 20.1-28.4 27.2-9.1 4.8-18.6 6.6-28 5.5-7.8-1-13.8-4.3-17.6-9.8-5.6-8-6.1-16.6-1.4-25.2 3.3-6.1 8.4-10.6 11.7-13-.6-2-1.6-5.3-2-7.7C5.2 68.5-1.1 80.3.2 93.4c1.8 18.5 16.6 32.3 35.2 32.3 4 0 8-.5 12-1.6 25.4-6.3 44.6-25.4 41.3-39.5z"/><path fill="#764abc" d="M10.3 66.4c3.3 0 6.1-1.2 8.3-3.2 4.8 9.9 12.1 17.2 22.8 22.4 7.7 3.7 15.8 5.5 24.2 5.5 3.3 0 6.6-.3 9.9-.9 2.5-.5 4.7-1.1 6.8-1.9.5-2.1 1.4-5.3 2.2-7.5-2.8.9-5.8 1.7-8.9 2.2-3 .5-6 .8-9 .8-7.5 0-14.8-1.6-21.7-4.9-9.3-4.4-15.5-10.8-19.3-19.7 2.2-2.2 3.6-5.2 3.6-8.5 0-6.6-5.4-12-12-12s-12 5.4-12 12 5.4 12 12 12h.1z"/><path fill="#764abc" d="M117.7 55.7c-15.4-18-38-27.9-63.8-27.9-4.6 0-9.3.4-13.9 1.2-4.1.7-7.9 1.8-11.4 3.2-.4 2.1-1.2 5.4-1.8 7.6 4.1-1.7 8.5-3 13.2-3.8 4.3-.7 8.7-1.1 13-1.1 23.5 0 44.1 9 58.2 25.3-2 2.2-3.2 5.1-3.2 8.3 0 6.6 5.4 12 12 12s12-5.4 12-12c-.1-5.8-4.2-10.6-9.8-11.7l-4.5-1.1z"/></svg>,
  Tailwind:   <svg viewBox="0 0 128 128"><path fill="#38bdf8" d="M64 16c-17.1 0-27.8 8.5-32 25.6 6.4-8.5 13.9-11.7 22.4-9.6 4.9 1.2 8.3 4.7 12.2 8.6C72.7 47 79.8 54.4 96 54.4c17.1 0 27.8-8.5 32-25.6-6.4 8.5-13.9 11.7-22.4 9.6-4.9-1.2-8.3-4.7-12.2-8.6C87.3 23.4 80.2 16 64 16zM32 54.4C14.9 54.4 4.2 62.9 0 80c6.4-8.5 13.9-11.7 22.4-9.6 4.9 1.2 8.3 4.7 12.2 8.6 6.1 6.4 13.2 13.8 29.4 13.8 17.1 0 27.8-8.5 32-25.6-6.4 8.5-13.9 11.7-22.4 9.6-4.9-1.2-8.3-4.7-12.2-8.6C55.3 61.8 48.2 54.4 32 54.4z"/></svg>,
};

const techs = [
  { name: 'React',      color: '#61dafb', docs: 'https://react.dev' },
  { name: 'Node.js',    color: '#83cd29', docs: 'https://nodejs.org/docs' },
  { name: 'Python',     color: '#3776ab', docs: 'https://docs.python.org' },
  { name: 'Java',       color: '#ea2d2e', docs: 'https://docs.oracle.com/en/java' },
  { name: 'MongoDB',    color: '#589636', docs: 'https://www.mongodb.com/docs' },
  { name: 'MySQL',      color: '#00758f', docs: 'https://dev.mysql.com/doc' },
  { name: 'TypeScript', color: '#3178c6', docs: 'https://www.typescriptlang.org/docs' },
  { name: 'JavaScript', color: '#f7df1e', docs: 'https://developer.mozilla.org/docs/Web/JavaScript' },
  { name: 'HTML/CSS',   color: '#e44d26', docs: 'https://developer.mozilla.org/docs/Web' },
  { name: 'Git',        color: '#f34f29', docs: 'https://git-scm.com/doc' },
  { name: 'Figma',      color: '#a259ff', docs: 'https://help.figma.com' },
  { name: 'REST API',   color: '#6366f1', docs: 'https://restfulapi.net' },
  { name: 'Redux',      color: '#764abc', docs: 'https://redux.js.org' },
  { name: 'Tailwind',   color: '#38bdf8', docs: 'https://tailwindcss.com/docs' },
];

export default function Skills() {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => e.isIntersecting && setVis(true), { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="skills" className="section skills-section" ref={ref}>
      <div className={`section-tag reveal ${vis ? 'visible' : ''}`}>{'// skills'}</div>
      <h2 className={`section-title reveal ${vis ? 'visible' : ''}`} style={{ transitionDelay: '0.1s' }}>
        What I Work With
      </h2>

      <div className="skills-grid">
        {/* ── left: progress bars ── */}
        <div className="skills-bars">
          {skills.map((s, i) => (
            <div key={s.name} className={`skill-row reveal ${vis ? 'visible' : ''}`}
              style={{ transitionDelay: `${i * 0.08 + 0.2}s` }}>
              <div className="skill-header">
                <span className="skill-name">{s.name}</span>
                <span className="skill-pct">{s.level}%</span>
              </div>
              <div className="skill-track">
                <div className="skill-fill" style={{
                  background: `linear-gradient(90deg, ${s.color}, ${s.color}88)`,
                  width: vis ? `${s.level}%` : '0%',
                  transition: `width 1.2s ease ${i * 0.08 + 0.4}s`,
                }} />
              </div>
            </div>
          ))}
        </div>

        {/* ── right: logo grid with doc links ── */}
        <div className="tech-logo-grid">
          {techs.map((t, i) => (
            <a
              key={t.name}
              href={t.docs}
              target="_blank"
              rel="noreferrer"
              className={`tech-logo-card reveal ${vis ? 'visible' : ''}`}
              style={{ '--tc': t.color, transitionDelay: `${i * 0.06 + 0.2}s` }}
              data-hover="true"
              title={`${t.name} docs ↗`}
            >
              <div className="tech-logo-icon">{logos[t.name]}</div>
              <span className="tech-logo-name">{t.name}</span>
              <span className="tech-logo-link-hint">docs ↗</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
