import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { HelpCircle } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

gsap.registerPlugin(ScrollTrigger);

const faqs = [
  {
    icon: '🚀',
    question: 'How do I become a Superteam Brazil member?',
    answer: 'Join our Telegram community and start participating! We welcome builders, creators, designers, and anyone passionate about Solana. Active contributors are often invited to join our core initiatives.',
  },
  {
    icon: '💰',
    question: 'What opportunities are available through Superteam?',
    answer: 'We offer grants up to $10K through Superteam Earn, bounty opportunities, hackathon coaching, job placements, and access to exclusive events across Brazil and internationally.',
  },
  {
    icon: '🏆',
    question: 'Do I need experience in Web3 to participate?',
    answer: 'Not at all! We welcome everyone from complete beginners to Web3 experts. We provide education, workshops, and mentorship to help you grow in the Solana ecosystem.',
  },
  {
    icon: '🇧🇷',
    question: 'Are events only held in major cities?',
    answer: 'We reach across Brazil! Our 2024 roadshow covered 8,000+ km, bringing Solana education to cities nationwide. We also host online events accessible from anywhere.',
  },
  {
    icon: '🤝',
    question: 'How can my project partner with Superteam Brazil?',
    answer: 'Reach out through our Telegram or Twitter! We collaborate with projects for events, hackathons, educational content, and ecosystem growth initiatives.',
  },
  {
    icon: '🎯',
    question: 'What makes Superteam Brazil different from other communities?',
    answer: 'We combine global Superteam network resources with deep local Brazilian market knowledge, offering both international opportunities and cultural relevance for Latin American builders.',
  },
];

const FAQ = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo('.faq-title', 
        { y: 60, opacity: 0, scale: 0.95 },
        { 
          y: 0, 
          opacity: 1, 
          scale: 1,
          duration: 1, 
          ease: "power3.out",
          scrollTrigger: {
            trigger: '.faq-title',
            start: 'top 85%',
          }
        }
      );

      // FAQ items with staggered reveal
      gsap.utils.toArray('.faq-item').forEach((item: any, i) => {
        gsap.fromTo(item, 
          { y: 60, opacity: 0, scale: 0.98 },
          { 
            y: 0, 
            opacity: 1, 
            scale: 1,
            duration: 0.7, 
            delay: i * 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: 'top 90%',
            }
          }
        );
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="faq" className="py-28 lg:py-40 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-20 right-20 w-72 h-72 bg-yellow-500/3 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-purple-500/3 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <div className="faq-title">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-yellow-500/10 mb-6">
              <HelpCircle className="w-8 h-8 text-yellow-500" />
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Frequently Asked <span className="text-yellow-500">Questions</span>
            </h2>
            <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto">
              Everything you need to know about joining Superteam Brazil
            </p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`} 
                className="faq-item bg-card border border-border rounded-2xl px-6 py-4 hover:border-yellow-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-yellow-500/5"
              >
                <AccordionTrigger className="text-left hover:no-underline group text-lg font-semibold py-6">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-yellow-500/10 flex items-center justify-center text-lg group-hover:bg-yellow-500/20 transition-colors duration-300">
                      {faq.icon}
                    </div>
                    <span className="group-hover:text-yellow-500 transition-colors duration-300">
                      {faq.question}
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pt-2 pb-6 pl-14">
                  <p className="text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <p className="text-muted-foreground text-lg mb-6">
            Still have questions?
          </p>
          <a 
            href="https://t.me/superteambr" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 bg-yellow-500 hover:bg-yellow-400 text-black font-bold rounded-full transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-yellow-500/30"
          >
            Ask in Telegram
            <span className="text-lg">📱</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
