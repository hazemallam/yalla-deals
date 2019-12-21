const mongoose =require('mongoose')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const userSchema = new mongoose.Schema({
    type:{
        type:Number,
        required: true
    },
    tokens:[{
        token:{
            type: String,
            required: true
        }
    }]

})
//generate token for each new user
userSchema.methods.generateAuthToken = async function(){
    const user  = this;
    const token = jwt.sign({_id: user._id.toString()}, 'myToken')
    user.tokens = user.tokens.concat({token})
    await user.save()
    return token
}
const User = mongoose.model('User', userSchema)
module.exports = User