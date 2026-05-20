import { NextRequest, NextResponse } from 'next/server'
import { loginUser } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: 'Email et mot de passe requis' },
        { status: 400 }
      )
    }

    const result = await loginUser(email, password)
    return NextResponse.json(result)
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Erreur serveur' },
      { status: 500 }
    )
  }
}
