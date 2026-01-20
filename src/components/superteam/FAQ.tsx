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
    answer: "Superteam Brazil is the Brazilian chapter of Superteam, a global community of builders, creators, and operators helping the most promising projects in the Solana ecosystem. We provide support through mentorship, events, grants, and job opportunities."
  },
  {
    question: "How do I become a member?",
    answer: "Join our Telegram community to start engaging with other members. Active contributors who demonstrate skills and commitment can apply to become verified members with access to exclusive opportunities, bounties, and grants."
  },
  {
    question: "What opportunities are available?",
    answer: "We offer bounties for various skills (development, design, content, marketing), full-time job postings from Solana projects, grants for builders, and access to hackathons and educational workshops."
  },
  {
    question: "How can projects partner with us?",
    answer: "Projects can partner with Superteam Brazil to access top Brazilian talent, host events, sponsor hackathons, or post bounties. Reach out to us on Telegram or Twitter to discuss collaboration opportunities."
  },
  {
    question: "Do I need to be a developer to join?",
    answer: "Not at all! While we have many developers, we also need designers, content creators, marketers, community managers, and business development professionals. The Solana ecosystem needs diverse skills to grow."
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
        <h2 className="faq-title text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-16">
          Frequently Asked <span className="text-primary">Questions</span>
        </h2>

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
