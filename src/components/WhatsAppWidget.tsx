
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send } from 'lucide-react';

const WhatsAppWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');

  const defaultMessages = [
    "Hi! I'd like to know more about e-waste recycling.",
    "Can you arrange a pickup for my office?",
    "What types of electronics do you accept?",
    "I need a quote for corporate e-waste disposal.",
  ];

  const handleSendMessage = (text?: string) => {
    const messageText = text || message;
    const encodedMessage = encodeURIComponent(messageText);
    const whatsappUrl = `https://wa.me/27XXXXXXXXX?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
    setIsOpen(false);
    setMessage('');
  };

  return (
    <>
      {/* WhatsApp Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-20 left-6 z-50 bg-green-500 text-white p-4 rounded-full shadow-2xl hover:bg-green-600 transition-colors"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={{ 
          boxShadow: ["0 0 0 0 rgba(34, 197, 94, 0.7)", "0 0 0 20px rgba(34, 197, 94, 0)"],
        }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <MessageCircle className="w-6 h-6" />
      </motion.button>

      {/* WhatsApp Chat Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 100 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 100 }}
            className="fixed bottom-20 left-6 z-50 w-80 bg-white rounded-xl shadow-2xl border border-gray-200"
          >
            {/* Header */}
            <div className="bg-green-500 text-white p-4 rounded-t-xl flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                  <MessageCircle className="w-6 h-6 text-green-500" />
                </div>
                <div>
                  <h3 className="font-semibold">Bantu The People</h3>
                  <p className="text-sm text-green-100">Typically replies instantly</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white hover:text-green-200 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-4">
              <div className="mb-4">
                <div className="bg-gray-100 rounded-lg p-3 mb-3">
                  <p className="text-sm text-gray-800">
                    Hi there! 👋 How can we help you with your e-waste recycling needs?
                  </p>
                </div>
                
                <p className="text-sm text-gray-600 mb-3">
                  Choose a quick message or type your own:
                </p>

                {/* Quick Messages */}
                <div className="space-y-2 mb-4">
                  {defaultMessages.map((msg, index) => (
                    <motion.button
                      key={index}
                      onClick={() => handleSendMessage(msg)}
                      className="w-full text-left p-2 bg-gray-50 hover:bg-gray-100 rounded-lg text-sm text-gray-700 transition-colors"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {msg}
                    </motion.button>
                  ))}
                </div>

                {/* Custom Message Input */}
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  />
                  <motion.button
                    onClick={() => handleSendMessage()}
                    className="bg-green-500 text-white p-2 rounded-lg hover:bg-green-600 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Send className="w-4 h-4" />
                  </motion.button>
                </div>
              </div>

              {/* Footer */}
              <div className="text-center pt-3 border-t border-gray-200">
                <p className="text-xs text-gray-500">
                  We typically reply within minutes
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default WhatsAppWidget;
