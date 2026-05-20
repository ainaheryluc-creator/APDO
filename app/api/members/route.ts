import { NextRequest, NextResponse } from 'next/server'
import { getTeamMembers, createTeamMember } from '@/lib/content'
import { verifyToken } from '@/lib/auth'
import { getSupabaseClientWithToken } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  try {
    const members = await getTeamMembers()
    return NextResponse.json({ success: true, members })
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Erreur serveur lors de la récupération des membres' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    // Check auth
    const token = request.headers.get('Authorization')?.replace('Bearer ', '')
    if (!token) {
      return NextResponse.json(
        { success: false, message: 'Non autorisé' },
        { status: 401 }
      )
    }

    const user = await verifyToken(token)
    if (!user || user.role !== 'admin') {
      return NextResponse.json(
        { success: false, message: 'Accès refusé' },
        { status: 403 }
      )
    }

    const { name, role, bio, image } = await request.json()

    if (!name || !role) {
      return NextResponse.json(
        { success: false, message: 'Nom et Rôle requis' },
        { status: 400 }
      )
    }

    const client = getSupabaseClientWithToken(token)
    const member = await createTeamMember(name, role, bio || '', image || '', client)
    if (!member) {
      return NextResponse.json(
        { success: false, message: 'Erreur lors de la création du membre' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true, member })
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Erreur serveur' },
      { status: 500 }
    )
  }
}
