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
      gsap.fromTo('.faq-title', 
        { y: 40, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 0.8, 
          ease: "power3.out",
          scrollTrigger: {
            trigger: '.faq-title',
            start: 'top 80%',
          }
        }
      );

      gsap.fromTo('.faq-item', 
        { y: 30, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 0.5, 
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: '.faq-item',
            start: 'top 85%',
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="faq" className="py-24 lg:py-32 relative">
      <div className="container mx-auto px-6 max-w-3xl">
        <h2 className="faq-title text-4xl md:text-5xl font-bold text-center mb-16">
          Frequently Asked <span className="text-primary">Questions</span>
        </h2>

        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem 
              key={index} 
              value={`item-${index}`}
              className="faq-item bg-card border border-border rounded-xl px-6 data-[state=open]:border-primary/50"
            >
              <AccordionTrigger className="text-left text-lg font-semibold hover:text-primary transition-colors py-5">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-5 leading-relaxed">
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
