'use client'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Calendar, ArrowRight, BookOpen, RefreshCw } from 'lucide-react'
import { useState, useEffect } from 'react'
import { NewsArticle } from '@/lib/types'

export default function News() {
  const [articles, setArticles] = useState<NewsArticle[]>([])
  const [loading, setLoading] = useState(true)

  // Default hardcoded backup articles for initial fallback if DB is not populated
  const defaultArticles: NewsArticle[] = [
    {
      id: 'article-1',
      title: 'Nouvelle École Inaugurée pour les Enfants de l’APDO',
      createdAt: '2026-05-15T00:00:00.000Z',
      content: 'Nos efforts pour l\'éducation portent leurs fruits. Une nouvelle école a été inaugurée.',
      author: 'Secrétariat APDO',
      category: 'Événement',
      status: 'published'
    },
    {
      id: 'article-2',
      title: 'Programme de Mobilisation de l’Opération Cake Réussi',
      createdAt: '2026-04-20T00:00:00.000Z',
      content: 'Le programme de collecte et de financement participatif par la vente collective de gâteaux a dépassé toutes les attentes des membres.',
      author: 'Holda RAMANARIVO',
      category: 'Financement',
      status: 'published'
    },
    {
      id: 'article-3',
      title: 'Lancement Officiel de l’Association APDO',
      createdAt: '2026-03-10T00:00:00.000Z',
      content: 'L\'APDO formalise son partenariat de proximité avec la Commune d’Ambohimanambola et lance sa campagne de veille juridique.',
      author: 'Bureau Exécutif',
      category: 'Lancement',
      status: 'published'
    },
  ]

  const getArticleColor = (badge?: string) => {
    switch (badge?.toLowerCase()) {
      case 'événement':
      case 'events':
        return '#7BB274'
      case 'financement':
        return '#EAA937'
      case 'lancement':
      default:
        return '#DF6C63'
    }
  }

  useEffect(() => {
    loadArticles()
  }, [])

  const loadArticles = async () => {
    try {
      const response = await fetch('/api/articles')
      const data = await response.json()
      if (data.success && data.articles && data.articles.length > 0) {
        // Filter out drafts if any
        const published = data.articles.filter((a: NewsArticle) => a.status === 'published')
        setArticles(published.length > 0 ? published : defaultArticles)
      } else {
        setArticles(defaultArticles)
      }
    } catch (error) {
      console.error('Error loading articles, using default:', error)
      setArticles(defaultArticles)
    } finally {
      setLoading(false)
    }
  }

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  }

  const stagger = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#F4F7FA] py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-[#DF6C63]/10 text-[#DF6C63] text-sm font-bold tracking-wider mb-3">
              ACTUALITÉS
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-[#09335F] mb-6">
              Les Actualités de l&apos;APDO
            </h1>
            <div className="w-24 h-1.5 bg-[#DF6C63] mx-auto rounded-full mb-6" />
            <p className="text-gray-600 max-w-2xl mx-auto font-medium leading-relaxed">
              Restez informé de nos dernières avancées administratives, de nos événements communautaires et des programmes d&apos;aide sociale à Madagascar.
            </p>
          </motion.div>

          {/* Articles Grid */}
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <RefreshCw className="w-10 h-10 animate-spin text-[#09335F]" />
            </div>
          ) : (
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
              className="space-y-8"
            >
              {articles.map((article) => {
                const color = getArticleColor(article.category)
                return (
                  <motion.div
                    key={article.id}
                    variants={fadeInUp}
                    className="bg-white rounded-3xl p-8 shadow-md border border-gray-100 flex flex-col md:flex-row gap-6 items-start hover:shadow-xl transition-all duration-300 relative overflow-hidden group hover:-translate-y-0.5"
                  >
                    <div 
                      className="w-full md:w-48 h-36 rounded-2xl flex-shrink-0 flex items-center justify-center relative overflow-hidden"
                      style={{ backgroundColor: `${color}15` }}
                    >
                      <BookOpen size={48} style={{ color }} />
                      <span 
                        className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold text-white shadow-sm uppercase"
                        style={{ backgroundColor: color }}
                      >
                        {article.category || 'Actualité'}
                      </span>
                    </div>
                    
                    <div className="flex-1 w-full">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                        <h2 className="text-2xl font-bold text-[#09335F] group-hover:text-[#DF6C63] transition-colors leading-tight">
                          {article.title}
                        </h2>
                        <span className="flex items-center gap-1.5 text-xs font-semibold text-gray-400 shrink-0">
                          <Calendar size={14} className="text-gray-400" />
                          {new Date(article.createdAt || '2026-05-15').toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                        </span>
                      </div>
                      
                      <p className="text-gray-600 font-medium leading-relaxed mb-6 line-clamp-2">
                        {article.content}
                      </p>
                      
                      <Link
                        href={`/news/${article.id}`}
                        className="inline-flex items-center gap-1.5 text-sm font-bold transition-all text-[#09335F] group-hover:text-[#DF6C63]"
                      >
                        <span>Lire l&apos;article complet</span>
                        <ArrowRight size={16} className="transform translate-x-0 group-hover:translate-x-1.5 transition-transform" />
                      </Link>
                    </div>
                  </motion.div>
                )
              })}
            </motion.div>
          )}

        </div>
      </main>
      <Footer />
    </>
  )
}
