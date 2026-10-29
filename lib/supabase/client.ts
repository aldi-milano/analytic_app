import { createBrowserClient } from "@supabase/ssr";

export function createSupabaseClient() {
    return createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_PROJECT_ID!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    )
}