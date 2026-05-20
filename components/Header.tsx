'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)

  const navLinks = [
    { href: '/', label: 'Accueil' },
    { href: '/about', label: 'À Propos' },
    { href: '/services', label: 'Services' },
    { href: '/members', label: 'Membres' },
    { href: '/news', label: 'Actualités' },
    { href: '/media', label: 'Média' },
    { href: '/contact', label: 'Contact' },
  ]

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            {/* The image should be placed in the public folder as logo.jpg or logo.png */}
            <img src="/logo.jpg" alt="Logo APDO" className="w-14 h-14 object-contain" onError={(e) => {
              (e.target as HTMLImageElement).src = '/logo.png'; // Fallback to .png if .jpg is not found
            }} />
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold" style={{ color: '#09335F' }}>APDO</h1>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-700 hover:text-[#DF6C63] transition-colors font-medium"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Link href="/contact" className="btn-primary text-sm shadow-md hover:shadow-lg">
              Nous Contacter
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 hover:bg-gray-100 rounded-lg text-[#09335F]"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <nav className="md:hidden pb-4 border-t border-gray-200">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block px-4 py-2 text-gray-700 hover:text-[#DF6C63] hover:bg-gray-50 rounded-lg transition-colors font-medium"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="px-4 py-2 mt-2">
              <Link href="/contact" className="btn-primary text-sm w-full block text-center">
                Nous Contacter
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
