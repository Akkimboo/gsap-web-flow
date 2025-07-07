import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const contactInfo = [
    {
      icon: Mail,
      title: "Email Us",
      content: "hello@techflow.com",
      color: "primary"
    },
    {
      icon: Phone,
      title: "Call Us",
      content: "+1 (555) 123-4567",
      color: "secondary"
    },
    {
      icon: MapPin,
      title: "Visit Us",
      content: "123 Innovation St, Tech City",
      color: "primary"
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Form animation
      const formElements = formRef.current?.children;
      if (formElements) {
        gsap.fromTo(Array.from(formElements),
          { 
            opacity: 0, 
            x: -50,
            rotationY: -15
          },
          {
            opacity: 1,
            x: 0,
            rotationY: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: formRef.current,
              start: "top 80%",
              end: "bottom 20%",
            }
          }
        );
      }

      // Contact info animation
      const infoCards = infoRef.current?.children;
      if (infoCards) {
        gsap.fromTo(Array.from(infoCards),
          { 
            opacity: 0, 
            y: 50,
            scale: 0.9
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: infoRef.current,
              start: "top 80%",
              end: "bottom 20%",
            }
          }
        );

        // Hover animations
        Array.from(infoCards).forEach((card, index) => {
          card.addEventListener('mouseenter', () => {
            gsap.to(card, {
              scale: 1.05,
              rotationY: 5,
              duration: 0.3,
              ease: "power2.out"
            });
          });

          card.addEventListener('mouseleave', () => {
            gsap.to(card, {
              scale: 1,
              rotationY: 0,
              duration: 0.3,
              ease: "power2.out"
            });
          });
        });
      }

      // Background particles animation
      const particles = document.querySelectorAll('.contact-particle');
      particles.forEach((particle, index) => {
        gsap.set(particle, {
          x: Math.random() * window.innerWidth,
          y: Math.random() * 600
        });

        gsap.to(particle, {
          y: "-=200",
          opacity: 0,
          duration: 8 + Math.random() * 4,
          ease: "none",
          repeat: -1,
          delay: Math.random() * 5
        });
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Animate button
    const submitBtn = e.currentTarget.querySelector('button[type="submit"]');
    gsap.to(submitBtn, {
      scale: 0.95,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
      ease: "power2.inOut"
    });

    // Show success toast
    toast({
      title: "Message Sent!",
      description: "We'll get back to you within 24 hours.",
    });

    // Reset form
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <section 
      ref={sectionRef}
      className="py-24 relative overflow-hidden"
      id="contact"
    >
      {/* Animated background particles */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 15 }).map((_, i) => (
          <div
            key={i}
            className="contact-particle absolute w-2 h-2 bg-primary/20 rounded-full"
          />
        ))}
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-5xl lg:text-6xl font-bold gradient-text mb-6">
            Let's Work Together
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Ready to transform your business with innovative technology? 
            Get in touch and let's discuss your next project.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <Card className="glass p-8">
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Input
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="bg-muted/50 border-primary/30 focus:border-primary"
                    required
                  />
                </div>
                <div>
                  <Input
                    name="email"
                    type="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="bg-muted/50 border-primary/30 focus:border-primary"
                    required
                  />
                </div>
              </div>

              <div>
                <Input
                  name="subject"
                  placeholder="Subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="bg-muted/50 border-primary/30 focus:border-primary"
                  required
                />
              </div>

              <div>
                <Textarea
                  name="message"
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={handleInputChange}
                  className="bg-muted/50 border-primary/30 focus:border-primary min-h-[120px]"
                  required
                />
              </div>

              <Button 
                type="submit" 
                size="lg" 
                className="w-full bg-gradient-cyber hover:scale-105 transition-transform cyber-glow"
              >
                <Send className="w-5 h-5 mr-2" />
                Send Message
              </Button>
            </form>
          </Card>

          {/* Contact Information */}
          <div ref={infoRef} className="space-y-8">
            {contactInfo.map((info, index) => {
              const Icon = info.icon;
              return (
                <Card 
                  key={index}
                  className="glass p-6 cursor-pointer group"
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${info.color === 'primary' ? 'bg-primary/20' : 'bg-secondary/20'}`}>
                      <Icon className={`w-6 h-6 ${info.color === 'primary' ? 'text-primary' : 'text-secondary'}`} />
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-1">
                        {info.title}
                      </h3>
                      <p className="text-muted-foreground">
                        {info.content}
                      </p>
                    </div>
                  </div>

                  {/* Glow effect on hover */}
                  <div className={`absolute inset-0 rounded-lg opacity-0 group-hover:opacity-20 transition-opacity duration-300 ${info.color === 'primary' ? 'bg-primary' : 'bg-secondary'}`}></div>
                </Card>
              );
            })}

            {/* Additional info */}
            <Card className="glass p-6 text-center">
              <h3 className="text-xl font-bold text-foreground mb-4">
                24/7 Support Available
              </h3>
              <p className="text-muted-foreground mb-4">
                Our team is always ready to help you with any technical questions or support needs.
              </p>
              <div className="flex justify-center">
                <div className="w-16 h-16 bg-gradient-cyber rounded-full flex items-center justify-center animate-pulse-glow">
                  <div className="w-8 h-8 bg-foreground rounded-full"></div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;