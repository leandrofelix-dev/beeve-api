import { Request, Response, NextFunction } from 'express'

import admin from 'firebase-admin'

const serviceAccount = require('../../config/firebase.json')
const bucketUrl = process.env.BUCKET_URL

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: bucketUrl,
})

const bucket = admin.storage().bucket()

export const uploadImage = (req: Request, res: Response, next: NextFunction) => {
  if (!req.file) {
    return res.status(400).json({ error: 'no file uploaded' }), next()
  }
  const image = req.file
  const fileName = `${Date.now()}.${image.originalname.split('.').pop()}`
  const file = bucket.file(`/covers/${fileName}`)

  const stream = file.createWriteStream({
    metadata: {
      contentType: image.mimetype,
    },
  })

  stream
    .on('error', (err) => {
      console.log(err)
      res.status(500).json({ error: 'error uploading file' })
    })
    .on('finish', async () => {
      await file.makePublic()
      req.body.coverImage = `https://storage.googleapis.com/${bucketUrl}/${fileName}`
      console.log(req.body.coverImage)
      next()
    })
    .end(image.buffer)

}
