const mysql= require('mysql2')
const mysqlconnection = mysql.createPool({
    host: process.env.host,
    user: process.env.user,
    password: process.env.password,
    database: process.env.database,
    multipleStatements: true

})

module.exports = mysqlconnection