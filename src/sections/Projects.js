import { useRef, useEffect, useState } from 'react';

const projects = [
  { title: 'Apex Workspace', desc: 'Full MERN stack project management platform with drag-and-drop customizable dashboard, JWT auth, and real-time updates.', long: 'Built with React 19, Express, MongoDB and JWT authentication. Features a fully customizable widget dashboard using React Grid Layout — users can drag, resize, add and remove widgets. Includes project CRUD, task management with filters, time logging, and persistent layouts saved to MongoDB.', tags: ['React', 'Node.js', 'MongoDB', 'JWT'], color: '#8b5cf6', emoji: '⚡', github: '#', live: '#' },
  { title: 'E-Commerce Platform', desc: 'Feature-rich online store with payment integration, inventory management, and admin dashboard.', long: 'Next.js storefront with Stripe Checkout, webhook-driven order fulfillment, PostgreSQL inventory, and a full admin panel with analytics. Optimized for Core Web Vitals with ISR and image optimization.', tags: ['Next.js', 'Stripe', 'PostgreSQL', 'Redux'], color: '#ec4899', emoji: '🛒', github: '#', live: '#' },
  { title: 'AI Chat Interface', desc: 'Real-time AI-powered chat application with WebSocket support, message history, and smart suggestions.', long: 'Socket.io bidirectional chat with OpenAI streaming responses. Supports multi-room conversations, message history stored in Redis, and context-aware smart reply suggestions powered by GPT-4.', tags: ['React', 'Socket.io', 'OpenAI', 'Express'], color: '#06b6d4', emoji: '🤖', github: '#', live: '#' },
  { title: 'DevBlog CMS', desc: 'Headless CMS for developers with markdown support, syntax highlighting, and SEO optimization.', long: 'MDX-powered blog with custom rehype plugins for syntax highlighting, reading time, and table of contents. Fully static with Next.js ISR, automated OG image generation, and 100/100 Lighthouse scores.', tags: ['Next.js', 'MDX', 'Tailwind', 'Vercel'], color: '#10b981', emoji: '📝', github: '#', live: '#' },
  { title: 'Crypto Dashboard', desc: 'Live cryptocurrency tracking dashboard with charts, portfolio management, and price alerts.', long: 'WebSocket-driven live price feeds from Binance API. Chart.js candlestick charts, portfolio P&L tracking, and browser push notifications for price alerts. PWA-ready with offline caching.', tags: ['React', 'Chart.js', 'WebSocket', 'API'], color: '#f59e0b', emoji: '📈', github: '#', live: '#' },
  { title: 'Social Media App', desc: 'Instagram-like social platform with image uploads, stories, real-time notifications and DMs.', long: 'Firebase-backed social app with Cloud Storage for media, Firestore for real-time feeds, and FCM push notifications. Features stories with 24h expiry, direct messaging, and AWS S3 for CDN delivery.', tags: ['React', 'Firebase', 'Node.js', 'AWS S3'], color: '#ef4444', emoji: '📸', github: '#', live: '#' },
];

/* ── Animated canvas inside modal ── */
function ModalCanvas({ color }) {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    let id, t = 0;

    const pts = Array.from({ length: 40 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      r: Math.random() * 2 + 1,
      ph: Math.random() * Math.PI * 2,
    }));

    const hex = color;
    const r = parseInt(hex.slice(1,3),16);
    const g = parseInt(hex.slice(3,5),16);
    const b = parseInt(hex.slice(5,7),16);

    const draw = () => {
      t += 0.012;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // flowing wave lines
      for (let i = 0; i < 5; i++) {
        ctx.beginPath();
        const amp = 18 + i * 8;
        const freq = 0.008 + i * 0.002;
        const speed = t * (0.4 + i * 0.15);
        ctx.moveTo(0, canvas.height * 0.5);
        for (let x = 0; x <= canvas.width; x += 4) {
          const y = canvas.height * 0.5 + Math.sin(x * freq + speed) * amp + Math.sin(x * freq * 2.3 + speed * 1.4) * (amp * 0.4);
          ctx.lineTo(x, y);
        }
        ctx.strokeStyle = `rgba(${r},${g},${b},${0.06 + i * 0.03})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }

      // particles + connections
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const d = Math.hypot(pts[i].x - pts[j].x, pts[i].y - pts[j].y);
          if (d < 100) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(${r},${g},${b},${(1 - d/100) * 0.18})`;
            ctx.lineWidth = 0.6;
            ctx.moveTo(pts[i].x, pts[i].y);
            ctx.lineTo(pts[j].x, pts[j].y);
            ctx.stroke();
          }
        }
      }

      pts.forEach(p => {
        const tw = 0.5 + 0.5 * Math.sin(t + p.ph);
        const grd = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 6);
        grd.addColorStop(0, `rgba(${r},${g},${b},${tw * 0.5})`);
        grd.addColorStop(1, `rgba(${r},${g},${b},0)`);
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r * 6, 0, Math.PI * 2);
        ctx.fillStyle = grd; ctx.fill();
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r},${g},${b},${tw * 0.9})`; ctx.fill();
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
      });

      id = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(id);
  }, [color]);

  return <canvas ref={ref} style={{ width: '100%', height: '100%', display: 'block' }} />;
}

/* ── Modal ── */
function Modal({ project, onClose }) {
  // close on overlay click or Escape
  useEffect(() => {
    const onKey = e => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = ''; };
  }, [onClose]);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" style={{ '--accent': project.color }} onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✕</button>

        <div className="modal-canvas-wrap">
          <ModalCanvas color={project.color} />
          <div className="modal-canvas-overlay" />
          <span className="modal-emoji">{project.emoji}</span>
        </div>

        <div className="modal-body">
          <h2 className="modal-title">{project.title}</h2>
          <p className="modal-desc">{project.long}</p>
          <div className="modal-tags">
            {project.tags.map(t => (
              <span key={t} className="modal-tag" style={{ borderColor: project.color, color: project.color }}>{t}</span>
            ))}
          </div>
          <div className="modal-links">
            <a href={project.github} className="btn-outline" style={{ padding: '10px 22px', fontSize: '14px' }} data-hover="true">GitHub →</a>
            <a href={project.live} className="btn-primary" style={{ padding: '10px 22px', fontSize: '14px' }} data-hover="true"><span>Live Demo ↗</span></a>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Card ── */
function ProjectCard({ project, index, vis, onClick }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const onMouseMove = e => {
    const rect = e.currentTarget.getBoundingClientRect();
    setTilt({
      x: ((e.clientY - rect.top) / rect.height - 0.5) * 14,
      y: -((e.clientX - rect.left) / rect.width - 0.5) * 14,
    });
  };

  return (
    <div
      className={`project-card reveal ${vis ? 'visible' : ''}`}
      style={{ '--accent': project.color, transitionDelay: `${index * 0.1 + 0.2}s`, transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)` }}
      onMouseMove={onMouseMove}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
      onClick={onClick}
      data-hover="true"
    >
      <div className="project-glow" />
      <div className="project-emoji">{project.emoji}</div>
      <h3 className="project-title">{project.title}</h3>
      <p className="project-desc">{project.desc}</p>
      <div className="project-tags">
        {project.tags.map(t => <span key={t} className="project-tag" style={{ borderColor: project.color, color: project.color }}>{t}</span>)}
      </div>
      <div className="project-links">
        <span className="project-link" style={{ color: 'var(--muted)' }}>View Details →</span>
        <span className="project-link live" style={{ color: project.color }}>Live Demo ↗</span>
      </div>
    </div>
  );
}

export default function Projects() {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  const [active, setActive] = useState(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => e.isIntersecting && setVis(true), { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="projects" className="section projects-section" ref={ref}>
      <div className={`section-tag reveal ${vis ? 'visible' : ''}`}>{'// projects'}</div>
      <h2 className={`section-title reveal ${vis ? 'visible' : ''}`} style={{ transitionDelay: '0.1s' }}>Things I've Built</h2>
      <div className="projects-grid">
        {projects.map((p, i) => (
          <ProjectCard key={p.title} project={p} index={i} vis={vis} onClick={() => setActive(p)} />
        ))}
      </div>
      {active && <Modal project={active} onClose={() => setActive(null)} />}
    </section>
  );
}
