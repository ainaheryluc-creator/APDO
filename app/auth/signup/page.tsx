'use client'

import Link from 'next/link'
import { ShieldAlert, ArrowLeft } from 'lucide-react'

export default function SignupPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[#F4F7FA]">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-3xl shadow-xl p-8 border-t-4 border-[#DF6C63] text-center">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 rounded-2xl bg-[#DF6C63]/10 flex items-center justify-center text-[#DF6C63]">
              <ShieldAlert size={36} />
            </div>
          </div>
          
          <h2 className="text-2xl font-extrabold text-[#09335F] mb-4">Inscription Restreinte</h2>
          
          <div className="bg-[#F4F7FA] p-5 rounded-2xl border border-gray-100 text-sm font-semibold text-gray-600 leading-relaxed mb-8">
            L&apos;inscription publique est désactivée sur la plateforme de l&apos;APDO. La création de compte collaborateur est exclusivement gérée par les administrateurs de l&apos;association.
          </div>

          <div className="space-y-3">
            <Link href="/auth/login" className="block w-full py-3.5 bg-[#09335F] hover:bg-[#09335F]/95 text-white font-bold rounded-xl transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 text-sm">
              Se Connecter à mon compte
            </Link>
            
            <Link href="/" className="inline-flex items-center justify-center gap-1.5 text-xs font-bold text-gray-400 hover:text-gray-600 transition-colors pt-4 group">
              <ArrowLeft size={14} className="transform translate-x-0 group-hover:-translate-x-1 transition-transform" />
              <span>Retour à l&apos;accueil du site</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
