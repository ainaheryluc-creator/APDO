import { NextRequest, NextResponse } from 'next/server'
import { getMediaItems, createMedia } from '@/lib/content'
import { verifyToken } from '@/lib/auth'
import { getSupabaseClientWithToken } from '@/lib/supabase'

export async function GET() {
  try {
    const items = await getMediaItems()
    return NextResponse.json({ success: true, items })
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Erreur serveur' }, { status: 500 })
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
    if (!user || (user.role !== 'admin' && user.role !== 'member')) {
      return NextResponse.json(
        { success: false, message: 'Accès refusé' },
        { status: 403 }
      )
    }

    const { title, content, type, status, url } = await request.json()

    if (!title || !content || !type) {
      return NextResponse.json(
        { success: false, message: 'Titre, contenu et type requis' },
        { status: 400 }
      )
    }

    const client = getSupabaseClientWithToken(token)
    const newItem = await createMedia(title, content, type, status, url, client)

    if (!newItem) {
      return NextResponse.json({ success: false, message: 'Erreur lors de la création' }, { status: 500 })
    }

    return NextResponse.json({ success: true, item: newItem })
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Erreur serveur' }, { status: 500 })
  }
}
