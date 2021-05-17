const mysqlconnection = require('../connection')

exports.getUsers =  (req,res)=>{
    mysqlconnection.query('SELECT * FROM user;',(err,rows,fields)=>{
        
        if(err) console.log("error is " + err)
        if(!err) res.send(rows)
    })
}

exports.addUser = (req,res)=>{
    let firstname = req.body.firstname;
    let email = req.body.email;
    let password = req.body.password
    mysqlconnection.query('INSERT INTO user(firstname,email,password) values(?,?,?)', [firstname,email,password],(err,rows,fields)=>{
        if(err) console.log("error is " + err)
        if(!err) res.status(201).send(rows)
    })
}

exports.deleteUser = (req,res)=>{
    let user_id = req.params.id
    mysqlconnection.query('DELETE FROM user WHERE id=?',[user_id],(err,rows,fields)=>{
        if(err) res.status(500).send(err)
        else res.status(200).send(rows)
    })
}

exports.updateUser=(req,res)=>{
    let firstname = req.body.firstname;
    let email = req.body.email;
    let password = req.body.password;
    let user_id= req.params.id
    mysqlconnection.query('UPDATE user SET firstname = ? ,email=?, password=? WHERE id=?',[firstname,email,password,user_id],(err,rows,fields)=>{
        if(err) res.status(500).send(err)
        else res.status(200).send(rows)
    })
}