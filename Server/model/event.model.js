const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
require('dotenv').config()
const URI = process.env.URI

mongoose.connect(URI)
.then((response)=>{
    console.log("Database is connected successfully")
})
.catch((err)=>{
    console.error(err);
})

let eventSchema = mongoose.Schema({
    eventTitle: String,
    eventType: String,
    eventDate: {type: Date, required: true},
    eventTime: 
    
    }
})

let eventModel = mongoose.model('eventModel', eventSchema)

module.exports = userM