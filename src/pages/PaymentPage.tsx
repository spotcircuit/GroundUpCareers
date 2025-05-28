import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Lock, Check } from 'lucide-react';
import Header from '../components/shared/Header';

const PaymentPage: React.FC = () => {
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      navigate('/dashboard');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      <Header />
      
      <div className="pt-24 pb-16 container-custom">
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
          {/* Payment Form */}
          <div className="card p-8">
            <h1 className="text-2xl font-bold font-display mb-6">Complete Your Payment</h1>
            
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label htmlFor="email" className="label">Email Address</label>
                <input 
                  type="email" 
                  id="email" 
                  className="input-field" 
                  placeholder="your@email.com"
                  required
                />
              </div>
              
              <div className="mb-6">
                <label htmlFor="card" className="label">Card Information</label>
                <div className="relative">
                  <input 
                    type="text" 
                    id="card" 
                    className="input-field pl-10" 
                    placeholder="4242 4242 4242 4242"
                    defaultValue="4242 4242 4242 4242"
                    required
                  />
                  <CreditCard size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-500" />
                </div>
                
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <input 
                    type="text" 
                    className="input-field" 
                    placeholder="MM/YY"
                    defaultValue="12/25"
                    required
                  />
                  <input 
                    type="text" 
                    className="input-field" 
                    placeholder="CVC"
                    defaultValue="123"
                    required
                  />
                </div>
              </div>
              
              <div className="mb-8">
                <label htmlFor="name" className="label">Name on Card</label>
                <input 
                  type="text" 
                  id="name" 
                  className="input-field" 
                  placeholder="John Smith"
                  required
                />
              </div>
              
              <div className="flex items-center justify-center mb-6 text-sm text-neutral-600">
                <Lock size={16} className="mr-2" />
                Secure payment processed via Stripe
              </div>
              
              <button 
                type="submit" 
                className={`btn-primary w-full justify-center ${isProcessing ? 'opacity-70 cursor-not-allowed' : ''}`}
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white\" xmlns="http://www.w3.org/2000/svg\" fill="none\" viewBox="0 0 24 24">
                      <circle className="opacity-25\" cx="12\" cy="12\" r="10\" stroke="currentColor\" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </>
                ) : (
                  <>Complete Payment</>
                )}
              </button>
            </form>
          </div>
          
          {/* Order Summary */}
          <div>
            <div className="card p-8 mb-4">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              
              <div className="flex justify-between mb-2 pb-2 border-b border-neutral-200">
                <span>Job Posting Fee</span>
                <span>$99.00</span>
              </div>
              
              <div className="flex justify-between font-semibold text-lg mt-4">
                <span>Total</span>
                <span>$99.00</span>
              </div>
            </div>
            
            <div className="card p-8">
              <h2 className="text-xl font-semibold mb-4">What's Included</h2>
              
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <Check size={20} className="text-success-500 mt-0.5 flex-shrink-0" />
                  <span>30-day job posting visibility</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check size={20} className="text-success-500 mt-0.5 flex-shrink-0" />
                  <span>Access to our database of pre-screened candidates</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check size={20} className="text-success-500 mt-0.5 flex-shrink-0" />
                  <span>Tools to review resumes and schedule interviews</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check size={20} className="text-success-500 mt-0.5 flex-shrink-0" />
                  <span>Candidate communication tools</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check size={20} className="text-success-500 mt-0.5 flex-shrink-0" />
                  <span>Hire as many candidates as you need for one position</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;