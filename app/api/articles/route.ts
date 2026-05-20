import { NextRequest, NextResponse } from 'next/server'
import { getArticles, createArticle } from '@/lib/content'
import { verifyToken } from '@/lib/auth'

export async function GET(request: NextRequest) {
  try {
    const articles = await getArticles('published')
    return NextResponse.json({ success: true, articles })
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Erreur serveur' },
      { status: 500 }
    )
  }
}

import { getSupabaseClientWithToken } from '@/lib/supabase'

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

    // This may need to be updated to use Supabase getUser if using Supabase tokens
    const user = await verifyToken(token)
    if (!user || user.role !== 'admin') {
      return NextResponse.json(
        { success: false, message: 'Accès refusé' },
        { status: 403 }
      )
    }

    const { title, content, category, status } = await request.json()

    if (!title || !content) {
      return NextResponse.json(
        { success: false, message: 'Titre et contenu requis' },
        { status: 400 }
      )
    }

    const client = getSupabaseClientWithToken(token)
    const article = await createArticle(title, content, user.email || 'Admin', category || 'news', status || 'draft', client)
    return NextResponse.json({ success: true, article })
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Erreur serveur' },
      { status: 500 }
    )
  }
}
