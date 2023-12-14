const userCredentials = {
    email: 'admin@funkoshop.com',
    password: 'oneRingToRuleThemAll'
}

const authController = {
    //login: (req, res) => res.send('Route for Login View'),
    /*login: (req, res) => res.render('./auth/login', {
        view: {
            title: 'Login | Funkoshop'
        }
    }),*/

    login:( req, res )=> {
        res.render('login', {
            title: 'Login | FunkoShop'
        });
        // res.sendFile(path.resolve(__dirname, '..' , 'pages', 'login.html' ));
    },



    //loginUser: (req, res) => res.send('Route for Login when a user has completed the login form and tries to login'),
    loginUser: (req, res) => {
        const {email, password } = req.body;
        const emailValidation = email == userCredentials.email;
        const passwordValidation = password == userCredentials.password;
        req.session.isLogged = emailValidation && passwordValidation ? true : false;

        if (req.session.isLogged) {
            return res.redirect('/admin');
        }

        return res.status(401).send('Las credenciales ingresadas son inválidas.');



    },


  /*  register: (req, res) => res.render('./auth/register', {
        view: {
            title: 'Register | Funkoshop'
        }
    }),*/


    getRegister:( req, res )=> {
        res.render('register', {
            title: 'Registro | FunkoShop'
        });
    },

    registerUser: (req, res) => res.send('Route for Register when a guest user has completed the register form and tries to create an account'),

    //logout: (req, res) => res.send('Route for Logout when a user ends his session')
    logout: (req, res) => {
        req.session.isLogged = false;
        res.redirect('/') }


};

module.exports = authController;
