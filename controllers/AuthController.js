const User = require('../models/User');

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

        // check if user exists 
        const checkIfUserExists = await User.findOne({where: {email: email}})

        if(checkIfUserExists){
            request.flash('message', 'E-mail já cadastrado. Insira outro e-mail.');
            response.render('auth/register');

            return;
        }

        // create a password:
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);

        // new user object:
        const user = {
            name,
            email,
            password: hashedPassword
        }
        // creating User in the table of the Database:
        try {
            const createdUser = await User.create(user);

            //Initializing session:
            request.session.userid = createdUser.id

            request.flash('message', 'Cadastro realizado com sucesso!');
            request.session.save(() => {
                response.redirect('/');
            })
        } 
        catch(error) {
            console.log(error);
        }
        
    }

    static logout(request, response) {
        request.session.destroy();
        response.redirect('/login');
    }
    
}