const mysql= require('mysql2')
const mysqlconnection = mysql.createPool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    multipleStatements: true

})

module.exports = mysqlconnection