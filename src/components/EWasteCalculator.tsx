
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calculator, Leaf, DollarSign, Recycle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'react-hot-toast';

interface Device {
  type: string;
  quantity: number;
  unitValue: number;
  co2Saving: number;
}

const EWasteCalculator = () => {
  const [devices, setDevices] = useState<Device[]>([
    { type: 'Laptop', quantity: 0, unitValue: 150, co2Saving: 25 },
    { type: 'Desktop', quantity: 0, unitValue: 200, co2Saving: 40 },
    { type: 'Phone', quantity: 0, unitValue: 50, co2Saving: 8 },
    { type: 'Tablet', quantity: 0, unitValue: 80, co2Saving: 12 },
    { type: 'Monitor', quantity: 0, unitValue: 100, co2Saving: 20 },
    { type: 'Printer', quantity: 0, unitValue: 75, co2Saving: 15 }
  ]);

  const [totalValue, setTotalValue] = useState(0);
  const [totalCO2, setTotalCO2] = useState(0);
  const [totalDevices, setTotalDevices] = useState(0);

  useEffect(() => {
    const value = devices.reduce((sum, device) => sum + (device.quantity * device.unitValue), 0);
    const co2 = devices.reduce((sum, device) => sum + (device.quantity * device.co2Saving), 0);
    const total = devices.reduce((sum, device) => sum + device.quantity, 0);
    
    setTotalValue(value);
    setTotalCO2(co2);
    setTotalDevices(total);
  }, [devices]);

  const updateQuantity = (index: number, quantity: number) => {
    setDevices(prev => 
      prev.map((device, i) => 
        i === index ? { ...device, quantity: Math.max(0, quantity) } : device
      )
    );
  };

  const handleGetQuote = async () => {
    try {
      const devicesData = devices.reduce((acc, device) => {
        if (device.quantity > 0) {
          acc[device.type.toLowerCase()] = device.quantity;
        }
        return acc;
      }, {} as Record<string, number>);

      const { error } = await supabase
        .from('pickups')
        .insert({
          devices: devicesData,
          estimated_value: totalValue,
          pickup_address: 'TBD',
          status: 'pending'
        });

      if (error) throw error;
      
      toast.success(`Quote generated! Total value: R${totalValue}, CO₂ saved: ${totalCO2}kg`);
    } catch (error) {
      console.error('Error saving quote:', error);
      toast.error('Failed to generate quote. Please try again.');
    }
  };

  return (
    <div className="bg-gradient-to-br from-green-50 to-blue-50 py-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            E-Waste Impact Calculator
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Calculate the environmental impact and recovery value of your electronic devices
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Calculator */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl shadow-xl p-8"
          >
            <div className="flex items-center gap-2 mb-6">
              <Calculator className="w-6 h-6 text-green-600" />
              <h3 className="text-2xl font-bold text-gray-800">Device Calculator</h3>
            </div>

            <div className="space-y-6">
              {devices.map((device, index) => (
                <motion.div
                  key={device.type}
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h4 className="font-semibold text-gray-800">{device.type}</h4>
                      <p className="text-sm text-gray-600">
                        R{device.unitValue} each • {device.co2Saving}kg CO₂/unit
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => updateQuantity(index, device.quantity - 1)}
                      className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors"
                    >
                      -
                    </button>
                    <span className="text-lg font-semibold w-8 text-center">
                      {device.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(index, device.quantity + 1)}
                      className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center hover:bg-green-600 transition-colors"
                    >
                      +
                    </button>
                    
                    {device.quantity > 0 && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="ml-auto text-right"
                      >
                        <div className="text-sm text-gray-600">Value</div>
                        <div className="font-semibold text-green-600">
                          R{(device.quantity * device.unitValue).toFixed(2)}
                        </div>
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Results */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {/* Impact Summary */}
            <div className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-2xl p-8 shadow-xl">
              <h3 className="text-2xl font-bold mb-6">Environmental Impact</h3>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <DollarSign className="w-8 h-8 mx-auto mb-2 text-green-200" />
                  <div className="text-3xl font-bold">R{totalValue.toFixed(2)}</div>
                  <div className="text-green-200">Recovery Value</div>
                </div>
                
                <div className="text-center">
                  <Leaf className="w-8 h-8 mx-auto mb-2 text-green-200" />
                  <div className="text-3xl font-bold">{totalCO2}kg</div>
                  <div className="text-green-200">CO₂ Saved</div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-white/10 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Recycle className="w-5 h-5" />
                  <span className="font-semibold">Total Devices: {totalDevices}</span>
                </div>
                <div className="text-sm text-green-100">
                  Equivalent to planting {Math.round(totalCO2 / 22)} trees annually
                </div>
              </div>
            </div>

            {/* Call to Action */}
            {totalDevices > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl shadow-lg p-6"
              >
                <h4 className="text-xl font-bold text-gray-800 mb-4">
                  Ready to Make an Impact?
                </h4>
                <p className="text-gray-600 mb-6">
                  Schedule a free pickup and receive your instant quote via email.
                </p>
                
                <motion.button
                  onClick={handleGetQuote}
                  className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-3 rounded-lg font-semibold text-lg hover:shadow-lg transition-shadow"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Get Instant Quote
                </motion.button>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default EWasteCalculator;
