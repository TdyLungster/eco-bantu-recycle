import React, { useEffect, useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Calendar, ArrowLeft, Tag, Share2, PenSquare } from 'lucide-react';
import DarkNavigation from '@/components/DarkNavigation';
import DarkFooter from '@/components/DarkFooter';
import { supabase } from '@/integrations/supabase/client';

interface Post {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  tags: string[];
  author: string;
  created_at: string;
}

// Very basic markdown → HTML (headings, bold, lists, paragraphs)
function renderMarkdown(md: string): string {
  return md
    .replace(/^### (.+)$/gm, '<h3 class="text-xl font-bold text-white mt-6 mb-2">$1</h3>')
    .replace(/^## (.+)$/gm, '<h2 class="text-2xl font-black text-white mt-8 mb-3">$1</h2>')
    .replace(/^# (.+)$/gm, '<h1 class="text-3xl font-black text-white mt-8 mb-4">$1</h1>')
    .replace(/\*\*(.+?)\*\*/g, '<strong class="text-white font-bold">$1</strong>')
    .replace(/\*(.+?)\*/g, '<em class="text-gray-300">$1</em>')
    .replace(/`(.+?)`/g, '<code class="bg-gray-800 text-green-400 px-1.5 py-0.5 rounded text-sm font-mono">$1</code>')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-green-400 hover:text-green-300 underline" target="_blank" rel="noopener">$1</a>')
    .replace(/^- (.+)$/gm, '<li class="text-gray-300 ml-4 list-disc">$1</li>')
    .replace(/^(\d+)\. (.+)$/gm, '<li class="text-gray-300 ml-4 list-decimal">$2</li>')
    .replace(/(<li[\s\S]*?<\/li>\n?)+/g, '<ul class="space-y-1 my-3 pl-4">$&</ul>')
    .split('\n\n')
    .map(block => {
      if (block.startsWith('<h') || block.startsWith('<ul') || block.startsWith('<li')) return block;
      if (!block.trim()) return '';
      return `<p class="text-gray-300 leading-relaxed my-3">${block.replace(/\n/g, ' ')}</p>`;
    })
    .join('\n');
}

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [adminUser, setAdminUser] = useState(false);

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setAdminUser(user?.email === 'dludlulungile08@gmail.com');
    });

    if (!slug) { setNotFound(true); setLoading(false); return; }

    (supabase as any)
      .from('blog_posts')
      .select('*')
      .eq('slug', slug)
      .single()
      .then(({ data, error }: any) => {
        if (error || !data) {
          setNotFound(true);
        } else {
          setPost(data);
        }
        setLoading(false);
      });
  }, [slug]);

  const share = () => {
    navigator.share?.({ title: post?.title, url: window.location.href })
      .catch(() => navigator.clipboard.writeText(window.location.href));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-green-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (notFound) return <Navigate to="/blog" replace />;

  return (
    <div className="min-h-screen bg-gray-950">
      <Helmet>
        <title>{post!.title} | Bantu The People Blog</title>
        <meta name="description" content={post!.excerpt || post!.title} />
        <link rel="canonical" href={`https://bantuthepeople.com/blog/${post!.slug}`} />
        <meta property="og:title" content={post!.title} />
        <meta property="og:description" content={post!.excerpt} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://bantuthepeople.com/blog/${post!.slug}`} />
      </Helmet>

      <DarkNavigation />

      <main className="pt-28 pb-20 px-4">
        <div className="max-w-3xl mx-auto">

          {/* Back + admin edit */}
          <div className="flex items-center justify-between mb-8">
            <Link to="/blog" className="flex items-center gap-1.5 text-gray-400 hover:text-green-400 text-sm transition-colors">
              <ArrowLeft className="w-4 h-4" /> All Articles
            </Link>
            <div className="flex items-center gap-3">
              <button onClick={share} className="flex items-center gap-1.5 text-gray-500 hover:text-green-400 text-sm transition-colors">
                <Share2 className="w-4 h-4" /> Share
              </button>
              {adminUser && (
                <Link to={`/admin/blog/edit/${post!.id}`}
                  className="flex items-center gap-1.5 text-xs bg-green-500/20 border border-green-500/40 text-green-400 px-3 py-1.5 rounded-lg hover:bg-green-500/30 transition-colors">
                  <PenSquare className="w-3.5 h-3.5" /> Edit Post
                </Link>
              )}
            </div>
          </div>

          {/* Article */}
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {/* Tags */}
            {post!.tags?.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-5">
                {post!.tags.map(tag => (
                  <span key={tag} className="flex items-center gap-1 text-xs bg-green-500/10 text-green-400 border border-green-500/20 px-2.5 py-1 rounded-full">
                    <Tag className="w-2.5 h-2.5" />{tag}
                  </span>
                ))}
              </div>
            )}

            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-black text-white leading-tight mb-4">
              {post!.title}
            </h1>

            {/* Meta */}
            <div className="flex items-center gap-4 text-gray-500 text-sm mb-8 pb-8 border-b border-gray-800">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                {new Date(post!.created_at).toLocaleDateString('en-ZA', { day: 'numeric', month: 'long', year: 'numeric' })}
              </span>
              <span>By {post!.author}</span>
            </div>

            {/* Content */}
            <div
              className="prose-bantu"
              dangerouslySetInnerHTML={{ __html: renderMarkdown(post!.content) }}
            />

            {/* CTA */}
            <div className="mt-12 bg-gray-900 border border-green-500/30 rounded-2xl p-6 text-center">
              <p className="text-white font-bold text-lg mb-2">Ready to get POPIA + NEMWA compliant?</p>
              <p className="text-gray-400 text-sm mb-4">Free corporate pickup · Same-week collection · Certified data destruction</p>
              <Link to="/tools/pickup"
                className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-400 text-gray-900 font-black px-6 py-3 rounded-xl transition-all">
                Book Free Pickup →
              </Link>
            </div>
          </motion.article>
        </div>
      </main>

      <DarkFooter />
    </div>
  );
}
