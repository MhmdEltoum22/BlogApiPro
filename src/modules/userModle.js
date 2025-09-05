
const bcrypt = require('bcryptjs')
const mongoose = require('mongoose')
 const Schema = mongoose.Schema

 const userSchema = new Schema({
    name:{
        type:String,
        required: true,
    },
     email:{
        type:String,
        required: true,
        tirm : true,
        unique: true
    },
    password:{
         type:String,
        required: true,
        tirm : true,
        unique: true,
        minlength: 8

    }
 })
 userSchema.pre('save', async function(next){
    try{
        if(this.isModified('password')){
            return next()
        }
        this.password = await bcrypt.hash(this.password,8)
        next()
    }catch(err){
       return next(err)
    }
 })
 const User = mongoose.model('User',userSchema)
 module.exports = User