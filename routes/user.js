const router = require("express").Router();
const mysqlconnection = require('../connection')

router.get('/',(req,res)=>{
    mysqlconnection.query('SELECT * FROM user;',(err,rows,fields)=>{
        console.log("hey")
        if(err) console.log("error is " + err)
        if(!err) res.send(rows)
    })
})

module.exports = router

