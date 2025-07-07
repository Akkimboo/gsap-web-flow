import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';
import { Button } from '@/components/ui/button';

gsap.registerPlugin(ScrollTrigger, TextPlugin);

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const codeRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial setup
      gsap.set([titleRef.current, subtitleRef.current, buttonsRef.current], { 
        opacity: 0, 
        y: 50 
      });
      gsap.set(codeRef.current, { opacity: 0, x: 100 });

      // Hero timeline
      const tl = gsap.timeline();

      // Animate title with typewriter effect
      tl.to(titleRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out"
      })
      .to(titleRef.current, {
        text: "Innovative IT Solutions",
        duration: 2,
        ease: "none"
      }, "-=0.4")
      .to(subtitleRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out"
      }, "-=1")
      .to(codeRef.current, {
        opacity: 1,
        x: 0,
        duration: 1,
        ease: "power3.out"
      }, "-=0.5")
      .to(buttonsRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out"
      }, "-=0.3");

      // Floating animation for code block
      gsap.to(codeRef.current, {
        y: -10,
        duration: 2,
        ease: "power2.inOut",
        yoyo: true,
        repeat: -1
      });

      // Particle animation
      const particles = particlesRef.current?.children;
      if (particles) {
        Array.from(particles).forEach((particle, i) => {
          gsap.set(particle, {
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight
          });
          
          gsap.to(particle, {
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            duration: 10 + Math.random() * 10,
            ease: "none",
            repeat: -1,
            yoyo: true,
            delay: Math.random() * 2
          });
        });
      }

      // Scroll-triggered animations
      ScrollTrigger.create({
        trigger: heroRef.current,
        start: "top center",
        end: "bottom center",
        scrub: 1,
        onUpdate: self => {
          gsap.to(heroRef.current, {
            y: -self.progress * 100,
            duration: 0.3
          });
        }
      });

    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={heroRef}
      className="min-h-screen relative flex items-center justify-center overflow-hidden bg-gradient-dark"
    >
      {/* Animated particles */}
      <div ref={particlesRef} className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-primary rounded-full opacity-30"
          />
        ))}
      </div>

      {/* Main content */}
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text content */}
          <div className="space-y-8">
            <h1 
              ref={titleRef}
              className="text-6xl lg:text-7xl font-bold gradient-text leading-tight"
            >
              {/* Text will be animated by GSAP */}
            </h1>
            
            <p 
              ref={subtitleRef}
              className="text-xl lg:text-2xl text-muted-foreground leading-relaxed"
            >
              Transforming businesses through cutting-edge technology, AI solutions, 
              and digital innovation. Your partner in the digital future.
            </p>

            <div ref={buttonsRef} className="flex gap-6">
              <Button size="lg" className="bg-primary hover:bg-primary/90 cyber-glow">
                Get Started
              </Button>
              <Button variant="outline" size="lg" className="border-primary text-primary hover:bg-primary/10">
                Our Services
              </Button>
            </div>
          </div>

          {/* Code block animation */}
          <div ref={codeRef} className="relative">
            <div className="glass rounded-2xl p-8 code-lines">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 bg-destructive rounded-full"></div>
                <div className="w-3 h-3 bg-secondary rounded-full"></div>
                <div className="w-3 h-3 bg-primary rounded-full"></div>
              </div>
              
              <pre className="font-mono text-sm text-primary overflow-hidden">
                <code>{`// Innovative Solutions
class TechCompany {
  constructor() {
    this.innovation = true;
    this.reliability = 100;
    this.solutions = [];
  }
  
  solve(problem) {
    return this.ai.process(problem)
      .then(solution => {
        this.deliver(solution);
        return success;
      });
  }
}`}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>

      {/* Gradient glow effect */}
      <div className="absolute inset-0 bg-gradient-glow opacity-30 pointer-events-none"></div>
    </section>
  );
};

export default Hero;