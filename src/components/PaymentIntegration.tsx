
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CreditCard, Shield, CheckCircle, AlertCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'react-hot-toast';

interface PaymentOption {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  popular?: boolean;
}

const PaymentIntegration = ({ amount, description, onSuccess }: { 
  amount: number; 
  description: string; 
  onSuccess: () => void; 
}) => {
  const [selectedMethod, setSelectedMethod] = useState<string>('payfast');
  const [isProcessing, setIsProcessing] = useState(false);

  const paymentMethods: PaymentOption[] = [
    {
      id: 'payfast',
      name: 'PayFast',
      description: 'Secure South African payment gateway',
      icon: <CreditCard className="w-5 h-5" />,
      popular: true
    },
    {
      id: 'stripe',
      name: 'Stripe',
      description: 'International cards accepted',
      icon: <Shield className="w-5 h-5" />
    },
    {
      id: 'crypto',
      name: 'Cryptocurrency',
      description: 'Bitcoin, Ethereum & more',
      icon: <CheckCircle className="w-5 h-5" />
    }
  ];

  const handlePayment = async () => {
    setIsProcessing(true);
    
    try {
      // Create transaction record
      const { data: transaction, error } = await supabase
        .from('transactions')
        .insert({
          amount: amount,
          currency: 'ZAR',
          payment_method: selectedMethod,
          status: 'pending'
        })
        .select()
        .single();

      if (error) throw error;

      // Simulate payment processing based on method
      switch (selectedMethod) {
        case 'payfast':
          await processPayFast(transaction.id, amount, description);
          break;
        case 'stripe':
          await processStripe(transaction.id, amount, description);
          break;
        case 'crypto':
          await processCrypto(transaction.id, amount, description);
          break;
      }

      toast.success('Payment initiated successfully!');
      onSuccess();
      
    } catch (error) {
      console.error('Payment error:', error);
      toast.error('Payment failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const processPayFast = async (transactionId: string, amount: number, description: string) => {
    // PayFast integration logic
    console.log('Processing PayFast payment:', { transactionId, amount, description });
    
    // Simulate PayFast redirect
    const payFastUrl = `https://sandbox.payfast.co.za/eng/process?merchant_id=10000100&merchant_key=46f0cd694581a&amount=${amount}&item_name=${encodeURIComponent(description)}&return_url=${window.location.origin}/payment-success&cancel_url=${window.location.origin}/payment-cancelled`;
    
    // In production, you would redirect to PayFast
    // window.location.href = payFastUrl;
    
    // For demo, simulate success after delay
    setTimeout(() => {
      toast.success('PayFast payment completed!');
    }, 2000);
  };

  const processStripe = async (transactionId: string, amount: number, description: string) => {
    // Stripe integration logic
    console.log('Processing Stripe payment:', { transactionId, amount, description });
    
    // For demo, simulate success
    setTimeout(() => {
      toast.success('Stripe payment completed!');
    }, 2000);
  };

  const processCrypto = async (transactionId: string, amount: number, description: string) => {
    // Crypto payment logic
    console.log('Processing Crypto payment:', { transactionId, amount, description });
    
    // For demo, simulate success
    setTimeout(() => {
      toast.success('Crypto payment completed!');
    }, 2000);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 max-w-md mx-auto">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-gray-800 mb-2">Complete Payment</h3>
        <div className="text-3xl font-bold text-green-600">R{amount.toFixed(2)}</div>
        <p className="text-gray-600 mt-2">{description}</p>
      </div>

      {/* Payment Methods */}
      <div className="space-y-3 mb-6">
        {paymentMethods.map((method) => (
          <motion.div
            key={method.id}
            className={`relative border-2 rounded-lg p-4 cursor-pointer transition-all ${
              selectedMethod === method.id
                ? 'border-green-500 bg-green-50'
                : 'border-gray-200 hover:border-green-300'
            }`}
            onClick={() => setSelectedMethod(method.id)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-full ${
                  selectedMethod === method.id ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-600'
                }`}>
                  {method.icon}
                </div>
                <div>
                  <div className="font-semibold text-gray-800">{method.name}</div>
                  <div className="text-sm text-gray-600">{method.description}</div>
                </div>
              </div>
              {method.popular && (
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-semibold">
                  Popular
                </span>
              )}
            </div>
            
            {selectedMethod === method.id && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute top-2 right-2 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center"
              >
                <CheckCircle className="w-3 h-3 text-white" />
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Security Notice */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-6">
        <div className="flex items-center gap-2">
          <Shield className="w-4 h-4 text-blue-600" />
          <span className="text-sm text-blue-800 font-medium">Secure Payment</span>
        </div>
        <p className="text-xs text-blue-700 mt-1">
          Your payment information is encrypted and secure. We never store your card details.
        </p>
      </div>

      {/* Pay Button */}
      <motion.button
        onClick={handlePayment}
        disabled={isProcessing}
        className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-3 rounded-lg font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {isProcessing ? (
          <div className="flex items-center justify-center gap-2">
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            Processing...
          </div>
        ) : (
          `Pay R${amount.toFixed(2)}`
        )}
      </motion.button>

      {/* Terms */}
      <p className="text-xs text-gray-500 mt-4 text-center">
        By completing this payment, you agree to our Terms of Service and Privacy Policy.
      </p>
    </div>
  );
};

export default PaymentIntegration;
