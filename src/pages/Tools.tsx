
import React from 'react';
import { motion } from 'framer-motion';
import { Truck, Calculator, DollarSign, BarChart3, MapPin, FileCheck } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import DarkNavigation from '@/components/DarkNavigation';
import DarkFooter from '@/components/DarkFooter';
import { Link } from 'react-router-dom';

const tools = [
  {
    title: 'Schedule Pickup',
    description: 'Book a free e-waste collection service for your home or office',
    icon: Truck,
    href: '/tools/pickup',
    color: 'from-blue-500 to-blue-600'
  },
  {
    title: 'Get Quote',
    description: 'Request a custom quote for large-scale e-waste recycling',
    icon: Calculator,
    href: '/tools/quote',
    color: 'from-green-500 to-green-600'
  },
  {
    title: 'Value Estimator',
    description: 'Estimate the recycling value of your electronic devices',
    icon: DollarSign,
    href: '/tools/value',
    color: 'from-yellow-500 to-yellow-600'
  },
  {
    title: 'Impact Calculator',
    description: 'See your environmental impact from e-waste recycling',
    icon: BarChart3,
    href: '/tools/impact',
    color: 'from-purple-500 to-purple-600'
  },
  {
    title: 'Find Locations',
    description: 'Locate certified e-waste recycling centers near you',
    icon: MapPin,
    href: '/tools/locations',
    color: 'from-red-500 to-red-600'
  },
  {
    title: 'Data Wipe Certificate',
    description: 'Generate free data destruction certificates',
    icon: FileCheck,
    href: '/tools/certificate',
    color: 'from-indigo-500 to-indigo-600'
  }
];

const Tools = () => {
  return (
    <div className="min-h-screen bg-gray-900">
      <DarkNavigation />
      
      <main className="pt-32 pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              E-Waste <span className="text-green-400">Tools</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Access our comprehensive suite of e-waste management tools designed to make recycling easier and more effective.
            </p>
          </motion.div>

          {/* Tools Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tools.map((tool, index) => (
              <motion.div
                key={tool.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="bg-gray-800/50 border-gray-700 hover:bg-gray-800/70 transition-all duration-300 hover:scale-105 h-full">
                  <CardHeader className="text-center">
                    <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${tool.color} flex items-center justify-center`}>
                      <tool.icon className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-white text-xl">
                      {tool.title}
                    </CardTitle>
                    <CardDescription className="text-gray-400">
                      {tool.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="text-center">
                    <Button 
                      asChild
                      className={`w-full bg-gradient-to-r ${tool.color} hover:opacity-90 text-white font-medium`}
                    >
                      <Link to={tool.href}>
                        Access Tool
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-16 text-center"
          >
            <Card className="bg-gradient-to-r from-green-600/20 to-emerald-600/20 border-green-500/30">
              <CardHeader>
                <CardTitle className="text-white text-2xl">
                  Need Help?
                </CardTitle>
                <CardDescription className="text-gray-300 text-lg">
                  Our team is here to assist you with any e-waste management needs.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg"
                  className="bg-green-600 hover:bg-green-700 text-white"
                >
                  Contact Support
                </Button>
                <Button 
                  size="lg"
                  variant="outline"
                  className="border-green-500 text-green-400 hover:bg-green-500/10"
                >
                  View Documentation
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>

      <DarkFooter />
    </div>
  );
};

export default Tools;
