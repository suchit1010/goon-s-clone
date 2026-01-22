import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

gsap.registerPlugin(ScrollTrigger);

const faqs = [
  {
    question: "What is Superteam Brazil?",
    answer: "Superteam Brazil is the Brazilian chapter of Superteam, a global community for Solana builders in Brazil, focused on education, grants, and networking. Launched in 2024, we've already impacted 20,000+ participants and distributed over $66.5K in grants."
  },
  {
    question: "How do I become a member?",
    answer: "Apply via bounties on Superteam Earn or join our events—membership is by invite for top talents who demonstrate skills and commitment. Start by joining our Telegram community to engage with other members."
  },
  {
    question: "What opportunities are available?",
    answer: "Grants up to $10K from the Solana Foundation, bounties, freelance jobs, and hackathon coaching. We connect Brazilian talent to global Solana projects through our platform."
  },
  {
    question: "How can projects partner with us?",
    answer: "Contact us via Telegram for event or grant partnerships. Projects can access top Brazilian talent, host events, sponsor hackathons, or post bounties through our network."
  },
  {
    question: "Do I need to be a developer to join?",
    answer: "No! Designers, marketers, content creators, community managers, and founders are all welcome. The Solana ecosystem needs diverse skills to grow, and we value all contributions."
  },
];

const FAQ = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo('.faq-title', 
        { y: 80, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
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

      // Hover animation for FAQ items
      gsap.utils.toArray('.faq-item').forEach((item: any) => {
        item.addEventListener('mouseenter', () => {
          gsap.to(item, { x: 10, duration: 0.3, ease: "power2.out" });
        });
        item.addEventListener('mouseleave', () => {
          gsap.to(item, { x: 0, duration: 0.3, ease: "power2.out" });
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="faq" className="py-28 lg:py-40 relative overflow-hidden">
      {/* Background */}
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-primary/3 rounded-full blur-3xl -translate-y-1/2" />
      
      <div className="container mx-auto px-6 max-w-3xl relative z-10">
        <h2 className="faq-title text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-6">
          Frequently Asked <span className="text-primary">Questions</span>
        </h2>
        <p className="text-muted-foreground text-center mb-16 max-w-xl mx-auto">
          Everything you need to know to get started with Superteam Brazil.
        </p>

        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem 
              key={index} 
              value={`item-${index}`}
              className="faq-item bg-card border border-border rounded-2xl px-6 lg:px-8 data-[state=open]:border-primary/50 transition-all duration-300 hover:shadow-lg"
            >
              <AccordionTrigger className="text-left text-lg lg:text-xl font-semibold hover:text-primary transition-colors py-6 hover:no-underline">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-6 text-base lg:text-lg leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQ;
