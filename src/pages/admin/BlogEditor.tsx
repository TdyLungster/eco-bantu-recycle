import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import toast from 'react-hot-toast';
import {
  Sparkles,
  Save,
  Eye,
  EyeOff,
  ArrowLeft,
  RefreshCw,
  Copy,
  Loader2,
  FileText,
  Tag,
  Globe,
  Lock,
} from 'lucide-react';

const ADMIN_EMAIL = 'dludlulungile08@gmail.com';

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

function generateId(): string {
  return crypto.randomUUID();
}

export default function BlogEditor() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [authChecked, setAuthChecked] = useState(false);
  const [authed, setAuthed] = useState(false);

  // Form fields
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [content, setContent] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [tags, setTags] = useState('');
  const [published, setPublished] = useState(false);

  // UI state
  const [saving, setSaving] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiPrompt, setAiPrompt] = useState('');
  const [preview, setPreview] = useState(false);
  const [postId, setPostId] = useState<string | null>(id ?? null);
  const [fetchingPost, setFetchingPost] = useState(!!id);
  const [dirty, setDirty] = useState(false);

  const contentRef = useRef<HTMLTextAreaElement>(null);

  // Auth check
  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user || user.email !== ADMIN_EMAIL) {
        navigate('/', { replace: true });
        return;
      }
      setAuthed(true);
      setAuthChecked(true);
    });
  }, [navigate]);

  // Fetch existing post when editing
  useEffect(() => {
    if (!authChecked || !authed || !id) {
      setFetchingPost(false);
      return;
    }

    const loadPost = async () => {
      setFetchingPost(true);
      try {
        const { data, error } = await (supabase as any)
          .from('blog_posts')
          .select('*')
          .eq('id', id)
          .single();

        if (error) throw error;
        if (data) {
          setTitle(data.title ?? '');
          setSlug(data.slug ?? '');
          setContent(data.content ?? '');
          setExcerpt(data.excerpt ?? '');
          setTags(Array.isArray(data.tags) ? data.tags.join(', ') : (data.tags ?? ''));
          setPublished(data.published ?? false);
          setPostId(data.id);
        }
      } catch {
        toast.error('Failed to load post');
      } finally {
        setFetchingPost(false);
        setDirty(false);
      }
    };

    loadPost();
  }, [authChecked, authed, id]);

  // Auto-slug from title (only for new posts)
  useEffect(() => {
    if (postId) return; // don't overwrite slug when editing
    setSlug(generateSlug(title));
  }, [title, postId]);

  // Mark dirty on any field change
  useEffect(() => {
    if (authChecked && !fetchingPost) {
      setDirty(true);
    }
  }, [title, slug, content, excerpt, tags, published]);

  const handleSave = async () => {
    if (!title.trim()) {
      toast.error('Please enter a title');
      return;
    }

    setSaving(true);
    try {
      const tagsArray = tags
        .split(',')
        .map(t => t.trim())
        .filter(Boolean);

      const now = new Date().toISOString();

      if (postId) {
        // Update existing
        const { error } = await (supabase as any)
          .from('blog_posts')
          .update({
            title,
            slug: slug || generateSlug(title),
            content,
            excerpt,
            tags: tagsArray,
            published,
            updated_at: now,
          })
          .eq('id', postId);

        if (error) throw error;
        toast.success('Post updated');
      } else {
        // Insert new
        const newId = generateId();
        const { error } = await (supabase as any)
          .from('blog_posts')
          .insert({
            id: newId,
            title,
            slug: slug || generateSlug(title),
            content,
            excerpt,
            tags: tagsArray,
            published,
            created_at: now,
            updated_at: now,
          });

        if (error) throw error;
        toast.success('Post created');
      }

      setDirty(false);
      navigate('/admin/blog');
    } catch (err: any) {
      toast.error(err?.message ?? 'Failed to save post');
    } finally {
      setSaving(false);
    }
  };

  const handleGeneratePost = async () => {
    if (!aiPrompt.trim()) {
      toast.error('Enter a topic or prompt first');
      return;
    }

    setAiLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('generate-blog-post', {
        body: { prompt: aiPrompt, title },
      });

      if (error) throw error;

      if (data?.title) setTitle(data.title);
      if (data?.content) setContent(data.content);
      if (data?.excerpt) setExcerpt(data.excerpt);

      toast.success('Blog post generated!');
    } catch {
      toast.error('Generation failed — check ANTHROPIC_API_KEY in Supabase secrets');
    } finally {
      setAiLoading(false);
    }
  };

  const handleImproveSelected = async () => {
    const selected = window.getSelection()?.toString() ?? '';
    if (!selected.trim()) {
      toast.error('Select some text in the content area first');
      return;
    }
    if (!aiPrompt.trim()) {
      toast.error('Enter instructions in the AI prompt field');
      return;
    }

    setAiLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('generate-blog-post', {
        body: {
          prompt: aiPrompt + '\n\nImprove this section: ' + selected,
          mode: 'improve',
        },
      });

      if (error) throw error;

      if (data?.content && contentRef.current) {
        const start = contentRef.current.selectionStart ?? 0;
        const end = contentRef.current.selectionEnd ?? 0;
        const improved = data.content;
        const newContent =
          content.substring(0, start) + improved + content.substring(end);
        setContent(newContent);
        toast.success('Section improved!');
      }
    } catch {
      toast.error('Improvement failed');
    } finally {
      setAiLoading(false);
    }
  };

  const copyContent = () => {
    navigator.clipboard.writeText(content).then(() => toast.success('Content copied!'));
  };

  // Loading states
  if (!authChecked) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="w-9 h-9 border-4 border-green-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }
  if (!authed) return null;

  if (fetchingPost) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-9 h-9 border-4 border-green-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-400 text-sm">Loading post...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Sticky top bar */}
      <header className="bg-gray-900 border-b border-gray-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between gap-4">
          <Link
            to="/admin/blog"
            className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-green-400 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Blog Posts
          </Link>

          <div className="flex items-center gap-3">
            {/* Unsaved indicator */}
            <AnimatePresence>
              {dirty && (
                <motion.span
                  initial={{ opacity: 0, x: 8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 8 }}
                  className="text-xs text-yellow-500 font-medium hidden sm:inline"
                >
                  Unsaved changes
                </motion.span>
              )}
            </AnimatePresence>

            {/* Publish toggle */}
            <button
              onClick={() => setPublished(p => !p)}
              className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium border transition-colors ${
                published
                  ? 'border-green-700 bg-green-950 text-green-400 hover:bg-green-900/60'
                  : 'border-gray-700 bg-gray-800 text-gray-400 hover:bg-gray-700'
              }`}
            >
              {published ? <Globe className="w-3.5 h-3.5" /> : <Lock className="w-3.5 h-3.5" />}
              {published ? 'Published' : 'Draft'}
            </button>

            {/* Save */}
            <button
              onClick={handleSave}
              disabled={saving}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold bg-green-500 hover:bg-green-400 disabled:opacity-60 text-gray-950 transition-colors"
            >
              {saving ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Save className="w-4 h-4" />
              )}
              {saving ? 'Saving...' : 'Save Post'}
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">

          {/* ── LEFT COLUMN ─────────────────────────────────────────────────── */}
          <div className="flex-1 min-w-0 space-y-6">

            {/* Title */}
            <div>
              <input
                type="text"
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="Blog post title..."
                className="w-full text-2xl font-bold bg-transparent border-b border-gray-700 focus:border-green-500 outline-none text-white placeholder-gray-600 pb-3 transition-colors"
              />
            </div>

            {/* Excerpt */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-widest text-gray-500 mb-2">
                Excerpt
              </label>
              <textarea
                value={excerpt}
                onChange={e => setExcerpt(e.target.value)}
                rows={2}
                placeholder="Short description shown in blog listing..."
                className="w-full bg-gray-900 border border-gray-800 focus:border-green-500/60 rounded-xl px-4 py-3 text-sm text-gray-200 placeholder-gray-600 outline-none resize-none transition-colors"
              />
            </div>

            {/* Tags */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-widest text-gray-500 mb-2 flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5" /> Tags
              </label>
              <input
                type="text"
                value={tags}
                onChange={e => setTags(e.target.value)}
                placeholder="popia, nemwa, e-waste, recycling"
                className="w-full bg-gray-900 border border-gray-800 focus:border-green-500/60 rounded-xl px-4 py-2.5 text-sm text-gray-200 placeholder-gray-600 outline-none transition-colors"
              />
              <p className="text-xs text-gray-600 mt-1.5">Comma-separated</p>
            </div>

            {/* Slug */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-widest text-gray-500 mb-2">
                URL Slug
              </label>
              <div className="flex items-center bg-gray-900 border border-gray-800 focus-within:border-green-500/60 rounded-xl overflow-hidden transition-colors">
                <span className="px-4 py-2.5 text-sm text-gray-600 border-r border-gray-800 whitespace-nowrap select-none">
                  bantuthepeople.com/blog/
                </span>
                <input
                  type="text"
                  value={slug}
                  onChange={e => setSlug(e.target.value)}
                  placeholder="post-slug"
                  className="flex-1 bg-transparent px-3 py-2.5 text-sm text-gray-200 placeholder-gray-600 outline-none"
                />
              </div>
            </div>

          </div>

          {/* ── RIGHT COLUMN: AI Assistant ──────────────────────────────────── */}
          <div className="w-full lg:w-96 flex-shrink-0">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.4 }}
              className="bg-gray-900 border border-green-500/30 rounded-2xl p-5 sticky top-24"
            >
              {/* AI header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-green-400" />
                  <span className="text-sm font-bold text-white">AI Blog Writer</span>
                </div>
                <span className="text-xs bg-gray-800 text-green-400 border border-green-800 px-2 py-0.5 rounded-full font-medium">
                  Powered by Claude
                </span>
              </div>

              {/* AI Prompt */}
              <textarea
                value={aiPrompt}
                onChange={e => setAiPrompt(e.target.value)}
                rows={5}
                placeholder={`Enter topic, keywords, or instructions...\n\nExample: Write a 600-word blog post about POPIA compliance for IT managers in South Africa`}
                className="w-full bg-gray-800 border border-gray-700 focus:border-green-500/50 rounded-xl px-4 py-3 text-sm text-gray-200 placeholder-gray-500 outline-none resize-none transition-colors mb-3"
              />

              {/* Generate button */}
              <button
                onClick={handleGeneratePost}
                disabled={aiLoading}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold bg-green-500 hover:bg-green-400 disabled:opacity-60 text-gray-950 transition-colors mb-2"
              >
                {aiLoading ? (
                  <>
                    <motion.span
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                      className="inline-block"
                    >
                      <Sparkles className="w-4 h-4" />
                    </motion.span>
                    Claude is writing...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    Generate Full Post
                  </>
                )}
              </button>

              {/* Improve selected */}
              <button
                onClick={handleImproveSelected}
                disabled={aiLoading}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-xs font-medium bg-gray-800 hover:bg-gray-700 disabled:opacity-60 text-gray-300 hover:text-white border border-gray-700 transition-colors"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Improve Selected Text
              </button>

              <p className="text-xs text-gray-600 mt-3 leading-relaxed">
                Select text in the editor below, then click "Improve Selected" to rewrite just that section.
              </p>
            </motion.div>
          </div>

        </div>

        {/* ── CONTENT AREA (full width below) ─────────────────────────────── */}
        <div className="mt-8">
          {/* Edit / Preview toggle */}
          <div className="flex items-center justify-between mb-3">
            <label className="text-xs font-semibold uppercase tracking-widest text-gray-500">
              Content
            </label>
            <div className="flex items-center gap-1 bg-gray-900 border border-gray-800 rounded-lg p-0.5">
              <button
                onClick={() => setPreview(false)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                  !preview
                    ? 'bg-gray-800 text-white'
                    : 'text-gray-500 hover:text-gray-300'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                Edit
              </button>
              <button
                onClick={() => setPreview(true)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                  preview
                    ? 'bg-gray-800 text-white'
                    : 'text-gray-500 hover:text-gray-300'
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                Preview
              </button>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {!preview ? (
              <motion.div
                key="editor"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="relative"
              >
                <textarea
                  ref={contentRef}
                  value={content}
                  onChange={e => setContent(e.target.value)}
                  placeholder="Start writing your blog post here, or use the AI assistant to generate content..."
                  className="w-full min-h-[400px] bg-gray-900 border border-gray-800 focus:border-green-500/50 rounded-xl px-5 py-4 text-sm text-gray-200 placeholder-gray-600 outline-none resize-y transition-colors font-mono leading-relaxed"
                />
                {content && (
                  <button
                    onClick={copyContent}
                    title="Copy content"
                    className="absolute top-3 right-3 p-1.5 rounded-lg text-gray-600 hover:text-green-400 hover:bg-gray-800 transition-colors"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                )}
              </motion.div>
            ) : (
              <motion.div
                key="preview"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="bg-gray-900 border border-gray-800 rounded-xl px-6 py-5 min-h-[400px]"
              >
                {/* Preview header */}
                {title && (
                  <h1 className="text-2xl font-bold text-white mb-3">{title}</h1>
                )}
                {excerpt && (
                  <p className="text-gray-400 text-sm mb-4 italic border-l-2 border-green-500/50 pl-4">
                    {excerpt}
                  </p>
                )}
                {tags && (
                  <div className="flex flex-wrap gap-2 mb-5">
                    {tags.split(',').map(t => t.trim()).filter(Boolean).map(tag => (
                      <span
                        key={tag}
                        className="px-2.5 py-0.5 rounded-full text-xs bg-gray-800 text-green-400 border border-green-900/60"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
                {content ? (
                  <pre className="text-sm text-gray-300 whitespace-pre-wrap font-sans leading-relaxed">
                    {content}
                  </pre>
                ) : (
                  <div className="flex flex-col items-center justify-center h-40 gap-3 text-gray-600">
                    <FileText className="w-10 h-10 opacity-30" />
                    <p className="text-sm">No content to preview yet</p>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Word / char count */}
          <div className="flex items-center justify-between mt-2 px-1">
            <p className="text-xs text-gray-600">
              {content.trim()
                ? `${content.trim().split(/\s+/).filter(Boolean).length} words · ${content.length} characters`
                : 'No content yet'}
            </p>
            {dirty && (
              <p className="text-xs text-yellow-600">Unsaved changes</p>
            )}
          </div>
        </div>

        {/* Bottom save bar */}
        <div className="mt-8 flex items-center justify-between pt-6 border-t border-gray-800">
          <Link
            to="/admin/blog"
            className="text-sm text-gray-500 hover:text-gray-300 transition-colors"
          >
            ← Discard and go back
          </Link>
          <button
            onClick={handleSave}
            disabled={saving}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold bg-green-500 hover:bg-green-400 disabled:opacity-60 text-gray-950 transition-colors"
          >
            {saving ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            {saving ? 'Saving...' : postId ? 'Update Post' : 'Publish Post'}
          </button>
        </div>
      </main>
    </div>
  );
}
