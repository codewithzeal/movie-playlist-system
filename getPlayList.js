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
    home=req.body.home
    if(home=="false")
    query="select * from playlists where uname=?"
    if(home=="true")
    query="select * from playlists where uname=? and type=?"
    val=[]
    val.push(uname)
    if(home=="false"){
    sql.execute(query,val,(err,result)=>{
        if(err){
            res.send("error")
        console.log(err)    
        }
        else
        {
            if(!result.length)
            res.send("empty")
            else
            res.send(result)
        }
    })
    }
    else
    {
        val.push(req.body.type)
        sql.execute(query,val,(err,result)=>{
            if(err){
            res.send("error")
        console.log(err)    
        }
            else
            {
                if(!result.length)
                res.send("empty")
                else
                res.send(result)
            }
        })
    }
})

module.exports=app