
module.exports = class AuthController {

    static login(request, response) {
        response.render('auth/login')
    }

    static register(request, response) {
        response.render('auth/register')
    }
}