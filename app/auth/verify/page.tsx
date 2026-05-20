'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Mail, CheckCircle2, ShieldCheck } from 'lucide-react'
import Link from 'next/link'

export default function VerifyPage() {
  const router = useRouter()
  const [otp, setOtp] = useState('')
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    const storedEmail = localStorage.getItem('verifyEmail')
    if (storedEmail) {
      setEmail(storedEmail)
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const response = await fetch('/api/auth/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp }),
      })

      const data = await response.json()

      if (data.success) {
        setSuccess(true)
        localStorage.removeItem('verifyEmail')
        setTimeout(() => {
          router.push('/auth/login')
        }, 2000)
      } else {
        setError(data.message)
      }
    } catch (err) {
      setError('Erreur lors de la vérification')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: '#F4F7FA' }}>
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8 border-t-4 border-[#DF6C63]">
          
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 rounded-full bg-[#DF6C63]/10 flex items-center justify-center text-[#DF6C63]">
              <Mail className="w-8 h-8" />
            </div>
          </div>
          
          <h1 className="text-3xl font-bold text-center mb-2 text-[#09335F]">
            Vérifiez votre email
          </h1>
          <p className="text-center text-gray-500 mb-8 font-medium text-sm leading-relaxed">
            Nous avons envoyé un code de vérification à l&apos;adresse suivante : <br />
            <strong className="text-[#09335F] text-base">{email || 'votre email'}</strong>
          </p>

          {success ? (
            <div className="p-4 rounded-xl text-center flex flex-col items-center gap-3 bg-green-50 border border-green-200 text-green-800 font-bold">
              <CheckCircle2 className="w-10 h-10 text-green-600 animate-bounce" />
              <span>Email validé avec succès ! Redirection en cours vers la page de connexion...</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="p-3 rounded-lg text-center font-bold text-sm bg-red-50 border border-red-200 text-red-700">
                  {error}
                </div>
              )}

              <div>
                <label className="block text-sm font-bold mb-2 text-[#09335F]">
                  Code de vérification OTP
                </label>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="w-full px-4 py-3 border rounded-xl text-center text-2xl tracking-widest font-extrabold focus:outline-none focus:ring-2 focus:ring-[#09335F]"
                  style={{ borderColor: '#ddd' }}
                  placeholder="000000"
                  maxLength={6}
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-xl font-bold text-white transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 flex items-center justify-center gap-2"
                style={{ backgroundColor: '#DF6C63' }}
              >
                <ShieldCheck size={18} />
                <span>{loading ? 'Vérification en cours...' : 'Vérifier mon compte'}</span>
              </button>

              <p className="text-center text-sm text-gray-500 font-medium">
                Vous n&apos;avez pas reçu le code ?{' '}
                <button
                  type="button"
                  className="font-bold hover:underline transition-colors hover:text-[#DF6C63]"
                  style={{ color: '#09335F' }}
                  onClick={() => window.location.reload()}
                >
                  Renvoyer un nouveau code
                </button>
              </p>
            </form>
          )}

          <div className="text-center mt-8 border-t border-gray-100 pt-6">
            <Link href="/auth/login" className="text-sm text-gray-400 hover:text-gray-600 underline">
              Retour à la page de connexion
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
