'use client'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { Heart, Users, BookOpen, Home, ArrowRight, LogIn } from 'lucide-react'
import { motion } from 'framer-motion'
import Image from 'next/image'

export default function HomePage() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#F4F7FA]">
        {/* Animated Hero Section */}
        <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-20">
          <div className="absolute inset-0 z-0 bg-[#09335F]">
            <Image
              src="/apdo_hero_bg.png"
              alt="Enfants souriants à Madagascar"
              fill
              className="object-cover opacity-60 mix-blend-overlay"
              priority
            />
            {/* Dark overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#09335F] to-transparent" />
          </div>

          <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="max-w-3xl mx-auto"
            >
              <motion.div variants={fadeInUp} className="mb-4">
                <span className="inline-block px-4 py-1.5 rounded-full bg-[#DF6C63]/90 backdrop-blur-sm text-sm font-bold tracking-wider text-white shadow-lg">
                  ASSOCIATION APDO
                </span>
              </motion.div>
              
              <motion.h1 variants={fadeInUp} className="text-5xl md:text-7xl font-bold mb-6 leading-tight text-white drop-shadow-xl">
                Protéger les Droits des Orphelins
              </motion.h1>
              
              <motion.p variants={fadeInUp} className="text-xl md:text-2xl text-blue-100 mb-10 font-light drop-shadow-md">
                Nous œuvrons chaque jour pour le bien-être, la protection et l&apos;épanouissement des enfants vulnérables à Madagascar.
              </motion.p>
              
              <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <Link href="/auth/login" className="group relative px-8 py-4 rounded-xl font-bold text-lg bg-[#DF6C63] text-white overflow-hidden transition-all hover:scale-105 shadow-[0_0_40px_rgba(223,108,99,0.6)] border border-[#DF6C63]">
                  <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
                  <span className="relative flex items-center gap-2">
                    <LogIn size={24} />
                    Espace Sécurisé
                  </span>
                </Link>
                <Link href="/about" className="px-8 py-4 rounded-xl font-semibold text-lg bg-white/10 backdrop-blur-md text-white border border-white/30 hover:bg-white/20 hover:border-white/50 transition-all flex items-center gap-2">
                  Découvrir notre mission <ArrowRight size={20} />
                </Link>
              </motion.div>
            </motion.div>
          </div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          >
            <span className="text-blue-200 text-sm font-medium tracking-widest uppercase">Défiler</span>
            <div className="w-6 h-10 border-2 border-blue-200 rounded-full flex justify-center p-1">
              <motion.div 
                animate={{ y: [0, 12, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="w-1.5 h-1.5 bg-blue-200 rounded-full"
              />
            </div>
          </motion.div>
        </section>

        {/* Animated Stats Section */}
        <section className="py-20 relative z-20 -mt-10">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
              className="grid grid-cols-2 md:grid-cols-4 gap-6 bg-white rounded-3xl shadow-xl p-8 md:p-12 border-t-4 border-[#7BB274]"
            >
              {[
                { number: "500+", label: "Enfants aidés", color: "#09335F" },
                { number: "12", label: "Années d'existence", color: "#DF6C63" },
                { number: "25", label: "Membres actifs", color: "#7BB274" },
                { number: "15", label: "Projets réalisés", color: "#EAA937" }
              ].map((stat, i) => (
                <motion.div key={i} variants={fadeInUp} className="text-center">
                  <p className="text-4xl md:text-5xl font-extrabold mb-2" style={{ color: stat.color }}>{stat.number}</p>
                  <p className="text-sm md:text-base text-gray-500 font-bold uppercase tracking-wider">{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Animated Services Section */}
        <section className="py-24 bg-[#F4F7FA]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-16"
            >
              <h2 className="section-title">Nos Actions Concrètes</h2>
            </motion.div>

            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
            >
              {[
                { icon: Heart, title: 'Soutien Psychologique', desc: 'Accompagnement émotionnel et mental pour aider les enfants à surmonter les traumatismes de leur passé.', color: '#DF6C63' },
                { icon: Home, title: 'Hébergement Sécurisé', desc: 'Foyers accueillants et sécurisés offrant un environnement bienveillant propice au développement.', color: '#09335F' },
                { icon: BookOpen, title: 'Éducation', desc: 'Accès à une éducation de qualité et suivi scolaire pour assurer l\'avenir professionnel des enfants.', color: '#EAA937' },
                { icon: Users, title: 'Intégration Sociale', desc: 'Programmes spécifiques pour aider les orphelins à s\'intégrer harmonieusement dans la communauté.', color: '#7BB274' },
              ].map((item, index) => {
                const Icon = item.icon
                return (
                  <motion.div 
                    key={index} 
                    variants={fadeInUp}
                    whileHover={{ y: -10, scale: 1.02 }}
                    className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 transition-all hover:shadow-xl"
                  >
                    <div className="flex gap-6 items-start">
                      <div className="w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-md" style={{ backgroundColor: item.color }}>
                        <Icon className="text-white" size={32} />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold mb-3 text-[#09335F]">{item.title}</h3>
                        <p className="text-gray-600 leading-relaxed font-medium">{item.desc}</p>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </motion.div>
          </div>
        </section>

        {/* Footer CTA */}
        <section className="py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-[#09335F]" />
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
          
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="relative z-10 max-w-4xl mx-auto px-4 text-center text-white"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-8">Rejoignez notre belle mission</h2>
            <p className="text-xl text-blue-100 mb-12 font-light">
              Que vous soyez donateur, bénévole ou professionnel, votre aide est précieuse pour construire l&apos;avenir de ces enfants.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link href="/contact" className="px-10 py-4 rounded-xl font-bold text-lg bg-[#EAA937] text-[#09335F] hover:bg-[#F3C060] transition-all shadow-xl">
                Nous Contacter
              </Link>
              <Link href="/auth/signup" className="px-10 py-4 rounded-xl font-bold text-lg border-2 border-white/50 text-white hover:bg-white/10 transition-all">
                S&apos;inscrire à l&apos;association
              </Link>
            </div>
          </motion.div>
        </section>
      </main>
      <Footer />
    </>
  )
}
