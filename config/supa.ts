import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

dotenv.config()

const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_KEY
const supabaseEmail = process.env.SUPABASE_EMAIL
const supabasePassword = process.env.SUPABASE_PASSWORD

if (!supabaseUrl) throw new Error('No Supabase URL')
if (!supabaseKey) throw new Error('No Supabase KEY')
if (!supabaseEmail) throw new Error('No Supabase Email')
if (!supabasePassword) throw new Error('No Supabase Password')

export const supabase = createClient(supabaseUrl, supabaseKey)

export const connectToSupabase = async () => {
  try {
    await supabase.auth.signInWithPassword({
      email: supabaseEmail,
      password: supabasePassword,
    })
    console.info('Conectado ao Supabase 📂')
  } catch (error) {
    console.error(error)
  }
}
