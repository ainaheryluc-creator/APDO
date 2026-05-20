'use client'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, Calendar, Clock, Disc, Music, ThumbsUp, MessageCircle, Share2, Globe, MoreHorizontal, Send, Image as ImageIcon, Video, Mic, RefreshCw, X, Check } from 'lucide-react'
import { useState, useEffect } from 'react'
import { MediaItem, User } from '@/lib/types'

export default function Media() {
  const [user, setUser] = useState<User | null>(null)
  const [isAdmin, setIsAdmin] = useState(false)
  const [posts, setPosts] = useState<MediaItem[]>([])
  const [loading, setLoading] = useState(true)

  // Quick Post Form State
  const [quickTitle, setQuickTitle] = useState('')
  const [quickContent, setQuickContent] = useState('')
  const [quickType, setQuickType] = useState<'audio' | 'announcement'>('audio')
  const [quickUrl, setQuickUrl] = useState('')
  const [posting, setPosting] = useState(false)
  const [postSuccess, setPostSuccess] = useState(false)

  // Interactive UI states mapped by post ID
  const [likes, setLikes] = useState<Record<string, { count: number; liked: boolean }>>({})
  const [comments, setComments] = useState<Record<string, Array<{ author: string; text: string; date: Date }>>>({})
  const [activeCommentInput, setActiveCommentInput] = useState<string | null>(null)
  const [commentTexts, setCommentTexts] = useState<Record<string, string>>({})
  const [shareFeedback, setShareFeedback] = useState<string | null>(null)

  // Default hardcoded initial media items if database is empty
  const defaultMediaItems: MediaItem[] = [
    {
      id: 'media-1',
      title: 'Message de la Présidente Holda RAMANARIVO',
      content: 'Présentation de l’association, nos objectifs à court et long terme pour l’assistance administrative et la veille juridique locale.',
      type: 'audio',
      url: '',
      status: 'published',
      createdAt: '2026-05-15T10:00:00.000Z'
    },
    {
      id: 'media-2',
      title: 'Opération Cake : Bilan et Remerciements en Vidéo',
      content: 'Découvrez en images la ferveur collective lors de la vente de gâteaux organisée pour le coffre commun de l\'APDO.',
      type: 'announcement',
      url: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // Placeholder video embed
      status: 'published',
      createdAt: '2026-05-10T14:30:00.000Z'
    },
    {
      id: 'media-3',
      title: 'Appel aux Membres Actifs & Volontaires',
      content: 'Comment rejoindre l’association à Ambohimanambola B et participer activement à la mise en place du bureau et à l\'aide juridique.',
      type: 'audio',
      url: '',
      status: 'published',
      createdAt: '2026-04-25T08:15:00.000Z'
    }
  ]

  useEffect(() => {
    // Check if user is logged in and if they are an admin
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser) as User
      setUser(parsedUser)
      setIsAdmin(parsedUser.role === 'admin')
    }

    loadMediaPosts()
  }, [])

  const loadMediaPosts = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/media')
      const data = await res.json()
      if (data.success && data.items && data.items.length > 0) {
        // Filter out drafts if not admin
        const publishedItems = data.items.filter((item: MediaItem) => item.status === 'published')
        setPosts(publishedItems)
        
        // Initialize likes and comments
        const initialLikes: Record<string, { count: number; liked: boolean }> = {}
        const initialComments: Record<string, Array<{ author: string; text: string; date: Date }>> = {}
        
        data.items.forEach((item: MediaItem) => {
          // Generate a deterministic random number of likes for premium feel
          const baseLikes = Math.floor((parseInt(item.id.replace(/\D/g, '') || '5') % 20) + 3)
          initialLikes[item.id] = { count: baseLikes, liked: false }
          initialComments[item.id] = [
            {
              author: 'Mahenintsoa',
              text: 'Félicitations pour cette initiative !',
              date: new Date(Date.now() - 3600000 * 2)
            }
          ]
        })
        
        setLikes(initialLikes)
        setComments(initialComments)
      } else {
        setPosts(defaultMediaItems)
        
        // Setup defaults for fallback
        const initialLikes: Record<string, { count: number; liked: boolean }> = {
          'media-1': { count: 18, liked: false },
          'media-2': { count: 32, liked: false },
          'media-3': { count: 14, liked: false }
        }
        const initialComments: Record<string, Array<{ author: string; text: string; date: Date }>> = {
          'media-1': [
            { author: 'Roger', text: 'Un message très inspirant de notre présidente ! En avant APDO.', date: new Date() }
          ],
          'media-2': [
            { author: 'Luxanna', text: 'Quel plaisir de voir l\'ambiance lors de la vente de gâteaux !', date: new Date() }
          ],
          'media-3': []
        }
        setLikes(initialLikes)
        setComments(initialComments)
      }
    } catch (error) {
      console.error('Error loading media posts, using defaults:', error)
      setPosts(defaultMediaItems)
    } finally {
      setLoading(false)
    }
  }

  // Handle Quick Publish
  const handleQuickPublish = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!quickTitle || !quickContent) return
    setPosting(true)

    try {
      const token = localStorage.getItem('token')
      const response = await fetch('/api/media', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          title: quickTitle,
          content: quickContent,
          type: quickType,
          url: quickUrl,
          status: 'published'
        })
      })

      const data = await response.json()
      if (data.success && data.item) {
        setQuickTitle('')
        setQuickContent('')
        setQuickUrl('')
        setPostSuccess(true)
        setTimeout(() => setPostSuccess(false), 3000)
        
        // Prepend new post
        setPosts([data.item, ...posts])
        setLikes(prev => ({
          ...prev,
          [data.item.id]: { count: 0, liked: false }
        }))
        setComments(prev => ({
          ...prev,
          [data.item.id]: []
        }))
      } else {
        alert(data.message || 'Erreur lors de la publication.')
      }
    } catch (error) {
      console.error('Quick publish failed:', error)
      alert('Une erreur est survenue lors de l\'envoi.')
    } finally {
      setPosting(false)
    }
  }

  // Handle Like Action
  const handleLike = (id: string) => {
    setLikes(prev => {
      const current = prev[id] || { count: 0, liked: false }
      const newLiked = !current.liked
      return {
        ...prev,
        [id]: {
          count: newLiked ? current.count + 1 : Math.max(0, current.count - 1),
          liked: newLiked
        }
      }
    })
  }

  // Handle Share Click
  const handleShare = (id: string) => {
    const shareUrl = `${window.location.origin}/media#${id}`
    navigator.clipboard.writeText(shareUrl)
    setShareFeedback(id)
    setTimeout(() => setShareFeedback(null), 2500)
  }

  // Handle Comment Submission
  const handleAddComment = (id: string) => {
    const text = commentTexts[id]
    if (!text || !text.trim()) return

    const newComment = {
      author: user?.name || user?.email || 'Visiteur APDO',
      text: text,
      date: new Date()
    }

    setComments(prev => ({
      ...prev,
      [id]: [...(prev[id] || []), newComment]
    }))

    setCommentTexts(prev => ({ ...prev, [id]: '' }))
  }

  const fadeInUp = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#F0F2F5] py-12">
        <div className="max-w-2xl mx-auto px-4">
          
          {/* Header Banner */}
          <div className="text-center mb-10">
            <span className="inline-block px-4 py-1.5 rounded-full bg-[#DF6C63]/10 text-[#DF6C63] text-sm font-bold tracking-wider mb-2">
              COMMUNAUTÉ APDO
            </span>
            <h1 className="text-3xl font-extrabold text-[#09335F]">
              Le Fil des Médias & Annonces
            </h1>
            <p className="text-gray-500 text-sm mt-1 font-medium">
              Lecteurs audio, vidéos d&apos;action et vie associative au quotidien.
            </p>
          </div>

          {/* Facebook-like Quick Post Box (Only visible if Admin is logged in) */}
          <AnimatePresence>
            {isAdmin && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="bg-white rounded-3xl p-5 shadow-sm mb-6 border border-gray-200"
              >
                <div className="flex items-center gap-3 border-b border-gray-100 pb-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-[#09335F] text-white flex items-center justify-center font-bold">
                    A
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-sm">Publier au nom de l&apos;APDO</h3>
                    <p className="text-xs text-green-600 font-semibold flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-green-500 inline-block animate-ping" />
                      Session Admin active
                    </p>
                  </div>
                </div>

                <form onSubmit={handleQuickPublish} className="space-y-3">
                  {postSuccess && (
                    <div className="bg-emerald-50 text-emerald-800 p-3 rounded-xl text-center text-xs font-bold border border-emerald-100 flex items-center justify-center gap-2">
                      <Check size={14} /> Publication mise en ligne avec succès !
                    </div>
                  )}

                  <input
                    type="text"
                    placeholder="Titre de votre annonce..."
                    value={quickTitle}
                    onChange={e => setQuickTitle(e.target.value)}
                    required
                    className="w-full px-4 py-2 bg-[#F0F2F5] border-0 rounded-xl focus:ring-2 focus:ring-[#09335F] focus:outline-none text-sm font-semibold placeholder-gray-400"
                  />

                  <textarea
                    placeholder="Que souhaitez-vous partager aujourd'hui ?"
                    value={quickContent}
                    onChange={e => setQuickContent(e.target.value)}
                    required
                    rows={3}
                    className="w-full px-4 py-3 bg-[#F0F2F5] border-0 rounded-xl focus:ring-2 focus:ring-[#09335F] focus:outline-none text-sm font-medium placeholder-gray-400 resize-none"
                  />

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-gray-500 mb-1">Type de Média</label>
                      <select
                        value={quickType}
                        onChange={e => setQuickType(e.target.value as 'audio' | 'announcement')}
                        className="w-full px-3 py-2 bg-[#F0F2F5] border-0 rounded-xl text-xs font-bold focus:outline-none"
                      >
                        <option value="audio">📢 Message Vocal / Audio</option>
                        <option value="announcement">🎥 Vidéo / Annonce YouTube</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-gray-500 mb-1">Lien URL (Vidéo / Externe)</label>
                      <input
                        type="url"
                        placeholder="Lien YouTube, Drive..."
                        value={quickUrl}
                        onChange={e => setQuickUrl(e.target.value)}
                        className="w-full px-3 py-2 bg-[#F0F2F5] border-0 rounded-xl text-xs font-semibold focus:outline-none placeholder-gray-400"
                      />
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-3 border-t border-gray-100 mt-2">
                    <div className="flex gap-4 text-gray-500">
                      <span className="flex items-center gap-1 cursor-pointer hover:bg-gray-50 px-2.5 py-1.5 rounded-lg transition-colors text-xs font-bold" onClick={() => setQuickType('audio')}>
                        <Mic size={16} className="text-purple-500" /> Audio
                      </span>
                      <span className="flex items-center gap-1 cursor-pointer hover:bg-gray-50 px-2.5 py-1.5 rounded-lg transition-colors text-xs font-bold" onClick={() => setQuickType('announcement')}>
                        <Video size={16} className="text-blue-500" /> Vidéo
                      </span>
                    </div>
                    
                    <button
                      type="submit"
                      disabled={posting}
                      className="px-6 py-2 bg-[#DF6C63] hover:bg-[#DF6C63]/90 disabled:bg-gray-300 text-white rounded-xl text-xs font-extrabold shadow-sm transition-all hover:-translate-y-0.5 flex items-center gap-1.5"
                    >
                      <Send size={12} />
                      <span>{posting ? 'Publication...' : 'Publier'}</span>
                    </button>
                  </div>
                </form>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Social Newsfeed Stream */}
          {loading ? (
            <div className="flex justify-center items-center py-20 bg-white rounded-3xl border border-gray-200">
              <RefreshCw className="w-10 h-10 animate-spin text-[#09335F]" />
            </div>
          ) : (
            <div className="space-y-5">
              {posts.map((post) => {
                const isLiked = likes[post.id]?.liked || false
                const likeCount = likes[post.id]?.count || 0
                const postComments = comments[post.id] || []
                
                return (
                  <motion.article
                    key={post.id}
                    id={post.id}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    variants={fadeInUp}
                    className="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden flex flex-col"
                  >
                    {/* Post Header */}
                    <div className="flex items-center justify-between p-4 border-b border-gray-50">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[#09335F] text-[#EAA937] flex items-center justify-center font-extrabold text-sm shadow-inner relative">
                          APDO
                          <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-white" />
                        </div>
                        <div>
                          <h3 className="font-extrabold text-[#09335F] text-sm hover:underline cursor-pointer flex items-center gap-1">
                            <span>APDO Officiel</span>
                            <span className="text-[10px] bg-blue-100 text-[#09335F] px-1.5 py-0.5 rounded-full font-bold">Asso</span>
                          </h3>
                          <p className="text-[10px] text-gray-400 font-semibold flex items-center gap-1">
                            <span>{new Date(post.createdAt || '2026-05-15').toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' })}</span>
                            <span>•</span>
                            <Globe size={11} className="text-gray-400" />
                          </p>
                        </div>
                      </div>
                      <button className="text-gray-400 hover:text-gray-600 p-1.5 rounded-full hover:bg-gray-50">
                        <MoreHorizontal size={18} />
                      </button>
                    </div>

                    {/* Post Content */}
                    <div className="px-5 py-4">
                      <h4 className="font-extrabold text-[#09335F] text-base mb-2 leading-tight">
                        {post.title}
                      </h4>
                      <p className="text-gray-700 text-sm leading-relaxed font-medium whitespace-pre-wrap">
                        {post.content}
                      </p>
                    </div>

                    {/* Media Enclosures */}
                    {post.type === 'audio' && (
                      <div className="mx-5 mb-4 p-4 bg-gradient-to-r from-[#09335F]/5 to-[#09335F]/10 rounded-2xl border border-[#09335F]/10 flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-xl bg-[#09335F] flex items-center justify-center text-[#EAA937] shadow-sm relative overflow-hidden flex-shrink-0 animate-pulse">
                            <Music size={20} />
                          </div>
                          <div>
                            <p className="text-xs font-bold text-[#09335F]">Écouter l&apos;annonce audio</p>
                            <p className="text-[10px] text-gray-400 font-semibold mt-0.5">Format sonore APDO - MP3</p>
                          </div>
                        </div>

                        {/* Visual standard player in clean premium mode */}
                        <audio
                          src={post.url || '/placeholder-audio.mp3'}
                          controls
                          className="w-48 h-8 rounded-lg scale-90 focus:outline-none flex-shrink-0"
                        />
                      </div>
                    )}

                    {post.type === 'announcement' && post.url && (
                      <div className="mx-5 mb-4 rounded-2xl overflow-hidden border border-gray-100 shadow-inner bg-black aspect-video relative flex items-center justify-center">
                        {post.url.includes('youtube.com') || post.url.includes('embed') ? (
                          <iframe
                            src={post.url}
                            width="100%"
                            height="100%"
                            allowFullScreen
                            className="absolute inset-0 w-full h-full"
                          />
                        ) : (
                          <video
                            src={post.url}
                            controls
                            className="w-full h-full object-cover"
                          />
                        )}
                      </div>
                    )}

                    {/* Reactions Counters */}
                    <div className="px-5 pb-3 flex items-center justify-between text-xs font-bold text-gray-400 border-b border-gray-100">
                      <span className="flex items-center gap-1">
                        <span className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center text-white scale-90 shadow-sm border border-white">
                          <ThumbsUp size={10} fill="white" />
                        </span>
                        <span className="text-blue-500 font-extrabold">{likeCount}</span>
                      </span>
                      
                      <span className="hover:underline cursor-pointer" onClick={() => setActiveCommentInput(activeCommentInput === post.id ? null : post.id)}>
                        {postComments.length} commentaire{postComments.length > 1 ? 's' : ''}
                      </span>
                    </div>

                    {/* Action Buttons */}
                    <div className="grid grid-cols-3 p-1 text-xs font-extrabold text-gray-500 bg-gray-50/50">
                      <button
                        onClick={() => handleLike(post.id)}
                        className={`flex items-center justify-center gap-2 py-2.5 rounded-xl hover:bg-gray-100 transition-colors ${
                          isLiked ? 'text-blue-500 bg-blue-50/20' : ''
                        }`}
                      >
                        <ThumbsUp size={16} fill={isLiked ? 'currentColor' : 'none'} />
                        <span>J&apos;aime</span>
                      </button>

                      <button
                        onClick={() => {
                          setActiveCommentInput(post.id)
                          // Focus input
                        }}
                        className="flex items-center justify-center gap-2 py-2.5 rounded-xl hover:bg-gray-100 transition-colors"
                      >
                        <MessageCircle size={16} />
                        <span>Commenter</span>
                      </button>

                      <button
                        onClick={() => handleShare(post.id)}
                        className="flex items-center justify-center gap-2 py-2.5 rounded-xl hover:bg-gray-100 transition-colors relative"
                      >
                        <Share2 size={16} />
                        <span>{shareFeedback === post.id ? 'Copié !' : 'Partager'}</span>
                      </button>
                    </div>

                    {/* Comments Area (Expandable) */}
                    <div className="bg-gray-50/40 p-4 border-t border-gray-100">
                      {postComments.length > 0 && (
                        <div className="space-y-3 mb-3 max-h-40 overflow-y-auto pr-1">
                          {postComments.map((comment, cIndex) => (
                            <div key={cIndex} className="flex gap-2 items-start text-xs leading-normal">
                              <div className="w-7 h-7 rounded-full bg-[#09335F] text-white flex items-center justify-center font-extrabold text-[10px] flex-shrink-0">
                                {comment.author.charAt(0).toUpperCase()}
                              </div>
                              <div className="bg-white rounded-2xl px-3 py-2 border border-gray-100 flex-1 shadow-sm">
                                <span className="font-bold text-gray-900 block">{comment.author}</span>
                                <span className="text-gray-600 font-medium">{comment.text}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Comment Input */}
                      <div className="flex gap-2 items-center">
                        <div className="w-8 h-8 rounded-full bg-[#09335F] text-white flex items-center justify-center font-bold text-xs flex-shrink-0">
                          {user ? user.name?.charAt(0).toUpperCase() : 'V'}
                        </div>
                        <div className="flex-1 flex gap-2">
                          <input
                            type="text"
                            placeholder="Écrire un commentaire..."
                            value={commentTexts[post.id] || ''}
                            onChange={e => setCommentTexts({ ...commentTexts, [post.id]: e.target.value })}
                            onKeyDown={e => {
                              if (e.key === 'Enter') handleAddComment(post.id)
                            }}
                            className="w-full px-4 py-2 border border-gray-200 rounded-full focus:outline-none focus:ring-1 focus:ring-[#09335F] text-xs font-medium placeholder-gray-400 bg-white"
                          />
                          <button
                            onClick={() => handleAddComment(post.id)}
                            className="p-2 bg-[#09335F] hover:bg-[#09335F]/90 text-white rounded-full transition-colors flex-shrink-0"
                          >
                            <Send size={12} fill="white" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.article>
                )
              })}
            </div>
          )}

        </div>
      </main>
      <Footer />
    </>
  )
}
