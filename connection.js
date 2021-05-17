const mysql= require('mysql2')
const mysqlconnection = mysql.createConnection({
    host: process.env.host,
    user: process.env.user,
    password: process.env.password,
    database: process.env.database,
    multipleStatements: true

})

mysqlconnection.connect((err)=>{
    if (err) console.log(err)
    if(!err) console.log("connected")
})

module.exports = mysqlconnection