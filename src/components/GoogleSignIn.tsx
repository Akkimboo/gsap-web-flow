
import React from 'react';
import { useAuth } from '../contexts/AuthContext';

const GoogleSignIn = () => {
  const { signIn } = useAuth();

  const handleGoogleSignIn = async () => {
    try {
      await signIn();
      // The dialog will close automatically when the user state changes
    } catch (error) {
      console.error('Google Sign-in failed:', error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[200px] space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-2">Connect with Google</h2>
        <p className="text-gray-400 mb-6">Sign in to start generating amazing AI images</p>
      </div>
      
      <button
        onClick={handleGoogleSignIn}
        className="flex items-center gap-3 bg-white hover:bg-gray-100 text-black font-medium py-3 px-6 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
      >
        <svg width="20" height="20" viewBox="0 0 24 24">
          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
        </svg>
        Continue with Google
      </button>
    </div>
  );
};

export default GoogleSignIn;
