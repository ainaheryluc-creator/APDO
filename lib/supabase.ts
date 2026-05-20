import { createClient } from '@supabase/supabase-js'

const supabaseUrl ="https://vbyklhlhzewftbkdnjfa.supabase.co"
const supabaseAnonKey = "sb_publishable_PRV2Yhi-LuFnEmzo2_rAUw_HKw-uV4e"

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Create a request-specific Supabase client that forwards the user's Bearer token
export function getSupabaseClientWithToken(token: string) {
  return createClient(supabaseUrl, supabaseAnonKey, {
    global: {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  })
}
