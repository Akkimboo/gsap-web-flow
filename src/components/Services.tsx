import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Card } from '@/components/ui/card';
import { Code, Cloud, Zap, Shield, Cpu, Smartphone } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Services = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  const services = [
    {
      icon: Code,
      title: "Web Development",
      description: "Modern, responsive websites and web applications built with cutting-edge technologies.",
      color: "primary"
    },
    {
      icon: Cloud,
      title: "Cloud Solutions",
      description: "Scalable cloud infrastructure and migration services for enhanced performance.",
      color: "secondary"
    },
    {
      icon: Zap,
      title: "AI & Machine Learning",
      description: "Intelligent automation and data-driven insights to transform your business.",
      color: "primary"
    },
    {
      icon: Shield,
      title: "Cybersecurity",
      description: "Comprehensive security solutions to protect your digital assets and data.",
      color: "secondary"
    },
    {
      icon: Cpu,
      title: "IoT Solutions",
      description: "Connect and automate your devices with our Internet of Things expertise.",
      color: "primary"
    },
    {
      icon: Smartphone,
      title: "Mobile Apps",
      description: "Native and cross-platform mobile applications for iOS and Android.",
      color: "secondary"
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(titleRef.current, 
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 80%",
            end: "bottom 20%",
          }
        }
      );

      // Cards stagger animation
      const cards = cardsRef.current?.children;
      if (cards) {
        gsap.fromTo(Array.from(cards),
          { 
            opacity: 0, 
            y: 80,
            rotationX: 45,
            transformPerspective: 1000
          },
          {
            opacity: 1,
            y: 0,
            rotationX: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: cardsRef.current,
              start: "top 80%",
              end: "bottom 20%",
            }
          }
        );

        // Hover animations for cards
        Array.from(cards).forEach((card, index) => {
          const serviceColor = services[index].color;
          
          card.addEventListener('mouseenter', () => {
            gsap.to(card, {
              scale: 1.05,
              y: -10,
              rotationY: 5,
              duration: 0.4,
              ease: "power2.out"
            });
            
            // Add glow effect
            gsap.to(card, {
              boxShadow: serviceColor === 'primary' ? 
                '0 20px 40px rgba(0, 186, 255, 0.4)' : 
                '0 20px 40px rgba(139, 69, 255, 0.4)',
              duration: 0.4
            });
          });

          card.addEventListener('mouseleave', () => {
            gsap.to(card, {
              scale: 1,
              y: 0,
              rotationY: 0,
              boxShadow: '0 10px 30px -5px rgba(0, 0, 0, 0.3)',
              duration: 0.4,
              ease: "power2.out"
            });
          });
        });
      }

      // Parallax effect on scroll
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
        onUpdate: self => {
          gsap.to(sectionRef.current, {
            y: -self.progress * 50,
            duration: 0.3
          });
        }
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="py-24 relative overflow-hidden"
      id="services"
    >
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 
            ref={titleRef}
            className="text-5xl lg:text-6xl font-bold gradient-text mb-6"
          >
            Our Services
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Comprehensive IT solutions designed to accelerate your digital transformation 
            and drive innovation across your organization.
          </p>
        </div>

        <div 
          ref={cardsRef}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Card 
                key={index}
                className="glass p-8 cursor-pointer group relative overflow-hidden"
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* Background gradient animation */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500">
                  <div className={`w-full h-full ${service.color === 'primary' ? 'bg-gradient-to-br from-primary to-primary-glow' : 'bg-gradient-to-br from-secondary to-secondary-glow'}`}></div>
                </div>

                <div className="relative z-10">
                  <div className={`w-16 h-16 rounded-xl mb-6 flex items-center justify-center ${service.color === 'primary' ? 'bg-primary/20' : 'bg-secondary/20'}`}>
                    <Icon className={`w-8 h-8 ${service.color === 'primary' ? 'text-primary' : 'text-secondary'}`} />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-foreground mb-4">
                    {service.title}
                  </h3>
                  
                  <p className="text-muted-foreground leading-relaxed">
                    {service.description}
                  </p>
                </div>

                {/* Floating particles effect */}
                <div className="absolute inset-0 pointer-events-none">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div
                      key={i}
                      className={`absolute w-1 h-1 rounded-full ${service.color === 'primary' ? 'bg-primary' : 'bg-secondary'} opacity-0 group-hover:opacity-30 floating`}
                      style={{
                        left: `${20 + i * 30}%`,
                        top: `${20 + i * 20}%`,
                        animationDelay: `${i * 0.5}s`
                      }}
                    />
                  ))}
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;