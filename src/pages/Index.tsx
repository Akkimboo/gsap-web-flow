
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Layout from '../components/Layout';
import HeroSection from '../components/HeroSection';
import FeatureCards from '../components/FeatureCards';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const Index = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const whyPointsRef = useRef<HTMLDivElement>(null);
  const contentSectionsRef = useRef<HTMLDivElement>(null);

  const whyPoints = ['AI Alchemy: Turn whispers of thought into vivid masterpieces with next-gen tech. No Rules', 'Just Wonders: Easy enough for dreamers, powerful enough for visionaries.', 'Infinite Realms: Text-to-image wizardry or face-swapping adventures—your choice.', 'Blink-and-Done Speed: Stellar results faster than a meteor shower.'];
  const contentSections = [{
    title: 'Transform Your Ideas into Stunning Visuals',
    content: 'Step into a world where words weave wonders and faces find new fates. DPIcon is your portal to boundless creativity, powered by cutting-edge AI. From conjuring vivid scenes with a single sentence to reimagining your face in fantastical realms, we turn your wildest whims into breathtaking visuals. Dare to dream – DPIcon makes it real.',
    image: '/api/placeholder/800/300'
  }, {
    title: 'The Spark of a New Era',
    content: 'At DPIcon, we believe creativity shouldn\'t be confined. We\'re pioneers at the crossroads of art and technology, crafting tools that let you sculpt the impossible. Whether you\'re an artist seeking a muse, a visionary with a story, or a soul craving something new, DPIcon is your playground of endless potential.',
    image: '/api/placeholder/800/300'
  }, {
    title: 'What Sets Us Apart',
    content: 'AI Sorcery: Advanced algorithms that turn imagination into masterpieces. No Limits, Just Magic: From text to art, face to fantasy – explore it all. Instant Alchemy: Conjure creations faster than a lightning strike. Yours to Command: Simple tools, extraordinary results – no wizardry degree required.',
    image: '/api/placeholder/800/300'
  }];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero section entrance animation
      gsap.fromTo('.hero-section', {
        opacity: 0,
        scale: 0.9,
        y: 50
      }, {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 1.2,
        ease: "power3.out"
      });

      // Feature cards floating animation
      gsap.fromTo('.feature-cards', {
        opacity: 0,
        y: 100,
        rotationX: 15
      }, {
        opacity: 1,
        y: 0,
        rotationX: 0,
        duration: 1,
        delay: 0.3,
        ease: "back.out(1.7)"
      });

      // Why section title animation
      gsap.fromTo('.why-title', {
        opacity: 0,
        x: -100,
        rotationY: -15
      }, {
        opacity: 1,
        x: 0,
        rotationY: 0,
        duration: 1,
        scrollTrigger: {
          trigger: '.why-section',
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse'
        }
      });

      // Why points staggered animation
      gsap.fromTo('.why-point', {
        opacity: 0,
        x: -50,
        scale: 0.8
      }, {
        opacity: 1,
        x: 0,
        scale: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: "elastic.out(1, 0.5)",
        scrollTrigger: {
          trigger: '.why-section',
          start: 'top 70%',
          end: 'bottom 30%',
          toggleActions: 'play none none reverse'
        }
      });

      // Content sections scroll animations
      gsap.utils.toArray('.content-section').forEach((section: any, index) => {
        // Title animation
        gsap.fromTo(section.querySelector('.content-title'), {
          opacity: 0,
          y: 50,
          scale: 0.9
        }, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: 'top 85%',
            end: 'bottom 15%',
            toggleActions: 'play none none reverse'
          }
        });

        // Image animation with 3D effect
        gsap.fromTo(section.querySelector('.content-image'), {
          opacity: 0,
          rotationY: index % 2 === 0 ? -25 : 25,
          scale: 0.8
        }, {
          opacity: 1,
          rotationY: 0,
          scale: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
          }
        });

        // Content text animation
        gsap.fromTo(section.querySelector('.content-text'), {
          opacity: 0,
          y: 30,
          x: index % 2 === 0 ? -30 : 30
        }, {
          opacity: 1,
          y: 0,
          x: 0,
          duration: 0.8,
          delay: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: 'top 75%',
            end: 'bottom 25%',
            toggleActions: 'play none none reverse'
          }
        });
      });

      // Parallax effect for background elements
      gsap.to('.parallax-bg', {
        yPercent: -50,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });

      // Floating animation for decorative elements
      gsap.to('.floating-element', {
        y: -20,
        duration: 2,
        ease: "power1.inOut",
        yoyo: true,
        repeat: -1,
        stagger: 0.5
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <Layout>
      <div ref={containerRef} className="min-h-screen relative overflow-hidden">
        {/* Parallax background elements */}
        <div className="parallax-bg fixed inset-0 pointer-events-none">
          <div className="absolute top-10 left-10 w-32 h-32 bg-purple-500/10 rounded-full blur-xl floating-element"></div>
          <div className="absolute top-1/3 right-20 w-24 h-24 bg-purple-400/10 rounded-full blur-lg floating-element"></div>
          <div className="absolute bottom-1/4 left-1/4 w-40 h-40 bg-purple-600/10 rounded-full blur-2xl floating-element"></div>
        </div>

        {/* Hero Section */}
        <div className="px-4 mb-12 hero-section py-[8px] relative z-10">
          <HeroSection />
        </div>

        {/* Feature Cards */}
        <div className="px-4 mb-16 feature-cards relative z-10">
          <FeatureCards />
        </div>

        {/* Why Section */}
        <div ref={whyPointsRef} className="px-4 md:px-12 mb-16 why-section relative z-10">
          <div className="max-w-4xl mx-auto">
            <h2 className="why-title text-3xl md:text-4xl font-bold mb-8 text-center">
              Why DPIcon is Your Creative Rocket Fuel
            </h2>
            <div className="space-y-6">
              {whyPoints.map((point, index) => (
                <div key={index} className="flex items-start gap-4 why-point">
                  <div className="text-purple-400 text-xl font-bold mt-1 floating-element">•</div>
                  <p className="text-gray-300 text-lg leading-relaxed">{point}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Content Sections */}
        <div ref={contentSectionsRef} className="px-4 md:px-12 space-y-16 mb-16 relative z-10">
          {contentSections.map((section, index) => (
            <div key={index} className="max-w-4xl mx-auto content-section">
              <h2 className="content-title text-3xl md:text-4xl font-bold mb-8 text-center">
                {section.title}
              </h2>
              <div className="content-image bg-gray-800 rounded-lg overflow-hidden mb-6 transform perspective-1000">
                <div className="h-48 bg-gradient-to-r from-purple-900 to-purple-700"></div>
              </div>
              <div className="border-t border-gray-600 pt-6">
                <p className="content-text text-gray-300 text-lg leading-relaxed">{section.content}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Index;
