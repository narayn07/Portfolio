export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-logo">
        <span className="logo-bracket">&lt;</span>
        <span className="logo-name">Narayn</span>
        <span className="logo-bracket">/&gt;</span>
      </div>
      <p className="footer-text">Designed & Built by <strong>Narayn</strong> with ❤️ and lots of ☕</p>
      <p className="footer-copy">© {new Date().getFullYear()} All rights reserved.</p>
    </footer>
  );
}
