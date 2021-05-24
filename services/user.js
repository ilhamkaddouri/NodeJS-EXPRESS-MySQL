const mysqlconnection = require('../connection');

exports.getUsers= async()=>{
    const [rows]= await mysqlconnection.promise().query('SELECT * FROM user;')
    return rows;
}

exports.getUserByEmail= async(email)=>{
    const [rows]= await mysqlconnection.promise().query('SELECT * FROM user where email=?;',[email]);
    return rows;
}

exports.getUser = async (email)=>{
    const [rows] = await  mysqlconnection.promise().query('SELECT email, password from user WHERE email=?',[email]);
    return rows;
}

exports.addUser = async(firstname,lastname,email,username,password)=>{
    const {id} =  await mysqlconnection.promise().query('INSERT INTO user(firstname,lastname,username,email,password) values(?,?,?,?,?)',[firstname,lastname,username,email,password]);
    return id;
}

exports.updateUser = async (firstname,lastname,email,username,password,user_id)=>{
    const {id} = await mysqlconnection.promise().query('UPDATE user SET firstname = ? ,email=?, password=? WHERE id=?',[firstname,lastname,email,username,password,user_id]);
    return id;

}

exports.deleteUser = async (user_id)=>{
    const {id} = await mysqlconnection.promise().query('DELETE FROM user WHERE id=?',[user_id]);
    return id;
}