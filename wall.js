var express=require('express')
var app=express.Router()
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(__dirname+'/public'))
var sql=require('./getSql.js')
var session=require('express-session')
app.use(session({secret: 'Your_Secret_Key',resave:false,saveUninitialized:false}))


app.get('/wall',(req,res)=>{
    console.log(req.session.uname)
    res.render('wall.ejs',{uid:req.session.uname})
})

module.exports=app