'use client'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { FormEvent, useState } from 'react'
import { Mail, Phone, MapPin, Send, HelpCircle, MessageCircle } from 'lucide-react'

// Fix typo in import if any
import { motion as motionImport } from 'framer-motion'

// Custom SVG WhatsApp icon for premium look
const WhatsAppIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.262 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.498 1.45 5.419 1.451 5.441 0 9.868-4.42 9.872-9.861.002-2.637-1.025-5.115-2.893-6.985C17.176 1.89 14.7 1.864 12.01 1.864 6.57 1.864 2.147 6.28 2.143 11.72c-.001 1.93.504 3.81 1.461 5.43L2.612 20.8l3.963-1.04-.002-.002-.927-.582-.001-.001zm11.332-6.52c-.313-.156-1.85-.913-2.136-1.018-.287-.104-.496-.156-.704.157-.208.312-.806 1.018-.988 1.226-.182.208-.364.234-.677.078-.313-.156-1.32-.486-2.515-1.55-1.129-1.007-1.62-1.92-1.85-2.285-.23-.365-.025-.562.13-.717.14-.14.313-.365.47-.547.156-.182.208-.312.312-.52.104-.209.052-.392-.026-.548-.078-.156-.704-1.693-.964-2.318-.253-.61-.51-.527-.704-.537-.182-.01-.39-.01-.598-.01-.208 0-.547.078-.833.39-.286.313-1.094 1.069-1.094 2.606 0 1.538 1.12 3.023 1.276 3.23.156.209 2.2 3.36 5.33 4.716.745.322 1.327.515 1.782.66.748.238 1.43.204 1.97.123.6-.09 1.847-.756 2.109-1.45.26-.694.26-1.288.182-1.41-.078-.121-.286-.195-.6-.351z"/>
  </svg>
)


export default function Contact() {
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmitted(true)
    setFormData({ name: '', email: '', message: '' })
    setTimeout(() => setSubmitted(false), 4000)
  }

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#F4F7FA] py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <motionImport.div 
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-[#DF6C63]/10 text-[#DF6C63] text-sm font-bold tracking-wider mb-3">
              CONTACT
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-[#09335F] mb-6">
              Nous Contacter
            </h1>
            <div className="w-24 h-1.5 bg-[#DF6C63] mx-auto rounded-full mb-6" />
            <p className="text-gray-600 max-w-2xl mx-auto font-medium leading-relaxed">
              Une question, un projet de partenariat ou envie de rejoindre l&apos;APDO en tant que bénévole ? Écrivez-nous dès aujourd&apos;hui !
            </p>
          </motionImport.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Info Cards Column */}
            <div className="space-y-6 lg:col-span-1">
              <div className="bg-white rounded-3xl p-6 shadow-md border-b-4 border-[#09335F] flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#09335F]/10 flex items-center justify-center text-[#09335F] flex-shrink-0">
                  <Phone size={24} />
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-sm">Téléphone</p>
                  <p className="text-[#09335F] font-bold text-sm mt-1 leading-relaxed">
                    038 54 834 98<br />
                    038 51 987 55
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-3xl p-6 shadow-md border-b-4 border-[#25D366] flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#25D366]/10 flex items-center justify-center text-[#25D366] flex-shrink-0">
                  <WhatsAppIcon className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-sm">WhatsApp</p>
                  <a href="https://wa.me/261385483498" target="_blank" rel="noopener noreferrer" className="text-[#25D366] hover:underline font-bold text-base mt-0.5 block">
                    038 54 834 98
                  </a>
                </div>
              </div>

              <div className="bg-white rounded-3xl p-6 shadow-md border-b-4 border-[#DF6C63] flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#DF6C63]/10 flex items-center justify-center text-[#DF6C63] flex-shrink-0">
                  <Mail size={24} />
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-sm">Email</p>
                  <a href="mailto:apdo17@gmail.com" className="text-[#DF6C63] hover:underline font-bold text-sm mt-0.5 block font-sans">
                    apdo17@gmail.com
                  </a>
                </div>
              </div>

              <div className="bg-white rounded-3xl p-6 shadow-md border-b-4 border-[#7BB274] flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#7BB274]/10 flex items-center justify-center text-[#7BB274] flex-shrink-0">
                  <MapPin size={24} />
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-sm">Adresse du Siège</p>
                  <p className="text-[#7BB274] font-bold text-base mt-0.5">Ambohimanambola B</p>
                </div>
              </div>
              
              <div className="bg-[#09335F] rounded-3xl p-6 text-white shadow-md relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-bl-full" />
                <HelpCircle className="text-[#EAA937] mb-4" size={32} />
                <h4 className="font-bold text-lg mb-2">Des questions ?</h4>
                <p className="text-sm text-blue-100 font-medium leading-relaxed">
                  Notre équipe se tient à votre entière disposition pour vous guider dans vos démarches d&apos;aide sociale ou administrative.
                </p>
              </div>
            </div>

            {/* Form Column */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-3xl shadow-lg p-8 border border-gray-100">
                <h3 className="text-2xl font-bold text-[#09335F] mb-6">Envoyez-nous un Message</h3>
                
                {submitted && (
                  <motionImport.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6 p-4 bg-green-50 border border-green-200 text-green-800 font-bold rounded-2xl text-center text-sm"
                  >
                    ✨ Merci pour votre message ! Notre secrétariat général va vous recontacter très rapidement.
                  </motionImport.div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold mb-2 text-gray-700">Nom Complet</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#09335F] focus:border-[#09335F] focus:outline-none transition-all"
                        placeholder="Ex: Holda Ramanarivo"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold mb-2 text-gray-700">Email de Contact</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#09335F] focus:border-[#09335F] focus:outline-none transition-all"
                        placeholder="votre@email.com"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2 text-gray-700">Votre Message</label>
                    <textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#09335F] focus:border-[#09335F] focus:outline-none transition-all"
                      placeholder="Comment l'APDO peut-elle vous aider ?"
                    />
                  </div>
                  <button 
                    type="submit" 
                    className="w-full py-3.5 bg-[#DF6C63] hover:bg-[#DF6C63]/90 text-white font-bold rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 hover:-translate-y-0.5"
                  >
                    <Send size={18} />
                    <span>Envoyer le Message</span>
                  </button>
                </form>
              </div>
            </div>

          </div>

          {/* Map Section - Logo Map Placement */}
          <motionImport.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="mt-12 bg-white rounded-3xl p-6 shadow-md border border-gray-100 overflow-hidden"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-[#7BB274]/10 flex items-center justify-center text-[#7BB274] flex-shrink-0">
                <MapPin size={24} />
              </div>
              <div>
                <h3 className="font-bold text-[#09335F] text-xl">Notre Emplacement</h3>
                <p className="text-sm text-gray-500 font-medium">Ambohimanambola B, Madagascar</p>
              </div>
            </div>
            <div className="w-full h-96 rounded-2xl overflow-hidden border border-gray-100 shadow-inner">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15091.2464190847!2d47.558362678627885!3d-18.983995570076045!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x21f0814674f76269%3A0xc3cf9c9fde90cbab!2sAmbohimanambola!5e0!3m2!1sfr!2smg!4v1715800000000!5m2!1sfr!2smg"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </motionImport.div>
        </div>
      </main>
      <Footer />
    </>
  )
}
