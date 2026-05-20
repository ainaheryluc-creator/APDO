'use client'

import { useState, useEffect } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { motion } from 'framer-motion'
import { Users, Shield, ArrowDown, UserCheck, Briefcase, RefreshCw } from 'lucide-react'
import { TeamMember } from '@/lib/types'

// Elegant sub-component to display member avatars with dynamic image loading & fallback to initials
function MemberAvatar({ name, image }: { name: string; image?: string }) {
  const [imgError, setImgError] = useState(false)
  const initials = name.split(' ').pop()?.charAt(0) || name.charAt(0)

  if (image && !imgError) {
    return (
      <div className="w-24 h-24 rounded-full mx-auto mb-6 overflow-hidden shadow-lg transition-transform duration-300 group-hover:scale-105 border-4 border-white bg-gray-100 flex items-center justify-center relative">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover"
          onError={() => setImgError(true)}
        />
      </div>
    )
  }

  return (
    <div
      className="w-24 h-24 rounded-full mx-auto mb-6 flex items-center justify-center text-white font-bold text-3xl shadow-lg transition-transform duration-300 group-hover:scale-105 border-4 border-white"
      style={{ backgroundColor: '#09335F' }}
    >
      {initials}
    </div>
  )
}

export default function Members() {
  const [members, setMembers] = useState<TeamMember[]>([])
  const [loading, setLoading] = useState(true)

  const defaultFounders: TeamMember[] = [
    {
      id: 'founder-1',
      name: 'Holda RAMANARIVO',
      role: 'Présidente',
      bio: 'Étudiante en Informatique',
      image: '/members/holda.jpg',
    },
    {
      id: 'founder-2',
      name: 'Luxanna RAKOTONIRINA',
      role: 'Vice Présidente',
      bio: 'Étudiante en Allemand',
      image: '/members/luxanna.jpg',
    },
    {
      id: 'founder-3',
      name: 'Antema Tsiaro',
      role: 'Secrétaire',
      bio: 'Étudiant en Journalisme',
      image: '/members/antema.jpg',
    },
    {
      id: 'founder-4',
      name: 'Mahenintsoa Raben',
      role: 'Responsable Communication',
      bio: 'Création du contenu',
      image: '/members/mahenintsoa.jpg',
    },
    {
      id: 'founder-5',
      name: 'Lahatrainiana',
      role: 'Trésorier',
      bio: 'Étudiant en Informatique',
      image: '/members/lahatra.jpg',
    },
    {
      id: 'founder-6',
      name: 'ROGER RAKOTONIRIANA',
      role: 'Parrain Moral',
      bio: 'Enseignant',
      image: '/members/roger.jpg',
    },
  ]

  useEffect(() => {
    loadMembers()
  }, [])

  const loadMembers = async () => {
    try {
      const res = await fetch('/api/members')
      const data = await res.json()
      if (data.success && data.members && data.members.length > 0) {
        setMembers(data.members)
      } else {
        setMembers(defaultFounders)
      }
    } catch (error) {
      console.error('Error loading team members public page, using default:', error)
      setMembers(defaultFounders)
    } finally {
      setLoading(false)
    }
  }

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  }

  const stagger = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#F4F7FA] py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header Section */}
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-[#7BB274]/10 text-[#7BB274] text-sm font-bold tracking-wider mb-3">
              NOTRE ÉQUIPE
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-[#09335F] mb-6">
              Membres Fondateurs de l&apos;APDO
            </h1>
            <div className="w-24 h-1.5 bg-[#7BB274] mx-auto rounded-full" />
            <p className="text-gray-600 max-w-2xl mx-auto mt-6 font-medium leading-relaxed">
              Rencontrez les étudiants et enseignants engagés à l&apos;origine de l&apos;initiative APDO pour assurer la protection et la défense des droits des orphelins à Madagascar.
            </p>
          </motion.div>

          {/* Members Cards Grid */}
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <RefreshCw className="w-10 h-10 animate-spin text-[#7BB274]" />
            </div>
          ) : (
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20"
            >
              {members.map((member, index) => (
                <motion.div
                  key={member.id || index}
                  variants={fadeInUp}
                  className="bg-white rounded-3xl shadow-md hover:shadow-xl transition-all duration-300 p-8 text-center border-t-4 border-[#7BB274] relative overflow-hidden group hover:-translate-y-1"
                >
                  <div className="absolute top-0 right-0 w-16 h-16 bg-[#7BB274]/10 rounded-bl-full transition-all group-hover:scale-110" />
                  <MemberAvatar name={member.name} image={member.image} />
                  <h3 className="text-xl font-bold mb-2 group-hover:text-[#7BB274] transition-colors" style={{ color: '#09335F' }}>
                    {member.name}
                  </h3>
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-[#DF6C63]/10 text-[#DF6C63] mb-4">
                    {member.role}
                  </span>
                  <p className="text-sm text-gray-500 font-medium">{member.bio}</p>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Organisation Interne visual representation */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="bg-white rounded-3xl p-8 md:p-12 shadow-lg mb-20"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-[#09335F] mb-12 text-center flex items-center justify-center gap-3">
              <Shield className="text-[#09335F]" size={32} />
              Organigramme & Structure de l&apos;Association
            </h2>
            
            {/* Visual Org Chart using Tailwind Grid & Flex */}
            <div className="flex flex-col items-center gap-6 max-w-3xl mx-auto mb-16">
              {/* Assemblée Générale */}
              <div className="bg-[#09335F] text-white px-8 py-4 rounded-2xl shadow-md text-center font-bold text-lg min-w-[240px] border border-blue-900 relative">
                Assemblée Générale
                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[#09335F]">
                  <ArrowDown size={24} />
                </div>
              </div>
              <div className="h-6" />

              {/* Président */}
              <div className="bg-[#DF6C63] text-white px-8 py-4 rounded-2xl shadow-md text-center font-bold text-lg min-w-[240px] relative">
                Présidente
                <p className="text-xs font-light text-white/90 mt-1">Holda Ramanarivo</p>
                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[#DF6C63]">
                  <ArrowDown size={24} />
                </div>
              </div>
              <div className="h-6 w-px bg-gray-300 md:w-[80%] relative flex justify-between">
                {/* Horizontal connection line for smaller / larger grids */}
              </div>

              {/* Lower level Exec Bureau */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mt-4">
                <div className="bg-white border-2 border-[#7BB274] p-5 rounded-2xl shadow-sm text-center">
                  <h4 className="font-bold text-[#09335F] text-base">Secrétaire</h4>
                  <p className="text-sm font-semibold text-[#7BB274] mt-1">Antema Tsiaro</p>
                  <p className="text-xs text-gray-500 mt-2 font-medium">Administration & Réunions</p>
                </div>
                <div className="bg-white border-2 border-[#EAA937] p-5 rounded-2xl shadow-sm text-center">
                  <h4 className="font-bold text-[#09335F] text-base">Trésorier</h4>
                  <p className="text-sm font-semibold text-[#EAA937] mt-1">Lahatrainiana</p>
                  <p className="text-xs text-gray-500 mt-2 font-medium">Gestion du Coffre & Finances</p>
                </div>
                <div className="bg-white border-2 border-[#DF6C63] p-5 rounded-2xl shadow-sm text-center">
                  <h4 className="font-bold text-[#09335F] text-base">Communication</h4>
                  <p className="text-sm font-semibold text-[#DF6C63] mt-1">Mahenintsoa Raben</p>
                  <p className="text-xs text-gray-500 mt-2 font-medium">Médias & Réseaux Sociaux</p>
                </div>
              </div>
            </div>

            {/* Internal Organization description table */}
            <div className="overflow-x-auto rounded-xl border border-gray-100 shadow-sm">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#09335F] text-white text-sm font-bold">
                    <th className="p-4">Organe</th>
                    <th className="p-4">Fonction</th>
                    <th className="p-4">Responsabilité</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-sm font-medium text-gray-700">
                  <tr className="hover:bg-gray-50">
                    <td className="p-4 font-bold text-[#09335F]">Assemblée Générale</td>
                    <td className="p-4">Organe de décision</td>
                    <td className="p-4">Définit les grandes orientations, vote les décisions importantes et contrôle le fonctionnement général de l’association</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="p-4 font-bold text-[#DF6C63]">Président</td>
                    <td className="p-4">Direction</td>
                    <td className="p-4">Assure la représentation légale de l’association, coordonne les activités et veille à l’application des décisions</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="p-4 font-bold text-[#7BB274]">Secrétaire</td>
                    <td className="p-4">Administration</td>
                    <td className="p-4">Gère les documents administratifs, rédige les comptes rendus et organise les réunions</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="p-4 font-bold text-[#EAA937]">Trésorier</td>
                    <td className="p-4">Finance</td>
                    <td className="p-4">Assure la gestion des ressources financières, des cotisations et du coffre de l’association</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* Rôles et responsabilités du Bureau */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="bg-white rounded-3xl p-8 md:p-12 shadow-lg"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-[#09335F] mb-8 text-center flex items-center justify-center gap-3">
              <Briefcase className="text-[#09335F]" size={32} />
              Responsabilités au sein du Bureau de l&apos;Association APDO
            </h2>
            <div className="overflow-x-auto rounded-xl border border-gray-100 shadow-sm">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#09335F] text-white text-sm font-bold">
                    <th className="p-4">Organe / Fonction</th>
                    <th className="p-4">Nom du responsable</th>
                    <th className="p-4">Rôle et responsabilités</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-sm font-medium text-gray-700">
                  <tr className="hover:bg-gray-50">
                    <td className="p-4 font-bold">Président</td>
                    <td className="p-4">Holda Ramanarivo</td>
                    <td className="p-4">Représentation légale de l’association, coordination générale des activités, prise de décisions principales</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="p-4 font-bold">Vice-président</td>
                    <td className="p-4">Luxanna Rakotonirina</td>
                    <td className="p-4">Assistance du Président, remplacement en cas d’absence, supervision des activités</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="p-4 font-bold">Secrétaire général</td>
                    <td className="p-4">Antema Tsiaro</td>
                    <td className="p-4">Rédaction des documents administratifs, gestion des correspondances, organisation des réunions</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="p-4 font-bold">Trésorier</td>
                    <td className="p-4">Lahatrainaiana</td>
                    <td className="p-4">Gestion des finances, cotisations, opération cake, tenue du coffre de l’association</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="p-4 font-bold">Responsable communication</td>
                    <td className="p-4">Mahenintsoa Raben</td>
                    <td className="p-4">Gestion des réseaux sociaux, communication externe, diffusion des activités de l’APDO</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="p-4 font-bold">Membres actifs</td>
                    <td className="p-4">Ensemble des membres</td>
                    <td className="p-4">Participation aux activités, cotisations, soutien aux actions sociales</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="p-4 font-bold">Parrain moral</td>
                    <td className="p-4">Roger Rakotoniriana</td>
                    <td className="p-4">Conseil, accompagnement moral et appui stratégique à l’association</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </motion.div>

        </div>
      </main>
      <Footer />
    </>
  )
}
