import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Calendar, Search, User, ArrowRight, PenSquare, Tag } from 'lucide-react';
import { Link } from 'react-router-dom';
import DarkNavigation from '@/components/DarkNavigation';
import DarkFooter from '@/components/DarkFooter';
import { supabase } from '@/integrations/supabase/client';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  tags: string[];
  author: string;
  created_at: string;
}

// Fallback static posts shown while DB loads or if empty
const STATIC_POSTS: BlogPost[] = [
  {
    id: 'static-1',
    title: 'E-Waste Recycling Guide for Johannesburg Businesses',
    slug: 'corporate-e-waste-management-guide',
    excerpt: 'A comprehensive guide to proper e-waste disposal and POPIA compliance for Johannesburg businesses.',
    tags: ['popia', 'johannesburg'],
    author: 'Bantu The People',
    created_at: '2024-01-15T00:00:00Z',
  },
  {
    id: 'static-2',
    title: 'NEMWA Compliance: What Every SA Business Must Know in 2025',
    slug: 'nemwa-compliance-2025',
    excerpt: 'Breaking down NEMWA requirements and how certified e-waste recycling protects your business from fines.',
    tags: ['nemwa', 'compliance'],
    author: 'Bantu The People',
    created_at: '2024-01-10T00:00:00Z',
  },
  {
    id: 'static-3',
    title: 'Data Destruction Certificates: Why Your Auditors Demand Them',
    slug: 'data-destruction-certificates',
    excerpt: 'Everything IT managers need to know about certified data wiping under DoD 5220.22-M and POPIA.',
    tags: ['data-destruction', 'it'],
    author: 'Bantu The People',
    created_at: '2024-01-05T00:00:00Z',
  },
];

const Blog = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [adminUser, setAdminUser] = useState(false);

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setAdminUser(user?.email === 'dludlulungile08@gmail.com');
    });

    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const { data, error } = await (supabase as any)
        .from('blog_posts')
        .select('id, title, slug, excerpt, tags, author, created_at')
        .eq('published', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPosts(data?.length ? data : STATIC_POSTS);
    } catch {
      setPosts(STATIC_POSTS);
    } finally {
      setLoading(false);
    }
  };

  const filtered = posts.filter(p =>
    !search ||
    p.title.toLowerCase().includes(search.toLowerCase()) ||
    p.excerpt.toLowerCase().includes(search.toLowerCase()) ||
    p.tags?.some(t => t.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-gray-950">
      <Helmet>
        <title>E-Waste Blog & Compliance Insights | Bantu The People</title>
        <meta name="description" content="POPIA, NEMWA, and e-waste recycling articles for South African businesses. Expert guides on compliance, data destruction, and sustainable IT practices." />
        <link rel="canonical" href="https://bantuthepeople.com/blog" />
        <meta property="og:title" content="E-Waste Blog & Insights | Bantu The People" />
        <meta property="og:url" content="https://bantuthepeople.com/blog" />
        <meta property="og:type" content="website" />
      </Helmet>

      <DarkNavigation />

      <main className="pt-28 pb-20 px-4">
        <div className="max-w-6xl mx-auto">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <span className="text-green-400 text-xs font-bold uppercase tracking-widest">Insights & Guides</span>
            <h1 className="text-4xl md:text-5xl font-black text-white mt-2 mb-4">
              E-Waste <span className="text-green-400">Knowledge Base</span>
            </h1>
            <p className="text-gray-400 max-w-2xl mx-auto">
              POPIA compliance guides, NEMWA updates, and e-waste best practices for South African businesses.
            </p>
          </motion.div>

          {/* Search + Admin CTA */}
          <div className="flex flex-col sm:flex-row gap-3 mb-10">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                type="text"
                placeholder="Search articles..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-900 border border-gray-800 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-green-500 text-sm"
              />
            </div>
            {adminUser && (
              <Link
                to="/admin/blog/new"
                className="flex items-center gap-2 bg-green-500 hover:bg-green-400 text-gray-900 font-black px-5 py-3 rounded-xl text-sm transition-colors whitespace-nowrap"
              >
                <PenSquare className="w-4 h-4" />
                Write New Post
              </Link>
            )}
          </div>

          {/* Posts Grid */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map(i => (
                <div key={i} className="bg-gray-900 border border-gray-800 rounded-2xl p-6 h-52 animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((post, i) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className="bg-gray-900 border border-gray-800 hover:border-green-500/40 rounded-2xl p-6 flex flex-col gap-4 transition-colors group"
                >
                  {post.tags?.length > 0 && (
                    <div className="flex items-center gap-1.5 flex-wrap">
                      {post.tags.slice(0, 2).map(tag => (
                        <span key={tag} className="flex items-center gap-1 text-xs bg-green-500/10 text-green-400 border border-green-500/20 px-2 py-0.5 rounded-full">
                          <Tag className="w-2.5 h-2.5" />{tag}
                        </span>
                      ))}
                    </div>
                  )}

                  <h2 className="text-white font-bold text-lg leading-snug group-hover:text-green-300 transition-colors line-clamp-2">
                    {post.title}
                  </h2>

                  <p className="text-gray-400 text-sm leading-relaxed line-clamp-3 flex-1">
                    {post.excerpt || 'Read this article to learn more about e-waste compliance in South Africa.'}
                  </p>

                  <div className="flex items-center justify-between pt-2 border-t border-gray-800">
                    <div className="flex items-center gap-3 text-gray-500 text-xs">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(post.created_at).toLocaleDateString('en-ZA', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </span>
                    </div>
                    <Link
                      to={`/blog/${post.slug}`}
                      className="flex items-center gap-1 text-green-400 hover:text-green-300 text-xs font-semibold transition-colors"
                    >
                      Read <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </motion.article>
              ))}
            </div>
          )}

          {!loading && filtered.length === 0 && (
            <div className="text-center py-20 text-gray-500">
              No articles found matching "{search}"
            </div>
          )}
        </div>
      </main>

      <DarkFooter />
    </div>
  );
};

export default Blog;
