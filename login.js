var express=require('express')
var app=express.Router()
var crypto = require('crypto');
app.use(express.json())
app.use(express.urlencoded({extended:true}))
var sql=require('./getSql.js')
var session=require('express-session')
app.use(session({secret: 'Your_Secret_Key',resave:false,saveUninitialized:false}))
app.post('/login',(req,res)=>{
    console.log('here')
    uname=req.body.uname
    password=req.body.password
    if(!uname||!password)
    res.send("error")
    else
    {
        query='select * from users where uname=? and password=?'
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
                //console.log(result[0])
                if(result[0])
                {
                    req.session.uname=result[0].uname;
                    req.session.uuid=result[0].uid;
                    res.send("ok")
                }
                else
                    res.send("N")
            }
        })
    }
})




module.exports=app