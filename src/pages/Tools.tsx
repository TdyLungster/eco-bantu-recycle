
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, Truck, FileText, Shield, Download, ExternalLink, Recycle, Zap, Globe, Leaf } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const Tools = () => {
  const [activeTab, setActiveTab] = useState('calculator');

  const tools = [
    {
      id: 'calculator',
      name: 'E-Waste Calculator',
      icon: Calculator,
      description: 'Calculate the environmental impact and value of your electronic waste',
      color: 'bg-green-500',
      component: <EWasteCalculatorTool />
    },
    {
      id: 'pickup',
      name: 'Pickup Scheduler',
      icon: Truck,
      description: 'Schedule a convenient pickup time for your e-waste collection',
      color: 'bg-blue-500',
      component: <PickupSchedulerTool />
    },
    {
      id: 'certificate',
      name: 'Certificate Generator',
      icon: FileText,
      description: 'Generate certificates for your e-waste recycling contributions',
      color: 'bg-purple-500',
      component: <CertificateGeneratorTool />
    },
    {
      id: 'tracker',
      name: 'Impact Tracker',
      icon: Shield,
      description: 'Track your environmental impact and recycling history',
      color: 'bg-orange-500',
      component: <ImpactTrackerTool />
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      {/* Hero Section */}
      <section className="bg-eco-gradient text-white py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              Professional Tools
            </h1>
            <p className="text-xl lg:text-2xl text-eco-light mb-8">
              Advanced calculators, schedulers, and tracking tools for efficient e-waste management
            </p>
          </motion.div>
        </div>
      </section>

      {/* Tools Navigation */}
      <section className="py-8 bg-white shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-4 justify-center">
            {tools.map((tool) => (
              <motion.button
                key={tool.id}
                onClick={() => setActiveTab(tool.id)}
                className={`flex items-center space-x-3 px-6 py-3 rounded-full transition-all ${
                  activeTab === tool.id
                    ? 'bg-eco-primary text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <tool.icon className="w-5 h-5" />
                <span className="font-medium">{tool.name}</span>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Active Tool */}
      <section className="py-12 lg:py-16">
        <div className="container mx-auto px-4">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {tools.find(tool => tool.id === activeTab)?.component}
          </motion.div>
        </div>
      </section>

      {/* API Documentation */}
      <section className="py-12 lg:py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              API Integration
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Integrate our tools into your existing systems with our comprehensive API
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-gray-50 p-6 rounded-xl"
            >
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-green-500 p-2 rounded-lg">
                  <Calculator className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Calculation API</h3>
              </div>
              <p className="text-gray-600 mb-4">
                Calculate e-waste impact and value programmatically
              </p>
              <div className="bg-gray-900 text-green-400 p-3 rounded-lg text-sm font-mono mb-4">
                POST /api/v1/calculate
              </div>
              <button className="flex items-center space-x-2 text-eco-primary hover:text-eco-secondary transition-colors">
                <span>View Documentation</span>
                <ExternalLink className="w-4 h-4" />
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="bg-gray-50 p-6 rounded-xl"
            >
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-blue-500 p-2 rounded-lg">
                  <Truck className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Pickup API</h3>
              </div>
              <p className="text-gray-600 mb-4">
                Schedule and manage pickup requests via API
              </p>
              <div className="bg-gray-900 text-green-400 p-3 rounded-lg text-sm font-mono mb-4">
                POST /api/v1/pickup/schedule
              </div>
              <button className="flex items-center space-x-2 text-eco-primary hover:text-eco-secondary transition-colors">
                <span>View Documentation</span>
                <ExternalLink className="w-4 h-4" />
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-gray-50 p-6 rounded-xl"
            >
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-purple-500 p-2 rounded-lg">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Tracking API</h3>
              </div>
              <p className="text-gray-600 mb-4">
                Access impact tracking and reporting data
              </p>
              <div className="bg-gray-900 text-green-400 p-3 rounded-lg text-sm font-mono mb-4">
                GET /api/v1/impact/track
              </div>
              <button className="flex items-center space-x-2 text-eco-primary hover:text-eco-secondary transition-colors">
                <span>View Documentation</span>
                <ExternalLink className="w-4 h-4" />
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

// Tool Components
const EWasteCalculatorTool = () => {
  const [devices, setDevices] = useState([
    { type: 'laptop', quantity: 0, weight: 2.5 },
    { type: 'desktop', quantity: 0, weight: 8.0 },
    { type: 'phone', quantity: 0, weight: 0.2 },
    { type: 'tablet', quantity: 0, weight: 0.5 }
  ]);

  const [results, setResults] = useState(null);

  const calculateImpact = () => {
    const totalWeight = devices.reduce((sum, device) => sum + (device.quantity * device.weight), 0);
    const co2Saved = totalWeight * 1.2; // kg CO2 per kg e-waste
    const energySaved = totalWeight * 15; // kWh per kg
    const waterSaved = totalWeight * 25; // liters per kg
    
    setResults({
      totalWeight: totalWeight.toFixed(2),
      co2Saved: co2Saved.toFixed(2),
      energySaved: energySaved.toFixed(2),
      waterSaved: waterSaved.toFixed(2),
      estimatedValue: (totalWeight * 12).toFixed(2)
    });
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-lg">
      <div className="flex items-center space-x-3 mb-6">
        <div className="bg-green-500 p-3 rounded-xl">
          <Calculator className="w-8 h-8 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">E-Waste Impact Calculator</h2>
          <p className="text-gray-600">Calculate the environmental impact of your e-waste</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Device Quantities</h3>
          <div className="space-y-4">
            {devices.map((device, index) => (
              <div key={device.type} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <span className="font-medium capitalize">{device.type}</span>
                  <span className="text-gray-500 text-sm ml-2">({device.weight}kg each)</span>
                </div>
                <input
                  type="number"
                  min="0"
                  value={device.quantity}
                  onChange={(e) => {
                    const newDevices = [...devices];
                    newDevices[index].quantity = parseInt(e.target.value) || 0;
                    setDevices(newDevices);
                  }}
                  className="w-20 px-3 py-2 border rounded-lg text-center"
                />
              </div>
            ))}
          </div>
          
          <button
            onClick={calculateImpact}
            className="w-full mt-6 bg-eco-primary text-white py-3 rounded-lg hover:bg-eco-secondary transition-colors font-semibold"
          >
            Calculate Impact
          </button>
        </div>

        {results && (
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Environmental Impact</h3>
            <div className="space-y-4">
              <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
                <div className="flex items-center space-x-2">
                  <Recycle className="w-5 h-5 text-green-600" />
                  <span className="font-medium">Total Weight</span>
                </div>
                <p className="text-2xl font-bold text-green-600">{results.totalWeight} kg</p>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
                <div className="flex items-center space-x-2">
                  <Globe className="w-5 h-5 text-blue-600" />
                  <span className="font-medium">CO₂ Saved</span>
                </div>
                <p className="text-2xl font-bold text-blue-600">{results.co2Saved} kg</p>
              </div>
              
              <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-500">
                <div className="flex items-center space-x-2">
                  <Zap className="w-5 h-5 text-yellow-600" />
                  <span className="font-medium">Energy Saved</span>
                </div>
                <p className="text-2xl font-bold text-yellow-600">{results.energySaved} kWh</p>
              </div>
              
              <div className="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-500">
                <div className="flex items-center space-x-2">
                  <Leaf className="w-5 h-5 text-purple-600" />
                  <span className="font-medium">Estimated Value</span>
                </div>
                <p className="text-2xl font-bold text-purple-600">R{results.estimatedValue}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const PickupSchedulerTool = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    date: '',
    time: '',
    deviceTypes: [],
    specialInstructions: ''
  });

  return (
    <div className="bg-white p-8 rounded-2xl shadow-lg">
      <div className="flex items-center space-x-3 mb-6">
        <div className="bg-blue-500 p-3 rounded-xl">
          <Truck className="w-8 h-8 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Schedule Pickup</h2>
          <p className="text-gray-600">Book a convenient time for e-waste collection</p>
        </div>
      </div>

      <form className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-eco-primary outline-none"
            placeholder="Enter your full name"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-eco-primary outline-none"
            placeholder="Enter your email"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({...formData, phone: e.target.value})}
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-eco-primary outline-none"
            placeholder="+27 XX XXX XXXX"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Pickup Date</label>
          <input
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({...formData, date: e.target.value})}
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-eco-primary outline-none"
          />
        </div>
        
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">Pickup Address</label>
          <textarea
            value={formData.address}
            onChange={(e) => setFormData({...formData, address: e.target.value})}
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-eco-primary outline-none"
            rows="3"
            placeholder="Enter complete pickup address"
          ></textarea>
        </div>
        
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">Special Instructions</label>
          <textarea
            value={formData.specialInstructions}
            onChange={(e) => setFormData({...formData, specialInstructions: e.target.value})}
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-eco-primary outline-none"
            rows="3"
            placeholder="Any special instructions for pickup (optional)"
          ></textarea>
        </div>
        
        <div className="md:col-span-2">
          <button
            type="submit"
            className="w-full bg-eco-primary text-white py-3 rounded-lg hover:bg-eco-secondary transition-colors font-semibold"
          >
            Schedule Pickup
          </button>
        </div>
      </form>
    </div>
  );
};

const CertificateGeneratorTool = () => {
  return (
    <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
      <div className="flex items-center justify-center space-x-3 mb-6">
        <div className="bg-purple-500 p-3 rounded-xl">
          <FileText className="w-8 h-8 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Certificate Generator</h2>
          <p className="text-gray-600">Generate official recycling certificates</p>
        </div>
      </div>
      
      <div className="bg-gray-50 p-8 rounded-xl mb-6">
        <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Certificate Preview</h3>
        <p className="text-gray-600 mb-4">Your recycling certificate will appear here</p>
        <button className="bg-eco-primary text-white px-6 py-2 rounded-lg hover:bg-eco-secondary transition-colors">
          Generate Certificate
        </button>
      </div>
      
      <div className="flex items-center justify-center space-x-4">
        <button className="flex items-center space-x-2 text-eco-primary hover:text-eco-secondary transition-colors">
          <Download className="w-4 h-4" />
          <span>Download PDF</span>
        </button>
        <button className="flex items-center space-x-2 text-eco-primary hover:text-eco-secondary transition-colors">
          <ExternalLink className="w-4 h-4" />
          <span>Share Certificate</span>
        </button>
      </div>
    </div>
  );
};

const ImpactTrackerTool = () => {
  const stats = [
    { label: 'Total Recycled', value: '2.4 tonnes', icon: Recycle, color: 'text-green-600' },
    { label: 'CO₂ Saved', value: '156 kg', icon: Globe, color: 'text-blue-600' },
    { label: 'Energy Saved', value: '1,240 kWh', icon: Zap, color: 'text-yellow-600' },
    { label: 'Water Saved', value: '3,200 L', icon: Leaf, color: 'text-purple-600' }
  ];

  return (
    <div className="bg-white p-8 rounded-2xl shadow-lg">
      <div className="flex items-center space-x-3 mb-6">
        <div className="bg-orange-500 p-3 rounded-xl">
          <Shield className="w-8 h-8 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Impact Tracker</h2>
          <p className="text-gray-600">Monitor your environmental contribution</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-gray-50 p-6 rounded-xl text-center"
          >
            <stat.icon className={`w-8 h-8 mx-auto mb-3 ${stat.color}`} />
            <h3 className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</h3>
            <p className="text-gray-600 text-sm">{stat.label}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Tools;
