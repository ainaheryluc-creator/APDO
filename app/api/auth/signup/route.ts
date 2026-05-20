import { NextRequest, NextResponse } from 'next/server'
import { registerUser } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const { email, name, password, phone } = await request.json()

    if (!email || !name || !password) {
      return NextResponse.json(
        { success: false, message: 'Tous les champs obligatoires doivent être remplis' },
        { status: 400 }
      )
    }

    const result = await registerUser(email, name, password, phone)
    return NextResponse.json(result)
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Erreur serveur' },
      { status: 500 }
    )
  }
}
