const express = require('express');
const usersCtrl = require('../controllers/usersCtrl');

const router = express.Router();

router.post('/connexion', usersCtrl.connexion)
router.get('/getAllArticles', usersCtrl.getAllArticles)
router.get('/getOneArticle/:id', usersCtrl.getOneArticle)
router.get('/getsixLastArticles',usersCtrl.getsixLastArticles)
router.get('/getFutureEvent',usersCtrl.getFutureEvent)

module.exports = router;