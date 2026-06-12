import { useEffect, useState } from 'react';

const MESSAGES = [
  '🟢 Thabo M. from Johannesburg just purchased GreenCert Pro · 2 mins ago',
  '🟢 Cape Town Recyclers upgraded to Business plan · 5 mins ago',
  '🟢 Standard Bank IT dept generated 47 certificates · 12 mins ago',
  '🟢 Sibongile N. from Durban booked a free e-waste pickup · 18 mins ago',
  '🟢 Nampak Ltd. downloaded their first ESG compliance report · 24 mins ago',
  '🟢 Discovery Health renewed their annual compliance pack · 31 mins ago',
  '🟢 Sipho K. from Pretoria just purchased GreenCert Pro · 38 mins ago',
  '🟢 MTN SA just processed 312 devices through bulk upload · 45 mins ago',
];

export default function SocialProofTicker() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIndex((i) => (i + 1) % MESSAGES.length);
        setVisible(true);
      }, 400);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gray-900 border-b border-gray-800 py-2 px-4 text-center overflow-hidden">
      <p
        className="text-xs text-gray-400 transition-opacity duration-400"
        style={{ opacity: visible ? 1 : 0 }}
      >
        {MESSAGES[index]}
      </p>
    </div>
  );
}
