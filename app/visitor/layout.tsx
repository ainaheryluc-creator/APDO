'use client'

import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
import { LogOut, FileText, Radio, ArrowLeft, Heart, Shield } from 'lucide-react'

export default function VisitorLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const [loading, setLoading] = useState(true)
  const [visitorName, setVisitorName] = useState('Visiteur APDO')

  useEffect(() => {
    const userStr = localStorage.getItem('user')
    const token = localStorage.getItem('token')

    if (!token || !userStr) {
      router.push('/auth/login')
      return
    }

    try {
      const user = JSON.parse(userStr)
      if (user.role !== 'visitor' && user.role !== 'admin') {
        router.push('/auth/login')
        return
      }
      if (user.name) {
        setVisitorName(user.name)
      }
      setLoading(false)
    } catch {
      router.push('/auth/login')
    }
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    router.push('/auth/login')
  }

  const isLinkActive = (href: string) => {
    return pathname === href
  }

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-[#F4F7FA]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#09335F]"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F4F7FA] flex flex-col font-sans">
      
      {/* Header Banner */}
      <header className="bg-white shadow-md p-4 sticky top-0 z-50 border-b border-gray-100">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          
          {/* Logo & Brand */}
          <Link href="/visitor/news" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#09335F]/5 flex items-center justify-center p-1.5 border border-[#09335F]/10">
              <img src="/logo.jpg" alt="Logo APDO" className="w-full h-full object-contain" onError={(e) => {
                (e.target as HTMLImageElement).src = '/logo.png';
              }} />
            </div>
            <div>
              <span className="text-xl font-extrabold text-[#09335F] tracking-tight">APDO</span>
              <span className="text-[10px] uppercase font-extrabold tracking-widest text-[#DF6C63] block -mt-0.5">Espace Visiteur</span>
            </div>
          </Link>

          {/* User & Links & Log out */}
          <div className="flex flex-wrap items-center justify-center gap-6">
            
            {/* Links */}
            <nav className="flex items-center gap-1 bg-gray-50 p-1.5 rounded-xl border border-gray-100">
              <Link 
                href="/visitor/news" 
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold text-xs transition-all ${
                  isLinkActive('/visitor/news')
                    ? 'bg-[#09335F] text-white shadow-sm'
                    : 'text-gray-600 hover:text-[#09335F]'
                }`}
              >
                <FileText className="w-4 h-4" />
                <span>Actualités</span>
              </Link>
              <Link 
                href="/visitor/media" 
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold text-xs transition-all ${
                  isLinkActive('/visitor/media')
                    ? 'bg-[#09335F] text-white shadow-sm'
                    : 'text-gray-600 hover:text-[#09335F]'
                }`}
              >
                <Radio className="w-4 h-4" />
                <span>Audio/Vidéo</span>
              </Link>
            </nav>

            {/* Profile Info & Log out */}
            <div className="flex items-center gap-4 pl-4 border-l border-gray-100">
              
              <div className="hidden md:flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[#7BB274]/15 text-[#7BB274] flex items-center justify-center font-bold text-xs shadow-sm">
                  {visitorName.charAt(0)}
                </div>
                <div>
                  <p className="text-[9px] font-extrabold text-gray-400 uppercase tracking-wider">Membre</p>
                  <p className="text-xs font-bold text-[#09335F] -mt-0.5">{visitorName}</p>
                </div>
              </div>

              <button
                onClick={handleLogout}
                className="flex items-center gap-2 text-xs font-bold bg-red-50 text-red-600 hover:bg-red-100 transition-colors py-2 px-4 rounded-xl border border-red-200"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Déconnexion</span>
              </button>

            </div>

          </div>

        </div>
      </header>

      {/* Warning/Alert Sticky bar for legal reference */}
      <div className="bg-[#09335F] text-white py-2 px-4 text-xs font-bold text-center flex items-center justify-center gap-2 shadow-inner">
        <Heart size={14} className="text-[#DF6C63] fill-[#DF6C63]" />
        <span>Association APDO — Protection active des orphelins (Ordonnance n°60-133, Loi n°2007-023)</span>
      </div>

      {/* Main Content */}
      <main className="flex-1 max-w-6xl mx-auto w-full p-6 lg:p-8">
        {children}
      </main>

      {/* Espace visitor footer */}
      <footer className="bg-white border-t border-gray-100 py-6 text-center text-xs font-semibold text-gray-400">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center px-6 gap-4">
          <p>© 2026 APDO. Tous droits réservés.</p>
          <div className="flex items-center gap-4 text-gray-400 hover:text-gray-500">
            <Shield size={14} className="text-[#7BB274]" />
            <span>Serveur de production sécurisé</span>
          </div>
        </div>
      </footer>

    </div>
  )
}
