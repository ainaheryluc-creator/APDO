import { supabase } from './supabase'
import { NewsArticle, MediaItem, TeamMember } from './types'

// Articles
export async function getArticles(status?: 'draft' | 'published'): Promise<NewsArticle[]> {
  let query = supabase.from('articles').select('*').order('created_at', { ascending: false })
  
  if (status) {
    query = query.eq('status', status)
  }
  
  const { data, error } = await query
  if (error) {
    console.error('Error fetching articles:', error)
    return []
  }
  
  return data.map(mapDbToArticle)
}

export async function getArticleById(id: string): Promise<NewsArticle | null> {
  const { data, error } = await supabase.from('articles').select('*').eq('id', id).single()
  
  if (error || !data) {
    console.error(`Error fetching article ${id}:`, error)
    return null
  }
  
  return mapDbToArticle(data)
}

export async function createArticle(
  title: string,
  content: string,
  author: string,
  category: string,
  status: 'draft' | 'published' = 'draft',
  client = supabase
): Promise<NewsArticle | null> {
  const { data, error } = await client
    .from('articles')
    .insert([
      { title, content, author, category, status }
    ])
    .select()
    .single()

  if (error || !data) {
    console.error('Error creating article:', error)
    return null
  }

  return mapDbToArticle(data)
}

export async function updateArticle(
  id: string,
  updates: Partial<NewsArticle>,
  client = supabase
): Promise<NewsArticle | null> {
  const dbUpdates: any = { ...updates, updated_at: new Date().toISOString() }
  // Remove mapped fields if present
  if (dbUpdates.createdAt) delete dbUpdates.createdAt
  if (dbUpdates.updatedAt) delete dbUpdates.updatedAt
  
  const { data, error } = await client
    .from('articles')
    .update(dbUpdates)
    .eq('id', id)
    .select()
    .single()

  if (error || !data) {
    console.error(`Error updating article ${id}:`, error)
    return null
  }

  return mapDbToArticle(data)
}

export async function deleteArticle(id: string, client = supabase): Promise<boolean> {
  const { error } = await client.from('articles').delete().eq('id', id)
  
  if (error) {
    console.error(`Error deleting article ${id}:`, error)
    return false
  }
  
  return true
}

// Media Items
export async function getMediaItems(status?: 'draft' | 'published'): Promise<MediaItem[]> {
  let query = supabase.from('media_items').select('*').order('created_at', { ascending: false })
  
  if (status) {
    query = query.eq('status', status)
  }
  
  const { data, error } = await query
  if (error) {
    console.error('Error fetching media:', error)
    return []
  }
  
  return data.map(mapDbToMedia)
}

export async function getMediaById(id: string): Promise<MediaItem | null> {
  const { data, error } = await supabase.from('media_items').select('*').eq('id', id).single()
  
  if (error || !data) {
    console.error(`Error fetching media ${id}:`, error)
    return null
  }
  
  return mapDbToMedia(data)
}

export async function createMedia(
  title: string,
  content: string,
  type: 'audio' | 'announcement',
  status: 'draft' | 'published' = 'draft',
  url?: string,
  client = supabase
): Promise<MediaItem | null> {
  const { data, error } = await client
    .from('media_items')
    .insert([
      { title, content, type, status, url }
    ])
    .select()
    .single()

  if (error || !data) {
    console.error('Error creating media:', error)
    return null
  }

  return mapDbToMedia(data)
}

export async function updateMedia(
  id: string,
  updates: Partial<MediaItem>,
  client = supabase
): Promise<MediaItem | null> {
  const dbUpdates: any = { ...updates, updated_at: new Date().toISOString() }
  if (dbUpdates.createdAt) delete dbUpdates.createdAt
  if (dbUpdates.updatedAt) delete dbUpdates.updatedAt
  
  const { data, error } = await client
    .from('media_items')
    .update(dbUpdates)
    .eq('id', id)
    .select()
    .single()

  if (error || !data) {
    console.error(`Error updating media ${id}:`, error)
    return null
  }

  return mapDbToMedia(data)
}

export async function deleteMedia(id: string, client = supabase): Promise<boolean> {
  const { error } = await client.from('media_items').delete().eq('id', id)
  
  if (error) {
    console.error(`Error deleting media ${id}:`, error)
    return false
  }
  
  return true
}

// Team Members
export async function getTeamMembers(): Promise<TeamMember[]> {
  const { data, error } = await supabase.from('team_members').select('*').order('created_at', { ascending: false })
  
  if (error) {
    console.error('Error fetching team members:', error)
    return []
  }
  
  return data.map(mapDbToTeamMember)
}

export async function getTeamMemberById(id: string): Promise<TeamMember | null> {
  const { data, error } = await supabase.from('team_members').select('*').eq('id', id).single()
  
  if (error || !data) {
    console.error(`Error fetching team member ${id}:`, error)
    return null
  }
  
  return mapDbToTeamMember(data)
}

export async function createTeamMember(
  name: string,
  role: string,
  bio: string,
  image?: string,
  client = supabase
): Promise<TeamMember | null> {
  const { data, error } = await client
    .from('team_members')
    .insert([
      { name, role, bio, image }
    ])
    .select()
    .single()

  if (error || !data) {
    console.error('Error creating team member:', error)
    return null
  }

  return mapDbToTeamMember(data)
}

export async function deleteTeamMember(id: string, client = supabase): Promise<boolean> {
  const { error } = await client.from('team_members').delete().eq('id', id)
  
  if (error) {
    console.error(`Error deleting team member ${id}:`, error)
    return false
  }
  
  return true
}

export async function updateTeamMember(
  id: string,
  updates: Partial<TeamMember>,
  client = supabase
): Promise<TeamMember | null> {
  const dbUpdates: any = { ...updates }
  // Remove fields that shouldn't be directly updated or need snake_case conversion if any
  if (dbUpdates.id) delete dbUpdates.id
  if (dbUpdates.createdAt) delete dbUpdates.createdAt
  
  const { data, error } = await client
    .from('team_members')
    .update(dbUpdates)
    .eq('id', id)
    .select()
    .single()

  if (error || !data) {
    console.error(`Error updating team member ${id}:`, error)
    return null
  }

  return mapDbToTeamMember(data)
}

// Mappers to convert DB snake_case to camelCase types
function mapDbToArticle(db: any): NewsArticle {
  return {
    id: db.id,
    title: db.title,
    content: db.content,
    author: db.author,
    category: db.category,
    status: db.status,
    createdAt: db.created_at,
    updatedAt: db.updated_at,
  }
}

function mapDbToMedia(db: any): MediaItem {
  return {
    id: db.id,
    title: db.title,
    type: db.type,
    url: db.url,
    content: db.content,
    status: db.status,
    createdAt: db.created_at,
    updatedAt: db.updated_at,
  }
}

function mapDbToTeamMember(db: any): TeamMember {
  return {
    id: db.id,
    name: db.name,
    role: db.role,
    bio: db.bio,
    image: db.image,
    createdAt: db.created_at,
  }
}
