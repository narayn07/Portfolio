import { useEffect, useRef } from 'react';

export default function ParticleBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx    = canvas.getContext('2d');
    let id, t = 0;

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    /* ── 1. Stars ── */
    const STAR_COUNT = 160;
    const stars = Array.from({ length: STAR_COUNT }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: Math.random() * 1.2 + 0.2,
      ph: Math.random() * Math.PI * 2,
      speed: Math.random() * 0.3 + 0.1,
    }));

    /* ── 2. Floating glowing orbs ── */
    const orbs = [
      { x: 0.15, y: 0.20, r: 0.22, hue: 220, alpha: 0.07, sx: 0.00008, sy: 0.00005 },
      { x: 0.80, y: 0.15, r: 0.18, hue: 260, alpha: 0.06, sx:-0.00006, sy: 0.00007 },
      { x: 0.50, y: 0.70, r: 0.25, hue: 200, alpha: 0.05, sx: 0.00005, sy:-0.00006 },
      { x: 0.85, y: 0.75, r: 0.16, hue: 240, alpha: 0.07, sx:-0.00007, sy:-0.00004 },
    ];

    /* ── 3. Shooting stars ── */
    const shoots = [];
    const spawnShoot = () => {
      shoots.push({
        x: Math.random(),
        y: Math.random() * 0.5,
        len: Math.random() * 0.12 + 0.06,
        speed: Math.random() * 0.004 + 0.003,
        alpha: 1,
        angle: Math.PI / 5 + (Math.random() - 0.5) * 0.3,
      });
    };

    /* ── 4. Perspective grid ── */
    const drawGrid = (W, H) => {
      const LINES = 14;
      const horizon = H * 0.52;
      const vp = { x: W * 0.5, y: horizon };
      ctx.save();
      ctx.globalAlpha = 0.06;

      /* vertical lines */
      for (let i = 0; i <= LINES; i++) {
        const frac = i / LINES;
        const bx = frac * W;
        ctx.beginPath();
        ctx.moveTo(vp.x, vp.y);
        ctx.lineTo(bx, H);
        ctx.strokeStyle = `rgba(180,180,255,1)`;
        ctx.lineWidth = 0.6;
        ctx.stroke();
      }

      /* horizontal lines — perspective spacing */
      const HLINES = 10;
      for (let i = 1; i <= HLINES; i++) {
        const frac = Math.pow(i / HLINES, 1.8);
        const y = horizon + frac * (H - horizon);
        /* animated shift */
        const shift = ((t * 0.18) % (1 / HLINES)) * (H - horizon);
        const ry = y + shift;
        if (ry > H) continue;
        ctx.beginPath();
        ctx.moveTo(0, ry);
        ctx.lineTo(W, ry);
        ctx.strokeStyle = `rgba(180,180,255,1)`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
      ctx.restore();
    };

    /* ── 5. Floating nodes + edges ── */
    const NODE_COUNT = 50;
    const nodes = Array.from({ length: NODE_COUNT }, () => ({
      x: Math.random(),
      y: Math.random(),
      vx: (Math.random() - 0.5) * 0.00012,
      vy: (Math.random() - 0.5) * 0.00012,
      r: Math.random() * 1.8 + 0.6,
      ph: Math.random() * Math.PI * 2,
    }));

    let shootTimer = 0;

    const draw = () => {
      t += 0.005;
      shootTimer += 0.005;
      const W = canvas.width, H = canvas.height;

      /* background */
      ctx.fillStyle = '#000';
      ctx.fillRect(0, 0, W, H);

      /* ── orbs ── */
      orbs.forEach(o => {
        o.x += o.sx; o.y += o.sy;
        if (o.x < -0.1) o.x = 1.1;
        if (o.x > 1.1)  o.x = -0.1;
        if (o.y < -0.1) o.y = 1.1;
        if (o.y > 1.1)  o.y = -0.1;
        const cx = o.x * W, cy = o.y * H, rad = o.r * Math.min(W, H);
        const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, rad);
        g.addColorStop(0,   `hsla(${o.hue},80%,65%,${o.alpha})`);
        g.addColorStop(0.5, `hsla(${o.hue},70%,55%,${o.alpha * 0.4})`);
        g.addColorStop(1,   `hsla(${o.hue},70%,55%,0)`);
        ctx.beginPath();
        ctx.arc(cx, cy, rad, 0, Math.PI * 2);
        ctx.fillStyle = g;
        ctx.fill();
      });

      /* ── perspective grid ── */
      drawGrid(W, H);

      /* ── stars ── */
      stars.forEach(s => {
        const tw = 0.2 + 0.8 * Math.abs(Math.sin(t * s.speed + s.ph));
        ctx.beginPath();
        ctx.arc(s.x * W, s.y * H, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${tw * 0.55})`;
        ctx.fill();
      });

      /* ── shooting stars ── */
      if (shootTimer > 1.2 + Math.random() * 2) {
        spawnShoot();
        shootTimer = 0;
      }
      for (let i = shoots.length - 1; i >= 0; i--) {
        const s = shoots[i];
        s.x += Math.cos(s.angle) * s.speed;
        s.y += Math.sin(s.angle) * s.speed;
        s.alpha -= 0.018;
        if (s.alpha <= 0 || s.x > 1.1 || s.y > 1.1) { shoots.splice(i, 1); continue; }
        const x1 = s.x * W, y1 = s.y * H;
        const x0 = x1 - Math.cos(s.angle) * s.len * W;
        const y0 = y1 - Math.sin(s.angle) * s.len * H;
        const grad = ctx.createLinearGradient(x0, y0, x1, y1);
        grad.addColorStop(0, `rgba(255,255,255,0)`);
        grad.addColorStop(1, `rgba(255,255,255,${s.alpha * 0.9})`);
        ctx.beginPath();
        ctx.moveTo(x0, y0);
        ctx.lineTo(x1, y1);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }

      /* ── nodes ── */
      nodes.forEach(n => {
        n.x += n.vx; n.y += n.vy;
        if (n.x < 0) n.x = 1; if (n.x > 1) n.x = 0;
        if (n.y < 0) n.y = 1; if (n.y > 1) n.y = 0;
        n.ph += 0.016;
      });

      /* edges */
      const CDIST = 0.16 * W;
      for (let i = 0; i < NODE_COUNT; i++) {
        for (let j = i + 1; j < NODE_COUNT; j++) {
          const dx = (nodes[i].x - nodes[j].x) * W;
          const dy = (nodes[i].y - nodes[j].y) * H;
          const d  = Math.hypot(dx, dy);
          if (d < CDIST) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(255,255,255,${(1 - d / CDIST) * 0.12})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(nodes[i].x * W, nodes[i].y * H);
            ctx.lineTo(nodes[j].x * W, nodes[j].y * H);
            ctx.stroke();
          }
        }
      }

      /* node dots */
      nodes.forEach(n => {
        const tw = 0.35 + 0.65 * Math.abs(Math.sin(n.ph));
        const nx = n.x * W, ny = n.y * H;
        const grd = ctx.createRadialGradient(nx, ny, 0, nx, ny, n.r * 5);
        grd.addColorStop(0, `rgba(255,255,255,${tw * 0.2})`);
        grd.addColorStop(1, 'rgba(255,255,255,0)');
        ctx.beginPath(); ctx.arc(nx, ny, n.r * 5, 0, Math.PI * 2);
        ctx.fillStyle = grd; ctx.fill();
        ctx.beginPath(); ctx.arc(nx, ny, n.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${tw * 0.75})`; ctx.fill();
      });

      id = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(id);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'fixed', inset: 0, zIndex: -1, pointerEvents: 'none' }}
    />
  );
}
