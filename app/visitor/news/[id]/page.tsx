'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'
import { LogOut, ArrowLeft, Calendar, UserCheck, BookOpen } from 'lucide-react'
import { NewsArticle, User } from '@/lib/types'

export default function ArticleDetail() {
  const router = useRouter()
  const params = useParams()
  const [user, setUser] = useState<User | null>(null)
  const [article, setArticle] = useState<NewsArticle | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    const token = localStorage.getItem('token')

    if (!storedUser || !token) {
      router.push('/auth/login')
      return
    }

    const parsedUser = JSON.parse(storedUser)
    setUser(parsedUser)
    loadArticle()
  }, [params, router])

  const loadArticle = async () => {
    try {
      const response = await fetch(`/api/articles/${params.id}`)
      const data = await response.json()
      if (data.success) {
        setArticle(data.article)
      }
    } catch (error) {
      console.log('Error loading article:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    router.push('/')
  }

  if (!user) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-[#F4F7FA]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#09335F]"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F4F7FA]">
      {/* Header */}
      <header className="text-white p-6 shadow-md" style={{ backgroundColor: '#09335F' }}>
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <Link href="/visitor/news" className="flex items-center gap-2 hover:opacity-80 transition-opacity font-bold">
            <ArrowLeft className="w-5 h-5 text-[#EAA937]" />
            <span>Retour aux Actualités</span>
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 rounded-xl hover:bg-white/20 transition-all font-bold text-sm bg-white/10"
          >
            <LogOut className="w-4 h-4" />
            <span>Déconnexion</span>
          </button>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-3xl mx-auto p-6">
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#09335F]"></div>
          </div>
        ) : !article ? (
          <div className="bg-white rounded-3xl shadow-md p-12 text-center border border-gray-100">
            <p className="text-gray-600 font-bold">Désolé, cet article n&apos;existe pas ou a été supprimé.</p>
          </div>
        ) : (
          <div className="bg-white rounded-3xl shadow-lg p-8 md:p-12 border border-gray-100">
            {/* Badge Category */}
            <span className="inline-block px-3 py-1 rounded-full text-xs font-extrabold bg-[#DF6C63]/10 text-[#DF6C63] mb-4">
              Article APDO
            </span>

            <h1 className="text-3xl md:text-4xl font-extrabold mb-6 leading-tight" style={{ color: '#09335F' }}>
              {article.title}
            </h1>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#09335F] text-white flex items-center justify-center font-bold text-lg">
                  {article.author ? article.author.charAt(0) : 'A'}
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900 flex items-center gap-1">
                    <UserCheck size={14} className="text-[#7BB274]" />
                    <span>Publié par {article.author || 'Secrétariat APDO'}</span>
                  </p>
                  <p className="text-xs text-gray-400 font-semibold flex items-center gap-1 mt-0.5">
                    <Calendar size={12} />
                    <span>
                      {new Date(article.createdAt).toLocaleDateString('fr-FR', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </span>
                  </p>
                </div>
              </div>
              
              <div>
                <span
                  className="px-3 py-1 rounded-full text-xs font-bold shadow-sm"
                  style={{
                    backgroundColor: article.status === 'published' ? '#ecfdf5' : '#fef2f2',
                    color: article.status === 'published' ? '#059669' : '#dc2626',
                  }}
                >
                  {article.status === 'published' ? 'En ligne' : 'Brouillon'}
                </span>
              </div>
            </div>

            {/* Article content */}
            <div className="prose max-w-none text-gray-700 leading-relaxed font-medium text-base space-y-4">
              <div className="p-5 bg-[#F4F7FA] rounded-2xl border-l-4 border-[#09335F] italic mb-6 text-[#09335F] font-semibold text-sm">
                Dans le cadre de l&apos;Ordonnance n°60-133 et de la Loi n°2007-023 relative aux droits des enfants à Madagascar, l&apos;APDO partage ce suivi d&apos;activité à sa communauté.
              </div>
              {article.content.split('\n').map((paragraph, index) => (
                <p key={index} className="leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Back action */}
            <div className="mt-12 pt-8 border-t border-gray-100 flex justify-center">
              <Link href="/visitor/news" className="flex items-center gap-2 text-sm font-bold text-[#09335F] hover:text-[#DF6C63] transition-colors">
                <BookOpen size={16} />
                <span>Retourner à la liste des actualités</span>
              </Link>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
