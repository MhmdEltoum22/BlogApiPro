const Blog = require('../modules/blogModel')


exports.createPost = async (req, res) => {
  try {
    const { title, content } = req.body

    const blog = new Blog({
      title,
      content,
      author: req.user.id
    })

    await blog.save()
    res.status(201).json({ message: "Post created successfully", blog })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

exports.getPosts = async (req, res) => {
  try {
    const blogs = await Blog.find().populate('author', 'name email')
    res.json(blogs)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}


exports.updatePost = async (req, res) => {
  try {
    const { id } = req.params
    const { title, content } = req.body

    const blog = await Blog.findById(id)
    if (!blog) {
      return res.status(404).json({ error: "Post not found" })
    }

    if (blog.author.toString() !== req.user.id) {
      return res.status(403).json({ error: "Not authorized" })
    }

    blog.title = title || blog.title
    blog.content = content || blog.content
    await blog.save()

    res.json({ message: "Post updated", blog })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}


exports.deletePost = async (req, res) => {
  try {
    const { id } = req.params

    const blog = await Blog.findById(id)
    if (!blog) {
      return res.status(404).json({ error: "Post not found" })
    }

    if (blog.author.toString() !== req.user.id) {
      return res.status(403).json({ error: "Not authorized" })
    }

    await blog.deleteOne()
    res.json({ message: "Post deleted" })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}
