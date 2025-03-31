// Mock Supabase client that doesn't connect to any real backend

// Types for our database tables
export type Couple = {
  id: string;
  created_at?: string;
  email?: string;
  couple_name: string;
  partner1_name: string;
  partner2_name: string;
  bio?: string | null;
  interests?: string[];
  avatar_url?: string | null;
};

// Mock Supabase client with fake methods
export const supabase = {
  auth: {
    signUp: async () => ({
      data: { 
        user: { id: `user-${Date.now()}` },
        session: null 
      },
      error: null
    }),
    signInWithPassword: async () => ({
      data: { 
        user: { id: `user-${Date.now()}` },
        session: { access_token: 'fake-token' } 
      },
      error: null
    }),
    signOut: async () => ({ error: null }),
    getSession: async () => ({
      data: { 
        session: {
          user: { id: `user-${Date.now()}` }
        }
      },
      error: null
    }),
    onAuthStateChange: () => ({
      data: {
        subscription: {
          unsubscribe: () => {}
        }
      }
    })
  },
  from: () => ({
    select: () => ({
      eq: () => ({
        single: async () => ({
          data: null,
          error: null
        }),
        maybeSingle: async () => ({
          data: null,
          error: null
        })
      }),
      neq: () => ({
        limit: () => ({
          data: [],
          error: null
        })
      })
    }),
    insert: async () => ({
      data: { id: `record-${Date.now()}` },
      error: null
    })
  }),
  rpc: async () => ({
    data: { success: true },
    error: null
  })
};

// Mock admin client that does nothing
export const createAdminClient = () => null; 