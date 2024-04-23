const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
require('dotenv').config()
const URI = process.env.URI

mongoose.connect(URI)
.then((response)=>{
    console.log("Event database is connected successfully")
})
.catch((err)=>{
    console.error(err);
})

const eventSchema = mongoose.Schema({
    eventTitle: String,
    eventType: String,
    eventDate: {type: Date, required: true},
    eventTime: String,
    eventState: String,
    venueAddress: String,
})

const userEventSchema = mongoose.Schema({
    userId: {type: String,  ref: 'User', unique:true},
    events:[eventSchema]
})

let userEvent = mongoose.model('userEvent', userEventSchema)

module.exports = userEvent