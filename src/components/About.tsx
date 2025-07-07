import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const morphRef = useRef<SVGSVGElement>(null);

  const stats = [
    { value: "500+", label: "Projects Completed", color: "primary" },
    { value: "50+", label: "Happy Clients", color: "secondary" },
    { value: "24/7", label: "Support Available", color: "primary" },
    { value: "99.9%", label: "Uptime Guarantee", color: "secondary" }
  ];

  const technologies = [
    "React", "Node.js", "Python", "AWS", "Docker", "Kubernetes",
    "TensorFlow", "MongoDB", "PostgreSQL", "GraphQL", "TypeScript", "Next.js"
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Text reveal animation
      const textElements = textRef.current?.children;
      if (textElements) {
        gsap.fromTo(Array.from(textElements),
          { opacity: 0, x: -50, rotationY: 45 },
          {
            opacity: 1,
            x: 0,
            rotationY: 0,
            duration: 1,
            stagger: 0.3,
            ease: "power3.out",
            scrollTrigger: {
              trigger: textRef.current,
              start: "top 80%",
              end: "bottom 20%",
            }
          }
        );
      }

      // Stats counter animation
      const statCards = statsRef.current?.children;
      if (statCards) {
        Array.from(statCards).forEach((card, index) => {
          const statValue = stats[index].value;
          const numberValue = parseInt(statValue.replace(/\D/g, ''));
          
          ScrollTrigger.create({
            trigger: card,
            start: "top 80%",
            onEnter: () => {
              gsap.fromTo(card,
                { 
                  opacity: 0, 
                  scale: 0.8,
                  rotationX: 45
                },
                {
                  opacity: 1,
                  scale: 1,
                  rotationX: 0,
                  duration: 0.8,
                  ease: "back.out(1.7)",
                  delay: index * 0.1
                }
              );

              // Counter animation
              const valueElement = card.querySelector('.stat-value');
              if (valueElement && !isNaN(numberValue)) {
                gsap.fromTo(valueElement,
                  { textContent: 0 },
                  {
                    textContent: numberValue,
                    duration: 2,
                    ease: "power2.out",
                    snap: { textContent: 1 },
                    onUpdate: function() {
                      const currentValue = this.targets()[0].textContent;
                      if (statValue.includes('+')) {
                        this.targets()[0].textContent = currentValue + '+';
                      } else if (statValue.includes('%')) {
                        this.targets()[0].textContent = currentValue + '%';
                      } else if (statValue.includes('/')) {
                        this.targets()[0].textContent = statValue;
                      }
                    }
                  }
                );
              }
            }
          });
        });
      }

      // SVG animation (simplified without MorphSVG)
      if (morphRef.current) {
        gsap.to(morphRef.current, {
          scale: 1.1,
          rotation: 360,
          duration: 10,
          ease: "none",
          repeat: -1,
          scrollTrigger: {
            trigger: morphRef.current,
            start: "top 80%",
            end: "bottom 20%",
          }
        });
      }

      // Technology badges floating animation
      const techBadges = document.querySelectorAll('.tech-badge');
      techBadges.forEach((badge, index) => {
        gsap.fromTo(badge,
          { opacity: 0, y: 30, rotation: 10 },
          {
            opacity: 1,
            y: 0,
            rotation: 0,
            duration: 0.6,
            ease: "power3.out",
            delay: index * 0.1,
            scrollTrigger: {
              trigger: badge,
              start: "top 85%",
            }
          }
        );

        // Continuous floating animation
        gsap.to(badge, {
          y: -5,
          duration: 2 + Math.random(),
          ease: "power2.inOut",
          yoyo: true,
          repeat: -1,
          delay: Math.random() * 2
        });
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="py-24 relative overflow-hidden"
      id="about"
    >
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Text content */}
          <div ref={textRef} className="space-y-8">
            <h2 className="text-5xl lg:text-6xl font-bold gradient-text">
              About TechFlow
            </h2>
            
            <p className="text-xl text-muted-foreground leading-relaxed">
              We are a cutting-edge IT company specializing in digital transformation, 
              artificial intelligence, and innovative software solutions. Our mission 
              is to empower businesses through technology.
            </p>

            <p className="text-lg text-muted-foreground leading-relaxed">
              With over a decade of experience, we've helped companies across various 
              industries leverage technology to streamline operations, enhance customer 
              experiences, and drive sustainable growth.
            </p>

            {/* Technology stack */}
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold text-foreground">
                Technologies We Master
              </h3>
              <div className="flex flex-wrap gap-3">
                {technologies.map((tech, index) => (
                  <Badge 
                    key={index}
                    variant="outline" 
                    className="tech-badge bg-muted/50 text-foreground border-primary/30 hover:border-primary transition-colors"
                  >
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          {/* Stats and visual */}
          <div className="space-y-8">
            {/* Animated SVG */}
            <div className="flex justify-center">
              <svg
                ref={morphRef}
                width="300"
                height="300"
                viewBox="0 0 300 300"
                className="text-primary"
              >
                <defs>
                  <linearGradient id="morphGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="hsl(199, 89%, 48%)" />
                    <stop offset="100%" stopColor="hsl(271, 81%, 56%)" />
                  </linearGradient>
                </defs>
                
                {/* Initial shape */}
                <path
                  d="M150,50 C200,50 250,100 250,150 C250,200 200,250 150,250 C100,250 50,200 50,150 C50,100 100,50 150,50 Z"
                  fill="url(#morphGradient)"
                  opacity="0.3"
                />
                
                {/* Target shape */}
                <path
                  d="M150,30 C220,30 280,90 280,150 C280,210 220,270 150,270 C80,270 20,210 20,150 C20,90 80,30 150,30 Z"
                  fill="none"
                  style={{ display: 'none' }}
                />
              </svg>
            </div>

            {/* Stats grid */}
            <div ref={statsRef} className="grid grid-cols-2 gap-6">
              {stats.map((stat, index) => (
                <Card 
                  key={index}
                  className="glass p-6 text-center group cursor-pointer"
                >
                  <div className={`text-3xl font-bold stat-value ${stat.color === 'primary' ? 'text-primary' : 'text-secondary'} mb-2`}>
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground font-medium">
                    {stat.label}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;