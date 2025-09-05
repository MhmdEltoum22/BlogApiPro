const Comment = require('../modules/commentModel')
const Blog = require('../modules/blogModel')

exports.createComment = async (req, res) => {
  try {
    const { content } = req.body
    const { postId } = req.params

   
    const blog = await Blog.findById(postId)
    if (!blog) {
      return res.status(404).json({ error: "Post not found" })
    }

    const comment = new Comment({
      content,
      author: req.user.id, 
      post: postId
    })

    await comment.save()
    res.status(201).json({ message: "Comment added successfully", comment })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}


exports.getCommentsByPost = async (req, res) => {
  try {
    const { postId } = req.params

    const comments = await Comment.find({ post: postId })
      .populate('author', 'name email')

    res.json(comments)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}


exports.deleteComment = async (req, res) => {
  try {
    const { id } = req.params

    const comment = await Comment.findById(id)
    if (!comment) {
      return res.status(404).json({ error: "Comment not found" })
    }

   
    if (comment.author.toString() !== req.user.id) {
      return res.status(403).json({ error: "Not authorized" })
    }

    await comment.deleteOne()
    res.json({ message: "Comment deleted" })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}
