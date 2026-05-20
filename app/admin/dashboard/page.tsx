'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { FileText, Radio, Users, Scale, FileCheck, CheckCircle2, AlertCircle } from 'lucide-react'

export default function AdminDashboard() {
  const [articleCount, setArticleCount] = useState(0)
  const [mediaCount, setMediaCount] = useState(0)

  useEffect(() => {
    loadStats()
  }, [])

  const loadStats = async () => {
    try {
      const response = await fetch('/api/articles')
      const data = await response.json()
      if (data.success) {
        setArticleCount(data.articles?.length || 0)
      }
    } catch (error) {
      console.error('Error loading stats:', error)
    }

    try {
      const response = await fetch('/api/media')
      const data = await response.json()
      if (data.success) {
        setMediaCount(data.items?.length || 0)
      }
    } catch (error) {
      console.error('Error loading media stats:', error)
    }
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold" style={{ color: '#09335F' }}>Tableau de bord APDO</h1>
        <p className="text-gray-500 text-sm font-medium mt-1">Espace d&apos;administration centralisé pour la protection des droits des orphelins</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-3xl shadow-md p-6 border border-gray-100">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#09335F]/10 flex items-center justify-center text-[#09335F]">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <p className="text-gray-600 text-sm font-bold">Articles publiés</p>
              <p className="text-2xl font-extrabold" style={{ color: '#09335F' }}>
                {articleCount}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-md p-6 border border-gray-100">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#DF6C63]/10 flex items-center justify-center text-[#DF6C63]">
              <Radio className="w-6 h-6" />
            </div>
            <div>
              <p className="text-gray-600 text-sm font-bold">Médias & Audios</p>
              <p className="text-2xl font-extrabold" style={{ color: '#DF6C63' }}>
                {mediaCount}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-md p-6 border border-gray-100">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#7BB274]/10 flex items-center justify-center text-[#7BB274]">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <p className="text-gray-600 text-sm font-bold">Membres Actifs</p>
              <p className="text-2xl font-extrabold" style={{ color: '#7BB274' }}>
                6
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Info Boxes */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        
        {/* Legal Context Card */}
        <div className="bg-white rounded-3xl p-6 shadow-md border border-gray-100 lg:col-span-2">
          <h3 className="text-lg font-bold text-[#09335F] mb-4 flex items-center gap-2">
            <Scale size={20} className="text-[#EAA937]" />
            <span>Contexte Légal de l&apos;Association</span>
          </h3>
          <p className="text-gray-600 text-sm leading-relaxed font-medium">
            L’APDO est régie par l’<strong>Ordonnance n°60-133 du 03 octobre 1960</strong> relative aux associations à Madagascar. Son action s’appuie sur les garanties de la Constitution malgache, de la Convention Internationale des Droits de l’Enfant, et de la <strong>Loi n°2007-023 du 20 août 2007</strong> pour assurer l’assistance juridique et sociale des orphelins (âgés de 3 à 18 ans) à Ambohimanambola.
          </p>
          <div className="mt-4 p-3 bg-yellow-50 rounded-2xl border border-yellow-100 flex items-start gap-3">
            <AlertCircle className="text-[#EAA937] flex-shrink-0 mt-0.5" size={18} />
            <p className="text-xs text-[#8B6F47] font-semibold">
              Rappel : Les membres du bureau sont tenus de respecter les obligations statutaires de non-lucrativité et de transparence.
            </p>
          </div>
        </div>

        {/* Admin Steps Status */}
        <div className="bg-white rounded-3xl p-6 shadow-md border border-gray-100">
          <h3 className="text-lg font-bold text-[#09335F] mb-4 flex items-center gap-2">
            <FileCheck size={20} className="text-[#7BB274]" />
            <span>Statut Administratif APDO</span>
          </h3>
          <ul className="space-y-3 text-xs font-bold text-gray-600">
            <li className="flex items-center justify-between">
              <span>1. Dépôt Fokontany</span>
              <span className="text-[#7BB274] flex items-center gap-1"><CheckCircle2 size={14} /> Validé</span>
            </li>
            <li className="flex items-center justify-between">
              <span>2. Enregistrement Commune</span>
              <span className="text-[#7BB274] flex items-center gap-1"><CheckCircle2 size={14} /> Validé</span>
            </li>
            <li className="flex items-center justify-between">
              <span>3. Transmission District</span>
              <span className="text-[#EAA937]">En cours</span>
            </li>
            <li className="flex items-center justify-between">
              <span>4. Dépôt Région</span>
              <span className="text-gray-400">En attente</span>
            </li>
          </ul>
        </div>

      </div>

      {/* Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link href="/admin/articles">
          <div className="bg-white rounded-3xl shadow-md p-8 hover:shadow-xl transition-all duration-300 cursor-pointer border-t-8 border-[#09335F] group hover:-translate-y-0.5">
            <FileText className="w-12 h-12 mb-4 group-hover:scale-105 transition-transform" style={{ color: '#09335F' }} />
            <h2 className="text-xl font-bold mb-2 text-[#09335F]">Gérer les actualités</h2>
            <p className="text-gray-500 font-medium text-sm">Créez et publiez de nouveaux articles sur l&apos;APDO et ses réussites d&apos;aide sociale.</p>
          </div>
        </Link>

        <Link href="/admin/media">
          <div className="bg-white rounded-3xl shadow-md p-8 hover:shadow-xl transition-all duration-300 cursor-pointer border-t-8 border-[#DF6C63] group hover:-translate-y-0.5">
            <Radio className="w-12 h-12 mb-4 group-hover:scale-105 transition-transform" style={{ color: '#DF6C63' }} />
            <h2 className="text-xl font-bold mb-2 text-[#DF6C63]">Gérer les enregistrements</h2>
            <p className="text-gray-500 font-medium text-sm">Ajoutez de nouvelles annonces audio et des vidéos de suivi de l&apos;association.</p>
          </div>
        </Link>
      </div>
    </div>
  )
}
