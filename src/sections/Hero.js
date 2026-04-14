import { useEffect, useState, useRef } from 'react';

const roles = ['Full Stack Developer', 'React Specialist', 'UI/UX Enthusiast', 'Problem Solver'];

export default function Hero() {
  const [roleIdx, setRoleIdx]   = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [deleting, setDeleting]   = useState(false);
  const contentRef = useRef(null);

  useEffect(() => {
    const current = roles[roleIdx];
    let t;
    if (!deleting && displayed.length < current.length)
      t = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 80);
    else if (!deleting && displayed.length === current.length)
      t = setTimeout(() => setDeleting(true), 1800);
    else if (deleting && displayed.length > 0)
      t = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 40);
    else { setDeleting(false); setRoleIdx(i => (i + 1) % roles.length); }
    return () => clearTimeout(t);
  }, [displayed, deleting, roleIdx]);

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;
    const onScroll = () => {
      const y = window.scrollY;
      el.style.transform = `translateY(${y * 0.15}px)`;
      el.style.opacity   = `${1 - y / 700}`;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section id="home" className="hero-section">
      <div className="hero-inner" ref={contentRef}>

        {/* ── left: text ── */}
        <div className="hero-content">
          <p className="hero-greeting fade-up" style={{ animationDelay: '0s' }}>Hello, World! 👋</p>
          <h1 className="hero-name glitch fade-up" data-text="Narayn Prabhu" style={{ animationDelay: '0.15s' }}>
            Narayn Prabhu
          </h1>
          <div className="hero-role fade-up" style={{ animationDelay: '0.3s' }}>
            <span className="role-prefix">I'm a </span>
            <span className="role-text">{displayed}<span className="cursor-blink">|</span></span>
          </div>
          <p className="hero-desc fade-up" style={{ animationDelay: '0.45s' }}>
            I craft immersive digital experiences with clean code and bold design.
            Turning ideas into reality, one pixel at a time.
          </p>
          <div className="hero-btns fade-up" style={{ animationDelay: '0.6s' }}>
            <button onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              className="btn-primary" data-hover="true">View My Work</button>
            <button onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="btn-outline" data-hover="true">Get In Touch</button>
          </div>
          <div className="hero-socials fade-up" style={{ animationDelay: '0.75s' }}>
            {[
              { label: 'GitHub',   href: 'https://github.com' },
              { label: 'LinkedIn', href: 'https://linkedin.com' },
              { label: 'Twitter',  href: 'https://twitter.com' },
            ].map(s => (
              <a key={s.label} href={s.href} target="_blank" rel="noreferrer"
                className="social-link" data-hover="true">{s.label}</a>
            ))}
          </div>
        </div>

        {/* ── right: animated code card ── */}
        <div className="hero-code-card fade-up" style={{ animationDelay: '0.4s' }}>
          <div className="code-card-bar">
            <span className="code-dot red" /><span className="code-dot yellow" /><span className="code-dot green" />
            <span className="code-card-title">narayan.js</span>
          </div>
          <pre className="code-card-body"><code>{`const developer = {
  name: "Narayn Prabhu",
  stack: ["React", "Node", "MongoDB"],
  passion: "Building things",
  coffee: Infinity,

  build: (idea) => {
    return idea
      .design()
      .code()
      .ship(); ✨
  }
};`}</code></pre>
          <div className="code-card-glow" />
        </div>

      </div>

      <div className="scroll-indicator">
        <div className="scroll-mouse"><div className="scroll-wheel" /></div>
      </div>
    </section>
  );
}
