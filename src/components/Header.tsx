import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

const Header = () => {
  const headerRef = useRef<HTMLElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    gsap.fromTo(
      headerRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, delay: 1, ease: "power3.out" }
    );
  }, []);

  return (
    <header
      ref={headerRef}
      className={`fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-6 transition-all duration-500 ${
        isScrolled ? 'bg-background/80 backdrop-blur-md' : ''
      }`}
    >
      <nav className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="text-2xl font-black text-foreground tracking-tighter hover:text-primary transition-colors">
          GOONS
        </a>

        {/* Navigation Links */}
        <ul className="hidden md:flex items-center gap-8">
          <li>
            <a href="#works" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Works
            </a>
          </li>
          <li>
            <a href="#about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              About
            </a>
          </li>
          <li>
            <a href="#process" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Process
            </a>
          </li>
        </ul>

        {/* CTA */}
        <a
          href="#contact"
          className="px-5 py-2.5 text-sm font-medium border border-foreground/20 rounded-full text-foreground hover:bg-foreground hover:text-background transition-all duration-300"
        >
          Contact
        </a>
      </nav>
    </header>
  );
};

export default Header;
