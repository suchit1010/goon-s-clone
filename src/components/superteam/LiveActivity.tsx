import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Activity, TrendingUp, Zap, Users, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';

gsap.registerPlugin(ScrollTrigger);

const liveActivities = [
  {
    type: 'grant',
    user: 'Maria Silva',
    action: 'received $5K grant',
    project: 'DeFi Dashboard',
    time: '2 hours ago',
    icon: DollarSign,
    color: 'text-green-500',
  },
  {
    type: 'bounty',
    user: 'João Santos',
    action: 'completed bounty',
    project: 'NFT Marketplace',
    time: '5 hours ago',
    icon: TrendingUp,
    color: 'text-yellow-500',
  },
  {
    type: 'member',
    user: '12 new builders',
    action: 'joined community',
    project: 'Superteam Brazil',
    time: 'Today',
    icon: Users,
    color: 'text-primary',
  },
  {
    type: 'activity',
    user: 'Carlos Mendes',
    action: 'launched project',
    project: 'Solana Pay Integration',
    time: '1 day ago',
    icon: Zap,
    color: 'text-purple-500',
  },
];

const LiveActivity = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo('.activity-title', 
        { y: 60, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 1, 
          ease: "power3.out",
          scrollTrigger: {
            trigger: '.activity-title',
            start: 'top 85%',
          }
        }
      );

      // Activity items animation
      gsap.fromTo('.activity-item', 
        { x: -60, opacity: 0 },
        { 
          x: 0, 
          opacity: 1, 
          duration: 0.6, 
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: '.activity-item',
            start: 'top 90%',
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-28 lg:py-40 bg-background relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/5 to-transparent" />
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-full mb-6">
            <Activity className="w-4 h-4 text-green-500 animate-pulse" />
            <span className="text-sm font-medium text-green-500">Live Activity</span>
          </div>
          <h2 className="activity-title text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Happening <span className="text-primary">Right Now</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Real-time updates from our vibrant community. See what builders are achieving today.
          </p>
        </div>

        {/* Activity Feed */}
        <div className="max-w-3xl mx-auto space-y-4">
          {liveActivities.map((activity, index) => {
            const Icon = activity.icon;
            return (
              <div 
                key={index}
                className="activity-item flex items-center gap-4 p-5 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all duration-300 hover:scale-[1.02]"
              >
                <div className={`w-12 h-12 rounded-xl bg-muted flex items-center justify-center ${activity.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-foreground">
                    {activity.user} <span className="text-muted-foreground font-normal">{activity.action}</span>
                  </p>
                  <p className="text-sm text-muted-foreground">{activity.project}</p>
                </div>
                <div className="text-sm text-muted-foreground">
                  {activity.time}
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <p className="text-muted-foreground mb-6 text-lg">
            Join the movement and start building today
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="https://discord.com/invite/superteambrasil" target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="gap-2">
                Join Community
              </Button>
            </a>
            <a href="https://earn.superteam.fun" target="_blank" rel="noopener noreferrer">
              <Button size="lg" variant="outline" className="gap-2">
                Explore Opportunities
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LiveActivity;
