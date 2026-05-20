import { NextRequest, NextResponse } from 'next/server'
import { deleteMedia, updateMedia, getMediaById } from '@/lib/content'
import { verifyToken } from '@/lib/auth'
import { getSupabaseClientWithToken } from '@/lib/supabase'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const item = await getMediaById(params.id)

    if (item) {
      return NextResponse.json({ success: true, item })
    } else {
      return NextResponse.json(
        { success: false, message: 'Média non trouvé' },
        { status: 404 }
      )
    }
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Erreur serveur' },
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
    if (!user || (user.role !== 'admin' && user.role !== 'member')) {
      return NextResponse.json(
        { success: false, message: 'Accès refusé' },
        { status: 403 }
      )
    }

    const updates = await request.json()
    const client = getSupabaseClientWithToken(token)
    const updated = await updateMedia(params.id, updates, client)

    if (updated) {
      return NextResponse.json({ success: true, item: updated })
    } else {
      return NextResponse.json(
        { success: false, message: 'Média non trouvé' },
        { status: 404 }
      )
    }
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Erreur serveur' },
      { status: 500 }
    )
  }
}

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
    if (!user || (user.role !== 'admin' && user.role !== 'member')) {
      return NextResponse.json(
        { success: false, message: 'Accès refusé' },
        { status: 403 }
      )
    }

    const client = getSupabaseClientWithToken(token)
    const success = await deleteMedia(params.id, client)

    if (success) {
      return NextResponse.json({ success: true, message: 'Média supprimé' })
    } else {
      return NextResponse.json(
        { success: false, message: 'Média non trouvé' },
        { status: 404 }
      )
    }
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Erreur serveur' },
      { status: 500 }
    )
  }
}
