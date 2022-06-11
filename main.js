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
var getPlayList=require('./getPlayList.js')
var playlistOperation=require('./playlistOperation.js')
var view=require('./view.js')
app.use(signup)
app.use(wall)
app.use(login)
app.use(getPlayList)
app.use(playlistOperation)
app.use(view)
app.listen(3000)