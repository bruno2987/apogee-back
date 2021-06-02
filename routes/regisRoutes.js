// Pour les routes '/api/articles'
const express = require('express');
const testRegisCtrl = require('../controllers/testRegisCtrl');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/testRegisLog', auth, testRegisCtrl.afficheLog);
router.post('/recordRegis',testRegisCtrl.saveToDb);

module.exports = router;