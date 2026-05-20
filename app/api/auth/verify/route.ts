import { NextRequest, NextResponse } from 'next/server'
import { verifyEmail, getUserById, createToken } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const { email, otp } = await request.json()

    if (!email || !otp) {
      return NextResponse.json(
        { success: false, message: 'Email et OTP requis' },
        { status: 400 }
      )
    }

    const isVerified = verifyEmail(email, otp)

    if (!isVerified) {
      return NextResponse.json(
        { success: false, message: 'Code de vérification invalide' },
        { status: 400 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Email vérifié avec succès',
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Erreur serveur' },
      { status: 500 }
    )
  }
}
