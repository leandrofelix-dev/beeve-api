/* eslint-disable @typescript-eslint/no-var-requires */
import { Request, Response, NextFunction } from 'express'

import admin from 'firebase-admin'

const serviceAccount = require('../../firebase.json')
const bucketUrl = process.env.BUCKET_URL

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: bucketUrl,
})

const bucket = admin.storage().bucket()

export function uploadImage(req: Request, res: Response, next: NextFunction) {
  if (!req.file) {
    return res.status(400).json({ error: 'no file uploaded' }), next()
  }
  const image = req.file
  const fileName = `${Date.now()}.${image.originalname.split('.').pop()}`
  const file = bucket.file(fileName)

  const stream = file.createWriteStream({
    metadata: {
      contentType: image.mimetype,
    },
  })

  stream.on('error', (err) => {
    console.error(err)
    res.status(500).json({ error: 'error uploading file' })
  })
  stream.on('finish', async () => {
    await file.makePublic()

    const firebaseUrl = `https://storage.googleapis.com/${bucketUrl}/${fileName}`

    req.body.coverUrl = firebaseUrl
    next()
  })
  stream.end(image.buffer)
}

export default uploadImage
