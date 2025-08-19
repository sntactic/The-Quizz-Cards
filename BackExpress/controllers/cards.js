const Card = require('../models/cards');

formCard = (cards) => {
    let newList = [];
    for(let card of cards) {
        const newcard = {
            "id" : card._id,
            "domaine" : card.domaine,
            "categorie" : card.categorie,
            "question" : card.question,
            "reponse" : card.reponse,
            "explication" : card.explication,
            "publication" : card.publication,
            "date" : card.date,
            "userID" : card.userID
        }
        newList.push(newcard)
    }
    return newList;
}


exports.createCard = (req, res, next) => {
    console.log(req.body);
    const card = new Card({
        ...req.body
    });
    console.log(card);
    card.save()
        .then(() => {
            res.status(201).json({message : "QuizzCard enrigistrer dans la base"});
            console.log('nouvelle quizzcard enrigistree');
        })
        .catch(error => res.status(400).json({error}));
};

exports.sendCards = (qes, res, next) =>{
    Card.find({publication : "publique"})
        .then(cards =>{
            res.status(200).json(formCard(cards));
            console.log('liste des quizzcard envoyee.')
        })
        .catch(error => res.status(400).json({error}));
};

exports.sendMyCard = (req, res, next) => { //not used
    Card.find({userID : req.params.id})
    .then(cards => res.status(200).json(formCard(cards)))
    .catch(error => res.status(400).json({error}));
};

exports.deleteCard = (req, res, next) =>{
    console.log(req.params.id);
    Card.deleteOne({_id : req.params.id})
        .then(() => {
            res.status(201).json({message : "QuizzCard supprimee de la base"});
            console.log('une quizzcard a ete supprimee');
        })
        .catch(error => res.status(400).json({error}));
};

exports.updateCard = (req, res, next) =>{
    const id = req.body.id;
    delete req.body.id;
    Card.updateOne({_id : id}, {...req.body , _id : id })
        .then(() => {
            res.status(201).json({message : "QuizzCard modifiee dans la base"});
            console.log('une quizzcard a ete modifiee');
        })
        .catch(error => res.status(400).json({error}));

    console.log(req.body)
};