const express = require('express')
const User = require('./../models/User')
const router = new express.Router()

router.post('/users', async (req, res)=>{
    const user = new User(req.body)
    try {
        await user.save()
        const token = await user.generateAuthToken()
        res.status(200).send({user, token})
    } catch (error) {
        res.status(400).send(error)
    }
})

module.exports = router