import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cursor from './components/Cursor';
import ParticleBackground from './components/ParticleBackground';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Hero from './sections/Hero';
import About from './sections/About';
import Skills from './sections/Skills';
import Projects from './sections/Projects';
import Contact from './sections/Contact';

export default function App() {
  return (
    <>
      <Cursor />
      <ParticleBackground />
      <div className="app">
        <Navbar />
        <main>
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Contact />
        </main>
        <Footer />
      </div>
      <ToastContainer position="bottom-right" autoClose={3000} theme="dark" />
    </>
  );
}
