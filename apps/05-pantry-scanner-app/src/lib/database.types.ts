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
      pantry_items: {
        Row: {
          id: string
          user_id: string
          barcode: string
          image_url: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          barcode: string
          image_url?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          barcode?: string
          image_url?: string | null
          created_at?: string
        }
      }
    }
  }
} 