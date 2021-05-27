const jwt = require('jsonwebtoken')
exports.verifytoken = (req,res,next)=>{
   const authHeader = req.headers['authorization']
   console.log(authHeader + "header")
   const token = authHeader && authHeader.split(' ')[1] 
   if(token === null) return res.sendStatus(401)
   console.log('i am the token'+ token)

   jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user)=>{
       console.log('ehy')
       if(err)  {res.sendStatus(403); console.log(err) }
       req.user = user;
       next();
   })
}