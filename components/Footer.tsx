'use client'

import Link from 'next/link'
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, MessageCircle } from 'lucide-react'

// Custom SVG WhatsApp icon for premium look
const WhatsAppIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.262 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.498 1.45 5.419 1.451 5.441 0 9.868-4.42 9.872-9.861.002-2.637-1.025-5.115-2.893-6.985C17.176 1.89 14.7 1.864 12.01 1.864 6.57 1.864 2.147 6.28 2.143 11.72c-.001 1.93.504 3.81 1.461 5.43L2.612 20.8l3.963-1.04-.002-.002-.927-.582-.001-.001zm11.332-6.52c-.313-.156-1.85-.913-2.136-1.018-.287-.104-.496-.156-.704.157-.208.312-.806 1.018-.988 1.226-.182.208-.364.234-.677.078-.313-.156-1.32-.486-2.515-1.55-1.129-1.007-1.62-1.92-1.85-2.285-.23-.365-.025-.562.13-.717.14-.14.313-.365.47-.547.156-.182.208-.312.312-.52.104-.209.052-.392-.026-.548-.078-.156-.704-1.693-.964-2.318-.253-.61-.51-.527-.704-.537-.182-.01-.39-.01-.598-.01-.208 0-.547.078-.833.39-.286.313-1.094 1.069-1.094 2.606 0 1.538 1.12 3.023 1.276 3.23.156.209 2.2 3.36 5.33 4.716.745.322 1.327.515 1.782.66.748.238 1.43.204 1.97.123.6-.09 1.847-.756 2.109-1.45.26-.694.26-1.288.182-1.41-.078-.121-.286-.195-.6-.351z"/>
  </svg>
)


export default function Footer() {
  return (
    <footer className="text-white mt-20 relative overflow-hidden" style={{ backgroundColor: '#09335F' }}>
      {/* Decorative colored bar top of footer */}
      <div className="h-2 w-full flex">
        <div className="bg-[#DF6C63] flex-1" /> {/* Coral */}
        <div className="bg-[#7BB274] flex-1" /> {/* Green */}
        <div className="bg-[#EAA937] flex-1" /> {/* Yellow */}
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* About */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <img src="/logo.jpg" alt="Logo APDO" className="w-12 h-12 object-contain bg-white rounded-full p-0.5" onError={(e) => {
                (e.target as HTMLImageElement).src = '/logo.png';
              }} />
              <h3 className="text-2xl font-bold tracking-wider text-white">APDO</h3>
            </div>
            <p className="text-sm text-blue-100/80 leading-relaxed">
              Association Pour la Protection Des Droits Des Orphelins. Nous travaillons pour un meilleur avenir des enfants.
            </p>
            <p className="text-xs text-blue-200">
              Ambohimanambola B, Madagascar
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-white border-b-2 border-[#DF6C63] pb-2 inline-block">Navigation</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/" className="text-blue-100/80 hover:text-white hover:underline transition-all">
                  Accueil
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-blue-100/80 hover:text-white hover:underline transition-all">
                  À Propos
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-blue-100/80 hover:text-white hover:underline transition-all">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/news" className="text-blue-100/80 hover:text-white hover:underline transition-all">
                  Actualités
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-white border-b-2 border-[#7BB274] pb-2 inline-block">Ressources</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/members" className="text-blue-100/80 hover:text-white hover:underline transition-all">
                  Équipe
                </Link>
              </li>
              <li>
                <Link href="/media" className="text-blue-100/80 hover:text-white hover:underline transition-all">
                  Média
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-blue-100/80 hover:text-white hover:underline transition-all">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-white border-b-2 border-[#EAA937] pb-2 inline-block">Nous Contacter</h3>
            <div className="space-y-4 text-sm">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 mt-0.5 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                  <Phone size={16} className="text-[#EAA937]" />
                </div>
                <span className="text-blue-100/80 font-medium leading-relaxed">
                  038 54 834 98<br />038 51 987 55
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                  <WhatsAppIcon className="w-4 h-4 text-[#25D366]" />
                </div>
                <span className="text-blue-100/80 font-medium">038 54 834 98 (WhatsApp)</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                  <Mail size={16} className="text-[#DF6C63]" />
                </div>
                <span className="text-blue-100/80 font-medium font-sans">apdo17@gmail.com</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                  <MapPin size={16} className="text-[#7BB274]" />
                </div>
                <span className="text-blue-100/80 font-medium">Ambohimanambola B</span>
              </div>
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex gap-4">
            <a 
              href="https://www.facebook.com/profile.php?id=100085465922097" 
              target="_blank" 
              rel="noopener noreferrer" 
              title="Association pour la protection des droits des Orphelins sur Facebook"
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#1877F2] flex items-center justify-center transition-all text-white hover:scale-110"
            >
              <Facebook size={18} />
            </a>
            <a 
              href="https://wa.me/261385483498" 
              target="_blank" 
              rel="noopener noreferrer" 
              title="Nous contacter sur WhatsApp"
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#25D366] flex items-center justify-center transition-all text-white hover:scale-110"
            >
              <WhatsAppIcon className="w-5 h-5" />
            </a>
            <a 
              href="mailto:apdo17@gmail.com" 
              title="Nous envoyer un email"
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#DF6C63] flex items-center justify-center transition-all text-white hover:scale-110"
            >
              <Mail size={18} />
            </a>
          </div>
          <p className="text-xs text-blue-200/60 font-medium">
            © 2026 APDO. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  )
}
