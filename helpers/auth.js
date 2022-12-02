
module.exports.checkAuth = function(request, response, next) {

    // Middleware if user is logged in or not to be able to access the dashboard:
    const userId = request.session.userid 

    if(!userId){
        response.redirect('/login')
    }

    next();
}