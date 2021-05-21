const router = require("express").Router();
const user = require('../controllers/user')

router.get('/',user.getUsers)
router.post('/',user.addUser)
router.delete('/:id',user.deleteUser)
router.put('/:id',user.updateUser)

router.post('/login',user.login)
router.post('/register',user.register)
module.exports = router

