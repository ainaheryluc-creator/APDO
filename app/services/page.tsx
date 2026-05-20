'use client'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { motion } from 'framer-motion'
import { Scale, HeartHandshake, FileText, ShieldAlert, ArrowRight, BookOpen, Award, Users, ShieldCheck, Heart, FileCheck2, Library } from 'lucide-react'
import Link from 'next/link'

export default function Services() {
  const services = [
    {
      title: 'Veille Juridique Nationale & Internationale',
      description: 'Suivi rigoureux de l’évolution des normes nationales et internationales relatives aux droits de l’enfant à Madagascar. Nous veillons à la bonne interprétation de l\'Ordonnance n°60-133 et de la Loi n°2007-023, et assurons une large diffusion de ces règles auprès des Fokontany et tuteurs de terrain.',
      icon: Scale,
      color: '#09335F',
      badge: 'Droit & Veille'
    },
    {
      title: 'Plaidoyer Institutionnel & Local',
      description: 'Défense active et structurée des intérêts fondamentaux des enfants orphelins auprès des autorités publiques locales (Chef Fokontany, Maire, Commune) et nationales, afin d’améliorer continuellement les politiques de protection et combler les lacunes du système actuel.',
      icon: BookOpen,
      color: '#DF6C63',
      badge: 'Sensibilisation'
    },
    {
      title: 'Assistance Administrative & Sociale',
      description: 'Accompagnement concret des tuteurs et responsables légaux dans les démarches administratives indispensables : procédures scolaires obligatoires, déclaration d’identité à l\'état civil, constitutions de dossiers officiels et demandes d’aides sociales d\'urgence.',
      icon: FileText,
      color: '#7BB274',
      badge: 'Accompagnement'
    },
    {
      title: 'Protection Non Contentieuse des Droits',
      description: 'Veiller de manière pacifique et concertée à l’éradication de toutes formes de négligence, d’exclusion sociale ou de discrimination affectant les enfants orphelins âgés de 3 à 18 ans à Madagascar. Nous agissons en médiateur bienveillant.',
      icon: ShieldAlert,
      color: '#EAA937',
      badge: 'Protection'
    }
  ]

  const stats = [
    { value: '150+', label: 'Enfants accompagnés', icon: Users, color: '#09335F' },
    { value: '10+', label: 'Fokontany partenaires', icon: Award, color: '#DF6C63' },
    { value: '100%', label: 'Démarches gratuites', icon: ShieldCheck, color: '#7BB274' },
    { value: '4 axes', label: 'D\'intervention juridique', icon: Library, color: '#EAA937' }
  ]

  const steps = [
    {
      step: '01',
      title: 'Signalement & Identification',
      desc: 'Identification d\'un enfant orphelin ou en situation de vulnérabilité par nos membres ou signalement direct par le Chef Fokontany.',
      icon: FileCheck2
    },
    {
      step: '02',
      title: 'Diagnostic Social & Juridique',
      desc: 'Étude minutieuse de la situation (scolarisation, existence d\'un acte de naissance, environnement de vie de l\'enfant).',
      icon: FileText
    },
    {
      step: '03',
      title: 'Accompagnement en Mairie & École',
      desc: 'Nos bénévoles prennent en charge les démarches d\'inscription scolaire et d\'obtention de pièces administratives auprès de la Commune.',
      icon: HeartHandshake
    },
    {
      step: '04',
      title: 'Suivi à Long Terme',
      desc: 'Visites régulières pour s\'assurer du respect continu des droits de l\'enfant et du bien-être général de son foyer.',
      icon: ShieldCheck
    }
  ]

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  }

  const stagger = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
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
            <span className="inline-block px-4 py-1.5 rounded-full bg-[#DF6C63]/10 text-[#DF6C63] text-sm font-bold tracking-wider mb-3">
              NORMES INTERNATIONALES
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-[#09335F] mb-6">
              Nos Actions & Services Proposés
            </h1>
            <div className="w-24 h-1.5 bg-[#DF6C63] mx-auto rounded-full mb-6" />
            <p className="text-gray-600 max-w-3xl mx-auto font-medium leading-relaxed text-base">
              En tant qu’acteur juridique non contentieux, l’APDO déploie son expertise sur des missions de prévention, d&apos;assistance, de veille et de plaidoyer pour un impact direct sur la vie des enfants orphelins à Madagascar.
            </p>
          </motion.div>

          {/* Stats Bar Component (Professional NGO Style) */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20 bg-white rounded-3xl p-8 shadow-md border border-gray-100"
          >
            {stats.map((stat, i) => {
              const Icon = stat.icon
              return (
                <motion.div key={i} variants={fadeInUp} className="text-center flex flex-col items-center p-4">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4 text-white shadow-sm" style={{ backgroundColor: stat.color }}>
                    <Icon size={22} />
                  </div>
                  <h3 className="text-3xl font-extrabold text-[#09335F] mb-1">{stat.value}</h3>
                  <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">{stat.label}</p>
                </motion.div>
              )
            })}
          </motion.div>

          {/* Grid Layout Services */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20"
          >
            {services.map((service, index) => {
              const Icon = service.icon
              return (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="bg-white rounded-3xl p-8 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col justify-between group hover:-translate-y-1"
                >
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div 
                        className="w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-md transition-transform group-hover:scale-105"
                        style={{ backgroundColor: service.color }}
                      >
                        <Icon size={28} />
                      </div>
                      <span 
                        className="px-3 py-1 rounded-full text-xs font-bold"
                        style={{ backgroundColor: `${service.color}15`, color: service.color }}
                      >
                        {service.badge}
                      </span>
                    </div>
                    
                    <h3 className="text-2xl font-bold mb-4 text-[#09335F] group-hover:text-[#DF6C63] transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed font-medium mb-6 text-sm">
                      {service.description}
                    </p>
                  </div>

                  <div className="border-t border-gray-100 pt-4 flex items-center justify-between text-xs font-bold text-[#09335F] group-hover:text-[#DF6C63] transition-colors cursor-pointer">
                    <span>En savoir plus sur nos cadres légaux</span>
                    <ArrowRight size={16} className="transform translate-x-0 group-hover:translate-x-1.5 transition-transform" />
                  </div>
                </motion.div>
              )
            })}
          </motion.div>

          {/* Dynamic Methodology Timeline */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="bg-white rounded-3xl p-8 md:p-12 shadow-md border border-gray-100 mb-20"
          >
            <div className="text-center mb-12">
              <span className="text-xs font-extrabold uppercase tracking-widest text-[#DF6C63] bg-[#DF6C63]/10 px-3 py-1 rounded-full">Méthodologie de Terrain</span>
              <h2 className="text-3xl font-extrabold text-[#09335F] mt-3">Notre Processus de Prise en Charge</h2>
              <p className="text-gray-500 text-sm font-medium mt-1">Comment l&apos;APDO accompagne concrètement un enfant orphelin</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
              {steps.map((item, i) => {
                const StepIcon = item.icon
                return (
                  <div key={i} className="flex flex-col items-center text-center relative group">
                    <div className="w-16 h-16 rounded-3xl bg-[#09335F]/5 text-[#09335F] flex items-center justify-center font-bold text-xl mb-4 group-hover:bg-[#09335F] group-hover:text-white transition-all shadow-inner relative">
                      <StepIcon size={24} />
                      <span className="absolute -top-2 -right-2 w-6 h-6 bg-[#DF6C63] text-white rounded-full flex items-center justify-center text-[10px] font-extrabold shadow-sm">{item.step}</span>
                    </div>
                    <h3 className="font-extrabold text-sm text-[#09335F] mb-2">{item.title}</h3>
                    <p className="text-xs text-gray-500 font-medium leading-relaxed">{item.desc}</p>
                  </div>
                )
              })}
            </div>
          </motion.div>

          {/* International Frame Section */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="bg-white rounded-3xl p-8 md:p-12 shadow-md border border-gray-100 mb-20 flex flex-col md:flex-row items-center gap-8 border-l-8 border-[#EAA937]"
          >
            <div className="w-16 h-16 rounded-2xl bg-[#EAA937]/10 flex items-center justify-center text-[#EAA937] shrink-0">
              <ShieldAlert size={36} />
            </div>
            <div>
              <h3 className="text-xl font-extrabold text-[#09335F] mb-2">Conformité aux Normes de la C.I.D.E</h3>
              <p className="text-gray-600 text-sm leading-relaxed font-medium">
                Notre action sociale s&apos;aligne rigoureusement sur la **Convention Internationale des Droits de l&apos;Enfant (C.I.D.E)** de l&apos;ONU ainsi que sur la **Loi n°2007-023 du 20 août 2007** en vigueur à Madagascar. L&apos;APDO œuvre en tant que structure de veille de proximité en coopération directe avec les services des mairies locales pour assurer à chaque enfant une identité légale, un toit et un accès universel à la scolarité.
              </p>
            </div>
          </motion.div>

          {/* Call to Action Box */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="bg-[#09335F] rounded-3xl p-8 md:p-12 text-center text-white relative overflow-hidden shadow-xl"
          >
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
            <div className="relative z-10 max-w-2xl mx-auto">
              <HeartHandshake className="text-[#DF6C63] mx-auto mb-6" size={48} />
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Soutenez nos Actions Sociales</h2>
              <p className="text-blue-100/90 font-medium mb-8 leading-relaxed text-sm">
                Qu’il s’agisse de dons volontaires, de cotisations ou d&apos;engagement bénévole, votre contribution permet à l&apos;APDO de pérenniser son action de veille et de protection administrative.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact" className="bg-[#DF6C63] hover:bg-[#DF6C63]/90 text-white font-bold px-8 py-3.5 rounded-full transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 text-sm">
                  Nous Contacter
                </Link>
                <Link href="/about" className="bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold px-8 py-3.5 rounded-full transition-all hover:-translate-y-0.5 text-sm">
                  En savoir plus sur l&apos;APDO
                </Link>
              </div>
            </div>
          </motion.div>

        </div>
      </main>
      <Footer />
    </>
  )
}
