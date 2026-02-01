import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Heart, MessageCircle, Repeat2, Twitter } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Tweet {
  id: string;
  author: string;
  handle: string;
  avatar: string;
  content: string;
  likes: number;
  retweets: number;
  replies: number;
  date: string;
  verified?: boolean;
}

const tweets: Tweet[] = [
  {
    id: '1',
    author: 'Solana Foundation',
    handle: '@solana',
    avatar: '/avatars/solana.jpg',
    content: 'Proud to support @SuperteamBR and their incredible work building the Solana ecosystem in Brazil! 🇧🇷 The energy and talent coming from this community is absolutely amazing.',
    likes: 234,
    retweets: 67,
    replies: 45,
    date: '2h',
    verified: true,
  },
  {
    id: '2',
    author: 'Pedro Marafiotti',
    handle: '@pedromarafiotti',
    avatar: '/avatars/pedro.jpg',
    content: 'Just wrapped up an incredible Superteam Brazil event in São Paulo! 🦜 Over 200 builders, creators, and innovators came together to push the boundaries of what\'s possible on Solana. The future is bright! ☀️',
    likes: 189,
    retweets: 42,
    replies: 28,
    date: '4h',
  },
  {
    id: '3',
    author: 'Phantom',
    handle: '@phantom',
    avatar: '/avatars/phantom.jpg',
    content: 'Shoutout to @SuperteamBR for consistently delivering top-tier talent and innovation in the Brazilian market. Your hackathon participants are exceptional! 👻⚡',
    likes: 156,
    retweets: 35,
    replies: 19,
    date: '1d',
    verified: true,
  },
  {
    id: '4',
    author: 'Jupiter 🪐',
    handle: '@JupiterExchange',
    avatar: '/avatars/jupiter.jpg',
    content: 'Brazil\'s Web3 scene is 🔥 and @SuperteamBR is leading the charge! Amazing to see the talent and passion coming from this community. Keep building! 🚀',
    likes: 203,
    retweets: 58,
    replies: 34,
    date: '2d',
    verified: true,
  },
  {
    id: '5',
    author: 'Builder from SP',
    handle: '@buildersp',
    avatar: '/avatars/builder.jpg',
    content: 'Attending @SuperteamBR events changed my career trajectory completely. From zero Web3 knowledge to landing a role at a top Solana project in 6 months. Grateful for this community! 🙏',
    likes: 145,
    retweets: 29,
    replies: 16,
    date: '3d',
  },
  {
    id: '6',
    author: 'Orca',
    handle: '@orca_so',
    avatar: '/avatars/orca.jpg',
    content: 'The Brazilian developer ecosystem continues to impress us. @SuperteamBR is doing incredible work fostering the next generation of Solana builders! 🐋💙',
    likes: 167,
    retweets: 41,
    replies: 22,
    date: '4d',
    verified: true,
  },
];

const Tweets = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(titleRef.current, 
        { y: 60, opacity: 0, scale: 0.95 },
        { 
          y: 0, 
          opacity: 1, 
          scale: 1,
          duration: 1, 
          ease: "power3.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 85%',
          }
        }
      );

      // Tweet cards stagger animation
      gsap.fromTo('.tweet-card', 
        { y: 100, opacity: 0, scale: 0.9 },
        { 
          y: 0, 
          opacity: 1, 
          scale: 1,
          duration: 0.8, 
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: '.tweet-card',
            start: 'top 90%',
          }
        }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  return (
    <section ref={sectionRef} className="py-28 lg:py-40 bg-background relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-20 right-20 w-64 h-64 bg-yellow-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-20 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div ref={titleRef} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Wall of <span className="text-yellow-500">Love</span>
          </h2>
          <p className="text-muted-foreground text-lg md:text-xl max-w-3xl mx-auto">
            What the Solana ecosystem is saying about Superteam Brazil
          </p>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tweets.map((tweet, index) => (
            <div 
              key={tweet.id} 
              className={`tweet-card bg-card border border-border rounded-2xl p-6 hover:border-yellow-500/50 hover:shadow-lg hover:shadow-yellow-500/10 transition-all duration-300 group ${
                index === 0 ? 'md:col-span-2 lg:col-span-1' : ''
              }`}
            >
              {/* Header */}
              <div className="flex items-start gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center overflow-hidden">
                  {tweet.author.includes('Solana') && <span className="text-2xl">◎</span>}
                  {tweet.author.includes('Phantom') && <span className="text-2xl">👻</span>}
                  {tweet.author.includes('Jupiter') && <span className="text-2xl">🪐</span>}
                  {tweet.author.includes('Orca') && <span className="text-2xl">🐋</span>}
                  {tweet.author.includes('Pedro') && <span className="text-2xl">🦜</span>}
                  {tweet.author.includes('Builder') && <span className="text-2xl">👨‍💻</span>}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-foreground truncate">{tweet.author}</h3>
                    {tweet.verified && (
                      <svg className="w-4 h-4 text-blue-500" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M22.25 12c0-1.43-.88-2.67-2.19-3.34.46-1.39.2-2.9-.81-3.91s-2.52-1.27-3.91-.81c-.66-1.31-1.91-2.19-3.34-2.19s-2.67.88-3.33 2.19c-1.4-.46-2.91-.2-3.92.81s-1.26 2.52-.8 3.91c-1.31.67-2.2 1.91-2.2 3.34s.89 2.67 2.2 3.34c-.46 1.39-.21 2.9.8 3.91s2.52 1.27 3.91.81c.67 1.31 1.91 2.19 3.34 2.19s2.68-.88 3.34-2.19c1.39.45 2.9.2 3.91-.81s1.27-2.52.81-3.91c1.31-.67 2.19-1.91 2.19-3.34zm-11.71 4.2L6.8 12.46l1.41-1.42L10.54 13.37l5.66-5.66 1.41 1.42-7.07 7.07z"/>
                      </svg>
                    )}
                  </div>
                  <p className="text-muted-foreground text-sm">{tweet.handle}</p>
                </div>
                <div className="flex items-center gap-1">
                  <Twitter className="w-4 h-4 text-blue-500" />
                  <span className="text-muted-foreground text-sm">{tweet.date}</span>
                </div>
              </div>

              {/* Content */}
              <p className="text-foreground mb-4 leading-relaxed">
                {tweet.content}
              </p>

              {/* Actions */}
              <div className="flex items-center gap-6 text-muted-foreground">
                <div className="flex items-center gap-2 hover:text-blue-500 transition-colors cursor-pointer">
                  <MessageCircle className="w-4 h-4" />
                  <span className="text-sm">{formatNumber(tweet.replies)}</span>
                </div>
                <div className="flex items-center gap-2 hover:text-green-500 transition-colors cursor-pointer">
                  <Repeat2 className="w-4 h-4" />
                  <span className="text-sm">{formatNumber(tweet.retweets)}</span>
                </div>
                <div className="flex items-center gap-2 hover:text-red-500 transition-colors cursor-pointer">
                  <Heart className="w-4 h-4" />
                  <span className="text-sm">{formatNumber(tweet.likes)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <a 
            href="https://twitter.com/SuperteamBR" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-full transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/20"
          >
            <Twitter className="w-5 h-5" />
            Follow @SuperteamBR
          </a>
        </div>
      </div>
    </section>
  );
};

export default Tweets;