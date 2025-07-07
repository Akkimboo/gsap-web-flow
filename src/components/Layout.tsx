import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import TopBar from './TopBar';
import UpgradeModal from './UpgradeModal';

interface LayoutProps {
  children: React.ReactNode;
  showTopBar?: boolean;
}

const Layout = ({ children, showTopBar = true }: LayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [upgradeModalOpen, setUpgradeModalOpen] = useState(false);
  const location = useLocation();

  // Scroll to top when route changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-black text-white">
      <Sidebar 
        isOpen={sidebarOpen} 
        onClose={() => setSidebarOpen(false)} 
      />
      
      {showTopBar && (
        <TopBar
          onMenuClick={() => setSidebarOpen(true)}
          onUpgradeClick={() => setUpgradeModalOpen(true)}
        />
      )}

      <main className={`
        md:ml-64 transition-all duration-300
        ${showTopBar ? 'pt-16' : ''}
      `}>
        {children}
      </main>

      <UpgradeModal
        isOpen={upgradeModalOpen}
        onClose={() => setUpgradeModalOpen(false)}
      />
    </div>
  );
};

export default Layout;
