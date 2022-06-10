var express=require('express')
var app=express()
app.use(express.static(__dirname+'/views'))
app.use(express.static(__dirname+'/public'))
app.get('/',(req,res)=>{
    res.render('home.ejs')
})

var signup=require('./signup.js')
var wall=require('./wall.js')
var login=require('./login.js')
app.use(signup)
app.use(wall)
app.use(login)
app.listen(3000)