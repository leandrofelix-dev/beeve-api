/* eslint-disable @typescript-eslint/no-explicit-any */
import { createClient } from '@supabase/supabase-js'
import { Request } from 'express'

async function uploadToSupabase(req: Request) {
  try {
    const supabaseUrl = process.env.SUPABASE_URL
    const supabaseKey = process.env.SUPABASE_KEY

    if (!supabaseUrl || !supabaseKey)
      throw new Error('Missing supabaseUrl or supabaseKey')

    const { file } = req
    if (!file) throw new Error('No file found.')

    console.log('==============', file.buffer, '++++++++++++++++++')

    const { buffer, mimetype } = file
    if (!buffer) throw new Error('No buffer')
    if (!mimetype) throw new Error('No mimetype')

    const supabase = createClient(supabaseUrl, supabaseKey)

    const uniqueFileName = `${Date.now()}.${file.mimetype.split('/')[1]}`
    const filePathInSupabase = uniqueFileName

    const uploadedImage = await supabase.storage
      .from('eventCovers')
      .upload(filePathInSupabase, buffer, {
        contentType: mimetype,
      })

    console.log(uploadedImage)
  } catch (error: any) {
    console.log(error.message)
  }
}

export { uploadToSupabase }
