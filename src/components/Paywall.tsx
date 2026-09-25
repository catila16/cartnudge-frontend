import React from 'react';
import { Lock, Zap } from 'lucide-react';

interface PaywallProps {
  shopDomain?: string;
}

const Paywall: React.FC<PaywallProps> = ({ shopDomain }) => {
  const handleUpgrade = () => {
    // Redirect to the billing subscribe endpoint
    const urlParams = new URLSearchParams(window.location.search);
    const shop = shopDomain || urlParams.get('shop');
    
    if (shop) {
      // Use window.top.location.href to break out of the Shopify iframe
      window.top.location.href = `/api/v1/billing/subscribe?shop=${shop}`;
    } else {
      window.top.location.href = `/api/v1/billing/subscribe`;
    }
  };

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-obsidian/90 backdrop-blur-sm p-6">
      <div className="bg-cards border border-gray-800 rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.5)] max-w-lg w-full p-8 text-center relative overflow-hidden">
        {/* Glow effect */}
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-cyber/20 rounded-full blur-[60px]" />
        
        <div className="w-16 h-16 bg-gray-900 border border-gray-800 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-inner relative z-10">
          <Lock className="w-8 h-8 text-gray-400" />
        </div>
        
        <h2 className="text-2xl font-bold text-white mb-3 relative z-10">
          Premium Plan Required
        </h2>
        
        <p className="text-gray-400 mb-8 relative z-10 leading-relaxed">
          Your free trial has expired or your subscription is not active. 
          Upgrade to the <span className="text-cyber font-medium">CartNudge AI Recovery</span> plan 
          to unlock automated WhatsApp negotiations and recover lost revenue.
        </p>
        
        <button 
          onClick={handleUpgrade}
          className="relative z-10 w-full flex items-center justify-center gap-2 bg-cyber text-obsidian font-bold text-lg py-4 rounded-xl hover:bg-green-400 transition-all shadow-[0_0_20px_rgba(0,230,118,0.3)] hover:shadow-[0_0_30px_rgba(0,230,118,0.5)]"
        >
          <Zap className="w-5 h-5 fill-obsidian" />
          Activate Plan
        </button>
        
        <p className="text-xs text-gray-500 mt-6 relative z-10">
          You will only be billed a commission on successfully recovered carts. 
          No fixed monthly fees.
        </p>
      </div>
    </div>
  );
};

export default Paywall;
