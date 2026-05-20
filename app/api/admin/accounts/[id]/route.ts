import { NextRequest, NextResponse } from 'next/server'
import { deleteUserByAdmin } from '@/lib/auth'
import { verifyToken } from '@/lib/auth'

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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

    // Do not allow deleting yourself!
    if (admin.id === params.id) {
      return NextResponse.json(
        { success: false, message: 'Vous ne pouvez pas supprimer votre propre compte administrateur courant.' },
        { status: 400 }
      )
    }

    const deleted = await deleteUserByAdmin(params.id)
    if (!deleted) {
      return NextResponse.json(
        { success: false, message: 'Erreur lors de la suppression' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true, message: 'Compte collaborateur révoqué avec succès' })
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Erreur serveur lors de la révocation du compte' },
      { status: 500 }
    )
  }
}
