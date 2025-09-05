const express = require('express')
const router = express.Router()
const authMiddleware = require('../middleware/authMiddleware')
const blogController = require('../controllers/blogController')

router.post('/posts', authMiddleware, blogController.createPost)

router.get('/posts', blogController.getPosts)


router.put('/posts/:id', authMiddleware, blogController.updatePost)


router.delete('/posts/:id', authMiddleware, blogController.deletePost)

module.exports = router
