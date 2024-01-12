import dotenv from 'dotenv'
import { createClient } from '@supabase/supabase-js'
import { errorMessagesPTBR } from '../_shared/errors-messages'

dotenv.config()

const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_KEY
const supabaseEmail = process.env.SUPABASE_EMAIL
const supabasePassword = process.env.SUPABASE_PASSWORD

if (!supabaseUrl || !supabaseKey || !supabaseEmail || !supabasePassword)
  throw new Error(errorMessagesPTBR['supa/INVALID_CREDENTIALS'])

const supabase = createClient(supabaseUrl, supabaseKey)
const connectToSupabase = async () => {
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

export { supabase, connectToSupabase }
