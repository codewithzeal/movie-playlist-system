const mysql=require('mysql2');
var log={
    connect:function()
    {
    
        var config=
        {
            host: 'localhost',
            port:"3306",
            user: 'naman',
            password: 'inaman123',
            database: 'demoproject'
        }
        const db=mysql.createConnection(config);
        return db;
    }
}
module.exports=log;
