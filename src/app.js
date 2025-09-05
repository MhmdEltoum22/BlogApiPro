const express = require('express')
const {Dbconnection} = require('../src/config/server')
const authRouters = require('../src/routres/authRoutres')
const blogRoutes = require('../src/routres/blogRoutes')
const commentRoutes = require('../src/routres/commentRoutes')

const app = express()

app.use(express.json())
const port = process.env.PORT||3000
app.use('/api/users',authRouters)
app.use('/api/blogs', blogRoutes)
app.use('/api/comments', commentRoutes)

Dbconnection()
app.listen(port, ()=>{

    console.log('server is up on port ' + port)
})