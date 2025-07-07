
import React from 'react';
import { X, Star, Zap, Crown } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { makePayment } from '../razorpay';

interface UpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const UpgradeModal = ({ isOpen, onClose }: UpgradeModalProps) => {
  const { updateCredits } = useAuth();

  if (!isOpen) return null;

  const plans = [
    {
      name: 'Basic Free',
      credits: 50,
      price: 0,
      id: 'basic',
      icon: Star,
      color: 'from-gray-600 to-gray-700',
      features: ['50 Credits/Month', 'Basic Support', 'Standard Quality']
    },
    {
      name: 'Pro',
      credits: 1000,
      price: 80,
      id: 'pro',
      icon: Zap,
      color: 'from-purple-600 to-purple-700',
      features: ['1000 Credits/Month', 'Priority Support', 'HD Quality', 'Fast Processing'],
      popular: true
    },
    {
      name: 'Premium',
      credits: 12000,
      price: 900,
      id: 'premium',
      icon: Crown,
      color: 'from-yellow-500 to-yellow-600',
      features: ['12000 Credits/Year', '24/7 Premium Support', '4K Quality', 'Lightning Fast', 'Early Access']
    }
  ];

  const handleSelectPlan = async (plan: typeof plans[0]) => {
    if (plan.price === 0) {
      updateCredits(plan.credits);
      onClose();
      return;
    }

    try {
      const result = await makePayment(plan);
      if (result?.success) {
        updateCredits(plan.credits);
        onClose();
      }
    } catch (error) {
      console.error('Payment failed:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 backdrop-blur-sm flex justify-center items-center z-50 p-4">
      <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-3xl p-8 max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-4xl font-bold text-white mb-2">Choose Your Plan</h2>
            <p className="text-gray-400">Unlock the power of AI creativity</p>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:bg-gray-700 p-3 rounded-xl transition-colors"
          >
            <X size={24} />
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan) => {
            const IconComponent = plan.icon;
            return (
              <div 
                key={plan.id} 
                className={`relative bg-gradient-to-br ${plan.color} p-8 rounded-2xl text-center border border-gray-600 hover:border-purple-500 transition-all duration-300 hover:scale-105 hover:shadow-2xl ${plan.popular ? 'ring-2 ring-purple-500 scale-105' : ''}`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-full text-sm font-bold">
                      MOST POPULAR
                    </span>
                  </div>
                )}
                
                <div className="mb-6">
                  <IconComponent size={48} className="text-white mx-auto mb-4" />
                  <h3 className="text-3xl text-white mb-2 font-bold">{plan.name}</h3>
                  <p className="text-white/80 text-lg">{plan.credits.toLocaleString()} Credits</p>
                </div>
                
                <div className="mb-6">
                  <p className="text-white text-5xl font-bold mb-2">
                    {plan.price === 0 ? 'Free' : `₹${plan.price}`}
                  </p>
                  <p className="text-white/60">
                    {plan.id === 'premium' ? 'per year' : 'per month'}
                  </p>
                </div>
                
                <div className="mb-8 space-y-3">
                  {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-center justify-center text-white/90">
                      <Star size={16} className="mr-2 text-yellow-400" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
                
                <button 
                  onClick={() => handleSelectPlan(plan)}
                  className={`w-full bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 hover:scale-105 ${plan.popular ? 'bg-white text-gray-900 hover:bg-gray-100' : ''}`}
                >
                  {plan.price === 0 ? 'Current Plan' : 'Choose Plan'}
                </button>
              </div>
            );
          })}
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-gray-400 text-sm">
            Secure payments powered by Razorpay • Cancel anytime
          </p>
        </div>
      </div>
    </div>
  );
};

export default UpgradeModal;
