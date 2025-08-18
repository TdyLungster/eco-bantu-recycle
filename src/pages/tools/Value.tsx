
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, DollarSign, ArrowLeft, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import DarkNavigation from '@/components/DarkNavigation';
import DarkFooter from '@/components/DarkFooter';
import { Link } from 'react-router-dom';

// Rate table for different device types
const deviceRates = {
  'laptop': { value: 150, unit: 'per device' },
  'desktop': { value: 80, unit: 'per device' },
  'monitor': { value: 25, unit: 'per device' },
  'smartphone': { value: 15, unit: 'per device' },
  'tablet': { value: 30, unit: 'per device' },
  'printer': { value: 20, unit: 'per device' },
  'server': { value: 300, unit: 'per device' },
  'network': { value: 50, unit: 'per device' },
  'cables': { value: 8, unit: 'per kg' },
  'batteries': { value: 12, unit: 'per kg' }
};

const Value = () => {
  const [items, setItems] = useState<Array<{id: string, type: string, quantity: number}>>([
    { id: '1', type: 'laptop', quantity: 0 }
  ]);
  const [totalValue, setTotalValue] = useState(0);

  const addItem = () => {
    const newId = (items.length + 1).toString();
    setItems([...items, { id: newId, type: 'laptop', quantity: 0 }]);
  };

  const removeItem = (id: string) => {
    if (items.length > 1) {
      setItems(items.filter(item => item.id !== id));
    }
  };

  const updateItem = (id: string, field: string, value: any) => {
    const updatedItems = items.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    );
    setItems(updatedItems);
    calculateTotal(updatedItems);
  };

  const calculateTotal = (itemList = items) => {
    const total = itemList.reduce((sum, item) => {
      const rate = deviceRates[item.type as keyof typeof deviceRates];
      return sum + (rate.value * item.quantity);
    }, 0);
    setTotalValue(total);
  };

  React.useEffect(() => {
    calculateTotal();
  }, [items]);

  return (
    <div className="min-h-screen bg-gray-900">
      <DarkNavigation />
      
      <main className="pt-32 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <div className="flex items-center justify-center mb-4">
              <DollarSign className="w-12 h-12 text-green-400" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Value <span className="text-green-400">Estimator</span>
            </h1>
            <p className="text-gray-300 text-lg">
              Estimate the recycling value of your electronic devices
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Calculator */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Card className="bg-gray-800/50 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <Calculator className="w-5 h-5 mr-2" />
                      Device Calculator
                    </CardTitle>
                    <CardDescription className="text-gray-400">
                      Add your devices to calculate their estimated recycling value
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    
                    {items.map((item, index) => (
                      <div key={item.id} className="flex items-end gap-4 p-4 bg-gray-700/30 rounded-lg">
                        <div className="flex-1">
                          <Label className="text-white text-sm">Device Type</Label>
                          <select
                            value={item.type}
                            onChange={(e) => updateItem(item.id, 'type', e.target.value)}
                            className="w-full mt-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                          >
                            <option value="laptop">Laptop</option>
                            <option value="desktop">Desktop Computer</option>
                            <option value="monitor">Monitor/Screen</option>
                            <option value="smartphone">Smartphone</option>
                            <option value="tablet">Tablet</option>
                            <option value="printer">Printer</option>
                            <option value="server">Server</option>
                            <option value="network">Network Equipment</option>
                            <option value="cables">Cables (per kg)</option>
                            <option value="batteries">Batteries (per kg)</option>
                          </select>
                        </div>
                        
                        <div className="w-24">
                          <Label className="text-white text-sm">Quantity</Label>
                          <Input
                            type="number"
                            min="0"
                            value={item.quantity}
                            onChange={(e) => updateItem(item.id, 'quantity', parseInt(e.target.value) || 0)}
                            className="mt-1 bg-gray-700 border-gray-600 text-white"
                          />
                        </div>
                        
                        <div className="w-20 text-right">
                          <div className="text-sm text-gray-400">Value</div>
                          <div className="text-green-400 font-medium">
                            R{(deviceRates[item.type as keyof typeof deviceRates].value * item.quantity).toFixed(0)}
                          </div>
                        </div>
                        
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => removeItem(item.id)}
                          disabled={items.length === 1}
                          className="border-red-600 text-red-400 hover:bg-red-600/10"
                        >
                          Remove
                        </Button>
                      </div>
                    ))}

                    <Button
                      type="button"
                      onClick={addItem}
                      variant="outline"
                      className="w-full border-green-600 text-green-400 hover:bg-green-600/10"
                    >
                      Add Another Device
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Results & Info */}
            <div className="space-y-6">
              
              {/* Total Value */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Card className="bg-gradient-to-br from-green-800/20 to-emerald-800/20 border-green-600/30">
                  <CardHeader>
                    <CardTitle className="text-white text-center">Estimated Value</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <div className="text-4xl font-bold text-green-400 mb-2">
                      R{totalValue.toFixed(0)}
                    </div>
                    <p className="text-gray-300 text-sm">
                      Total estimated recycling value
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Rate Table */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Card className="bg-gray-800/50 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-white text-sm flex items-center">
                      <Info className="w-4 h-4 mr-2" />
                      Current Rates
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      {Object.entries(deviceRates).map(([type, rate]) => (
                        <div key={type} className="flex justify-between text-gray-300">
                          <span className="capitalize">{type.replace('_', ' ')}</span>
                          <span>R{rate.value} {rate.unit}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Disclaimer */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <Card className="bg-yellow-900/20 border-yellow-600/30">
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-2">
                      <Info className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="text-yellow-400 font-medium text-sm mb-1">Important Note</h4>
                        <p className="text-gray-300 text-xs">
                          This is an estimate only. Actual values may vary based on device condition, 
                          market prices, and specific recycling requirements. Contact us for an accurate quote.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <Button asChild className="w-full bg-green-600 hover:bg-green-700">
                  <Link to="/tools/quote">Get Accurate Quote</Link>
                </Button>
                <Button asChild variant="outline" className="w-full border-gray-600 text-gray-300 hover:bg-gray-800">
                  <Link to="/tools">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Tools
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <DarkFooter />
    </div>
  );
};

export default Value;
