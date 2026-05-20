'use client'

import { useState, useEffect } from 'react'
import { Plus, Edit2, Trash2, Mic, Video, RefreshCw, Radio, X, Save } from 'lucide-react'
import { MediaItem } from '@/lib/types'

export default function AdminMedia() {
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    type: 'audio', // 'audio' | 'announcement'
    url: '',
    status: 'published'
  })

  useEffect(() => {
    loadMedia()
  }, [])

  const loadMedia = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/media')
      const data = await res.json()
      if (data.success) {
        setMediaItems(data.items)
      }
    } catch (error) {
      console.error('Error loading media:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce média ?')) return

    try {
      const res = await fetch(`/api/media/${id}`, { method: 'DELETE' })
      const data = await res.json()
      if (data.success) {
        loadMedia()
      } else {
        alert(data.message)
      }
    } catch (error) {
      console.error('Error deleting media:', error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await fetch('/api/media', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      const data = await res.json()
      if (data.success) {
        setShowModal(false)
        setFormData({ title: '', content: '', type: 'audio', url: '', status: 'published' })
        loadMedia()
      } else {
        alert(data.message)
      }
    } catch (error) {
      console.error('Error creating media:', error)
    }
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold" style={{ color: '#09335F' }}>Gestion des Médias</h1>
          <p className="text-gray-500 text-sm font-medium mt-1">Gérez les fichiers audio d&apos;annonces et les vidéos d&apos;activités de l&apos;APDO</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-5 py-3 text-white rounded-xl font-bold shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5"
          style={{ backgroundColor: '#DF6C63' }}
        >
          <Plus className="w-5 h-5" />
          <span>Nouveau Média</span>
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <RefreshCw className="w-8 h-8 animate-spin text-[#09335F]" />
        </div>
      ) : mediaItems.length === 0 ? (
        <div className="bg-white rounded-3xl shadow-md p-12 text-center border border-gray-100 max-w-lg mx-auto">
          <Radio className="w-16 h-16 mx-auto mb-4 text-gray-300 animate-pulse" />
          <p className="text-gray-600 mb-6 font-semibold">Aucun fichier média publié pour le moment</p>
          <button 
            onClick={() => setShowModal(true)} 
            className="px-6 py-3 rounded-xl font-bold text-white transition-all hover:shadow-lg" 
            style={{ backgroundColor: '#09335F' }}
          >
            Créer le premier média
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mediaItems.map(item => (
            <div key={item.id} className="bg-white rounded-3xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-all duration-300 relative flex flex-col justify-between border-t-4 border-[#09335F]">
              <div>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    {item.type === 'audio' ? (
                      <div className="p-2.5 bg-purple-50 rounded-xl text-purple-600">
                        <Mic className="w-5 h-5" />
                      </div>
                    ) : (
                      <div className="p-2.5 bg-blue-50 rounded-xl text-blue-600">
                        <Video className="w-5 h-5" />
                      </div>
                    )}
                    <h3 className="font-bold text-base text-[#09335F] line-clamp-1">{item.title}</h3>
                  </div>
                  <span 
                    className="text-xs px-2.5 py-0.5 rounded-full font-bold text-white shadow-sm"
                    style={{ backgroundColor: item.type === 'announcement' ? '#DF6C63' : '#7BB274' }}
                  >
                    {item.type === 'announcement' ? 'vidéo' : 'audio'}
                  </span>
                </div>

                <p className="text-gray-600 text-sm mb-4 line-clamp-3 font-medium">{item.content}</p>
                
                {item.url && (
                  <a href={item.url} target="_blank" rel="noreferrer" className="text-xs font-bold text-blue-500 hover:underline mb-4 inline-block">
                    Ouvrir le lien média →
                  </a>
                )}
              </div>
              
              <div className="flex items-center justify-between mt-4 border-t border-gray-100 pt-4">
                <span
                  className="px-3 py-1 rounded-full text-xs font-bold"
                  style={{
                    backgroundColor: item.status === 'published' ? '#ecfdf5' : '#fef2f2',
                    color: item.status === 'published' ? '#059669' : '#dc2626',
                  }}
                >
                  {item.status === 'published' ? 'Publé' : 'Brouillon'}
                </span>
                <div className="flex gap-2">
                  <button onClick={() => handleDelete(item.id)} className="text-gray-400 hover:text-red-600 p-1.5 transition-colors" title="Supprimer">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl w-full max-w-lg p-6 shadow-2xl border border-gray-100 relative">
            <button 
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors p-1"
            >
              <X size={20} />
            </button>
            
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-[#09335F]">
              <Radio size={24} className="text-[#DF6C63]" />
              <span>Ajouter un Média</span>
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-bold mb-1 text-gray-700">Titre de l&apos;Annonce</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={e => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#09335F] font-semibold"
                  placeholder="Ex: Message de la présidente"
                  required
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold mb-1 text-gray-700">Type de fichier</label>
                  <select
                    value={formData.type}
                    onChange={e => setFormData({ ...formData, type: e.target.value })}
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#09335F] font-bold"
                  >
                    <option value="audio">Message vocal (Audio)</option>
                    <option value="announcement">Vidéo d&apos;activité</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-bold mb-1 text-gray-700">Statut initial</label>
                  <select
                    value={formData.status}
                    onChange={e => setFormData({ ...formData, status: e.target.value })}
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#09335F] font-bold"
                  >
                    <option value="published">Publier direct</option>
                    <option value="draft">Brouillon</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold mb-1 text-gray-700">Lien URL externe (Optionnel)</label>
                <input
                  type="url"
                  value={formData.url}
                  onChange={e => setFormData({ ...formData, url: e.target.value })}
                  placeholder="https://youtube.com/..."
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#09335F] font-semibold"
                />
              </div>
              
              <div>
                <label className="block text-sm font-bold mb-1 text-gray-700">Description du fichier</label>
                <textarea
                  value={formData.content}
                  onChange={e => setFormData({ ...formData, content: e.target.value })}
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#09335F] h-24 font-medium"
                  placeholder="Exprimez le but de cet audio/vidéo..."
                  required
                ></textarea>
              </div>
              
              <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-5 py-2.5 text-sm font-bold text-gray-500 hover:bg-gray-50 rounded-xl transition-colors"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-2 px-6 py-2.5 text-sm font-bold text-white rounded-xl shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5"
                  style={{ backgroundColor: '#DF6C63' }}
                >
                  <Save size={16} />
                  <span>Publier le Média</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
