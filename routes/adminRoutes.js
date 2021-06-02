const express = require('express');

const newArticleCtrl = require('../controllers/newArticleCtrl');
const usersCtrl = require('../controllers/usersCtrl');

// importation du middleware d'authentification à appliquer à toutes les routes admin
const auth = require('../middleware/auth');

const upload = require('../middleware/multerUpload')

const router = express.Router();

router.post('/inscription',auth, usersCtrl.inscription);
router.post('/connexion', usersCtrl.connexion)
router.post('/articles/uploadImg', upload.single('file'),newArticleCtrl.saveArticleImg);
router.post('/articles/recordArticle',auth, newArticleCtrl.recordArticle);
router.post('/articles/deleteArticleImg', newArticleCtrl.deleteImg);

module.exports = router;