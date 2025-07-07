import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { Button } from '@/components/ui/button';
import { Menu, X, Zap } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const Navigation = () => {
  const navRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const navItems = [
    { label: 'Home', href: '#' },
    { label: 'Services', href: '#services' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial animation
      gsap.fromTo(navRef.current,
        { y: -100, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 1, 
          ease: "power3.out",
          delay: 0.5
        }
      );

      // Logo animation
      gsap.fromTo(logoRef.current,
        { rotationY: 180, opacity: 0 },
        { 
          rotationY: 0, 
          opacity: 1, 
          duration: 1, 
          ease: "back.out(1.7)",
          delay: 0.8
        }
      );

      // Menu items stagger animation
      const menuItems = menuRef.current?.children;
      if (menuItems) {
        gsap.fromTo(Array.from(menuItems),
          { y: -20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: "power3.out",
            delay: 1
          }
        );
      }

      // Scroll-triggered navigation background
      ScrollTrigger.create({
        start: "top -50px",
        end: "bottom bottom",
        onUpdate: self => {
          if (self.direction === 1 && !isScrolled) {
            setIsScrolled(true);
            gsap.to(navRef.current, {
              backgroundColor: "rgba(15, 15, 15, 0.95)",
              backdropFilter: "blur(20px)",
              borderBottom: "1px solid rgba(0, 186, 255, 0.2)",
              duration: 0.3
            });
          } else if (self.direction === -1 && self.progress < 0.1) {
            setIsScrolled(false);
            gsap.to(navRef.current, {
              backgroundColor: "transparent",
              backdropFilter: "blur(0px)",
              borderBottom: "1px solid transparent",
              duration: 0.3
            });
          }
        }
      });

      // Smooth scroll for navigation links
      const links = document.querySelectorAll('a[href^="#"]');
      links.forEach(link => {
        link.addEventListener('click', (e) => {
          e.preventDefault();
          const target = document.querySelector(link.getAttribute('href') || '');
          if (target) {
            gsap.to(window, {
              duration: 1.5,
              scrollTo: {
                y: target,
                offsetY: 80
              },
              ease: "power3.inOut"
            });
          }
        });
      });

    }, navRef);

    return () => ctx.revert();
  }, [isScrolled]);

  const toggleMobileMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    
    if (!isMenuOpen) {
      gsap.fromTo(mobileMenuRef.current,
        { x: "100%", opacity: 0 },
        { 
          x: "0%", 
          opacity: 1, 
          duration: 0.5, 
          ease: "power3.out" 
        }
      );
    } else {
      gsap.to(mobileMenuRef.current, {
        x: "100%",
        opacity: 0,
        duration: 0.3,
        ease: "power3.in"
      });
    }
  };

  return (
    <>
      <nav 
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div 
              ref={logoRef}
              className="flex items-center gap-3 cursor-pointer group"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <div className="w-10 h-10 bg-gradient-cyber rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold gradient-text">TechFlow</span>
            </div>

            {/* Desktop Menu */}
            <div ref={menuRef} className="hidden md:flex items-center gap-8">
              {navItems.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  className="text-foreground hover:text-primary transition-colors relative group"
                >
                  {item.label}
                  <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-primary scale-x-0 origin-left transition-transform group-hover:scale-x-100"></span>
                </a>
              ))}
              <Button variant="outline" className="border-primary text-primary hover:bg-primary/10">
                Get Quote
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={toggleMobileMenu}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div 
          ref={mobileMenuRef}
          className="fixed top-0 right-0 h-full w-80 bg-card/95 backdrop-blur-lg z-40 md:hidden border-l border-primary/20"
        >
          <div className="pt-20 px-6">
            <div className="space-y-6">
              {navItems.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  className="block text-lg text-foreground hover:text-primary transition-colors"
                  onClick={toggleMobileMenu}
                >
                  {item.label}
                </a>
              ))}
              <Button className="w-full bg-gradient-cyber">
                Get Quote
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-background/50 backdrop-blur-sm z-30 md:hidden"
          onClick={toggleMobileMenu}
        />
      )}
    </>
  );
};

export default Navigation;