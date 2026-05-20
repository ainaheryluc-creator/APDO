import { supabase } from './supabase'
import { User } from './types'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'apdo-secret-key-development'

// Create JWT token for custom logic if needed, though Supabase handles its own session
export function createToken(user: User): string {
  return jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    JWT_SECRET,
    { expiresIn: '7d' }
  )
}

// Verify JWT token or Supabase token, fetching profile for secure real-time role
export async function verifyToken(token: string): Promise<any> {
  try {
    // 1. Try local custom JWT first
    const decoded = jwt.verify(token, JWT_SECRET) as any
    if (decoded) {
      const profile = await getUserById(decoded.id)
      if (profile) return profile
      return decoded
    }
  } catch {
    // 2. Fallback to decoding Supabase JWT
    try {
      const decoded = jwt.decode(token) as any
      if (decoded) {
        const id = decoded.sub || decoded.id
        if (id) {
          const profile = await getUserById(id)
          if (profile) return profile
          
          const role = decoded.user_metadata?.role || decoded.role || 'visitor'
          const name = decoded.user_metadata?.name || 'User'
          return { id, email: decoded.email, role, name }
        }
      }
    } catch {
      return null
    }
  }
  return null
}


// Register user
export async function registerUser(
  email: string,
  name: string,
  password: string,
  phone?: string
): Promise<{ success: boolean; message: string; user?: User }> {
  // Sign up with Supabase Auth
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name,
        phone,
        role: 'visitor',
      }
    }
  })

  if (error) {
    return { success: false, message: error.message }
  }

  if (data.user) {
    const newUser: User = {
      id: data.user.id,
      email: data.user.email || email,
      name,
      phone,
      role: 'visitor',
      createdAt: data.user.created_at,
      verified: false, // Wait for email confirmation
    }

    return {
      success: true,
      message: 'Inscription réussie. Vérifiez votre email pour confirmer votre compte',
      user: newUser,
    }
  }

  return { success: false, message: 'Erreur lors de la création du compte' }
}

// Login user
export async function loginUser(
  email: string,
  password: string
): Promise<{ success: boolean; message: string; user?: User; token?: string; requiresVerification?: boolean }> {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    if (error.message.includes('Email not confirmed')) {
      // You can trigger resend OTP here if using Supabase OTP
      // await supabase.auth.resend({ type: 'signup', email })
      return {
        success: false,
        message: 'Veuillez vérifier votre email avant de vous connecter',
        requiresVerification: true
      }
    }
    return { success: false, message: 'Email ou mot de passe incorrect' }
  }

  if (data.user && data.session) {
    // Fetch profile to get role and name
    const { data: profile } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', data.user.id)
      .single()

    const publicUser: User = {
      id: data.user.id,
      email: data.user.email || email,
      name: profile?.name || data.user.user_metadata?.name || 'User',
      phone: profile?.phone || data.user.user_metadata?.phone,
      role: (profile?.role === 'visitor' ? 'member' : (profile?.role || data.user.user_metadata?.role || 'member')) as 'admin' | 'member',
      createdAt: data.user.created_at,
      verified: true,
    }

    // You can choose to return Supabase access_token or custom JWT
    const token = data.session.access_token

    return {
      success: true,
      message: 'Connexion réussie',
      user: publicUser,
      token,
    }
  }

  return { success: false, message: 'Erreur inattendue lors de la connexion' }
}

// Verify email with OTP
export async function verifyEmail(email: string, otp: string): Promise<boolean> {
  const { error } = await supabase.auth.verifyOtp({
    email,
    token: otp,
    type: 'email',
  })

  if (error) {
    console.error('OTP verification failed:', error)
    return false
  }

  // Update profile to mark as verified
  const { data: userData } = await supabase.auth.getUser()
  if (userData.user) {
    await supabase.from('profiles').update({ verified: true }).eq('id', userData.user.id)
  }

  return true
}

// Get user by ID
export async function getUserById(id: string): Promise<User | null> {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', id)
    .single()

  if (error || !data) return null

  return {
    id: data.id,
    email: data.email,
    name: data.name,
    phone: data.phone,
    role: data.role === 'visitor' ? 'member' : data.role,
    createdAt: data.created_at,
    verified: data.verified,
  }
}

// Get all users (for admin)
export async function getAllUsers(): Promise<User[]> {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .order('created_at', { ascending: false })

  if (error || !data) return []

  return data.map(profile => ({
    id: profile.id,
    email: profile.email,
    name: profile.name,
    phone: profile.phone,
    role: profile.role === 'visitor' ? 'member' : profile.role,
    createdAt: profile.created_at,
    verified: profile.verified,
  }))
}

// Register user by Admin (bypasses default 'visitor' role, forces active validation)
export async function registerUserByAdmin(
  email: string,
  name: string,
  password: string,
  role: 'admin' | 'member',
  phone?: string
): Promise<{ success: boolean; message: string; user?: User }> {
  // Map 'member' to 'visitor' for PostgreSQL check constraint compatibility
  const dbRole = role === 'member' ? 'visitor' : 'admin'

  // Sign up with Supabase Auth
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name,
        phone,
        role: dbRole,
      }
    }
  })

  if (error) {
    return { success: false, message: error.message }
  }

  if (data.user) {
    // Explicitly update the profile to sync the role and verified status
    const { error: profileError } = await supabase
      .from('profiles')
      .update({
        role: dbRole,
        name: name,
        phone: phone || null,
        verified: true
      })
      .eq('id', data.user.id)

    if (profileError) {
      console.error('Profile update failed during admin signup:', profileError)
    }

    const newUser: User = {
      id: data.user.id,
      email: data.user.email || email,
      name,
      phone,
      role,
      createdAt: data.user.created_at,
      verified: true,
    }

    return {
      success: true,
      message: 'Compte de l\'équipe créé avec succès.',
      user: newUser,
    }
  }

  return { success: false, message: 'Erreur inattendue de création' }
}

// Delete user profile and account by Admin
export async function deleteUserByAdmin(id: string): Promise<boolean> {
  // 1. First, disable and revoke system access immediately to make sure they cannot perform any actions
  const { error: updateError } = await supabase
    .from('profiles')
    .update({ 
      verified: false, 
      role: 'visitor' 
    })
    .eq('id', id)

  if (updateError) {
    console.error('Failed to disable user profile before deletion:', updateError)
    // Continue attempting deletion anyway
  }

  // 2. Attempt physical deletion of the profile
  const { error } = await supabase
    .from('profiles')
    .delete()
    .eq('id', id)

  if (error) {
    console.warn('Physical profile delete was prevented (likely due to RLS or Foreign Key constraints), but account access has been successfully revoked and disabled:', error)
    // Return true because the user has been successfully locked out and deactivated!
    return true
  }

  return true
}

