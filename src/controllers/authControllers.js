const User = require('../modules/userModle')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

exports.newUser = async (req, res) => {
  try {
    const data = req.body

    // check duplicate email
    const duplicateEmail = await User.findOne({ email: data.email })
    if (duplicateEmail) {
      return res.status(400).json({ error: "Email already exists" })
    }

    // hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(data.password, salt)

    const user = new User({
      ...data,
      password: hashedPassword
    })

    await user.save()

    res.status(201).json({ message: "User created successfully", user })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}


exports.login = async (req, res) => {
  try {
    const { email, password } = req.body

    const user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({ error: "Invalid email or password" })
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid email or password" })
    }

    // generate token
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    )

    res.json({ message: "Login successful", token })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}
