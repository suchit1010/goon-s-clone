import logoDark from '@/assets/logo-dark-green.png';
import logoYellow from '@/assets/logo-yellow-vertical.png';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { label: 'Events', href: 'https://lu.ma/Superteambrasil' },
    { label: 'Members', href: '#members' },
    { label: 'Earn', href: 'https://earn.superteam.fun/s/superteambr' },
    { label: 'Grants', href: 'https://earn.superteam.fun' },
    { label: 'FAQ', href: '#faq' },
  ];

  const socialLinks = [
    { label: 'Twitter/X', href: 'https://twitter.com/SuperteamBR' },
    { label: 'Telegram', href: 'https://t.me/superteambr' },
    { label: 'Discord', href: 'https://discord.gg/superteambr' },
    { label: 'LinkedIn', href: 'https://linkedin.com/company/superteambr' },
  ];

  return (
    <footer className="relative py-16 border-t border-border bg-background overflow-hidden">
      {/* Large Watermark Text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
        <h2 className="text-[12rem] md:text-[20rem] lg:text-[20rem] font-bold text-white/[0.01] whitespace-nowrap leading-none">
          superteam
        </h2>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Logo & Description */}
          <div className="md:col-span-2">
            <img src={logoYellow} alt="Superteam Brasil" className="h-16 mb-4" />
            <p className="text-muted-foreground max-w-md">
              Building the home for Solana talent in Latin America's largest market. 
              Join our community of builders, creators, and innovators.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4 text-foreground">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a 
                    href={link.href}
                    target={link.href.startsWith('http') ? '_blank' : undefined}
                    rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-semibold mb-4 text-foreground">Connect</h4>
            <ul className="space-y-2">
              {socialLinks.map((link) => (
                <li key={link.label}>
                  <a 
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {currentYear} Superteam Brasil. All rights reserved.
          </p>
          <a 
            href="https://superteam.fun" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            Global Superteam →
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
