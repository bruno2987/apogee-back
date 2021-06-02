const conn = require('./connectDb')
var ObjectId = require('mongodb').ObjectID;
const { DateTime } = require("luxon");

// installer bcrypt ave npm
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

exports.inscription = (req,res,callback) => {
    bcrypt.hash(req.body.password, 10)  // 10 signifie qu'on execute 10 fois l'algorythme de hashage (plus on en execute plus c'est sécure mais plus ça prend du temps: 10 c'est bien!)
        .then( passwordHashed => {
            conn.db.collection('users').insertOne({
                email: req.body.email,
                password: passwordHashed,
            }, function (err, record) {
                if (!err) {res.status(201).json({message: 'utilisateur bien enregistré'})}
                else {res.status(400).json({ error })}
            }) 
        })
        .catch(error => res.status(400).json({ error })); // err =>   quand une fonction flêché ne prend qu'un argument on peut le mettre directement en toute lettre sans paranthèse)   
}

exports.connexion = (req,res,callback) => {
    conn.db.collection('users').findOne({"email": req.body.email}, function(err,datas){
        if (!datas){
            return res.status(401).json({ message: "L'adresse mail n'existe pas" });
        } else {
            bcrypt.compare(req.body.password, datas.password)
            .then ( valid => {
                if(!valid) {
                    return res.status(401).json({message: "mot de passe incorrect"});
                }
                res.status(200).json({
                    message: 'connexion réussie',
                    userId: datas._id,
                    token: jwt.sign(
                        {userId: datas._id},
                        'CleSecreteDencodage',
                        {expiresIn: '12h'}
                    )
                })
            })
        }
    })
}

exports.getAllArticles = (req,res) => {               // .sort({createdDate:1})  =  affiché dans l'ordre croissant de date; si on veut décroissant: on met -1
    AllArticles = conn.db.collection('articles').find().sort({createdDate:-1}).toArray(function (err, datas){
        if(datas){
            return res.status(201).json({articles: datas})
        } else {
            console.log(err)
        }
    })
}

exports.getOneArticle = (req, res) => {
    console.log(req.params.id)
    article = conn.db.collection('articles').findOne({_id: new ObjectId(req.params.id)}, function(err, datas) {
        return res.status(201).json({article: datas})
    })
}

exports.getsixLastArticles = (req,res) => {
    conn.db.collection('articles').find({},{projection:{titre:1}}).limit(4).sort({createdDate:-1}).toArray(function (err, datas){
        if(datas){
            console.log(datas)
            return res.status(201).json({articles:datas})
        } else {
            res.status(400).json({message:err})
        }
    })
}

exports.getFutureEvent = (req,res) => {
    conn.db.collection('evenements').find({dateEvnmt:{$gt: DateTime.now().toISO()}},{'titre':1}).limit(4).sort({createdDate:-1}).toArray(function (err, datas){
        if(datas){
            return res.status(201).json({articles:datas})
        } else {
            res.status(400).json({message:err})
            console.log(err)
        }
    })
}