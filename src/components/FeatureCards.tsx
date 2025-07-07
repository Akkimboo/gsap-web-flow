
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Zap } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const FeatureCards = () => {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Card entrance animation
      gsap.fromTo(cardRef.current, 
        { 
          opacity: 0, 
          y: 50,
          scale: 0.8,
          rotationX: 15
        },
        { 
          opacity: 1, 
          y: 0,
          scale: 1,
          rotationX: 0,
          duration: 1,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: cardRef.current,
            start: 'top 90%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Icon floating animation
      gsap.to(iconRef.current, {
        y: -5,
        rotation: 5,
        duration: 2,
        ease: "power1.inOut",
        yoyo: true,
        repeat: -1
      });

      // Pulse effect for icon background
      gsap.to(iconRef.current, {
        boxShadow: '0 0 30px rgba(168, 85, 247, 0.6)',
        duration: 2,
        ease: "power2.inOut",
        yoyo: true,
        repeat: -1,
        delay: 0.5
      });

      // Mouse interaction animations
      const handleMouseEnter = () => {
        gsap.to(cardRef.current, {
          scale: 1.05,
          y: -10,
          rotationY: 5,
          duration: 0.3,
          ease: "power2.out"
        });
        
        gsap.to(iconRef.current, {
          scale: 1.2,
          rotation: 360,
          duration: 0.5,
          ease: "back.out(1.7)"
        });
      };

      const handleMouseLeave = () => {
        gsap.to(cardRef.current, {
          scale: 1,
          y: 0,
          rotationY: 0,
          duration: 0.3,
          ease: "power2.out"
        });
        
        gsap.to(iconRef.current, {
          scale: 1,
          rotation: 0,
          duration: 0.3,
          ease: "power2.out"
        });
      };

      const card = cardRef.current;
      if (card) {
        card.addEventListener('mouseenter', handleMouseEnter);
        card.addEventListener('mouseleave', handleMouseLeave);
        
        return () => {
          card.removeEventListener('mouseenter', handleMouseEnter);
          card.removeEventListener('mouseleave', handleMouseLeave);
        };
      }

    }, cardRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="flex justify-center py-8">
      <Link
        ref={cardRef}
        to="/face-fusion"
        className="group bg-purple-600 hover:bg-purple-700 p-8 rounded-2xl w-80 text-center shadow-xl transition-colors duration-300 transform-gpu perspective-1000"
      >
        <div className="relative z-10">
          {/* Icon */}
          <div 
            ref={iconRef}
            className="bg-white/20 backdrop-blur-sm p-4 rounded-full w-16 h-16 mx-auto mb-4 group-hover:bg-white/30 transition-all duration-300 transform-gpu"
          >
            <Zap size={32} className="text-white mx-auto" />
          </div>
          
          {/* Title */}
          <h3 className="text-white font-bold text-2xl mb-2 transform-gpu">
            Face Fusion
          </h3>
          
          {/* Description */}
          <p className="text-purple-100 text-sm opacity-90 mb-4 transform-gpu">
            Transform your photos with AI magic ✨
          </p>
          
          {/* Call to action */}
          <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-white text-sm font-medium group-hover:bg-white/30 transition-all duration-300 transform-gpu">
            Start Creating →
          </div>
        </div>
      </Link>
    </div>
  );
};

export default FeatureCards;
