const mysqlconnection = require('../connection');
const bcrypt = require('bcryptjs');
const {validatePassword} = require('../validation/user')
const saltRounds = 10;
const userService  = require('../services/user')

exports.hello = (req,res)=>{
    const password = req.body.password
    if(validatePassword(password)){
        return res.status(200).send('mtchie matchie')
    }else{
        return res.status(400).send('ughh try again')
    }
}

exports.login = async (req,res)=>{
    let {email, password}= req.body;

    if(!email || !password){
        return res.status(400).send('All fields are required!')
    }

    try{
        const rows = await userService.getUser(email)
        if(rows.length<=0) return res.status(400).send({message: 'No email Found'})

        else{let validpass = await bcrypt.compareSync(password, rows[0].password)
            if(!validpass){
                return res.send({message:'Email or password is incorrect'})
            }
            return res.status(200).send(rows)
        }
    }catch(err){
        return res.status(500).send({error: err})
    }
    
}

exports.register =   async (req,res)=>{
    const {firstname, lastname, email, username, password} = req.body
    const newsalt =  bcrypt.genSaltSync(saltRounds);

    if(!email || !firstname || !lastname || !email || !password){
        return res.status(400).send({message:'All fields are required!'})
        
    }
   
    try{
        const hashedpassword =  bcrypt.hashSync(password,newsalt);
        const rows= await userService.getUserByEmail(email)
        if(rows.length<=0){
            if(!validatePassword(password)) return res.status(400).send({message : "Password has to be of at least length 6 and have at least one number, one small letter and one arrow letter"})
            const insertId = await userService.addUser(firstname,lastname,email,username,hashedpassword)
            return res.status(201).send({user:"user created"}) 
        }
        else{
            return res.status(400).send({message:'Email already exists!'})
        }   
    }catch(err){
        return res.status(500).send({message:err})
    }
    
}

exports.getUsers =  async (req,res)=>{
    try{
        const rows= await userService.getUsers()
        if(rows.length>0) return res.status(200).send(rows)
    }catch(err){
        return res.status(500).send(err)
    }
    
}


exports.deleteUser = async (req,res)=>{
    let user_id = req.params.id
    try{
        const id = await userService.deleteUser(user_id)
        return res.status(200).send({message:"user deleted"})
        
    }catch(err){
        return res.status(500).send(err)
        
    }
}

exports.updateUser=(req,res)=>{
    let {firstname, lastname, email,username, password} = req.body;
    let user_id= req.params.id
    try{
        const rows= userService.updateUser(firstname, lastname, email,username, password, user_id)
        return res.status(201).send(rows)
    }catch(err){
        return res.status(500).send(err)
    }
}


