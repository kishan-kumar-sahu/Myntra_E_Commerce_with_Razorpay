// import multer from "multer"

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "uploads/")
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + "-" + file.originalname)
//   }
// })

// const upload = multer({ storage })

// export default upload


////////




import multer from "multer"
import { CloudinaryStorage } from "multer-storage-cloudinary"


import cloudinary from "../Config/cloudinary.js"

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder:"Myntra_product_image",
     allowed_formats:["jpg", "png", "jpeg"]
  }
})

const upload = multer({ storage })

export default upload;



 