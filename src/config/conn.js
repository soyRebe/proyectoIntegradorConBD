const mysql = require('mysql2');
require('dotenv').config();
// creamos una instancia de una coneccion individual no puedo hacer consultas simultaneas
/*const connection = mysql.createConnection({  
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'characteres'
});*/

// creamos una instancia de una coneccion individual no puedo hacer consultas simultaneas
const pool = mysql.createPool({  
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    port: 3306,
    waitForConnetions: true,
    connectionLimit: 10,
    queueLimit: 0,
});

/*connection.connect();
module.exports = connection;*/

pool.getConnection((error, connection)=>{
    if( error) {
        console.log('Hubo un error de conexion:', error );
    } else {
        console.log('conexion exitosa a  la BD');
        connection.release();
    }
});
//se exporta como una promesa 

module.exports = {
    conn: pool.promise()
}

