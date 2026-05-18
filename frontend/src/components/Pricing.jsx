import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Zap, Star, Crown, Check, Sparkles } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';

const plans = [
  {
    id: 'basic',
    label: 'Basic',
    icon: Zap,
    price: 99,
    credits: 50,
    color: 'from-purple-500 to-fuchsia-500',
    border: 'border-purple-800/50',
    glow: 'shadow-purple-500/20',
    buttonClass: 'btn-secondary w-full py-4 rounded-2xl font-extrabold text-white border border-purple-400/30',
    features: [
      '50 AI Image Credits',
      'All art styles available',
      'HD Quality (1024px)',
      'Download & Share',
    ],
    popular: false,
  },
  {
    id: 'pro',
    label: 'Pro',
    icon: Star,
    price: 299,
    credits: 200,
    color: 'from-purple-600 to-pink-600',
    border: 'border-pink-500/60',
    glow: 'shadow-pink-500/30',
    buttonClass: 'btn-premium w-full py-4 rounded-2xl font-extrabold text-white border border-white/20',
    features: [
      '200 AI Image Credits',
      'All art styles + future styles',
      'Ultra HD Quality (1280px)',
      'Download, Share & History',
      'Priority generation queue',
    ],
    popular: true,
  },
  {
    id: 'premium',
    label: 'Premium',
    icon: Crown,
    price: 599,
    credits: 500,
    color: 'from-pink-500 to-rose-500',
    border: 'border-pink-800/50',
    glow: 'shadow-rose-500/20',
    buttonClass: 'btn-premium w-full py-4 rounded-2xl font-extrabold text-white border border-white/20',
    features: [
      '500 AI Image Credits',
      'All styles + exclusive models',
      'Max Quality (1280px+)',
      'Download, Share & History',
      'Fastest generation speed',
      'Email support',
    ],
    popular: false,
  },
];

export default function Pricing() {
  const [loadingPlan, setLoadingPlan] = useState(null);
  const { user, token, updateCredits } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleBuyCredits = async (planId) => {
    if (!user || !token) {
      navigate('/login');
      return;
    }

    setLoadingPlan(planId);

    try {
      // Step 1: Create order on backend
      const res = await fetch(`${import.meta.env.VITE_API_URL || "http://localhost:5000"}` + '/api/payment/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ planId }),
      });

      const orderData = await res.json();
      if (!res.ok) throw new Error(orderData.error || 'Failed to create order');

      // Step 2: Load Razorpay script dynamically
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      document.body.appendChild(script);

      script.onload = () => {
        const options = {
          key: orderData.keyId,
          amount: orderData.amount,
          currency: orderData.currency,
          name: 'AI Image Generator',
          description: `${orderData.plan.credits} Credits - ${orderData.plan.label} Plan`,
          order_id: orderData.orderId,
          theme: { color: '#ec4899' },
          config: {
            display: {
              blocks: {
                upi: {
                  name: 'Pay using UPI Apps',
                  instruments: [
                    { method: 'upi' }
                  ]
                }
              },
              sequence: ['block.upi'],
              preferences: {
                show_default_blocks: true,
              },
            }
          },
          prefill: {
            name: user.name,
            email: user.email,
          },
          handler: async function (response) {
            // Step 3: Verify payment on backend
            try {
              const verifyRes = await fetch(`${import.meta.env.VITE_API_URL || "http://localhost:5000"}` + '/api/payment/verify', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_signature: response.razorpay_signature,
                  planId,
                }),
              });

              const verifyData = await verifyRes.json();
              if (!verifyRes.ok) throw new Error(verifyData.error);

              // Update credits in UI
              updateCredits(verifyData.credits);
              navigate('/dashboard');
            } catch (err) {
              alert('Payment verification failed: ' + err.message);
            }
          },
          modal: {
            ondismiss: () => setLoadingPlan(null),
          },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
        setLoadingPlan(null);
      };

      script.onerror = () => {
        alert('Failed to load payment gateway. Please try again.');
        setLoadingPlan(null);
      };

    } catch (error) {
      alert(error.message);
      setLoadingPlan(null);
    }
  };

  return (
    <div className="min-h-screen py-16 px-4 relative z-10">
      {/* Header */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-purple-950/80 border border-purple-500/30 text-pink-400 text-sm font-bold mb-6 backdrop-blur-md shadow-lg shadow-purple-500/10">
          <Sparkles size={16} />
          Simple, Transparent Pricing
        </div>
        <h1 className="text-5xl md:text-6xl font-black mb-4 tracking-tight text-white">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-fuchsia-400 via-pink-400 to-rose-400 filter drop-shadow-lg">
            Power Up Your Creativity
          </span>
        </h1>
        <p className="text-purple-200/80 text-lg max-w-xl mx-auto font-light leading-relaxed">
          Buy credits once, use them anytime. No subscriptions, no hidden fees.
        </p>
      </div>

      {/* Plans Grid */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
        {plans.map((plan) => {
          const Icon = plan.icon;
          const isLoading = loadingPlan === plan.id;

          return (
            <div
              key={plan.id}
              className={`
                relative rounded-3xl p-8 border transition-all duration-300 hover:-translate-y-2 backdrop-blur-xl
                ${plan.popular
                  ? `bg-gradient-to-b from-purple-950/60 to-[#090710] border-pink-500/60 shadow-2xl ${plan.glow} md:scale-105`
                  : `bg-purple-950/20 ${plan.border} shadow-lg hover:shadow-2xl hover:${plan.glow}`
                }
              `}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 whitespace-nowrap z-10">
                  <span className="px-5 py-1.5 rounded-full text-xs font-extrabold bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/30 border border-white/20 tracking-wider uppercase inline-block whitespace-nowrap">
                    ⚡ MOST POPULAR
                  </span>
                </div>
              )}

              {/* Icon + Name */}
              <div className="flex items-center gap-4 mb-6">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${plan.color} flex items-center justify-center shadow-lg shadow-purple-500/20 border border-white/20`}>
                  <Icon size={26} className="text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-extrabold text-white">{plan.label}</h2>
                  <p className="text-sm text-purple-300 font-medium">{plan.credits} Credits</p>
                </div>
              </div>

              {/* Price */}
              <div className="mb-6 border-b border-purple-900/50 pb-6">
                <div className="flex items-end gap-1">
                  <span className="text-purple-300 text-xl font-bold">₹</span>
                  <span className="text-6xl font-black text-white tracking-tight">{plan.price}</span>
                </div>
                <p className="text-purple-300/60 text-xs mt-2 font-medium">
                  ₹{(plan.price / plan.credits).toFixed(1)} per credit
                </p>
              </div>

              {/* Features */}
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-purple-100 font-medium">
                    <div className={`w-5 h-5 rounded-full bg-gradient-to-br ${plan.color} flex items-center justify-center flex-shrink-0 shadow-sm`}>
                      <Check size={12} className="text-white font-bold" />
                    </div>
                    {feature}
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <button
                onClick={() => handleBuyCredits(plan.id)}
                disabled={isLoading}
                className={plan.buttonClass}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Processing...
                  </span>
                ) : (
                  `Buy ${plan.credits} Credits`
                )}
              </button>
            </div>
          );
        })}
      </div>

      {/* Trust badges */}
      <div className="text-center mt-16 text-purple-400/80 text-sm font-semibold">
        <p className="flex items-center justify-center gap-8 flex-wrap">
          <span>🔒 Secured by Razorpay</span>
          <span>⚡ Instant Credit Top-up</span>
          <span>🇮🇳 Made in India</span>
          <span>💳 UPI, Cards, Net Banking accepted</span>
        </p>
      </div>
    </div>
  );
}
