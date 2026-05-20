import { NextRequest, NextResponse } from 'next/server'
import { getArticleById, updateArticle, deleteArticle } from '@/lib/content'
import { verifyToken } from '@/lib/auth'
import { getSupabaseClientWithToken } from '@/lib/supabase'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const article = await getArticleById(params.id)
    if (!article) {
      return NextResponse.json(
        { success: false, message: 'Article non trouvé' },
        { status: 404 }
      )
    }
    return NextResponse.json({ success: true, article })
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
    const article = await updateArticle(params.id, updates, client)

    if (!article) {
      return NextResponse.json(
        { success: false, message: 'Article non trouvé' },
        { status: 404 }
      )
    }

    return NextResponse.json({ success: true, article })
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
    const deleted = await deleteArticle(params.id, client)
    if (!deleted) {
      return NextResponse.json(
        { success: false, message: 'Article non trouvé' },
        { status: 404 }
      )
    }

    return NextResponse.json({ success: true, message: 'Article supprimé' })
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Erreur serveur' },
      { status: 500 }
    )
  }
}
