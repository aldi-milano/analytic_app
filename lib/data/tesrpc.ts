import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_PROJECT_ID!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function testFetch() {
  console.log('Fetching RPC dashboard_summary...')
  
  const { data, error } = await supabase.rpc('dashboard_summary', {
    filter_range: 'minggu_ini',
  })

  if (error) {
    console.error('❌ Fetch Gagal:', error.message)
  } else {
    console.log('✅ Fetch Berhasil! Data:', data)
  }
}

testFetch()