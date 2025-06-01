import cloudinary from 'cloudinary'

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'drdztqgcx',
  api_key: process.env.CLOUDINARY_API_KEY || '154722448145586',
  api_secret:
    process.env.CLOUDINARY_API_SECRET || 'XWZsdyqZA7hA9KhD8OtyWUujkdo',
})


export default cloudinary
