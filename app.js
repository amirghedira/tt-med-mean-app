const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express()


mongoose.connect(process.env.MONGO_INFO, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
    .then(res => {
        console.log('connection to database successfully')
    })
    .catch(err => {
        console.log(err)
    })
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())



//routes imports 
const userRoutes = require('./routes/user')
const DossierMedicalRoutes = require('./routes/dossierMedical')
const consultationRoutes = require('./routes/consultation')

const agentRoutes = require('./routes/agent')

// app routes
app.use('/user', userRoutes);
app.use('/agent', agentRoutes)
app.use('/dossier-medical', DossierMedicalRoutes)
app.use('/consultation', consultationRoutes)



module.exports = app;