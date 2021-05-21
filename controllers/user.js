const mysqlconnection = require('../connection');
const bcrypt = require('bcryptjs');
const {validatePassword} = require('../validation/user')
const saltRounds = 10;


exports.hello = (req,res)=>{
    const password = req.body.password
    if(validatePassword(password)){
        res.status(200).send('mtchie matchie')
    }else{
        res.status(400).send('ughh try again')
    }
}

exports.login = (req,res)=>{
    let email= req.body.email;
    let password = req.body.password;
    if(!email || !password){
        res.status(400).send('All fields are required!')
    }
    mysqlconnection.query('SELECT email, password from user WHERE email=?',[email],(err,result,fields)=>{
        if(err) res.status(500).send(err);
        else{
            if(result.length>0){
                let validpass = bcrypt.compareSync(password, result[0].password)
                console.log(result[0].password)
                if(!validpass){
                    res.send({message:'Email or password is incorrect'})
                }else{
                    res.status(200).send({message:'success'})
                }
                
            }else{
                res.send({message : 'email does not exist'})
            }
        }
    })
}

exports.register =   (req,res)=>{
    let firstname = req.body.firstname;
    let lastname = req.body.lastname;
    let email = req.body.email;
    let username= req.body.username;
    let password = req.body.password;
    const newsalt =  bcrypt.genSaltSync(saltRounds);
    const hashedpassword =  bcrypt.hashSync(password,newsalt);

    if(!email || !firstname || !lastname || !email || !password){
        res.status(400).send({message:'All fields are required!'})
    }

    if(email){
        mysqlconnection.query('SELECT email from user where email=?',[email],(err,result)=>{
            if(err) res.status(500).send({message:err})
            else{
                if(result.length>0){
                    res.status(400).send({message:'Email already exists!'})
                }else{
                    mysqlconnection.query('INSERT INTO user(firstname,lastname,username,email,password) values(?,?,?,?,?)',[firstname,lastname,username,email,hashedpassword],(err,result)=>{
                        if(err){ console.log(err); res.send({message:err})}
                        else{
                            console.log('success')
                            res.status(201).send({message:result})
                        }
                
                    })
                }
            }
        })
    }
    
    
}

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


