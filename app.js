
const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const methodOverride = require('method-override');
const mainRoutes = require('./src/routes/mainRoutes');
const shopRoutes = require('./src/routes/shopRoutes');
const adminRoutes = require('./src/routes/adminRoutes');
const authRoutes = require('./src/routes/authRoutes');

const {notFound} = require('./src/utils/errorsHandler');
const e = require('express');
const { dirname } = require('path');
const { initSession } = require('./src/utils/session');
const session = require('express-session');
require('dotenv').config();
/* puerto de la aplicacion */
const PORT = process.env.PORT;

/* template engine */
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, "./src/views"));

/* define una carpeta de archivos estaticos */

app.use(express.static('public')); // use es un middleware 

/* Creación de la sesión de usuario */
app.use(initSession());


/* Locals para indicar que el usuario inició sesión */
app.use((req, res, next) => {
    res.locals.isLogged = req.session.isLogged;
    next();

});

/* parsea los datos recibido del post */
app.use(express.urlencoded());
app.use(express.json());
app.use(methodOverride('_method'));



/* middleware a las rutas */
app.use('/', mainRoutes);
app.use('/shop', shopRoutes); // pongo el prefijo shop en la barra asi en la ruta evito repetir el codigo
app.use('/admin', adminRoutes);
app.use('/auth', authRoutes);

/* middleware para manejar el error de las rutas */

/*app.use((req, res, next)=>{
   res.status(404).sendFile(__dirname + '/public/pages/404.html');
})*/

/* Con archivo de middleare error */
app.use(notFound);

/* Metodo para correr el server */
app.listen(PORT, ()=>{

    console.log('Servidor Express estoy conectado en el  puerto http://localhost:3000');
});


