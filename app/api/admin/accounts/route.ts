import { NextRequest, NextResponse } from 'next/server'
import { getAllUsers, registerUserByAdmin } from '@/lib/auth'
import { verifyToken } from '@/lib/auth'

export async function GET(request: NextRequest) {
  try {
    // Verify admin token
    const token = request.headers.get('Authorization')?.replace('Bearer ', '')
    if (!token) {
      return NextResponse.json(
        { success: false, message: 'Non autorisé' },
        { status: 401 }
      )
    }

    const admin = await verifyToken(token)
    if (!admin || admin.role !== 'admin') {
      return NextResponse.json(
        { success: false, message: 'Accès refusé' },
        { status: 403 }
      )
    }

    const users = await getAllUsers()
    return NextResponse.json({ success: true, users })
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Erreur serveur lors de la récupération des comptes' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    // Verify admin token
    const token = request.headers.get('Authorization')?.replace('Bearer ', '')
    if (!token) {
      return NextResponse.json(
        { success: false, message: 'Non autorisé' },
        { status: 401 }
      )
    }

    const admin = await verifyToken(token)
    if (!admin || admin.role !== 'admin') {
      return NextResponse.json(
        { success: false, message: 'Accès refusé' },
        { status: 403 }
      )
    }

    const { email, name, password, role, phone } = await request.json()

    if (!email || !name || !password || !role) {
      return NextResponse.json(
        { success: false, message: 'Tous les champs obligatoires (nom, email, mot de passe, rôle) doivent être renseignés' },
        { status: 400 }
      )
    }

    if (role !== 'admin' && role !== 'member') {
      return NextResponse.json(
        { success: false, message: 'Rôle invalide' },
        { status: 400 }
      )
    }

    const result = await registerUserByAdmin(email, name, password, role, phone)
    if (!result.success) {
      return NextResponse.json(result, { status: 400 })
    }

    return NextResponse.json(result)
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Erreur serveur lors de la création du compte' },
      { status: 500 }
    )
  }
}
