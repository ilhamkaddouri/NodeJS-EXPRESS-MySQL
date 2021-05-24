const router = require("express").Router();
const user = require('../controllers/user')

router.get('/',user.getUsers)
router.delete('/:id',user.deleteUser)
router.put('/:id',user.updateUser)

router.get('/hi',(req,res)=>{
    res.status(200).send('hi')
})

router.post('/login',user.login)
router.post('/register',user.register)
router.post('/hello',user.hello)
module.exports = router

