'use client'

import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
import { LayoutDashboard, FileText, Image as ImageIcon, LogOut, ShieldAlert, ArrowLeft, UserCheck, Users, Key } from 'lucide-react'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const [loading, setLoading] = useState(true)
  const [adminName, setAdminName] = useState('Présidente APDO')
  const [userRole, setUserRole] = useState<'admin' | 'member'>('member')

  useEffect(() => {
    const userStr = localStorage.getItem('user')
    const token = localStorage.getItem('token')

    if (!token || !userStr) {
      router.push('/auth/login')
      return
    }

    try {
      const user = JSON.parse(userStr)
      if (user.role !== 'admin' && user.role !== 'member') {
        router.push('/auth/login')
        return
      }
      
      setUserRole(user.role)
      if (user.name) {
        setAdminName(user.name)
      }

      // Safeguard paths: 'member' is restricted from team members and accounts CRUD
      if (user.role === 'member') {
        if (pathname.includes('/admin/members') || pathname.includes('/admin/accounts')) {
          router.push('/admin/dashboard')
          return
        }
      }

      setLoading(false)
    } catch {
      router.push('/auth/login')
    }
  }, [router, pathname])

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
    <div className="min-h-screen flex bg-[#F4F7FA] font-sans">
      
      {/* Sidebar */}
      <aside className="w-72 bg-white shadow-xl flex flex-col justify-between border-r border-gray-100 z-20">
        
        <div>
          {/* Logo and Brand Header */}
          <div className="p-6 flex items-center gap-3 border-b border-gray-50 bg-[#09335F] text-white">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center p-1.5 border border-white/20">
              <img src="/logo.jpg" alt="Logo APDO" className="w-full h-full object-contain" onError={(e) => {
                (e.target as HTMLImageElement).src = '/logo.png';
              }} />
            </div>
            <div>
              <h2 className="text-lg font-bold tracking-tight">Admin APDO</h2>
              <span className="text-[10px] uppercase font-extrabold tracking-widest text-[#EAA937] block mt-0.5">Console de Contrôle</span>
            </div>
          </div>
          
          {/* Admin Avatar Badge Info */}
          <div className="mx-4 my-6 p-4 rounded-2xl bg-gray-50 border border-gray-100 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#DF6C63] text-white flex items-center justify-center font-bold text-sm shadow-md">
              {adminName.charAt(0)}
            </div>
            <div>
              <p className="text-xs font-extrabold text-gray-400 uppercase tracking-wider">
                {userRole === 'admin' ? 'Administrateur' : 'Membre équipe'}
              </p>
              <p className="text-sm font-extrabold text-[#09335F] mt-0.5">{adminName}</p>
            </div>
          </div>

          {/* Navigation Items */}
          <nav className="px-4 space-y-2">
            <Link 
              href="/admin/dashboard" 
              className={`flex items-center space-x-3 px-4 py-3.5 rounded-xl font-bold transition-all text-sm ${
                isLinkActive('/admin/dashboard') 
                  ? 'bg-[#09335F] text-white shadow-md' 
                  : 'text-gray-600 hover:bg-gray-50 hover:text-[#09335F]'
              }`}
            >
              <LayoutDashboard className="w-5 h-5" />
              <span>Tableau de bord</span>
            </Link>

            <Link 
              href="/admin/articles" 
              className={`flex items-center space-x-3 px-4 py-3.5 rounded-xl font-bold transition-all text-sm ${
                isLinkActive('/admin/articles') || isLinkActive('/admin/articles/new')
                  ? 'bg-[#09335F] text-white shadow-md' 
                  : 'text-gray-600 hover:bg-gray-50 hover:text-[#09335F]'
              }`}
            >
              <FileText className="w-5 h-5" />
              <span>Articles & Blog</span>
            </Link>

            <Link 
              href="/admin/media" 
              className={`flex items-center space-x-3 px-4 py-3.5 rounded-xl font-bold transition-all text-sm ${
                isLinkActive('/admin/media') 
                  ? 'bg-[#09335F] text-white shadow-md' 
                  : 'text-gray-600 hover:bg-gray-50 hover:text-[#09335F]'
              }`}
            >
              <ImageIcon className="w-5 h-5" />
              <span>Annonces Audio/Vidéo</span>
            </Link>

            {userRole === 'admin' && (
              <>
                <Link 
                  href="/admin/members" 
                  className={`flex items-center space-x-3 px-4 py-3.5 rounded-xl font-bold transition-all text-sm ${
                    isLinkActive('/admin/members') 
                      ? 'bg-[#09335F] text-white shadow-md' 
                      : 'text-gray-600 hover:bg-gray-50 hover:text-[#09335F]'
                  }`}
                >
                  <Users className="w-5 h-5" />
                  <span>Membres de l&apos;Équipe</span>
                </Link>

                <Link 
                  href="/admin/accounts" 
                  className={`flex items-center space-x-3 px-4 py-3.5 rounded-xl font-bold transition-all text-sm ${
                    isLinkActive('/admin/accounts') 
                      ? 'bg-[#09335F] text-white shadow-md' 
                      : 'text-gray-600 hover:bg-gray-50 hover:text-[#09335F]'
                  }`}
                >
                  <Key className="w-5 h-5" />
                  <span>Comptes Utilisateurs</span>
                </Link>
              </>
            )}
          </nav>
        </div>

        {/* Footer Actions */}
        <div className="p-4 space-y-3">
          <Link href="/" className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl border border-gray-200 text-xs font-bold text-gray-500 hover:bg-gray-50 transition-colors">
            <ArrowLeft size={14} />
            <span>Retour au Site Public</span>
          </Link>
          
          <button
            onClick={handleLogout}
            className="flex items-center justify-center space-x-2 px-4 py-3 text-white bg-red-500 hover:bg-red-600 rounded-xl w-full text-sm font-bold shadow-md hover:shadow-lg transition-all"
          >
            <LogOut className="w-4 h-4" />
            <span>Déconnexion</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-screen">
        
        {/* Header Bar */}
        <header className="bg-white shadow-sm border-b border-gray-100 p-6 flex justify-between items-center sticky top-0 z-10">
          <div className="flex items-center gap-2 text-xs font-extrabold text-gray-400 tracking-widest uppercase">
            <ShieldAlert size={16} className="text-[#EAA937]" />
            <span>Zone Administrative Sécurisée</span>
          </div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#7BB274]">
            <span className="w-2.5 h-2.5 rounded-full bg-[#7BB274] animate-ping" />
            <span>Système Connecté</span>
          </div>
        </header>

        {/* Content Box */}
        <main className="flex-1 p-8 overflow-y-auto max-w-7xl mx-auto w-full">
          {children}
        </main>
      </div>

    </div>
  )
}
