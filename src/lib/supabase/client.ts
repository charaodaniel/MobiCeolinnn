import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  // A função createBrowserClient é usada para criar um cliente Supabase
  // que pode ser usado de forma segura tanto no lado do cliente (navegador)
  // quanto no servidor em Server Components e Server Actions.
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
