'use client'

import { useState, useEffect } from 'react'
import { Plus, Edit2, Trash2, FileText, ChevronRight } from 'lucide-react'
import { NewsArticle } from '@/lib/types'
import Link from 'next/link'

export default function AdminArticles() {
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
        setArticles(data.articles)
      }
    } catch (error) {
      console.error('Error loading articles:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cet article ?')) return

    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`/api/articles/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (response.ok) {
        setArticles(articles.filter(a => a.id !== id))
      }
    } catch (error) {
      console.error('Error deleting article:', error)
    }
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold" style={{ color: '#09335F' }}>Gestion des Articles</h1>
          <p className="text-gray-500 text-sm font-medium mt-1">Créez, modifiez ou supprimez les articles d&apos;actualités de l&apos;APDO</p>
        </div>
        <Link href="/admin/articles/new">
          <button
            className="flex items-center gap-2 px-5 py-3 text-white rounded-xl font-bold shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5"
            style={{ backgroundColor: '#DF6C63' }}
          >
            <Plus className="w-5 h-5" />
            <span>Nouvel Article</span>
          </button>
        </Link>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2" style={{ borderColor: '#09335F' }}></div>
        </div>
      ) : articles.length === 0 ? (
        <div className="bg-white rounded-3xl shadow-md p-12 text-center border border-gray-100 max-w-lg mx-auto">
          <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-600 mb-6 font-semibold">Aucun article trouvé dans la base de données</p>
          <Link href="/admin/articles/new">
            <button className="px-6 py-3 rounded-xl font-bold text-white transition-all hover:shadow-lg" style={{ backgroundColor: '#09335F' }}>
              Créer le premier article
            </button>
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-3xl shadow-md overflow-hidden border border-gray-100">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-gray-100" style={{ backgroundColor: '#F4F7FA' }}>
                <th className="px-6 py-4 text-left font-bold text-sm" style={{ color: '#09335F' }}>Titre</th>
                <th className="px-6 py-4 text-left font-bold text-sm" style={{ color: '#09335F' }}>Auteur</th>
                <th className="px-6 py-4 text-left font-bold text-sm" style={{ color: '#09335F' }}>Statut</th>
                <th className="px-6 py-4 text-left font-bold text-sm" style={{ color: '#09335F' }}>Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm font-semibold text-gray-700">
              {articles.map((article) => (
                <tr key={article.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4 font-bold text-gray-900">{article.title}</td>
                  <td className="px-6 py-4 text-gray-500">{article.author || 'Administrateur'}</td>
                  <td className="px-6 py-4">
                    <span
                      className="px-3 py-1 rounded-full text-xs font-bold"
                      style={{
                        backgroundColor: article.status === 'published' ? '#ecfdf5' : '#fef2f2',
                        color: article.status === 'published' ? '#059669' : '#dc2626',
                      }}
                    >
                      {article.status === 'published' ? 'Publié' : 'Brouillon'}
                    </span>
                  </td>
                  <td className="px-6 py-4 flex gap-4">
                    <Link href={`/news/${article.id}`} target="_blank">
                      <ChevronRight className="w-5 h-5 text-gray-400 hover:text-[#09335F] cursor-pointer transition-colors" title="Visualiser" />
                    </Link>
                    <button onClick={() => handleDelete(article.id)} title="Supprimer">
                      <Trash2 className="w-5 h-5 text-gray-400 hover:text-red-600 cursor-pointer transition-colors" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
