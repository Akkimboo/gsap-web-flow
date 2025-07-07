
import React, { useEffect, useRef } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Home, User, Heart, X } from 'lucide-react';
import { gsap } from 'gsap';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const location = useLocation();
  const sidebarRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const navItemsRef = useRef<HTMLDivElement>(null);

  const navItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/face-fusion', icon: User, label: 'Face Fusion' },
    { path: '/sponsor', icon: Heart, label: 'Sponsor' },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (isOpen) {
        // Sidebar entrance animation
        gsap.fromTo(sidebarRef.current, {
          x: -264,
          opacity: 0
        }, {
          x: 0,
          opacity: 1,
          duration: 0.4,
          ease: "power2.out"
        });

        // Logo animation
        gsap.fromTo(logoRef.current, {
          scale: 0,
          rotation: -180
        }, {
          scale: 1,
          rotation: 0,
          duration: 0.6,
          delay: 0.2,
          ease: "back.out(1.7)"
        });

        // Nav items staggered animation
        gsap.fromTo('.nav-item', {
          x: -50,
          opacity: 0,
          scale: 0.8
        }, {
          x: 0,
          opacity: 1,
          scale: 1,
          duration: 0.4,
          stagger: 0.1,
          delay: 0.3,
          ease: "power2.out"
        });
      }
    }, sidebarRef);

    return () => ctx.revert();
  }, [isOpen]);

  // Add hover animations for nav items
  useEffect(() => {
    const navItems = document.querySelectorAll('.nav-item');
    
    navItems.forEach((item, index) => {
      const handleMouseEnter = () => {
        gsap.to(item, {
          x: 10,
          scale: 1.05,
          duration: 0.2,
          ease: "power2.out"
        });
      };

      const handleMouseLeave = () => {
        gsap.to(item, {
          x: 0,
          scale: 1,
          duration: 0.2,
          ease: "power2.out"
        });
      };

      item.addEventListener('mouseenter', handleMouseEnter);
      item.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      navItems.forEach((item) => {
        item.removeEventListener('mouseenter', () => {});
        item.removeEventListener('mouseleave', () => {});
      });
    };
  }, [isOpen]);

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <nav 
        ref={sidebarRef}
        className={`
          fixed top-0 left-0 h-full w-64 bg-black border-r border-gray-700 z-50
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
          flex flex-col
        `}
      >
        {/* Close Button (Mobile Only) */}
        <button
          onClick={onClose}
          className="md:hidden text-white text-2xl p-4 self-end hover:bg-gray-800 rounded-lg transition-colors"
        >
          <X size={24} />
        </button>

        {/* Logo */}
        <div ref={logoRef} className="flex items-center gap-3 px-6 py-4">
          <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-purple-700 rounded-lg flex items-center justify-center transform-gpu">
            <span className="text-white font-bold text-lg">D</span>
          </div>
          <span className="text-white text-xl font-semibold">DPIcon</span>
        </div>

        {/* Navigation Items */}
        <div ref={navItemsRef} className="flex flex-col px-4 py-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`
                  nav-item flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 transform-gpu
                  ${isActive 
                    ? 'bg-purple-600 text-white border border-purple-500' 
                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                  }
                `}
                onClick={onClose}
              >
                <Icon size={20} />
                <span className="font-medium">{item.label}</span>
                {isActive && (
                  <div className="ml-auto w-2 h-2 bg-white rounded-full animate-pulse" />
                )}
              </Link>
            );
          })}
        </div>

        {/* Footer */}
        <div className="mt-auto px-6 py-4 border-t border-gray-700">
          <div className="text-gray-500 text-xs mb-2">Powered by</div>
          <div className="w-12 h-6 bg-gray-600 rounded mb-3"></div>
          <div className="text-gray-500 text-xs flex items-center gap-1">
            <span>© Copyright</span>
            <span className="font-medium">2025</span>
            <span>by DPIcon</span>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Sidebar;
