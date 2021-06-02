const multer = require('multer');
const path = require('path')

// Configuration de Multer pour l'upload d'images
const storage = multer.diskStorage({
    destination: (req,file,cb) => {
        imgFolder = path.join(__dirname,'../','../','frontend/apogee/public/imgArticles');
        cb(null,imgFolder)
    },
    filename: (req,file,cb) => {
        console.log(file);
        nameImg= 'imgArt-' + Date.now()+ path.extname(file.originalname);
        cb(null, nameImg);
    }
  })
  
  const upload = multer({ storage: storage})

  module.exports = upload;