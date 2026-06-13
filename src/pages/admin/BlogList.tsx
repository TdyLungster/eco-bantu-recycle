import React, { useEffect, useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';
import toast from 'react-hot-toast';
import {
  PenSquare,
  Trash2,
  Eye,
  EyeOff,
  Plus,
  FileText,
  Clock,
  ChevronRight,
} from 'lucide-react';

const ADMIN_EMAIL = 'dludlulungile08@gmail.com';

type AuthStatus = 'loading' | 'ok' | 'denied';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  published: boolean;
  created_at: string;
  updated_at: string | null;
}

const cardVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.05, duration: 0.35, ease: 'easeOut' },
  }),
};

export default function BlogList() {
  const [authStatus, setAuthStatus] = useState<AuthStatus>('loading');
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [dataLoading, setDataLoading] = useState(true);

  // Auth check
  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user || user.email !== ADMIN_EMAIL) {
        setAuthStatus('denied');
        return;
      }
      setAuthStatus('ok');
    });
  }, []);

  // Fetch posts once auth confirmed
  useEffect(() => {
    if (authStatus !== 'ok') return;
    fetchPosts();
  }, [authStatus]);

  const fetchPosts = async () => {
    setDataLoading(true);
    try {
      const { data, error } = await (supabase as any)
        .from('blog_posts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPosts(data ?? []);
    } catch (err: any) {
      toast.error('Failed to load blog posts');
    } finally {
      setDataLoading(false);
    }
  };

  const togglePublish = async (post: BlogPost) => {
    try {
      const { error } = await (supabase as any)
        .from('blog_posts')
        .update({ published: !post.published })
        .eq('id', post.id);

      if (error) throw error;

      setPosts(prev =>
        prev.map(p => (p.id === post.id ? { ...p, published: !p.published } : p))
      );
      toast.success(post.published ? 'Post unpublished' : 'Post published');
    } catch {
      toast.error('Failed to update post status');
    }
  };

  const deletePost = async (post: BlogPost) => {
    const confirmed = window.confirm(
      `Delete "${post.title}"? This cannot be undone.`
    );
    if (!confirmed) return;

    try {
      const { error } = await (supabase as any)
        .from('blog_posts')
        .delete()
        .eq('id', post.id);

      if (error) throw error;

      setPosts(prev => prev.filter(p => p.id !== post.id));
      toast.success('Post deleted');
    } catch {
      toast.error('Failed to delete post');
    }
  };

  // Auth gates
  if (authStatus === 'loading') {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="w-9 h-9 border-4 border-green-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }
  if (authStatus === 'denied') {
    return <Navigate to="/" replace />;
  }

  const published = posts.filter(p => p.published).length;
  const drafts = posts.filter(p => !p.published).length;

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Top Bar */}
      <header className="bg-gray-900 border-b border-gray-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
            <h1 className="text-lg font-bold tracking-tight text-white">Blog Posts</h1>
          </div>
          <div className="flex items-center gap-3">
            <Link
              to="/admin"
              className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-green-400 transition-colors"
            >
              Back to Admin <ChevronRight className="w-3.5 h-3.5" />
            </Link>
            <Link
              to="/admin/blog/new"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold bg-green-500 hover:bg-green-400 text-gray-950 transition-colors"
            >
              <Plus className="w-4 h-4" />
              New Post
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: 'Total Posts', value: posts.length, color: 'text-white' },
            { label: 'Published', value: published, color: 'text-green-400' },
            { label: 'Drafts', value: drafts, color: 'text-gray-400' },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              className="bg-gray-900 border border-gray-800 rounded-xl p-5"
            >
              <p className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-2">
                {stat.label}
              </p>
              <p className={`text-3xl font-extrabold ${stat.color}`}>
                {dataLoading ? (
                  <span className="inline-block w-10 h-7 bg-gray-800 rounded animate-pulse" />
                ) : (
                  stat.value
                )}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Posts Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden"
        >
          {dataLoading ? (
            <div className="flex items-center justify-center h-48">
              <div className="w-7 h-7 border-4 border-green-500 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : posts.length === 0 ? (
            /* Empty state */
            <div className="flex flex-col items-center justify-center h-56 gap-4 text-gray-500">
              <FileText className="w-12 h-12 opacity-30" />
              <div className="text-center">
                <p className="text-base font-semibold text-gray-400">No blog posts yet</p>
                <p className="text-sm text-gray-600 mt-1">Create your first post to get started</p>
              </div>
              <Link
                to="/admin/blog/new"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold bg-green-500 hover:bg-green-400 text-gray-950 transition-colors mt-1"
              >
                <Plus className="w-4 h-4" />
                Write First Post
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-800 text-left">
                    {['Title', 'Status', 'Date', 'Actions'].map(col => (
                      <th
                        key={col}
                        className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500"
                      >
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {posts.map((post, i) => (
                    <motion.tr
                      key={post.id}
                      custom={i}
                      variants={cardVariants}
                      initial="hidden"
                      animate="visible"
                      className="border-b border-gray-800/60 last:border-0 hover:bg-gray-800/40 transition-colors"
                    >
                      {/* Title */}
                      <td className="px-4 py-3.5">
                        <div className="max-w-xs truncate font-medium text-white">
                          {post.title || <span className="text-gray-500 italic">Untitled</span>}
                        </div>
                        <div className="text-xs text-gray-600 mt-0.5 truncate max-w-xs">
                          /blog/{post.slug}
                        </div>
                      </td>

                      {/* Status badge */}
                      <td className="px-4 py-3.5">
                        {post.published ? (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-green-950 text-green-400 border border-green-800">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                            Published
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-gray-800 text-gray-400 border border-gray-700">
                            <span className="w-1.5 h-1.5 rounded-full bg-gray-500" />
                            Draft
                          </span>
                        )}
                      </td>

                      {/* Date */}
                      <td className="px-4 py-3.5 text-gray-500 whitespace-nowrap">
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 flex-shrink-0" />
                          {post.created_at
                            ? new Date(post.created_at).toLocaleDateString('en-ZA', {
                                day: '2-digit',
                                month: 'short',
                                year: 'numeric',
                              })
                            : '—'}
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-1.5">
                          {/* Edit */}
                          <Link
                            to={`/admin/blog/edit/${post.id}`}
                            title="Edit post"
                            className="inline-flex items-center gap-1.5 text-xs text-blue-400 hover:text-blue-300 bg-blue-500/10 hover:bg-blue-500/20 px-2.5 py-1.5 rounded-lg transition-colors"
                          >
                            <PenSquare className="w-3.5 h-3.5" />
                            Edit
                          </Link>

                          {/* Toggle publish */}
                          <button
                            onClick={() => togglePublish(post)}
                            title={post.published ? 'Unpublish' : 'Publish'}
                            className={`inline-flex items-center gap-1.5 text-xs px-2.5 py-1.5 rounded-lg transition-colors ${
                              post.published
                                ? 'text-yellow-400 hover:text-yellow-300 bg-yellow-500/10 hover:bg-yellow-500/20'
                                : 'text-green-400 hover:text-green-300 bg-green-500/10 hover:bg-green-500/20'
                            }`}
                          >
                            {post.published ? (
                              <><EyeOff className="w-3.5 h-3.5" /> Unpublish</>
                            ) : (
                              <><Eye className="w-3.5 h-3.5" /> Publish</>
                            )}
                          </button>

                          {/* Delete */}
                          <button
                            onClick={() => deletePost(post)}
                            title="Delete post"
                            className="inline-flex items-center gap-1.5 text-xs text-red-400 hover:text-red-300 bg-red-500/10 hover:bg-red-500/20 px-2.5 py-1.5 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            Delete
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </motion.div>
      </main>
    </div>
  );
}
