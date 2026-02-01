import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TrendingUp, Zap, Clock, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';

gsap.registerPlugin(ScrollTrigger);

const recentWins = [
  {
    name: 'João Silva',
    achievement: 'Won $5K DeFi Hackathon',
    time: '2 days ago',
    icon: '🏆',
  },
  {
    name: 'Maria Santos',
    achievement: 'Secured $10K Grant',
    time: '5 days ago',
    icon: '💰',
  },
  {
    name: 'Carlos Mendes',
    achievement: 'Joined Core Team',
    time: '1 week ago',
    icon: '⭐',
  },
];

const activeOpportunities = [
  {
    title: 'Frontend Developer Bounty',
    reward: '$2,500',
    applicants: 12,
    deadline: '3 days',
    category: 'Development',
  },
  {
    title: 'Content Creator Grant',
    reward: '$1,500',
    applicants: 8,
    deadline: '5 days',
    category: 'Content',
  },
  {
    title: 'Smart Contract Audit',
    reward: '$3,000',
    applicants: 5,
    deadline: '7 days',
    category: 'Security',
  },
];

const LiveActivity = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo('.live-title',
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: '.live-title',
            start: 'top 85%',
          }
        }
      );

      // Cards stagger
      gsap.utils.toArray('.live-card').forEach((card: any, i) => {
        gsap.fromTo(card,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            delay: i * 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: 'top 90%',
            }
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-28 lg:py-32 relative overflow-hidden bg-gradient-to-b from-background to-muted/20">
      {/* Background effects */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-yellow-500/20 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/30 rounded-full mb-6">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-sm font-medium text-green-600 dark:text-green-400">Live Updates</span>
          </div>
          <h2 className="live-title text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Real Wins. <span className="text-primary">Real Time.</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            See what's happening right now in the Superteam Brazil community.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Recent Community Wins */}
          <div className="live-card">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-yellow-500/10 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-yellow-500" />
              </div>
              <h3 className="text-2xl font-bold">Recent Community Wins</h3>
            </div>

            <div className="space-y-4">
              {recentWins.map((win, index) => (
                <div
                  key={index}
                  className="p-5 rounded-2xl bg-card border border-border hover:border-yellow-500/50 transition-all duration-300 group"
                >
                  <div className="flex items-start gap-4">
                    <div className="text-3xl shrink-0">{win.icon}</div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-semibold group-hover:text-primary transition-colors">
                          {win.name}
                        </h4>
                        <span className="text-xs text-muted-foreground">{win.time}</span>
                      </div>
                      <p className="text-sm text-yellow-600 dark:text-yellow-400 font-medium">
                        {win.achievement}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 rounded-xl bg-muted/50 border border-border">
              <p className="text-sm text-center">
                <span className="font-semibold text-primary">You could be next!</span> Browse opportunities below.
              </p>
            </div>
          </div>

          {/* Active Opportunities - FOMO */}
          <div className="live-card">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Zap className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-2xl font-bold">Hot Opportunities Right Now</h3>
            </div>

            <div className="space-y-4">
              {activeOpportunities.map((opp, index) => (
                <div
                  key={index}
                  className="p-5 rounded-2xl bg-gradient-to-br from-card to-primary/5 border border-primary/20 hover:border-primary/50 transition-all duration-300 group cursor-pointer hover:shadow-lg"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <span className="inline-block text-xs font-semibold text-primary uppercase tracking-wider bg-primary/10 px-2 py-1 rounded mb-2">
                        {opp.category}
                      </span>
                      <h4 className="font-bold text-base group-hover:text-primary transition-colors">
                        {opp.title}
                      </h4>
                    </div>
                    <span className="text-xl font-bold text-yellow-500">{opp.reward}</span>
                  </div>

                  <div className="flex items-center justify-between text-xs text-muted-foreground mt-3 pt-3 border-t border-border/50">
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {opp.deadline} left
                      </span>
                      <span className="flex items-center gap-1">
                        <Award className="w-3 h-3" />
                        {opp.applicants} applying
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6">
              <a href="https://earn.superteam.fun/s/superteambr" target="_blank" rel="noopener noreferrer">
                <Button className="w-full gap-2 bg-primary hover:bg-primary/90">
                  <Zap className="w-4 h-4" />
                  Browse All Opportunities
                </Button>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom CTA Strip */}
        <div className="mt-16 p-8 rounded-3xl bg-gradient-to-r from-primary/10 to-yellow-500/10 border border-primary/30 text-center">
          <h3 className="text-2xl md:text-3xl font-bold mb-3">
            🔥 Don't Watch from the Sidelines
          </h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            While you're reading this, someone just secured their first grant. Join the fastest-growing Solana community in LATAM and start building today.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="https://t.me/superteambr" target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="gap-2">
                Join Telegram Now
              </Button>
            </a>
            <a href="https://earn.superteam.fun" target="_blank" rel="noopener noreferrer">
              <Button size="lg" variant="outline" className="gap-2">
                Explore Bounties
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LiveActivity;
