'use client'

import { useState, useEffect } from 'react'
import { Mic, Video, Radio, ArrowRight } from 'lucide-react'
import { MediaItem } from '@/lib/types'

export default function VisitorMedia() {
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadMedia()
  }, [])

  const loadMedia = async () => {
    try {
      const response = await fetch('/api/media')
      const data = await response.json()
      if (data.success) {
        // Filter out drafts if any
        const publishedMedia = data.items.filter((m: MediaItem) => m.status === 'published')
        setMediaItems(publishedMedia)
      }
    } catch (error) {
      console.error('Error loading media:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <div className="flex items-center gap-3 mb-8">
        <Radio className="w-8 h-8" style={{ color: '#DF6C63' }} />
        <h1 className="text-3xl font-bold" style={{ color: '#09335F' }}>Tous les Médias</h1>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2" style={{ borderColor: '#DF6C63' }}></div>
        </div>
      ) : mediaItems.length === 0 ? (
        <div className="bg-white rounded-3xl shadow-md p-12 text-center border border-gray-100">
          <p className="text-gray-600 text-lg">Aucun média publié pour le moment.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mediaItems.map((media) => (
            <div key={media.id} className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow h-full flex flex-col group border-t-4 border-[#09335F]">
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {media.type === 'audio' ? (
                    <div className="p-2 bg-purple-50 rounded-lg text-purple-600 group-hover:bg-purple-100 transition-colors">
                      <Mic className="w-6 h-6" />
                    </div>
                  ) : (
                    <div className="p-2 bg-blue-50 rounded-lg text-blue-600 group-hover:bg-blue-100 transition-colors">
                      <Video className="w-6 h-6" />
                    </div>
                  )}
                  <h2 className="text-xl font-bold" style={{ color: '#09335F' }}>
                    {media.title}
                  </h2>
                </div>
              </div>

              <p className="text-gray-600 mb-6 flex-grow">
                {media.content}
              </p>

              <div className="mt-auto flex flex-col gap-4">
                {media.url && (
                  <a
                    href={media.url}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-2 px-4 rounded-xl font-medium transition-colors hover:shadow-sm"
                    style={{ 
                      backgroundColor: media.type === 'audio' ? '#f3e8ff' : '#e0f2fe',
                      color: media.type === 'audio' ? '#7e22ce' : '#0369a1' 
                    }}
                  >
                    {media.type === 'audio' ? 'Écouter l\'audio' : 'Regarder la vidéo'}
                    <ArrowRight className="w-4 h-4" />
                  </a>
                )}
                
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <span className="text-xs text-gray-500 font-medium">
                    {new Date(media.createdAt).toLocaleDateString('fr-FR')}
                  </span>
                  <span className="text-xs px-2.5 py-1 rounded-full bg-gray-100 text-gray-600 font-semibold capitalize">
                    {media.type === 'announcement' ? 'Vidéo' : 'Audio'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
