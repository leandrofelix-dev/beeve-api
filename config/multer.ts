import multer from 'multer'

const storage = multer.diskStorage({
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}.${file.mimetype.split('/')[1]}`)
  },
})

export const sendFile = multer({ storage })
