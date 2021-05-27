const router = require("express").Router();
const user = require('../controllers/user')
const {verifytoken}  = require('../validation/verifyToken')
router.get('/',user.getUsers)
router.delete('/:id',verifytoken,user.deleteUser)
router.put('/:id',verifytoken,user.updateUser)

router.get('/hi',(req,res)=>{
    res.status(200).send('hi')
})

router.post('/login',user.login)
router.post('/register',user.register)
router.post('/hello',verifytoken,user.hello)
module.exports = router

