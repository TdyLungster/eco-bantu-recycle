import React from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Users, TrendingUp, BarChart3, Globe } from 'lucide-react';

const TeamSection = () => {
  const teamMembers = [
    {
      name: "Siyabulela Prince Mangqalaza",
      role: "Managing Director",
      email: "princem@bantuthepeople.com",
      icon: <Users className="w-6 h-6" />,
      description: "Leading sustainable transformation in South Africa's e-waste sector"
    },
    {
      name: "Sipho Johnson Mngomezulu", 
      role: "Financial Director",
      email: "mngomezulusipho@bantuthepeople.com",
      icon: <TrendingUp className="w-6 h-6" />,
      description: "Driving financial sustainability and growth strategies"
    },
    {
      name: "Steven Muzikayise Sibiya",
      role: "Sales Director", 
      email: "steven@bantuthepeople.com",
      icon: <BarChart3 className="w-6 h-6" />,
      description: "Building partnerships for circular economy solutions"
    },
    {
      name: "Sthembiso Jacob Ngema",
      role: "Marketing Director",
      email: "sthembisongema@bantuthepeople.com", 
      icon: <Globe className="w-6 h-6" />,
      description: "Amplifying our environmental impact message"
    },
    {
      name: "Digital Innovation Director",
      role: "Digital Innovation Director",
      email: "rich@bantuthepeople.com",
      icon: <Globe className="w-6 h-6" />,
      description: "Transforming digital experiences for sustainable solutions"
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
            Our <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">Leadership Team</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Driving South Africa's transition to a circular economy through innovative e-waste recycling solutions
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-green-100 rounded-full flex items-center justify-center text-blue-600">
                  {member.icon}
                </div>
                <div>
                  <h3 className="font-bold text-lg text-gray-800">{member.name}</h3>
                  <p className="text-blue-600 font-semibold">{member.role}</p>
                </div>
              </div>
              
              <p className="text-gray-600 mb-4 text-sm">{member.description}</p>
              
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Mail className="w-4 h-4" />
                <span className="truncate">{member.email}</span>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="bg-white rounded-2xl p-8 shadow-lg max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-4 text-gray-800">Company Information</h3>
            <div className="space-y-3 text-left">
              <div className="flex justify-between">
                <span className="font-semibold">Address:</span>
                <span className="text-gray-600">6246 Mocke Street, Daveyton, Benoni, 1507</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Phone:</span>
                <span className="text-gray-600">010 065 4785</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Email:</span>
                <span className="text-gray-600">info@bantuthepeople.com</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Location:</span>
                <span className="text-gray-600">Gauteng, South Africa</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TeamSection;