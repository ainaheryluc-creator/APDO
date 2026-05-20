'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Mail, Lock } from 'lucide-react'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (data.success) {
        localStorage.setItem('token', data.token)
        localStorage.setItem('user', JSON.stringify(data.user))
        
        if (data.user.role === 'admin' || data.user.role === 'member') {
          router.push('/admin/dashboard')
        } else {
          router.push('/visitor/news')
        }
      } else {
        if (data.requiresVerification) {
          localStorage.setItem('verifyEmail', email)
          router.push('/auth/verify')
        } else {
          setError(data.message)
        }
      }
    } catch (err) {
      setError('Erreur de connexion')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: '#F4F7FA' }}>
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8 border-t-4 border-[#DF6C63]">
          <div className="flex justify-center mb-6">
            <img src="/logo.jpg" alt="Logo APDO" className="w-24 h-24 object-contain" onError={(e) => {
              (e.target as HTMLImageElement).src = '/logo.png';
            }} />
          </div>
          <p className="text-center text-gray-600 mb-8 font-medium">Connexion à votre espace sécurisé</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="p-3 rounded-lg" style={{ backgroundColor: '#fee', color: '#c33' }}>
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-bold mb-2" style={{ color: '#09335F' }}>
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2"
                  style={{ borderColor: '#ddd', '--tw-ring-color': '#09335F' } as any}
                  placeholder="votre@email.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold mb-2" style={{ color: '#09335F' }}>
                Mot de passe
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2"
                  style={{ borderColor: '#ddd', '--tw-ring-color': '#09335F' } as any}
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-lg font-bold text-white transition-all hover:shadow-lg hover:-translate-y-0.5"
              style={{ backgroundColor: '#DF6C63' }}
            >
              {loading ? 'Connexion en cours...' : 'Se connecter'}
            </button>
          </form>
          
          <div className="text-center mt-6">
            <Link href="/" className="text-sm text-gray-400 hover:text-gray-600 underline">
              Retour à l'accueil
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
