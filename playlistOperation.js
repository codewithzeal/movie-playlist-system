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
    type=req.body.value
    query='insert into playlists(uname,playlist_name,type) values(?,?,?)'
    val=[]
    val.push(uname)
    val.push(list_name)
    val.push(type)
    sql.execute(query,val,(err,result)=>{
        if(err)
        res.send("error")
        else
        {
            res.send("ok")
        }
    })
})




app.post('/addData',(req,res)=>{
    playlist_id=req.body.playlist_id
    imdbID=req.body.imdbID
    query="insert into playlist_data(playlist_id,imdbID)values(?,?)"
    val=[]
    val.push(playlist_id)
    val.push(imdbID)
    sql.execute(query,val,(err,result)=>{
        if(err)
        throw err
        else
        res.send("ok")
    })
})


module.exports=app