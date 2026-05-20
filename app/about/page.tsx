'use client'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { motion } from 'framer-motion'
import { BookOpen, FileCheck, Landmark, Heart, MapPin, DollarSign, HelpCircle, Shield, Globe, Award, Sparkles, CheckCircle2, CircleDot, Clock, Hourglass } from 'lucide-react'

export default function About() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  }

  const stagger = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  }

  const values = [
    { title: 'Solidarité Universitaire', desc: 'Une initiative née au sein de l’Université Faravohitra pour lier connaissances académiques et impact social direct.', icon: Landmark, color: '#09335F' },
    { title: 'Intégrité & Transparence', desc: 'Rigueur absolue dans la gestion de notre coffre commun et fidélité stricte aux lois associatives malgaches.', icon: Shield, color: '#DF6C63' },
    { title: 'Protection de l’Enfance', desc: 'Engagement inconditionnel pour les orphelins de 3 à 18 ans conformément à la C.I.D.E.', icon: Heart, color: '#7BB274' },
    { title: 'Proximité Locale', desc: 'Présence physique quotidienne à Ambohimanambola pour épauler les Fokontany.', icon: MapPin, color: '#EAA937' }
  ]

  const timelineSteps = [
    { year: 'Genèse', title: 'Projet de Recherche', desc: 'Conception initiale du projet d’accompagnement social au sein de l’Université Faravohitra (Droit).' },
    { year: 'Étape 1', title: 'Validation Locale', desc: 'Présentation réussie et obtention de l’accord de principe auprès du Fokontany d’Ambohimanambola.' },
    { year: 'Étape 2', title: 'Opération Cake', desc: 'Collecte collective par la vente de gâteaux pour alimenter le coffre commun et financer les dossiers administratifs.' },
    { year: 'Étape 3', title: 'Formalisation', desc: 'Dossier transmis au District pour obtention de l’immatriculation officielle NIF/STAT en cours.' }
  ]

  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#F4F7FA] py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Hero Section */}
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-[#DF6C63]/10 text-[#DF6C63] text-sm font-bold tracking-wider mb-3">
              QUI SOMMES-NOUS ?
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-[#09335F] mb-6">
              À Propos de l&apos;APDO
            </h1>
            <div className="w-24 h-1.5 bg-[#DF6C63] mx-auto rounded-full" />
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="space-y-16"
          >
            {/* Résumé & Introduction */}
            <motion.section variants={fadeInUp} className="bg-white rounded-3xl p-8 md:p-12 shadow-lg border border-gray-100 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#09335F]/5 rounded-bl-full" />
              <h2 className="text-2xl md:text-3xl font-extrabold text-[#09335F] mb-6 flex items-center gap-3">
                <BookOpen className="text-[#DF6C63]" size={32} />
                Résumé & Introduction
              </h2>
              <div className="space-y-6 text-gray-700 leading-relaxed font-medium">
                <p className="text-[#09335F] font-bold text-lg border-l-4 border-[#EAA937] pl-4 italic bg-gray-50/50 py-3.5 pr-2.5 rounded-r-xl">
                  Le présent projet de recherche porte sur la création et le développement de l’Association pour les Droits des Orphelins (APDO), une initiative à vocation sociale et juridique visant à renforcer la protection des enfants orphelins à Madagascar. Ce projet s’inscrit dans le cadre du droit des associations, notamment régi par l’Ordonnance n°60-133.
                </p>
                <p>
                  La protection des droits de l’enfant constitue aujourd’hui l’un des piliers fondamentaux du développement social et juridique à Madagascar. Malgré l’existence d’un cadre légal relativement complet, notamment la Convention Internationale des Droits de l’Enfant, la Constitution malgache ainsi que la Loi n°2007-023 du 20 août 2007 relative aux droits et à la protection des enfants, la mise en œuvre effective de ces droits demeure confrontée à de nombreuses difficultés, en particulier pour les enfants en situation de vulnérabilité tels que les orphelins.
                </p>
                <p>
                  L’APDO est une initiative associative composée de membres fondateurs issus du milieu universitaire et social, ayant pour objectif principal de contribuer à la protection, à l’assistance et à l’accompagnement des enfants âgés de 3 à 18 ans privés de soutien familial. À travers ses actions, elle ambitionne de combler certaines insuffisances observées dans le système de prise en charge existant, en mettant en place des mécanismes de soutien juridique, social, éducatif et administratif.
                </p>
              </div>
            </motion.section>

            {/* Core Values Section */}
            <motion.section variants={fadeInUp} className="space-y-8">
              <div className="text-center">
                <span className="text-xs font-bold text-[#7BB274] bg-[#7BB274]/10 px-3 py-1 rounded-full uppercase tracking-wider">Identité Collective</span>
                <h2 className="text-2xl md:text-3xl font-extrabold text-[#09335F] mt-2">Nos Valeurs Fondamentales</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {values.map((val, idx) => {
                  const IconComp = val.icon
                  return (
                    <div key={idx} className="bg-white rounded-3xl p-6 shadow-md border border-gray-50 hover:shadow-lg transition-all flex items-start gap-4">
                      <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-white shrink-0 shadow-sm" style={{ backgroundColor: val.color }}>
                        <IconComp size={22} />
                      </div>
                      <div>
                        <h3 className="font-bold text-[#09335F] text-base mb-1">{val.title}</h3>
                        <p className="text-xs text-gray-500 font-semibold leading-relaxed">{val.desc}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </motion.section>

            {/* Localisation */}
            <motion.section variants={fadeInUp} className="bg-white rounded-3xl p-8 md:p-12 shadow-lg border border-gray-100">
              <h2 className="text-2xl md:text-3xl font-extrabold text-[#09335F] mb-6 flex items-center gap-3">
                <MapPin className="text-[#7BB274]" size={32} />
                Localisation du Siège Social
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="space-y-4 text-gray-700 leading-relaxed font-medium">
                  <p>
                    Le siège social provisoire de l’Association pour les Droits des Orphelins (APDO) est situé à <strong>Ambohimanambola Gara B</strong>. Ce lieu constitue le point d’ancrage juridique, administratif et fonctionnel de l’association.
                  </p>
                  <p>
                    Sur le plan juridique, cette situation est conforme aux dispositions de l’article 5 de l’Ordonnance n°60-133 du 03 octobre 1960, qui impose à toute association l’obligation de disposer d’un siège social fixe et clairement identifié.
                  </p>
                </div>
                <div className="bg-[#F4F7FA] rounded-3xl p-6 border border-gray-100 flex flex-col justify-center shadow-inner">
                  <h4 className="text-xs font-extrabold text-[#09335F] uppercase tracking-wider mb-4 text-center">Axe de Déploiement :</h4>
                  <div className="flex flex-col gap-2 items-center text-center font-bold text-xs text-gray-600">
                    <span className="bg-[#09335F] text-white px-4 py-1.5 rounded-xl shadow-sm">Madagascar</span>
                    <span className="text-[#09335F]">↓</span>
                    <span className="bg-[#DF6C63] text-white px-4 py-1.5 rounded-xl shadow-sm">Antananarivo</span>
                    <span className="text-[#09335F]">↓</span>
                    <span className="bg-[#7BB274] text-white px-4 py-1.5 rounded-xl shadow-sm">Ambohimanambola Gara</span>
                    <span className="text-[#09335F]">↓</span>
                    <span className="bg-[#EAA937] text-[#09335F] px-4 py-1.5 rounded-xl shadow-sm flex items-center gap-1"><Sparkles size={12} /> Siège APDO</span>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* Historical Milestones Timeline */}
            <motion.section variants={fadeInUp} className="bg-white rounded-3xl p-8 md:p-12 shadow-lg border border-gray-100">
              <h2 className="text-2xl md:text-3xl font-extrabold text-[#09335F] mb-10 flex items-center gap-3">
                <Clock className="text-[#DF6C63]" size={32} />
                Étapes Historiques de l&apos;Association
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {timelineSteps.map((step, sIdx) => (
                  <div key={sIdx} className="p-5 rounded-2xl bg-[#F4F7FA] border border-gray-100 flex flex-col justify-between group hover:bg-[#09335F] hover:text-white transition-colors duration-300">
                    <div>
                      <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-[#09335F]/10 text-[#09335F] group-hover:bg-white/20 group-hover:text-white uppercase tracking-wider mb-3">
                        {step.year}
                      </span>
                      <h3 className="font-extrabold text-sm text-[#09335F] group-hover:text-white mb-2">{step.title}</h3>
                      <p className="text-xs text-gray-500 group-hover:text-blue-100 font-semibold leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.section>

            {/* Démarches Administratives */}
            <motion.section variants={fadeInUp} className="bg-white rounded-3xl p-8 md:p-12 shadow-lg border border-gray-100">
              <h2 className="text-2xl md:text-3xl font-extrabold text-[#09335F] mb-6 flex items-center gap-3">
                <FileCheck className="text-[#EAA937]" size={32} />
                Synthèse des Démarches Administratives
              </h2>
              <p className="text-gray-600 mb-6 font-semibold leading-relaxed text-sm">
                Le processus de création légale de l&apos;APDO est en cours de validation finale à travers les différents échelons administratifs malgaches :
              </p>
              
              <div className="grid grid-cols-1 gap-4">
                {[
                  { level: 'Fokontany', action: 'Dépôt de la demande de création et présentation du projet', status: 'Validé', statColor: 'text-emerald-700 bg-emerald-100', icon: CheckCircle2 },
                  { level: 'Commune', action: 'Dépôt du dossier complet de l’association', status: 'Validé', statColor: 'text-emerald-700 bg-emerald-100', icon: CheckCircle2 },
                  { level: 'District', action: 'Transmission et vérification du dossier', status: 'En cours', statColor: 'text-[#EAA937] bg-[#EAA937]/15', icon: Hourglass },
                  { level: 'Région (Faritany)', action: 'Dépôt pour validation finale', status: 'En attente', statColor: 'text-[#DF6C63] bg-[#DF6C63]/15', icon: CircleDot },
                  { level: 'Administration fiscale', action: 'Demande d’immatriculation (NIF/STAT)', status: 'À venir', statColor: 'text-gray-500 bg-gray-100', icon: CircleDot }
                ].map((item, index) => {
                  const StatusIcon = item.icon
                  return (
                    <div key={index} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100 gap-4 hover:border-gray-200 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${item.status === 'Validé' ? 'text-emerald-600' : 'text-gray-400'}`}>
                          <StatusIcon size={20} />
                        </div>
                        <div>
                          <h4 className="font-extrabold text-sm text-[#09335F]">{item.level}</h4>
                          <p className="text-xs text-gray-500 font-semibold mt-0.5">{item.action}</p>
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-[10px] font-extrabold uppercase shrink-0 tracking-wider ${item.statColor}`}>
                        {item.status}
                      </span>
                    </div>
                  )
                })}
              </div>
            </motion.section>

            {/* Sources de Financement */}
            <motion.section variants={fadeInUp} className="bg-white rounded-3xl p-8 md:p-12 shadow-lg border border-gray-100">
              <h2 className="text-2xl md:text-3xl font-extrabold text-[#09335F] mb-6 flex items-center gap-3">
                <DollarSign className="text-[#DF6C63]" size={32} />
                Sources de Financement & Opération Cake
              </h2>
              <p className="text-gray-600 mb-6 font-semibold leading-relaxed text-sm">
                L’Association pour les Droits des Orphelins (APDO) fonctionne selon le principe de non-lucrativité. Nos ressources proviennent exclusivement de mécanismes légaux et solidaires :
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { name: 'Cotisations des membres', desc: 'Contribution financière régulière des membres de l’association pour le fonctionnement courant.', use: 'Fonctionnement administratif interne' },
                  { name: 'Dons volontaires', desc: 'Aides financières ou matérielles de particuliers ou entreprises.', use: 'Soutien aux orphelins' },
                  { name: 'Subventions publiques', desc: 'Aides accordées par l\'État ou institutions partenaires.', use: 'Développement des projets' },
                  { name: 'Opération cake', desc: 'Ventes solidaires de gâteaux organisées collectivement par les membres.', use: 'Frais de dossiers et démarches administratives' }
                ].map((item, index) => (
                  <div key={index} className="p-5 rounded-2xl bg-gray-50 border border-gray-100 hover:shadow-md transition-shadow">
                    <h4 className="font-extrabold text-sm text-[#09335F] mb-1.5">{item.name}</h4>
                    <p className="text-xs text-gray-600 font-semibold leading-relaxed mb-3">{item.desc}</p>
                    <div className="bg-white px-3 py-2 rounded-xl text-[10px] font-extrabold text-gray-500 border border-gray-100">
                      Utilisation : {item.use}
                    </div>
                  </div>
                ))}
              </div>
            </motion.section>

            {/* Remerciements */}
            <motion.section variants={fadeInUp} className="bg-[#09335F] rounded-3xl p-8 md:p-12 shadow-xl text-white relative overflow-hidden">
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
              <div className="relative z-10">
                <h2 className="text-2xl md:text-3xl font-bold mb-6 flex items-center gap-3 border-b border-white/20 pb-4">
                  <Heart className="text-[#DF6C63] fill-[#DF6C63]" size={32} />
                  Remerciements
                </h2>
                <div className="space-y-6 text-blue-100 font-medium leading-relaxed text-sm md:text-base">
                  <p className="font-bold text-white text-lg">
                    Je tiens à exprimer ma profonde gratitude à toutes les personnes qui ont contribué, de près ou de loin, à la réalisation de ce projet de recherche portant sur la création et le développement de l’Association pour la Protection des Droits des Orphelins (APDO).
                  </p>
                  <p>
                    Tout d’abord, j’adresse mes sincères remerciements à l’ensemble du corps professoral de l’<strong>Université Faravohitra</strong>, et particulièrement aux enseignants de la filière Droit, pour la qualité de leurs enseignements, leur encadrement pédagogique ainsi que leurs conseils précieux tout au long de mon parcours universitaire. Leur accompagnement a joué un rôle essentiel dans l’acquisition des connaissances juridiques et méthodologiques nécessaires à la réalisation de ce travail.
                  </p>
                  <p>
                    Je tiens également à exprimer ma profonde reconnaissance aux autorités locales, notamment le <strong>Chef Fokontany</strong> ainsi que le <strong>Maire de la Commune</strong>, pour leur accueil, leur disponibilité et leur collaboration dans le cadre des démarches administratives liées à la mise en place de l’association APDO. Leur soutien a facilité l’avancement du projet et a permis de respecter les procédures administratives en vigueur.
                  </p>
                  <p>
                    Je remercie également les services administratifs du District et de la Région pour leur accompagnement dans le traitement des dossiers, ainsi que pour leur rôle dans la validation progressive des démarches entreprises.
                  </p>
                  <p>
                    Je n’oublie pas d’adresser mes remerciements les plus sincères à ma famille, pour son soutien moral, financier et affectif constant. Leur encouragement permanent a constitué une véritable source de motivation et de persévérance tout au long de la réalisation de ce projet.
                  </p>
                  <p>
                    J’exprime aussi ma reconnaissance envers mes camarades et les membres fondateurs de l’association APDO, pour leur engagement, leur esprit de solidarité et leur participation active à la mise en place et au développement de ce projet commun. Leur collaboration a été indispensable à la concrétisation de cette initiative.
                  </p>
                  <p>
                    Enfin, je remercie toutes les personnes qui, de près ou de loin, ont contribué à la réussite de ce travail, que ce soit par leurs conseils, leurs orientations ou leur soutien moral.
                  </p>
                  <p className="text-[#EAA937] font-bold text-center mt-8 text-lg">
                    Que ce travail soit le témoignage de ma sincère reconnaissance envers toutes ces personnes.
                  </p>
                </div>
              </div>
            </motion.section>

          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  )
}
