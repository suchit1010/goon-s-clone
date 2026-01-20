import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import logoDark from '@/assets/logo-dark-green.png';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Mission', href: '#mission' },
    { label: 'Events', href: '#events' },
    { label: 'Members', href: '#members' },
    { label: 'FAQ', href: '#faq' },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-background/90 backdrop-blur-lg border-b border-border shadow-lg' 
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2">
            <img src={logoDark} alt="Superteam Brasil" className="h-8 md:h-10" />
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-muted-foreground hover:text-primary transition-colors duration-200 font-medium"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:block">
            <a 
              href="https://t.me/superteambr" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-6 py-2.5 bg-primary text-primary-foreground font-semibold rounded-full hover:bg-primary/90 transition-all duration-300 hover:scale-105"
            >
              Join Us
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-foreground"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-border pt-4">
            <nav className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-muted-foreground hover:text-primary transition-colors duration-200 font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <a 
                href="https://t.me/superteambr" 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-6 py-2.5 bg-primary text-primary-foreground font-semibold rounded-full text-center hover:bg-primary/90 transition-all duration-300 mt-2"
              >
                Join Us
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
