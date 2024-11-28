const express = require('express');
const { signinController } = require('../controllers/signinController.js'); 
const router = express.Router();
router.post('/signin', signinController);
module.exports = router;
