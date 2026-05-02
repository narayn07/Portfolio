import { useRef, useEffect, useState } from 'react';

const skills = [
  { name: 'React',       level: 92, color: '#61dafb' },
  { name: 'Node.js',     level: 85, color: '#68d391' },
  { name: 'Python',      level: 82, color: '#3b82f6' },
  { name: 'Java',        level: 75, color: '#f97316' },
  { name: 'MongoDB',     level: 80, color: '#f6ad55' },
  { name: 'TypeScript',  level: 78, color: '#4299e1' },
  { name: 'UI/UX & CSS', level: 90, color: '#ec4899' },
  { name: 'Git & DevOps',level: 75, color: '#a78bfa' },
];

const row1 = [
  { name: 'React',       logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
  { name: 'TypeScript',  logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
  { name: 'JavaScript',  logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
  { name: 'Node.js',     logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
  { name: 'Python',      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
  { name: 'Java',        logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg' },
  { name: 'HTML5',       logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
  { name: 'CSS3',        logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
];

const row2 = [
  { name: 'MongoDB',     logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
  { name: 'MySQL',       logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' },
  { name: 'Git',         logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
  { name: 'Figma',       logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg' },
  { name: 'Redux',       logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg' },
  { name: 'Tailwind',    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg' },
  { name: 'Docker',      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },
  { name: 'Linux',       logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg' },
];

function MarqueeRow({ items, reverse = false }) {
  const doubled = [...items, ...items];
  return (
    <div className="marquee-wrapper">
      <div className={`marquee-track ${reverse ? 'marquee-reverse' : ''}`}>
        {doubled.map((t, i) => (
          <div className="marquee-card" key={`${t.name}-${i}`}>
            <div className="marquee-icon">
              <img src={t.logo} alt={t.name} loading="lazy" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

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

      {/* Progress bars */}
      <div className="skills-bars-row">
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

      {/* Marquee rows */}
      <div className={`marquee-section reveal ${vis ? 'visible' : ''}`} style={{ transitionDelay: '0.3s' }}>
        <MarqueeRow items={row1} />
        <MarqueeRow items={row2} reverse />
      </div>
    </section>
  );
}
