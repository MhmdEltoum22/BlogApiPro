const mongoose = require('mongoose')
require('dotenv').config({ quiet: true });
const url = process.env.DB_URL || "mongodb://localhost:27017/BlogApp"
const port = process.env.PORT || 3000;

function Dbconnection(){
mongoose.connect(url).then(()=>{
   
    console.log("conected to database")
}).catch((err)=>{
    console.log(err)
    console.log("not conected to database")
})
}
module.exports = {Dbconnection,port}