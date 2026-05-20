'use client'

import { useState, useEffect } from 'react'
import { Plus, Trash2, Key, Users, Save, X, RefreshCw, AlertCircle, ShieldCheck, Mail, ShieldAlert, Phone } from 'lucide-react'
import { User } from '@/lib/types'
import { useRouter } from 'next/navigation'

export default function AdminAccounts() {
  const router = useRouter()
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [accounts, setAccounts] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [error, setError] = useState('')
  const [posting, setPosting] = useState(false)

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    role: 'member' as 'admin' | 'member'
  })

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    const token = localStorage.getItem('token')

    if (!storedUser || !token) {
      router.push('/auth/login')
      return
    }

    const parsedUser = JSON.parse(storedUser) as User
    if (parsedUser.role !== 'admin') {
      router.push('/admin/dashboard')
      return
    }

    setCurrentUser(parsedUser)
    loadAccounts()
  }, [router])

  const loadAccounts = async () => {
    setLoading(true)
    setError('')
    try {
      const token = localStorage.getItem('token')
      const res = await fetch('/api/admin/accounts', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      const data = await res.json()
      if (data.success) {
        setAccounts(data.users)
      } else {
        setError(data.message || 'Erreur lors du chargement des comptes')
      }
    } catch (err) {
      console.error('Failed to load accounts:', err)
      setError('Impossible de se connecter au serveur.')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (id === currentUser?.id) {
      alert('Vous ne pouvez pas révoquer votre propre compte administrateur courant.')
      return
    }

    if (!confirm('Êtes-vous sûr de vouloir supprimer ce compte ? Le collaborateur perdra immédiatement ses accès de connexion.')) return

    try {
      const token = localStorage.getItem('token')
      const res = await fetch(`/api/admin/accounts/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      const data = await res.json()
      if (data.success) {
        setAccounts(accounts.filter(a => a.id !== id))
      } else {
        alert(data.message || 'Erreur lors de la suppression')
      }
    } catch (err) {
      console.error('Error deleting account:', err)
      alert('Erreur réseau lors de la suppression')
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name || !formData.email || !formData.password || !formData.role) return
    setPosting(true)
    setError('')

    try {
      const token = localStorage.getItem('token')
      const res = await fetch('/api/admin/accounts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      })

      const data = await res.json()
      if (data.success && data.user) {
        setAccounts([data.user, ...accounts])
        setFormData({ name: '', email: '', phone: '', password: '', role: 'member' })
        setShowModal(false)
      } else {
        setError(data.message || 'Erreur lors de la création du compte')
      }
    } catch (err) {
      console.error('Error creating account:', err)
      setError('Erreur réseau lors de la création du compte')
    } finally {
      setPosting(false)
    }
  }

  if (!currentUser) {
    return (
      <div className="flex justify-center items-center py-20">
        <RefreshCw className="w-10 h-10 animate-spin text-[#09335F]" />
      </div>
    )
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold" style={{ color: '#09335F' }}>Comptes Utilisateurs</h1>
          <p className="text-gray-500 text-sm font-medium mt-1">Créez et gérez les clés d&apos;accès sécurisées pour toute l&apos;équipe de l&apos;association.</p>
        </div>
        
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-5 py-3 text-white rounded-xl font-bold shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5"
          style={{ backgroundColor: '#DF6C63' }}
        >
          <Plus className="w-5 h-5" />
          <span>Créer un Compte</span>
        </button>
      </div>

      {error && (
        <div className="p-4 mb-6 rounded-xl bg-red-50 border border-red-200 text-red-800 text-sm font-semibold flex items-center gap-2">
          <AlertCircle size={16} />
          <span>{error}</span>
        </div>
      )}

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <RefreshCw className="w-8 h-8 animate-spin text-[#09335F]" />
        </div>
      ) : accounts.length === 0 ? (
        <div className="bg-white rounded-3xl shadow-md p-12 text-center border border-gray-100 max-w-lg mx-auto">
          <Key className="w-16 h-16 mx-auto mb-4 text-gray-300 animate-pulse" />
          <p className="text-gray-600 mb-6 font-semibold">Aucun compte collaborateur enregistré.</p>
          <button
            onClick={() => setShowModal(true)}
            className="px-6 py-3 rounded-xl font-bold text-white transition-all hover:shadow-lg bg-[#09335F]"
          >
            Créer le premier compte
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-3xl shadow-md overflow-hidden border border-gray-100">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-gray-100 bg-[#F4F7FA]">
                <th className="px-6 py-4 text-left font-bold text-sm text-[#09335F]">Nom complet</th>
                <th className="px-6 py-4 text-left font-bold text-sm text-[#09335F]">Email</th>
                <th className="px-6 py-4 text-left font-bold text-sm text-[#09335F]">Téléphone</th>
                <th className="px-6 py-4 text-left font-bold text-sm text-[#09335F]">Rôle système</th>
                <th className="px-6 py-4 text-left font-bold text-sm text-[#09335F]">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm font-semibold text-gray-700">
              {accounts.map((acc) => (
                <tr key={acc.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4 font-bold text-gray-900 flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center font-bold text-xs text-[#09335F]">
                      {acc.name.charAt(0).toUpperCase()}
                    </div>
                    <span>{acc.name}</span>
                    {acc.id === currentUser?.id && (
                      <span className="px-2 py-0.5 rounded-full text-[9px] font-extrabold bg-[#09335F]/10 text-[#09335F]">Moi</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-gray-500 font-medium">{acc.email}</td>
                  <td className="px-6 py-4 text-gray-500 font-medium">{acc.phone || '-'}</td>
                  <td className="px-6 py-4">
                    {acc.role === 'admin' ? (
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-[#DF6C63]/10 text-[#DF6C63]">
                        <ShieldAlert size={12} />
                        Administrateur
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-[#7BB274]/15 text-[#7BB274]">
                        <ShieldCheck size={12} />
                        Membre de l&apos;équipe
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleDelete(acc.id)}
                      disabled={acc.id === currentUser?.id}
                      className={`p-1.5 rounded-lg transition-colors ${acc.id === currentUser?.id ? 'text-gray-200 cursor-not-allowed' : 'text-gray-400 hover:text-red-600'}`}
                      title="Révoquer l'accès"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Accounts Form Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="bg-white rounded-3xl w-full max-w-md p-6 shadow-2xl border border-gray-100 relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors p-1"
            >
              <X size={20} />
            </button>

            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-[#09335F]">
              <Key size={24} className="text-[#DF6C63]" />
              <span>Nouveau Compte Sécurisé</span>
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-bold mb-1 text-gray-700">Nom Complet du Collaborateur</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#09335F] font-semibold"
                  placeholder="Ex: Holda RAMANARIVO"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-bold mb-1 text-gray-700">Adresse Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    className="w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#09335F] font-semibold"
                    placeholder="holda@apdo.org"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold mb-1 text-gray-700">Téléphone (Optionnel)</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#09335F] font-semibold"
                    placeholder="038 54 834 98"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold mb-1 text-gray-700">Mot de Passe Initiale</label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={e => setFormData({ ...formData, password: e.target.value })}
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#09335F] font-semibold"
                  placeholder="••••••••"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-bold mb-1 text-gray-700">Rôle & Privilèges Système</label>
                <select
                  value={formData.role}
                  onChange={e => setFormData({ ...formData, role: e.target.value as 'admin' | 'member' })}
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#09335F] font-bold bg-[#F4F7FA]"
                >
                  <option value="member">🛡️ Membre de l&apos;équipe (Publications)</option>
                  <option value="admin">🔑 Administrateur Général (Accès complet)</option>
                </select>
                <p className="text-[10px] text-gray-400 mt-1">Le membre aura le pouvoir de rédiger des actualités et médias, mais pas de gérer les comptes.</p>
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
                  disabled={posting}
                  className="flex items-center gap-2 px-6 py-2.5 text-sm font-bold text-white rounded-xl shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5"
                  style={{ backgroundColor: '#DF6C63' }}
                >
                  <Save size={16} />
                  <span>{posting ? 'Création...' : 'Créer le compte'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
