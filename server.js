const express = require('express')
const hbs = require ('hbs')
const fs = require('fs')

const port = process.env.PORT || 3000

var app = express()

app.set('view engine','hbs')
hbs.registerPartials(__dirname + '/views/partials')

app.use((req,res,next)=>{
    var now = new Date().toString()
    var log = `${now}: ${req.method} ${req.url}`
    console.log(log)
    fs.appendFile('server.log',log + '\n', (err)=>{
        if(err){
            console.log('Error logging')
        }
    })
    next()
})

app.use((req,res,next)=>{
    var now = new Date().toString()
    var log = `${now}: ${req.method} ${req.url}`
    console.log(log)
    fs.appendFile('server.log',log + '\n', (err)=>{
        if(err){
            console.log('Error logging')
        }
    })
    res.render('maintenance.hbs')
})

app.use(express.static(__dirname+ '/public'))

app.get('/',(req, res)=>{
    //res.send('Hello Express!')
   /*  res.send({
        name:'Gabriel',
        likes:[
            'Running',
            'Futbol'
        ]
    }) */
    res.render('home.hbs',{
        pageTitle:'About Page',
        currentYear : new Date().getFullYear(),
        welcomeMessage: 'This is the welcome message'
    })
})

app.get('/about',(req, res)=>{
    res.render('about.hbs',{
        pageTitle:'About Page',
        currentYear : new Date().getFullYear()
    })
})

app.get('/bad',(req, res)=>{
    res.send({errorMessage:'Error handling request'})
})

app.listen(port,()=>console.log(`Listening 3000 port ${port}`))