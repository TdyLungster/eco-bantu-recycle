
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, User, ArrowRight, Search, Filter, Recycle, Leaf, Zap, Globe } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Posts', icon: Globe },
    { id: 'sustainability', name: 'Sustainability', icon: Leaf },
    { id: 'technology', name: 'Technology', icon: Zap },
    { id: 'recycling', name: 'Recycling', icon: Recycle },
  ];

  const blogPosts = [
    {
      id: 1,
      title: 'The Future of E-Waste Management in South Africa',
      excerpt: 'Exploring innovative solutions and government initiatives driving sustainable e-waste recycling across the nation.',
      category: 'sustainability',
      author: 'Dr. Sarah Mthembu',
      date: '2024-01-15',
      readTime: '8 min read',
      image: '/lovable-uploads/116647c6-0b22-4ba1-9ef3-49ea15b9193a.png',
      featured: true
    },
    {
      id: 2,
      title: 'Data Security in E-Waste Recycling: Best Practices',
      excerpt: 'Understanding the critical importance of secure data destruction in the e-waste recycling process.',
      category: 'technology',
      author: 'Mark Johnson',
      date: '2024-01-10',
      readTime: '6 min read',
      image: '/lovable-uploads/1d597c1b-c8b7-4bea-a6c4-25070f1172ab.png',
      featured: false
    },
    {
      id: 3,
      title: 'Corporate Responsibility: Building Sustainable IT Practices',
      excerpt: 'How businesses can implement circular economy principles in their IT lifecycle management.',
      category: 'sustainability',
      author: 'Thabo Mokoena',
      date: '2024-01-05',
      readTime: '10 min read',
      image: '/lovable-uploads/269a5861-5dc9-43bf-9d22-c739472e118b.png',
      featured: false
    },
    {
      id: 4,
      title: 'Material Recovery: Extracting Value from Electronic Waste',
      excerpt: 'Advanced techniques for recovering precious metals and rare earth elements from discarded electronics.',
      category: 'recycling',
      author: 'Prof. Lisa Chen',
      date: '2023-12-28',
      readTime: '7 min read',
      image: '/lovable-uploads/34b3f31b-63b9-4c2c-80c8-0554f8f35b2d.png',
      featured: false
    },
    {
      id: 5,
      title: 'Smart Cities and E-Waste: Creating Circular Urban Ecosystems',
      excerpt: 'How intelligent waste management systems are revolutionizing urban sustainability.',
      category: 'technology',
      author: 'Dr. Michael Barnes',
      date: '2023-12-20',
      readTime: '9 min read',
      image: '/lovable-uploads/37218efa-07cd-478a-9457-47fcc607ab2b.png',
      featured: false
    },
    {
      id: 6,
      title: 'Community Impact: E-Waste Recycling Job Creation',
      excerpt: 'Examining how the e-waste industry creates sustainable employment opportunities in local communities.',
      category: 'sustainability',
      author: 'Amanda Nkosi',
      date: '2023-12-15',
      readTime: '5 min read',
      image: '/lovable-uploads/549628f5-d48b-4d34-a2e9-34afad44cb56.png',
      featured: false
    }
  ];

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredPost = blogPosts.find(post => post.featured);
  const regularPosts = filteredPosts.filter(post => !post.featured);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="bg-eco-gradient text-white py-16 lg:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2"></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 text-contrast">
              Insights & Innovation
            </h1>
            <p className="text-xl lg:text-2xl text-white/90 mb-8 text-contrast">
              Discover the latest trends, research, and best practices in sustainable e-waste management
            </p>
            
            {/* Search and Filter */}
            <div className="flex flex-col lg:flex-row gap-4 max-w-2xl mx-auto">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search articles..."
                  className="w-full pl-10 pr-4 py-3 rounded-full text-foreground bg-card border border-border focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <select
                  className="pl-10 pr-8 py-3 rounded-full text-foreground bg-card border border-border focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none appearance-none min-w-[150px]"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Post */}
      {featuredPost && (
        <section className="py-12 lg:py-16">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="glass-card rounded-2xl shadow-xl overflow-hidden"
            >
              <div className="lg:flex">
                <div className="lg:w-1/2">
                  <img 
                    src={featuredPost.image} 
                    alt={featuredPost.title}
                    className="w-full h-64 lg:h-full object-cover"
                  />
                </div>
                <div className="lg:w-1/2 p-8 lg:p-12">
                  <div className="flex items-center space-x-2 mb-4">
                    <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                      Featured
                    </span>
                    <span className="text-muted-foreground text-sm">{featuredPost.readTime}</span>
                  </div>
                  <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-4">
                    {featuredPost.title}
                  </h2>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {featuredPost.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <User className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">{featuredPost.author}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">{featuredPost.date}</span>
                      </div>
                    </div>
                    <button className="flex items-center space-x-2 text-primary hover:text-accent transition-colors">
                      <span className="font-medium">Read More</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Blog Grid */}
      <section className="py-12 lg:py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularPosts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="glass-card rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow group"
              >
                <div className="relative overflow-hidden">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-card/90 backdrop-blur-sm text-primary px-3 py-1 rounded-full text-sm font-medium border border-border">
                      {categories.find(cat => cat.id === post.category)?.name}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center space-x-4 mb-3 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>{post.date}</span>
                    </div>
                    <span>{post.readTime}</span>
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <User className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">{post.author}</span>
                    </div>
                    <button className="flex items-center space-x-1 text-primary hover:text-accent transition-colors">
                      <span className="text-sm font-medium">Read</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">No articles found matching your criteria.</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Blog;
