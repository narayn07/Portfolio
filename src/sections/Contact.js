import { useRef, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export default function Contact() {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sending, setSending] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => e.isIntersecting && setVis(true), { threshold: 0.15 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const handleSubmit = e => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setForm({ name: '', email: '', message: '' });
      toast.success("Message sent! I'll get back to you soon 🚀");
    }, 1500);
  };

  const info = [
    { icon: '📧', label: 'Email', value: 'naraynprabhu44@example.com' },
    { icon: '📍', label: 'Location', value: 'Vadodara, Gujarat' },
    { icon: '💼', label: 'Available', value: 'Open to opportunities' },
  ];

  return (
    <section id="contact" className="section contact-section" ref={ref}>
      <div className={`section-tag reveal ${vis ? 'visible' : ''}`}>{'// contact'}</div>
      <h2 className={`section-title reveal ${vis ? 'visible' : ''}`} style={{ transitionDelay: '0.1s' }}>Let's Work Together</h2>
      <p className={`section-sub reveal ${vis ? 'visible' : ''}`} style={{ transitionDelay: '0.2s' }}>Have a project in mind? Let's build something amazing.</p>

      <div className="contact-grid">
        <div className={`contact-info reveal slide-left ${vis ? 'visible' : ''}`} style={{ transitionDelay: '0.3s' }}>
          {info.map(item => (
            <div key={item.label} className="info-card" data-hover="true">
              <span className="info-icon">{item.icon}</span>
              <div>
                <span className="info-label">{item.label}</span>
                <span className="info-value">{item.value}</span>
              </div>
            </div>
          ))}
          <div className="contact-socials">
            {[{ l: 'GitHub', h: 'https://github.com/narayn07' }, { l: 'LinkedIn', h: 'https://linkedin.com/in/naraynprabhu7' }, { l: 'Twitter', h: 'https://twitter.com' }, { l: 'Instagram', h: 'https://instagram.com/narayn_7' }].map(s => (
              <a key={s.l} href={s.h} target="_blank" rel="noreferrer" className="social-pill" data-hover="true">{s.l}</a>
            ))}
          </div>
        </div>

        <form className={`contact-form reveal slide-right ${vis ? 'visible' : ''}`} onSubmit={handleSubmit} style={{ transitionDelay: '0.4s' }}>
          <div className="form-group">
            <input placeholder="Your Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
          </div>
          <div className="form-group">
            <input type="email" placeholder="Your Email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required />
          </div>
          <div className="form-group">
            <textarea placeholder="Your Message" rows={5} value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} required />
          </div>
          <button type="submit" className="btn-primary full-width" disabled={sending} data-hover="true">
            {sending ? 'Sending...' : 'Send Message 🚀'}
          </button>
        </form>
      </div>
    </section>
  );
}
