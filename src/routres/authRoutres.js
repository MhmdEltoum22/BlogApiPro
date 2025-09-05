const express = require('express')
const router = express.Router()
const authControllers = require('../controllers/authControllers')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/login', authControllers.login)
router.post('/signup', authControllers.newUser)


router.get('/profile', authMiddleware, (req, res) => {
  res.json({
    message: 'Welcome to your profile!',
    user: req.user
  })
})

module.exports = router
