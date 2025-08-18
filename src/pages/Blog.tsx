
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Search, User, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import DarkNavigation from '@/components/DarkNavigation';
import DarkFooter from '@/components/DarkFooter';

// Mock data - replace with Firestore integration
const mockPosts = [
  {
    id: 1,
    title: "E-Waste Recycling Guide for Johannesburg",
    body: "A comprehensive guide to proper e-waste disposal in Johannesburg...",
    createdAt: new Date('2024-01-15'),
    slug: "e-waste-guide-johannesburg",
    author: "Bantu Team"
  },
  {
    id: 2,
    title: "The Environmental Impact of Old Electronics",
    body: "Understanding how electronic waste affects our environment...",
    createdAt: new Date('2024-01-10'),
    slug: "environmental-impact-electronics",
    author: "Bantu Team"
  },
  {
    id: 3,
    title: "Corporate E-Waste Management Best Practices",
    body: "How businesses can implement sustainable e-waste practices...",
    createdAt: new Date('2024-01-05'),
    slug: "corporate-e-waste-management",
    author: "Bantu Team"
  }
];

const Blog = () => {
  const [posts, setPosts] = useState(mockPosts);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPosts, setFilteredPosts] = useState(mockPosts);

  useEffect(() => {
    const filtered = posts.filter(post =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.body.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPosts(filtered);
  }, [searchTerm, posts]);

  return (
    <div className="min-h-screen bg-gray-900">
      <DarkNavigation />
      
      <main className="pt-32 pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              E-Waste <span className="text-green-400">Insights</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Stay informed about e-waste recycling, environmental impact, and sustainable practices in South Africa.
            </p>
          </motion.div>

          {/* Search and Create */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 bg-gray-800 border-gray-700 text-white placeholder-gray-400"
              />
            </div>
            <Button className="bg-green-600 hover:bg-green-700 text-white">
              <Plus className="w-4 h-4 mr-2" />
              New Article
            </Button>
          </div>

          {/* Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="bg-gray-800/50 border-gray-700 hover:bg-gray-800/70 transition-colors cursor-pointer h-full">
                  <CardHeader>
                    <CardTitle className="text-white text-lg line-clamp-2">
                      {post.title}
                    </CardTitle>
                    <div className="flex items-center text-gray-400 text-sm space-x-4">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>{post.createdAt.toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <User className="w-4 h-4" />
                        <span>{post.author}</span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-300 line-clamp-3">
                      {post.body}
                    </p>
                    <Button 
                      variant="link" 
                      className="text-green-400 hover:text-green-300 p-0 mt-3"
                    >
                      Read More →
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-400 text-lg">No articles found matching your search.</p>
            </div>
          )}
        </div>
      </main>

      <DarkFooter />
    </div>
  );
};

export default Blog;
