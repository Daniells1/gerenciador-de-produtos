const mysql = require("mysql2/promise")

class DB{
    async connect() {
        try{
         if (global.connection && global.connection.state !== "disconnected")
         return global.connection

        
        const connection  = await mysql.createConnection({
            host:'localhost',
            database: 'dbnode1',
            user: 'root',
            password: 'minhasenha1234'
                }) 
        global.connection = connection 
        return connection

        } catch (e){
              console.log("ERRO DB: " + e)
              return null
        }
    }

}

module.exports = new DB