'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { LogIn, UserPlus, Shield, Eye, ArrowLeft, Scale } from 'lucide-react'

export default function AuthHome() {
  const router = useRouter()

  useEffect(() => {
    const user = localStorage.getItem('user')
    const token = localStorage.getItem('token')

    if (user && token) {
      const parsedUser = JSON.parse(user)
      if (parsedUser.role === 'admin') {
        router.push('/admin/dashboard')
      } else {
        router.push('/visitor/news')
      }
    }
  }, [router])

  return (
    <div className="min-h-screen bg-[#F4F7FA] flex flex-col font-sans">
      
      {/* Header */}
      <header className="bg-white p-6 shadow-md border-b border-gray-100">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#09335F]/5 flex items-center justify-center p-1.5 border border-[#09335F]/10">
              <img src="/logo.jpg" alt="Logo APDO" className="w-full h-full object-contain" onError={(e) => {
                (e.target as HTMLImageElement).src = '/logo.png';
              }} />
            </div>
            <div>
              <span className="text-xl font-extrabold text-[#09335F] tracking-tight">APDO</span>
              <span className="text-[10px] uppercase font-extrabold tracking-widest text-[#DF6C63] block -mt-0.5">Espace Connexion</span>
            </div>
          </Link>
          <Link href="/" className="flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-gray-800 transition-colors">
            <ArrowLeft size={16} />
            <span>Retour à l&apos;accueil</span>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-4xl mx-auto p-6 py-16 w-full">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-[#09335F]/10 text-[#09335F] text-xs font-extrabold tracking-wider mb-3">
            ESPACE PRIVÉ APDO
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-[#09335F]">
            Bienvenue à l&apos;APDO
          </h2>
          <p className="text-lg text-gray-500 font-medium leading-relaxed max-w-2xl mx-auto">
            Accédez à vos espaces sécurisés d&apos;administration ou de consultation pour contribuer et suivre les activités juridiques de notre association.
          </p>
        </div>

        {/* Auth Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto mb-20">
          
          {/* Login */}
          <Link href="/auth/login">
            <div className="bg-white rounded-3xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-all duration-300 cursor-pointer border-t-8 border-[#09335F] group hover:-translate-y-0.5">
              <LogIn className="w-12 h-12 mb-6 group-hover:scale-105 transition-transform" style={{ color: '#09335F' }} />
              <h3 className="text-2xl font-bold mb-2 text-[#09335F]">
                Se connecter
              </h3>
              <p className="text-gray-500 font-medium text-sm mb-6 leading-relaxed">
                Connectez-vous à votre compte d&apos;administrateur ou de visiteur.
              </p>
              <button
                className="w-full py-3 rounded-xl font-bold text-white transition-all shadow-md hover:shadow-lg"
                style={{ backgroundColor: '#09335F' }}
              >
                Connexion
              </button>
            </div>
          </Link>

          {/* Signup */}
          <Link href="/auth/signup">
            <div className="bg-white rounded-3xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-all duration-300 cursor-pointer border-t-8 border-[#DF6C63] group hover:-translate-y-0.5">
              <UserPlus className="w-12 h-12 mb-6 group-hover:scale-105 transition-transform" style={{ color: '#DF6C63' }} />
              <h3 className="text-2xl font-bold mb-2 text-[#DF6C63]">
                S&apos;inscrire
              </h3>
              <p className="text-gray-500 font-medium text-sm mb-6 leading-relaxed">
                Créez un compte visiteur pour consulter les dernières actus & audios.
              </p>
              <button
                className="w-full py-3 rounded-xl font-bold text-white transition-all shadow-md hover:shadow-lg"
                style={{ backgroundColor: '#DF6C63' }}
              >
                Créer un Compte
              </button>
            </div>
          </Link>
        </div>

        {/* Info Sections */}
        <div className="max-w-3xl mx-auto bg-white p-8 md:p-12 rounded-3xl shadow-md border border-gray-100">
          <h3 className="text-2xl font-bold text-center mb-8 text-[#09335F]" style={{ color: '#09335F' }}>
            Deux interfaces spécialisées
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Admin Interface */}
            <div className="p-6 bg-[#09335F]/5 rounded-2xl border border-[#09335F]/10">
              <Shield className="w-8 h-8 mb-4 text-[#09335F]" />
              <h4 className="text-lg font-bold mb-2 text-[#09335F]">
                Interface Bureau & Admin
              </h4>
              <ul className="text-xs text-gray-500 space-y-2 font-bold leading-relaxed">
                <li>• Rédaction et publication d&apos;articles</li>
                <li>• Diffusion d&apos;annonces vocales ou vidéos</li>
                <li>• Suivi des statuts des démarches</li>
                <li>• Gestion des accès et de la conformité</li>
              </ul>
            </div>

            {/* Visitor Interface */}
            <div className="p-6 bg-[#DF6C63]/5 rounded-2xl border border-[#DF6C63]/10">
              <Eye className="w-8 h-8 mb-4 text-[#DF6C63]" />
              <h4 className="text-lg font-bold mb-2 text-[#DF6C63]">
                Interface Visiteur
              </h4>
              <ul className="text-xs text-gray-500 space-y-2 font-bold leading-relaxed">
                <li>• Consultation des articles mis en ligne</li>
                <li>• Écoute et visionnage des médias</li>
                <li>• Accès sécurisé et intuitif</li>
                <li>• Messagerie de support incluse</li>
              </ul>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 py-8 text-center text-xs font-semibold text-gray-400 mt-20">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center px-6 gap-4">
          <p>© 2026 APDO. Protection des Droits des Orphelins à Madagascar.</p>
          <div className="flex items-center gap-2 text-gray-400">
            <Scale size={14} className="text-[#EAA937]" />
            <span>Régie par l&apos;Ordonnance n°60-133</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
