
import React, { useState } from 'react';
import { Menu, User } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import GoogleSignIn from './GoogleSignIn';

interface TopBarProps {
  onMenuClick: () => void;
  onUpgradeClick: () => void;
}

const TopBar = ({ onMenuClick, onUpgradeClick }: TopBarProps) => {
  const { user, credits, signOut } = useAuth();
  const [showSignInDialog, setShowSignInDialog] = useState(false);

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleSignInClick = () => {
    setShowSignInDialog(true);
  };

  return (
    <header className="fixed top-0 left-0 md:left-64 right-0 bg-black border-b border-purple-600 px-4 py-3 z-30">
      <div className="flex items-center justify-between">
        {/* Mobile Menu Button */}
        <button
          onClick={onMenuClick}
          className="md:hidden text-white p-2 hover:bg-gray-800 rounded-lg transition-colors"
        >
          <Menu size={24} />
        </button>

        {/* User Info */}
        <div className="flex items-center gap-3 ml-auto">
          {user && (
            <span className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-medium">
              {credits}
            </span>
          )}
          
          {user && (
            <button
              onClick={onUpgradeClick}
              className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-1 rounded-full text-sm font-medium transition-colors"
            >
              Upgrade
            </button>
          )}

          {user ? (
            <>
              <span className="text-white border border-purple-600 px-3 py-1 rounded-full text-sm">
                Welcome {user.displayName?.split(' ')[0] || 'User'}
              </span>
              <div className="relative group">
                <img 
                  src={user.photoURL || '/api/placeholder/36/36'} 
                  alt="Profile" 
                  className="w-9 h-9 rounded-full cursor-pointer hover:ring-2 hover:ring-purple-500 transition-all"
                />
                <div className="absolute top-full right-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <div className="p-4 border-b border-gray-700">
                    <p className="text-white text-sm font-medium">{user.displayName}</p>
                    <p className="text-gray-400 text-xs">{user.email}</p>
                  </div>
                  <button
                    onClick={handleSignOut}
                    className="w-full text-left px-4 py-2 text-white hover:bg-gray-700 transition-colors text-sm"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            </>
          ) : (
            <button
              onClick={handleSignInClick}
              className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              Sign In
            </button>
          )}
        </div>
      </div>

      {/* Sign In Dialog */}
      <Dialog open={showSignInDialog} onOpenChange={setShowSignInDialog}>
        <DialogContent className="bg-gray-900 border-purple-600">
          <DialogHeader>
            <DialogTitle className="text-white text-center">Welcome Back</DialogTitle>
          </DialogHeader>
          <GoogleSignIn />
        </DialogContent>
      </Dialog>
    </header>
  );
};

export default TopBar;
