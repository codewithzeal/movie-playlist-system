var express=require('express')
var app=express.Router()
var crypto = require('crypto');
app.use(express.json())
app.use(express.urlencoded({extended:true}))
var sql=require('./getSql.js')
var session=require('express-session')
app.use(session({secret: 'Your_Secret_Key',resave:false,saveUninitialized:false}))


app.post('/getPlayList',(req,res)=>{

    uname=req.body.uname
    query="select * from playlists where uname=?"
    val=[]
    val.push(uname)
    sql.execute(query,val,(err,result)=>{
        if(err)
        res.send("error")
        else
        {
            if(!result.length)
            res.send("empty")
            else
            res.send(result)
        }
    })
})

module.exports=app