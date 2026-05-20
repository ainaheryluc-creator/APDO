'use client'

import { useState, useEffect } from 'react'
import { Plus, Edit2, Trash2, Users, Save, X, RefreshCw, AlertCircle } from 'lucide-react'
import { TeamMember, User } from '@/lib/types'
import { useRouter } from 'next/navigation'

export default function AdminMembers() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [members, setMembers] = useState<TeamMember[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [error, setError] = useState('')
  const [posting, setPosting] = useState(false)
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null)

  const [formData, setFormData] = useState({
    name: '',
    role: '',
    bio: '',
    image: ''
  })

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    const token = localStorage.getItem('token')

    if (!storedUser || !token) {
      router.push('/auth/login')
      return
    }

    const parsedUser = JSON.parse(storedUser)
    if (parsedUser.role !== 'admin') {
      router.push('/visitor/news')
      return
    }

    setUser(parsedUser)
    loadMembers()
  }, [router])

  const loadMembers = async () => {
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/members')
      const data = await res.json()
      if (data.success) {
        setMembers(data.members)
      } else {
        setError(data.message || 'Erreur lors du chargement des membres')
      }
    } catch (err) {
      console.error('Failed to load team members:', err)
      setError('Impossible de se connecter au serveur.')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Êtes-vous sûr de vouloir retirer ce membre de l’équipe ?')) return

    try {
      const token = localStorage.getItem('token')
      const res = await fetch(`/api/members/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      const data = await res.json()
      if (data.success) {
        setMembers(members.filter(m => m.id !== id))
      } else {
        alert(data.message || 'Erreur lors de la suppression')
      }
    } catch (err) {
      console.error('Error deleting member:', err)
      alert('Erreur réseau lors de la suppression')
    }
  }

  const handleEditClick = (member: TeamMember) => {
    setEditingMember(member)
    setFormData({
      name: member.name,
      role: member.role,
      bio: member.bio || '',
      image: member.image || ''
    })
    setShowModal(true)
  }

  const handleAddClick = () => {
    setEditingMember(null)
    setFormData({
      name: '',
      role: '',
      bio: '',
      image: ''
    })
    setShowModal(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name || !formData.role) return
    setPosting(true)
    setError('')

    try {
      const token = localStorage.getItem('token')
      const url = editingMember ? `/api/members/${editingMember.id}` : '/api/members'
      const method = editingMember ? 'PUT' : 'POST'

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      })

      const data = await res.json()
      if (data.success && data.member) {
        if (editingMember) {
          setMembers(members.map(m => m.id === editingMember.id ? data.member : m))
        } else {
          setMembers([data.member, ...members])
        }
        setFormData({ name: '', role: '', bio: '', image: '' })
        setShowModal(false)
        setEditingMember(null)
      } else {
        setError(data.message || 'Erreur lors de l’enregistrement')
      }
    } catch (err) {
      console.error('Error saving member:', err)
      setError('Erreur réseau lors de l’enregistrement')
    } finally {
      setPosting(false)
    }
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold" style={{ color: '#09335F' }}>Membres de l&apos;Équipe</h1>
          <p className="text-gray-500 text-sm font-medium mt-1">Gérez la liste officielle des fondateurs et collaborateurs affichée publiquement.</p>
        </div>
        <button
          onClick={handleAddClick}
          className="flex items-center gap-2 px-5 py-3 text-white rounded-xl font-bold shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5 animate-fade-in"
          style={{ backgroundColor: '#DF6C63' }}
        >
          <Plus className="w-5 h-5" />
          <span>Nouveau Membre</span>
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
      ) : members.length === 0 ? (
        <div className="bg-white rounded-3xl shadow-md p-12 text-center border border-gray-100 max-w-lg mx-auto">
          <Users className="w-16 h-16 mx-auto mb-4 text-gray-300 animate-pulse" />
          <p className="text-gray-600 mb-6 font-semibold">Aucun membre enregistré dans la base de données.</p>
          <button
            onClick={handleAddClick}
            className="px-6 py-3 rounded-xl font-bold text-white transition-all hover:shadow-lg bg-[#09335F]"
          >
            Ajouter le premier membre
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-3xl shadow-md overflow-hidden border border-gray-100">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-gray-100 bg-[#F4F7FA]">
                <th className="px-6 py-4 text-left font-bold text-sm text-[#09335F]">Avatar</th>
                <th className="px-6 py-4 text-left font-bold text-sm text-[#09335F]">Nom complet</th>
                <th className="px-6 py-4 text-left font-bold text-sm text-[#09335F]">Rôle / Poste</th>
                <th className="px-6 py-4 text-left font-bold text-sm text-[#09335F]">Bio / Description</th>
                <th className="px-6 py-4 text-right font-bold text-sm text-[#09335F] pr-10">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm font-semibold text-gray-700">
              {members.map((member) => (
                <tr key={member.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4">
                    {member.image ? (
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-10 h-10 rounded-full object-cover border-2 border-[#09335F]/20 shadow-sm"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none'
                          const fallbackSpan = e.currentTarget.parentElement?.querySelector('.fallback-initials') as HTMLDivElement
                          if (fallbackSpan) fallbackSpan.style.display = 'flex'
                        }}
                      />
                    ) : null}
                    <div
                      className="fallback-initials w-10 h-10 rounded-full text-white flex items-center justify-center font-bold text-sm shadow-sm"
                      style={{
                        backgroundColor: '#09335F',
                        display: member.image ? 'none' : 'flex'
                      }}
                    >
                      {member.name.charAt(0).toUpperCase()}
                    </div>
                  </td>
                  <td className="px-6 py-4 font-bold text-gray-900">{member.name}</td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#EAA937]/15 text-[#EAA937]">
                      {member.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-500 max-w-xs truncate font-medium">{member.bio || '-'}</td>
                  <td className="px-6 py-4 text-right pr-6">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => handleEditClick(member)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                        title="Modifier"
                      >
                        <Edit2 className="w-4.5 h-4.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(member.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-all"
                        title="Retirer"
                      >
                        <Trash2 className="w-4.5 h-4.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Form Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="bg-white rounded-3xl w-full max-w-md p-6 shadow-2xl border border-gray-100 relative animate-scale-up">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors p-1"
            >
              <X size={20} />
            </button>

            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-[#09335F]">
              <Users size={24} className="text-[#DF6C63]" />
              <span>{editingMember ? 'Modifier le Collaborateur' : 'Nouveau Collaborateur'}</span>
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-bold mb-1 text-gray-700">Nom Complet</label>
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
                <label className="block text-sm font-bold mb-1 text-gray-700">Rôle / Poste</label>
                <input
                  type="text"
                  value={formData.role}
                  onChange={e => setFormData({ ...formData, role: e.target.value })}
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#09335F] font-semibold"
                  placeholder="Ex: Présidente, Juriste..."
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-bold mb-1 text-gray-700">Chemin de l&apos;Image Photo (Optionnel)</label>
                <input
                  type="text"
                  value={formData.image}
                  onChange={e => setFormData({ ...formData, image: e.target.value })}
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#09335F] font-semibold"
                  placeholder="Ex: /members/luxanna.jpg"
                />
                <p className="text-[10px] text-gray-400 mt-1">Placez d&apos;abord le fichier photo dans le dossier public/members/.</p>
              </div>

              <div>
                <label className="block text-sm font-bold mb-1 text-gray-700">Biographie courte / Description</label>
                <textarea
                  value={formData.bio}
                  onChange={e => setFormData({ ...formData, bio: e.target.value })}
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#09335F] h-20 font-medium resize-none"
                  placeholder="Présentez brièvement le membre..."
                />
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
                  <span>{posting ? 'Enregistrement...' : (editingMember ? 'Modifier' : 'Enregistrer')}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
