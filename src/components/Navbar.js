import { useState, useEffect } from 'react';

const links = ['home', 'about', 'skills', 'projects', 'contact'];

const scrollTo = (id) => {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('home');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => e.isIntersecting && setActive(e.target.id)),
      { threshold: 0.4 }
    );
    links.forEach(l => { const el = document.getElementById(l); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);

  return (
    <nav className={`navbar navbar-anim ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-logo" data-hover="true">
        <span className="logo-bracket">&lt;</span>
        <span className="logo-name">Narayn</span>
        <span className="logo-bracket">/&gt;</span>
      </div>

      <ul className="nav-links">
        {links.map(l => (
          <li key={l}>
            <button onClick={() => scrollTo(l)} className={`nav-link ${active === l ? 'active' : ''}`} data-hover="true">
              {l}
            </button>
          </li>
        ))}
      </ul>

      <button className="hamburger" onClick={() => setOpen(o => !o)} data-hover="true">
        <span className={open ? 'open' : ''} />
        <span className={open ? 'open' : ''} />
        <span className={open ? 'open' : ''} />
      </button>

      {open && (
        <div className="mobile-menu">
          {links.map(l => (
            <button key={l} onClick={() => { scrollTo(l); setOpen(false); }} className="mobile-link" data-hover="true">{l}</button>
          ))}
        </div>
      )}
    </nav>
  );
}
