const express = require('express')
const Event = require('./../models/Event')
const superAdmin = require('./../middleware/superAdmin')
const admin = require('./../middleware/admin')
const user = require('./../middleware/user')
const router = new express.Router()

router.post('/event',superAdmin, async (req, res)=>{
    const event = new Event(req.body)
    try {
        await event.save()
        res.status(200).send({event})
    } catch (error) {
        res.status(400).send(error)
    }

})
//update admin profile
router.patch('/event/:id', superAdmin, async(req, res)=>{
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description']
    const isValidOperation = updates.every((update)=> allowedUpdates.includes(update))
    if(!isValidOperation)
    return res.status(400).send('Invalid updates')
    try {
        const message = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        if(!message)
        return res.status(400).send('Not found')
        res.status(200).send(message)
    } catch (error) {
        res.status(400).send(error)
    }
})
router.get('/events', admin, async(req, res)=>{
    try {
        const event = await Event.find({})
        if(!event)
        return res.status(400).send('Not found')
        res.status(200).send(event)
    } catch (error) {
        res.status(400).send(error)
    }
})

module.exports = router