var express=require('express')
var app=express.Router()
app.use(express.json())
app.use(express.urlencoded({extended:true}))
var sql=require('./getSql.js')
var session=require('express-session')
app.use(session({secret: 'Your_Secret_Key',resave:false,saveUninitialized:false}))

app.get('/views/:uid/:playlist_name',async (req,res)=>{
    var uid=req.params["uid"]
    var playlist_name=req.params["playlist_name"]
    await verify().then((data1)=>{
        console.log(data1[0].imdbId,data1.length)
        if(data1=="failed")
        res.render("view.ejs",{vstatus:'error',data:[],pn:""})
        else
        {
            arr=[]
            for(i=0;i<data1.length;i++)
            arr.push(data1[i].imdbId)
            console.log(arr)
            res.render("view.ejs",{vstatus:'ok',data:arr,pn:playlist_name})
        }
    })
    function verify()
    {
        return new Promise(async (s,r)=>{
            await getCredential(uid).then((data)=>{
                if(!data)
                s("failed")
                else
                {
                    query="select * from playlists where type='public' and  playlist_name=?"
                    val=[]
                    val.push(playlist_name)
                    sql.execute(query,val,(err,result)=>{
                        if(err)
                        {
                            s("failed")
                            console.log(err)
                        }
                        else
                        {
                            console.log("hmer",result[0])
                            if(!result[0])
                            s("failed")
                            else
                            {
                                query1="select imdbId from playlist_data where playlist_id=?"
                                val1=[]
                                val1.push(result[0].S_ID)
                                sql.execute(query1,val1,(err1,result1)=>{
                                    if(err1)
                                    s("failed")
                                    else
                                    {
                                        s(result1)
                                    }
                                })
                            }
                        }
                    })
                }
            })
            
        })
    }


    function getCredential(uid)
    {
        return new Promise((s,r)=>{
            query="select uname from users where uid=?"
            val=[]
            val.push(uid)
            sql.execute(query,val,(err,result)=>{
                if(err)
                {
                    console.log(err)
                    s("")
                }
                else
                {
                    if(result.length)
                    {
                        s(result[0].uname)
                    }
                    else
                    {
                        s("")
                    }
                }
            })
        })
    }

})

module.exports=app