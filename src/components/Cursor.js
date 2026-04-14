import { useEffect, useRef } from 'react';
import './Cursor.css';

export default function Cursor() {
  const blobRef = useRef(null);
  const dotRef  = useRef(null);

  useEffect(() => {
    const blob = blobRef.current;
    const dot  = dotRef.current;

    let mx = window.innerWidth / 2, my = window.innerHeight / 2;
    let bx = mx, by = my;
    let rafId, inside = false;

    const show = () => { dot.style.opacity = '1'; blob.style.opacity = '1'; };
    const hide = () => { dot.style.opacity = '0'; blob.style.opacity = '0'; };

    const onMove = e => {
      mx = e.clientX; my = e.clientY;
      dot.style.left = mx + 'px';
      dot.style.top  = my + 'px';
      if (!inside) { inside = true; show(); }
    };

    /* hide when mouse leaves the page entirely */
    const onLeaveDoc = () => { inside = false; hide(); };
    const onEnterDoc = () => { inside = true;  show(); };

    /* hide when window loses focus (e.g. DevTools opens) */
    const onBlur  = () => hide();
    const onFocus = () => { if (inside) show(); };

    const onEnter = e => {
      if (e.target.matches('a,button,input,textarea,select,[data-hover]'))
        blob.classList.add('hover');
    };
    const onLeave = e => {
      if (e.target.matches('a,button,input,textarea,select,[data-hover]'))
        blob.classList.remove('hover');
    };
    const onDown = () => blob.classList.add('press');
    const onUp   = () => blob.classList.remove('press');

    const loop = () => {
      bx += (mx - bx) * 0.1;
      by += (my - by) * 0.1;
      blob.style.left = bx + 'px';
      blob.style.top  = by + 'px';
      rafId = requestAnimationFrame(loop);
    };
    loop();

    /* start hidden until first mouse move */
    hide();

    window.addEventListener('mousemove',   onMove);
    window.addEventListener('mousedown',   onDown);
    window.addEventListener('mouseup',     onUp);
    window.addEventListener('blur',        onBlur);
    window.addEventListener('focus',       onFocus);
    document.addEventListener('mouseover',  onEnter);
    document.addEventListener('mouseout',   onLeave);
    document.documentElement.addEventListener('mouseleave', onLeaveDoc);
    document.documentElement.addEventListener('mouseenter', onEnterDoc);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove',   onMove);
      window.removeEventListener('mousedown',   onDown);
      window.removeEventListener('mouseup',     onUp);
      window.removeEventListener('blur',        onBlur);
      window.removeEventListener('focus',       onFocus);
      document.removeEventListener('mouseover',  onEnter);
      document.removeEventListener('mouseout',   onLeave);
      document.documentElement.removeEventListener('mouseleave', onLeaveDoc);
      document.documentElement.removeEventListener('mouseenter', onEnterDoc);
    };
  }, []);

  return (
    <>
      <div ref={dotRef}  className="c-dot"  />
      <div ref={blobRef} className="c-blob" />
    </>
  );
}
