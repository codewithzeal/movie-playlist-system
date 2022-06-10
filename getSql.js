const res = require('express/lib/response')
var db=require('./database_connect.js')
sql=db.connect()
/* query="select * from contacts;"
sql.query(query,(err,result)=>{
    if(err)
    {
        console.log(err)
    }
    else
    console.log(result)
}) */
module.exports=sql; 