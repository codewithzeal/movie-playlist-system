var express=require('express')
var app=express.Router()
var crypto = require('crypto');
app.use(express.json())
app.use(express.urlencoded({extended:true}))
var sql=require('./getSql.js')
app.post('/signup',(req,res)=>{
    uname=req.body.uname
    password=req.body.password
    if(!uname||!password)
    res.send("error")
    else
    {
        query='insert into users(uname,password) values(?,?);'
        val=[]
        val.push(uname)
        val.push(crypto.createHash('sha256').update(password).digest('base64'))
        sql.execute(query,val,(err,result)=>{
            if(err)
            {
                console.log(err)
                res.send("error")
            }
            else
            {
                res.send("ok")
            }
        })
    }
})




module.exports=app