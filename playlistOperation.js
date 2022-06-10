var express=require('express')
var app=express.Router()
var crypto = require('crypto');
app.use(express.json())
app.use(express.urlencoded({extended:true}))
var sql=require('./getSql.js')
var session=require('express-session')
app.use(session({secret: 'Your_Secret_Key',resave:false,saveUninitialized:false}))

app.post('/addList',(req,res)=>{
    uname=req.body.uname
    list_name=req.body.list_name
    query='insert into playlists(uname,playlist_name) values(?,?)'
    val=[]
    val.push(uname)
    val.push(list_name)
    sql.execute(query,val,(err,result)=>{
        if(err)
        res.send("error")
        else
        {
            res.send("ok")
        }
    })
})
module.exports=app