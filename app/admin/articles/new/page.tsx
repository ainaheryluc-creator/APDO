'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Save, Plus } from 'lucide-react'
import { User } from '@/lib/types'

export default function NewArticle() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: 'news',
    status: 'draft',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    const token = localStorage.getItem('token')

    if (!storedUser || !token) {
      router.push('/auth/login')
      return
    }

    const parsedUser = JSON.parse(storedUser)
    if (parsedUser.role !== 'admin') {
      router.push('/visitor/news')
      return
    }

    setUser(parsedUser)
  }, [router])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const token = localStorage.getItem('token')
      const response = await fetch('/api/articles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (data.success) {
        router.push('/admin/articles')
      } else {
        setError(data.message)
      }
    } catch (err) {
      setError('Erreur lors de la création')
    } finally {
      setLoading(false)
    }
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
        <div className="max-w-4xl mx-auto flex items-center gap-4">
          <Link href="/admin/articles" className="hover:opacity-80 transition-opacity">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Plus className="w-6 h-6 text-[#EAA937]" />
            <span>Créer un Nouvel Article</span>
          </h1>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-3xl shadow-lg p-8 border border-gray-100">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="p-4 rounded-xl text-center font-bold text-sm bg-red-50 border border-red-200 text-red-700">
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-bold mb-2 text-gray-700">
                Titre de l&apos;Article
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#09335F] focus:border-[#09335F] focus:outline-none transition-all font-semibold"
                placeholder="Ex: Inauguration officielle ou Opération Cake réussie"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-bold mb-2 text-gray-700">
                Contenu du corps d&apos;article
              </label>
              <textarea
                name="content"
                value={formData.content}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#09335F] focus:border-[#09335F] focus:outline-none transition-all h-60 font-medium"
                placeholder="Rédigez le texte de l'article ici..."
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold mb-2 text-gray-700">
                  Catégorie
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#09335F] focus:border-[#09335F] focus:outline-none transition-all font-semibold"
                >
                  <option value="news">Actualités</option>
                  <option value="events">Événements</option>
                  <option value="announcements">Annonces</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold mb-2 text-gray-700">
                  Statut de Publication
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#09335F] focus:border-[#09335F] focus:outline-none transition-all font-semibold"
                >
                  <option value="draft">Brouillon (Non visible)</option>
                  <option value="published">Publié immédiatement</option>
                </select>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                type="submit"
                disabled={loading}
                className="flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl text-white font-bold transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
                style={{ backgroundColor: '#DF6C63' }}
              >
                <Save className="w-5 h-5" />
                <span>{loading ? 'Création en cours...' : 'Créer et Enregistrer'}</span>
              </button>

              <Link href="/admin/articles" className="w-full sm:w-auto">
                <button 
                  type="button" 
                  className="w-full px-8 py-3.5 rounded-xl font-bold border-2 transition-all text-gray-500 border-gray-200 hover:bg-gray-50"
                >
                  Annuler
                </button>
              </Link>
            </div>
          </form>
        </div>
      </main>
    </div>
  )
}
