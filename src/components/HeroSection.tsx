
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Video scale animation on scroll
      gsap.to(videoRef.current, {
        scale: 1.1,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1
        }
      });

      // Title text reveal animation
      gsap.fromTo(titleRef.current, {
        opacity: 0,
        y: 50,
        scale: 0.9
      }, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.5,
        ease: "power3.out",
        delay: 0.5
      });

      // Glowing effect animation
      gsap.to('.gradient-text', {
        textShadow: '0 0 20px rgba(168, 85, 247, 0.5), 0 0 40px rgba(168, 85, 247, 0.3)',
        duration: 2,
        ease: "power2.inOut",
        yoyo: true,
        repeat: -1
      });

    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={heroRef} className="relative h-80 w-full overflow-hidden rounded-lg">
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover transform-gpu"
      >
        <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
        <h1 
          ref={titleRef}
          className="text-4xl md:text-6xl font-bold text-white text-center px-4 tracking-tight transform-gpu"
        >
          Transform Your Ideas into{' '}
          <span className="gradient-text text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-600">
            Stunning Visuals
          </span>
        </h1>
      </div>
    </div>
  );
};

export default HeroSection;
