import { useRef, useEffect, useState } from 'react';

const stats = [
  { value: '2+',  label: 'Years Experience' },
  { value: '20+', label: 'Projects Built'   },
  { value: '10+', label: 'Happy Clients'    },
  { value: '∞',   label: 'Lines of Code'    },
];

export default function About() {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => e.isIntersecting && setVis(true),
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="about" className="section about-section" ref={ref}>
      <div className={`section-tag reveal ${vis ? 'visible' : ''}`}>{'// about_me'}</div>
      <h2 className={`section-title reveal ${vis ? 'visible' : ''}`} style={{ transitionDelay: '0.1s' }}>
        Who Am I?
      </h2>

      <div className="about-grid">

        {/* ── LEFT: image ── */}
        <div className={`about-img-col reveal slide-left ${vis ? 'visible' : ''}`} style={{ transitionDelay: '0.15s' }}>
          <div className="about-img-frame">

            {/* animated corner brackets */}
            <span className="img-corner tl" />
            <span className="img-corner tr" />
            <span className="img-corner bl" />
            <span className="img-corner br" />

            {/* scan line */}
            <span className="img-scan" />

            {/* photo */}
            <img
              src="/nara.jpeg"
              alt="Narayn Prabhu"
              className="about-img"
            />

            {/* dark gradient overlay at bottom */}
            <span className="img-overlay" />

            {/* floating skill tags */}
            <div className="img-tag img-tag--react">⚛ React</div>
            <div className="img-tag img-tag--node">⬡ Node.js</div>
            <div className="img-tag img-tag--mongo">🍃 MongoDB</div>
          </div>
        </div>

        {/* ── RIGHT: text + stats ── */}
        <div className="about-right">
          <div className={`about-text reveal slide-right ${vis ? 'visible' : ''}`} style={{ transitionDelay: '0.25s' }}>
            <p>I'm <strong>Narayn Prabhu</strong>, a passionate full-stack developer who loves building
              beautiful, performant web applications. I specialize in the MERN stack and have a deep
              love for crafting pixel-perfect UIs.</p>
            <p>When I'm not coding, you'll find me exploring new technologies, contributing to open
              source, or designing UI concepts. I believe great software is a blend of clean code
              and thoughtful design.</p>
            <p>My goal is to create digital experiences that not only work flawlessly but also leave
              users saying <em>"wow."</em></p>
            <a href="/cv.pdf" className="btn-primary" data-hover="true"
              style={{ display: 'inline-flex', marginTop: '24px' }}>
              Download CV
            </a>
          </div>

          <div className={`about-stats reveal ${vis ? 'visible' : ''}`} style={{ transitionDelay: '0.4s' }}>
            {stats.map((s, i) => (
              <div key={s.label} className="stat-card" data-hover="true"
                style={{ transitionDelay: `${0.4 + i * 0.08}s` }}>
                <span className="stat-value">{s.value}</span>
                <span className="stat-label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
