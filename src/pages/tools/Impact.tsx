
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart3, Leaf, ArrowLeft, Zap, Droplets, TreePine } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import DarkNavigation from '@/components/DarkNavigation';
import DarkFooter from '@/components/DarkFooter';
import { Link } from 'react-router-dom';

const Impact = () => {
  const [weight, setWeight] = useState<number>(0);
  
  // Impact factors (per kg of e-waste recycled)
  const impactFactors = {
    co2Saved: 2.3, // kg CO2e saved per kg e-waste
    energySaved: 15, // kWh saved per kg e-waste
    waterSaved: 150, // liters saved per kg e-waste
    landfillAvoided: 1, // kg avoided from landfill
    treesEquivalent: 0.05 // trees planted equivalent per kg
  };

  const calculateImpacts = () => {
    return {
      co2: weight * impactFactors.co2Saved,
      energy: weight * impactFactors.energySaved,
      water: weight * impactFactors.waterSaved,
      landfill: weight * impactFactors.landfillAvoided,
      trees: weight * impactFactors.treesEquivalent
    };
  };

  const impacts = calculateImpacts();

  const impactCards = [
    {
      title: 'CO₂ Emissions Avoided',
      value: impacts.co2,
      unit: 'kg CO₂e',
      icon: Leaf,
      color: 'text-green-400',
      bgColor: 'from-green-600/20 to-emerald-600/20',
      borderColor: 'border-green-600/30',
      description: 'Greenhouse gases prevented from entering the atmosphere'
    },
    {
      title: 'Energy Saved',
      value: impacts.energy,
      unit: 'kWh',
      icon: Zap,
      color: 'text-yellow-400',
      bgColor: 'from-yellow-600/20 to-orange-600/20',
      borderColor: 'border-yellow-600/30',
      description: 'Electricity saved through recycling vs. new manufacturing'
    },
    {
      title: 'Water Conserved',
      value: impacts.water,
      unit: 'liters',
      icon: Droplets,
      color: 'text-blue-400',
      bgColor: 'from-blue-600/20 to-cyan-600/20',
      borderColor: 'border-blue-600/30',
      description: 'Fresh water saved in manufacturing processes'
    },
    {
      title: 'Trees Equivalent',
      value: impacts.trees,
      unit: 'trees planted',
      icon: TreePine,
      color: 'text-green-500',
      bgColor: 'from-emerald-600/20 to-green-600/20',
      borderColor: 'border-emerald-600/30',
      description: 'Environmental benefit equivalent to planting trees'
    }
  ];

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
              <BarChart3 className="w-12 h-12 text-green-400" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Environmental <span className="text-green-400">Impact Calculator</span>
            </h1>
            <p className="text-gray-300 text-lg">
              See the positive environmental impact of your e-waste recycling
            </p>
          </motion.div>

          {/* Calculator Input */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-8"
          >
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">E-Waste Weight Calculator</CardTitle>
                <CardDescription className="text-gray-400">
                  Enter the total weight of electronic devices you plan to recycle
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-end gap-4">
                  <div className="flex-1">
                    <Label htmlFor="weight" className="text-white">Weight (kg)</Label>
                    <Input
                      id="weight"
                      type="number"
                      min="0"
                      step="0.1"
                      value={weight || ''}
                      onChange={(e) => setWeight(parseFloat(e.target.value) || 0)}
                      className="mt-1 bg-gray-700 border-gray-600 text-white text-lg"
                      placeholder="Enter weight in kilograms"
                    />
                  </div>
                  <div className="text-gray-400 text-sm pb-3">
                    <div className="mb-1">Quick reference:</div>
                    <div className="text-xs space-y-1">
                      <div>• Laptop: ~2.5kg</div>
                      <div>• Desktop: ~8kg</div>
                      <div>• Smartphone: ~0.2kg</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Impact Results */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {impactCards.map((impact, index) => (
              <motion.div
                key={impact.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                <Card className={`bg-gradient-to-br ${impact.bgColor} ${impact.borderColor} border`}>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-white text-lg">{impact.title}</CardTitle>
                      <impact.icon className={`w-6 h-6 ${impact.color}`} />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className={`text-3xl font-bold ${impact.color} mb-2`}>
                      {impact.value.toFixed(1)} <span className="text-lg font-normal">{impact.unit}</span>
                    </div>
                    <p className="text-gray-300 text-sm">{impact.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Landfill Impact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="mb-8"
          >
            <Card className="bg-gradient-to-br from-red-900/20 to-orange-900/20 border-red-600/30">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <span className="text-red-400 mr-2">⚠️</span>
                  Landfill Impact Avoided
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-red-400">{impacts.landfill.toFixed(1)} kg</div>
                    <div className="text-gray-300 text-sm">Waste diverted from landfills</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-orange-400">50+ years</div>
                    <div className="text-gray-300 text-sm">Time for e-waste to decompose</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-yellow-400">100%</div>
                    <div className="text-gray-300 text-sm">Materials recovered & reused</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button asChild className="bg-green-600 hover:bg-green-700 text-white px-8">
              <Link to="/tools/pickup">Schedule Pickup</Link>
            </Button>
            <Button asChild variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800 px-8">
              <Link to="/tools/quote">Get Quote</Link>
            </Button>
            <Button asChild variant="ghost" className="text-gray-400 hover:text-white">
              <Link to="/tools">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Tools
              </Link>
            </Button>
          </motion.div>

          {/* Methodology */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="mt-12"
          >
            <Card className="bg-gray-800/30 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white text-lg">Calculation Methodology</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-gray-300 text-sm space-y-2">
                  <p>
                    Our impact calculations are based on industry research and lifecycle assessments comparing 
                    e-waste recycling to landfill disposal and new material extraction.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div>
                      <h4 className="text-white font-medium mb-2">Factors Used:</h4>
                      <ul className="space-y-1 text-xs">
                        <li>• CO₂: {impactFactors.co2Saved}kg CO₂e per kg e-waste</li>
                        <li>• Energy: {impactFactors.energySaved}kWh per kg e-waste</li>
                        <li>• Water: {impactFactors.waterSaved}L per kg e-waste</li>
                        <li>• Trees: {impactFactors.treesEquivalent} trees per kg e-waste</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-white font-medium mb-2">Sources:</h4>
                      <ul className="space-y-1 text-xs">
                        <li>• EPA E-Waste Lifecycle Analysis</li>
                        <li>• UN Global E-Waste Monitor</li>
                        <li>• International E-Waste Statistics</li>
                        <li>• Carbon Trust Research</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>

      <DarkFooter />
    </div>
  );
};

export default Impact;
