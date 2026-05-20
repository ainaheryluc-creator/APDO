'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowRight, FileText } from 'lucide-react'
import { NewsArticle } from '@/lib/types'

export default function VisitorNews() {
  const [articles, setArticles] = useState<NewsArticle[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadArticles()
  }, [])

  const loadArticles = async () => {
    try {
      const response = await fetch('/api/articles')
      const data = await response.json()
      if (data.success) {
        // Filter out drafts if any
        const publishedArticles = data.articles.filter((a: NewsArticle) => a.status === 'published')
        setArticles(publishedArticles)
      }
    } catch (error) {
      console.error('Error loading articles:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <div className="flex items-center gap-3 mb-8">
        <FileText className="w-8 h-8" style={{ color: '#09335F' }} />
        <h1 className="text-3xl font-bold" style={{ color: '#09335F' }}>Toutes les Actualités</h1>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2" style={{ borderColor: '#09335F' }}></div>
        </div>
      ) : articles.length === 0 ? (
        <div className="bg-white rounded-3xl shadow-md p-12 text-center border border-gray-100">
          <p className="text-gray-600 text-lg">Aucun article publié pour le moment.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <Link key={article.id} href={`/visitor/news/${article.id}`} className="block h-full group">
              <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow h-full flex flex-col border-t-4 border-[#09335F]">
                <div className="mb-4">
                  <h2 className="text-xl font-bold group-hover:text-[#DF6C63] transition-colors" style={{ color: '#09335F' }}>
                    {article.title}
                  </h2>
                </div>

                <p className="text-gray-600 mb-4 line-clamp-3 flex-grow">
                  {article.content}
                </p>

                <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                  <span className="text-xs text-gray-500 font-medium">
                    {new Date(article.createdAt).toLocaleDateString('fr-FR', {
                      year: 'numeric', month: 'long', day: 'numeric'
                    })}
                  </span>
                  <div className="flex items-center gap-1 text-sm font-semibold transition-transform group-hover:translate-x-1" style={{ color: '#DF6C63' }}>
                    Lire <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
