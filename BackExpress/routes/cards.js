const express = require('express');
const router = express.Router();

const cardsCtrl = require('../controllers/cards')
const auth = require('../middleware/auth')


//Recuperation de donnees
router.get('/', cardsCtrl.sendCards);

//Recuperation cartes personnelles
router.get('/:id', auth, cardsCtrl.sendMyCard);

//Creation de donnees
router.post('/', auth, cardsCtrl.createCard);

// Modification de donnees
router.put('/', auth, cardsCtrl.updateCard);

//Supression  de donnees
router.delete('/:id',auth, cardsCtrl.deleteCard);


module.exports = router;