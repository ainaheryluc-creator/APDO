// User types
export interface User {
  id: string
  email: string
  phone?: string
  name: string
  role: 'admin' | 'visitor'
  createdAt: string
  verified: boolean
}

export interface AuthUser extends User {
  passwordHash: string
}

export interface LoginRequest {
  email: string
  password: string
}

export interface SignupRequest {
  email: string
  phone?: string
  name: string
  password: string
}

export interface VerificationRequest {
  email: string
  otp: string
}

export interface AuthResponse {
  success: boolean
  message: string
  user?: User
  token?: string
}

// News types
export interface NewsArticle {
  id: string
  title: string
  content: string
  author: string
  createdAt: string
  updatedAt: string
  status: 'draft' | 'published'
  category: string
}

// Media types
export interface MediaItem {
  id: string
  title: string
  type: 'audio' | 'announcement'
  url?: string
  content: string
  createdAt: string
  updatedAt: string
  status: 'draft' | 'published'
}

// Member types
export interface TeamMember {
  id: string
  name: string
  role: string
  bio: string
  image?: string
  createdAt: string
}
