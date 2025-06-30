
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, AlertCircle, CreditCard } from 'lucide-react';
import { toast } from 'react-hot-toast';

interface TrialTrackerProps {
  onUpgradeClick: () => void;
}

const TrialTracker: React.FC<TrialTrackerProps> = ({ onUpgradeClick }) => {
  const [trialUsage, setTrialUsage] = useState(0);
  const [isTrialActive, setIsTrialActive] = useState(true);
  const maxTrialUses = 3;

  useEffect(() => {
    // Load trial usage from localStorage
    const savedUsage = localStorage.getItem('bantu_trial_usage');
    if (savedUsage) {
      setTrialUsage(parseInt(savedUsage));
    }

    // Check if trial is expired
    const trialExpired = localStorage.getItem('bantu_trial_expired');
    if (trialExpired === 'true') {
      setIsTrialActive(false);
    }
  }, []);

  const useTrialCalculation = () => {
    if (!isTrialActive) {
      toast.error('Free trial expired. Please upgrade to continue.');
      return false;
    }

    if (trialUsage >= maxTrialUses) {
      setIsTrialActive(false);
      localStorage.setItem('bantu_trial_expired', 'true');
      toast.error('Free trial expired. Please upgrade to continue.');
      return false;
    }

    const newUsage = trialUsage + 1;
    setTrialUsage(newUsage);
    localStorage.setItem('bantu_trial_usage', newUsage.toString());

    if (newUsage >= maxTrialUses) {
      setIsTrialActive(false);
      localStorage.setItem('bantu_trial_expired', 'true');
      toast.success('Calculation complete! This was your last free calculation.');
    } else {
      toast.success(`Calculation complete! ${maxTrialUses - newUsage} free calculations remaining.`);
    }

    return true;
  };

  const remainingUses = maxTrialUses - trialUsage;
  const progressPercentage = (trialUsage / maxTrialUses) * 100;

  if (!isTrialActive && trialUsage >= maxTrialUses) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-xl p-6 shadow-lg"
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
            <AlertCircle className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold mb-1">Free Trial Expired</h3>
            <p className="text-red-100 mb-4">
              You've used all 3 free calculations. Upgrade now to continue using our service!
            </p>
            <motion.button
              onClick={onUpgradeClick}
              className="bg-white text-red-600 px-6 py-2 rounded-full font-semibold hover:bg-red-50 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <CreditCard className="w-4 h-4 inline mr-2" />
              Upgrade Now
            </motion.button>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-r from-blue-500 to-green-500 text-white rounded-xl p-6 shadow-lg"
    >
      <div className="flex items-center gap-4 mb-4">
        <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
          <Clock className="w-6 h-6" />
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-bold mb-1">Free Trial Active</h3>
          <p className="text-blue-100">
            {remainingUses} free calculation{remainingUses !== 1 ? 's' : ''} remaining
          </p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex justify-between text-sm mb-2">
          <span>Trial Progress</span>
          <span>{trialUsage}/{maxTrialUses} used</span>
        </div>
        <div className="w-full bg-white/20 rounded-full h-2">
          <motion.div
            className="bg-white h-2 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progressPercentage}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      <div className="flex gap-3">
        <button
          onClick={onUpgradeClick}
          className="bg-white text-blue-600 px-4 py-2 rounded-full font-semibold hover:bg-blue-50 transition-colors text-sm"
        >
          Upgrade Now
        </button>
        <div className="text-blue-100 text-sm py-2">
          Unlimited calculations available with any paid plan
        </div>
      </div>
    </motion.div>
  );
};

export { TrialTracker };
export default TrialTracker;
