export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      couples: {
        Row: {
          id: string
          created_at: string
          email: string
          couple_name: string | null
          partner1_name: string | null
          partner2_name: string | null
          bio: string | null
          interests: string[] | null
          avatar_url: string | null
        }
        Insert: {
          id: string
          created_at?: string
          email: string
          couple_name?: string | null
          partner1_name?: string | null
          partner2_name?: string | null
          bio?: string | null
          interests?: string[] | null
          avatar_url?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          email?: string
          couple_name?: string | null
          partner1_name?: string | null
          partner2_name?: string | null
          bio?: string | null
          interests?: string[] | null
          avatar_url?: string | null
        }
      }
    }
  }
} 