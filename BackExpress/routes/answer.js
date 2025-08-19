const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth')
const answer = require('../controllers/answer')


router.post('/', answer.getAnswer);

module.exports = router;