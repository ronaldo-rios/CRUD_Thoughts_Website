const Thought = require('../models/Thought');
const User = require('../models/User');

module.exports = class ThoughtController {

    static async showThoughts(request, response) {
        response.render('thoughts/home')
    }

    static async dashboard(request, response) {
        response.render('thoughts/dashboard')
    }

    static createThought(request, response) {
        response.render('thoughts/create')
    }

    static async createThoughtPost(request, response) {

        const thought = {
            title:request.body.title,
            UserId: request.session.userid
        }

        await Thought.create(thought);

        request.flash('message', 'Pensamento criado com sucesso.');

        try {
        request.session.save(() => {
            response.redirect('/thoughts/dashboard');
        })
    } 
    catch(error) {
        console.log(`Oppss. Ocorreu um erro  ${error}`);
    }
    }
}