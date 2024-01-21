/* eslint-disable @typescript-eslint/no-explicit-any */
import { createClient } from '@supabase/supabase-js'
import { Request, Response, NextFunction } from 'express'
import fs from 'fs'
import sharp from 'sharp'
import { errorMessagesPTBR } from '../../../_shared/errors-messages'

async function uploadToSupabase(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const supabaseUrl = process.env.SUPABASE_URL
    const supabaseKey = process.env.SUPABASE_KEY

    if (!supabaseUrl || !supabaseKey)
      throw new Error(errorMessagesPTBR['supa/MISSING_ENV_VARS'])

    const { file } = req
    if (!file) throw new Error(errorMessagesPTBR['supa/MISSING_FILE'])

    const { mimetype, path } = file
    const buffer = fs.readFileSync(path)

    const optimizedImageOptions = { width: 480, height: 270 }

    const optimizedBuffer = await sharp(buffer)
      .resize(optimizedImageOptions)
      .toFormat('png')
      .toBuffer()

    const supabase = createClient(supabaseUrl, supabaseKey)

    const uniqueFileName = `${Date.now()}.${file.mimetype.split('/')[1]}`
    const filePathInSupabase = uniqueFileName

    const uploadedImage = await supabase.storage
      .from('eventCovers')
      .upload(filePathInSupabase, optimizedBuffer, {
        contentType: mimetype,
      })

    if (uploadedImage.error)
      throw new Error(
        `${errorMessagesPTBR['supa/UPLOAD_ERROR']} ${uploadedImage.error.message}`,
      )

    const { data } = supabase.storage
      .from('eventCovers')
      .getPublicUrl(uploadedImage.data?.path)

    if (!data || !data.publicUrl) {
      throw new Error(errorMessagesPTBR['supa/MISSING_FILE_URL'])
    }

    const supabaseUpload = data
    req.body.coverUrl = supabaseUpload.publicUrl
    next()
  } catch (error: any) {
    console.error(error.message)
    res.status(500).json({
      error: errorMessagesPTBR['supa/UPLOAD_ERROR'],
      details: error.message,
    })
  }
}

export { uploadToSupabase }
