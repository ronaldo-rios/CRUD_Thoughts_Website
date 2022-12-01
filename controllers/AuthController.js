const User = require('../models/User');
const bodyParser = require('body-parser');

// Never save the raw password in the database. We use a library to encrypt the password:
const bcrypt = require('bcryptjs');

module.exports = class AuthController {

    static login(request, response) {
        response.render('auth/login')
    }

    static register(request, response) {
        response.render('auth/register')
    }

    static async registerPost(request, response) {
       
        const { name, email, password, confirmpassword } = request.body
        // Password Match validation:
        if (password != confirmpassword) {
            
            request.flash('message', 'Senhas não conferem. Tente novamente.');
            response.render('auth/register');

            return;

        }  
    }
    
}