'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { ArrowLeft, Calendar, UserCheck, BookOpen, Clock, Tag } from 'lucide-react'
import { NewsArticle } from '@/lib/types'
import { motion } from 'framer-motion'

export default function PublicArticleDetail() {
  const params = useParams()
  const [article, setArticle] = useState<NewsArticle | null>(null)
  const [loading, setLoading] = useState(true)

  // Default hardcoded backup articles for initial fallback if DB is not populated or offline
  const defaultArticles: Record<string, NewsArticle> = {
    'article-1': {
      id: 'article-1',
      title: 'Nouvelle École Inaugurée pour les Enfants de l’APDO',
      createdAt: '2026-05-15T00:00:00.000Z',
      updatedAt: '2026-05-15T00:00:00.000Z',
      content: 'Nos efforts pour l\'éducation portent leurs fruits. Une nouvelle école a été inaugurée avec des équipements modernes et des salles de formation adaptées.\n\nCe projet a pu se concrétiser grâce à la mobilisation active des membres fondateurs de l\'APDO, l\'implication précieuse du Chef Fokontany et de la Commune d\'Ambohimanambola, ainsi que le soutien des généreux donateurs.\n\nCe centre d\'accueil permettra aux orphelins de bénéficier d\'un accompagnement scolaire de qualité, de cours de soutien et d\'activités récréatives dans un environnement sécurisé.',
      author: 'Secrétariat APDO',
      category: 'Événement',
      status: 'published'
    },
    'article-2': {
      id: 'article-2',
      title: 'Programme de Mobilisation de l’Opération Cake Réussi',
      createdAt: '2026-04-20T00:00:00.000Z',
      updatedAt: '2026-04-20T00:00:00.000Z',
      content: 'Le programme de collecte et de financement participatif par la vente collective de gâteaux a dépassé toutes les attentes des membres.\n\nOrganisée sur plusieurs semaines à Ambohimanambola, cette opération "Cake" a mobilisé toute la communauté universitaire et locale. Les fonds récoltés ont été intégralement déposés dans le coffre commun de l\'association pour financer les démarches administratives indispensables auprès du District et de la Région.\n\nNous tenons à remercier chaleureusement chaque membre actif et donateur qui a contribué à la réussite de ce premier événement de financement participatif.',
      author: 'Holda RAMANARIVO',
      category: 'Financement',
      status: 'published'
    },
    'article-3': {
      id: 'article-3',
      title: 'Lancement Officiel de l’Association APDO',
      createdAt: '2026-03-10T00:00:00.000Z',
      updatedAt: '2026-03-10T00:00:00.000Z',
      content: 'L\'APDO formalise son partenariat de proximité avec la Commune d’Ambohimanambola et lance sa campagne de veille juridique.\n\nCe lancement marque le début de notre action légale et non contentieuse visant à protéger les droits fondamentaux des enfants orphelins âgés de 3 à 18 ans à Madagascar.\n\nLe siège social provisoire étant officiellement établi à Ambohimanambola B, nos équipes de bénévoles sont prêtes à accompagner administrativement les tuteurs légaux dans l\'obtention des aides sociales, la scolarisation et le suivi juridique des dossiers d\'orphelins.',
      author: 'Bureau Exécutif',
      category: 'Lancement',
      status: 'published'
    }
  }

  useEffect(() => {
    if (params?.id) {
      loadArticle()
    }
  }, [params])

  const loadArticle = async () => {
    try {
      const response = await fetch(`/api/articles/${params.id}`)
      const data = await response.json()
      if (data.success && data.article) {
        setArticle(data.article)
      } else {
        // Fallback to default if matching id exists
        const fallback = defaultArticles[params.id as string]
        if (fallback) {
          setArticle(fallback)
        }
      }
    } catch (error) {
      console.log('Error loading article, trying fallback:', error)
      const fallback = defaultArticles[params.id as string]
      if (fallback) {
        setArticle(fallback)
      }
    } finally {
      setLoading(false)
    }
  }

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-[#F4F7FA] py-12">
        <main className="max-w-3xl mx-auto px-4 sm:px-6">
          
          <div className="mb-6">
            <Link href="/news" className="inline-flex items-center gap-2 text-sm font-bold text-[#09335F] hover:text-[#DF6C63] transition-colors">
              <ArrowLeft className="w-5 h-5 text-[#EAA937]" />
              <span>Retour aux Actualités</span>
            </Link>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-24">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#09335F]"></div>
            </div>
          ) : !article ? (
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              className="bg-white rounded-3xl shadow-md p-12 text-center border border-gray-100"
            >
              <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4 animate-pulse" />
              <p className="text-gray-600 font-bold text-lg mb-4">Désolé, cet article n&apos;existe pas ou a été retiré.</p>
              <Link href="/news">
                <button className="px-6 py-3 rounded-xl font-bold text-white transition-all hover:shadow-lg bg-[#09335F]">
                  Retourner aux actualités
                </button>
              </Link>
            </motion.div>
          ) : (
            <motion.article 
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              className="bg-white rounded-3xl shadow-lg p-6 md:p-12 border border-gray-100 overflow-hidden"
            >
              {/* Badge Category */}
              <div className="flex items-center gap-2 mb-6">
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-extrabold bg-[#DF6C63]/10 text-[#DF6C63] uppercase tracking-wide">
                  <Tag size={12} />
                  {article.category || 'Actualité'}
                </span>
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-gray-400">
                  <Clock size={12} />
                  <span>Lecture 3 min</span>
                </span>
              </div>

              <h1 className="text-3xl md:text-4xl font-extrabold mb-6 leading-tight text-[#09335F]">
                {article.title}
              </h1>

              {/* Author & Date Section */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full bg-[#09335F] text-white flex items-center justify-center font-bold text-lg shadow-sm border border-white">
                    {article.author ? article.author.charAt(0).toUpperCase() : 'A'}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900 flex items-center gap-1">
                      <UserCheck size={14} className="text-[#7BB274]" />
                      <span>Publié par {article.author || 'Secrétariat APDO'}</span>
                    </p>
                    <p className="text-xs text-gray-400 font-semibold flex items-center gap-1 mt-0.5">
                      <Calendar size={12} />
                      <span>
                        {new Date(article.createdAt || '2026-05-15').toLocaleDateString('fr-FR', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Legal intro banner for professional look */}
              <div className="p-5 bg-[#F4F7FA] rounded-2xl border-l-4 border-[#09335F] italic mb-8 text-[#09335F] font-semibold text-xs leading-relaxed">
                Dans le cadre de l&apos;Ordonnance n°60-133 et de la Loi n°2007-023 relative aux droits des enfants à Madagascar, l&apos;APDO partage ce suivi d&apos;activité avec sa communauté afin de garantir transparence et impact local.
              </div>

              {/* Article Content */}
              <div className="prose max-w-none text-gray-700 leading-relaxed font-medium text-base space-y-6">
                {article.content.split('\n').map((paragraph, index) => {
                  if (!paragraph.trim()) return null
                  return (
                    <p key={index} className="leading-relaxed">
                      {paragraph}
                    </p>
                  )
                })}
              </div>

              {/* Footer action */}
              <div className="mt-12 pt-8 border-t border-gray-100 flex justify-center">
                <Link href="/news" className="flex items-center gap-2 text-sm font-bold text-[#09335F] hover:text-[#DF6C63] transition-colors group">
                  <BookOpen size={16} />
                  <span>Retourner à la liste des actualités</span>
                </Link>
              </div>
            </motion.article>
          )}

        </main>
      </div>
      <Footer />
    </>
  )
}
