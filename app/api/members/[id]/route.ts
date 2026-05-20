import { NextRequest, NextResponse } from 'next/server'
import { deleteTeamMember, updateTeamMember } from '@/lib/content'
import { verifyToken } from '@/lib/auth'
import { getSupabaseClientWithToken } from '@/lib/supabase'

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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

    const client = getSupabaseClientWithToken(token)
    const deleted = await deleteTeamMember(params.id, client)
    if (!deleted) {
      return NextResponse.json(
        { success: false, message: 'Membre non trouvé ou déjà supprimé' },
        { status: 404 }
      )
    }

    return NextResponse.json({ success: true, message: 'Membre supprimé avec succès' })
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Erreur serveur lors de la suppression du membre' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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

    const updates = await request.json()
    const client = getSupabaseClientWithToken(token)
    const updated = await updateTeamMember(params.id, updates, client)
    if (!updated) {
      return NextResponse.json(
        { success: false, message: 'Membre non trouvé ou erreur de mise à jour' },
        { status: 404 }
      )
    }

    return NextResponse.json({ success: true, member: updated })
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Erreur serveur lors de la mise à jour du membre' },
      { status: 500 }
    )
  }
}
