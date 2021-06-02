const conn = require('./connectDb')

exports.afficheLog = (req,res,callback) => {
    callback(
        res.json({message:'Confirmation du server: Régis est un con'})
    )
}

exports.saveToDb = (req,res) => {
    conn.db.collection('regis').insertOne({
        name: req.body.name,
        lasName: req.body.lastName
    },function (err, record){
        if (!err) {res.status(201).json({message: 'nouveau Régis bien enregistré'})}
        else {res.status(400).json({ error })}
    })
}