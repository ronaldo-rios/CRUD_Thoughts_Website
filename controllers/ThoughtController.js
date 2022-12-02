const Thought = require('../models/Thought');
const User = require('../models/User');

module.exports = class ThoughtController {

    static async showThoughts(request, response) {

        const thoughtsData = await Thought.findAll({
            include: User
        })
        const thoughts = thoughtsData.map((result) => result.get({plain: true}))
        response.render('thoughts/home', {thoughts})
    }

    static async dashboard(request, response) {

        const userId = request.session.userid

        const user = await User.findOne({
            where: {
                id: userId
            }, 
            include: Thought, 
            plain: true
        })

        const thoughts = user.Thoughts.map((result) => result.dataValues)

        let emptyThoughts = false

        if (thoughts.length === 0) {
          emptyThoughts = true
        }

        response.render('thoughts/dashboard', { thoughts, emptyThoughts })
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

    static async removeThought(request, response) {

        const id = request.body.id
        const UserId = request.session.userid

        try {
            await Thought.destroy({where: {id: id, userId: UserId}});
            request.flash('message', 'Pensamento removido com sucesso!');

            request.session.save(() => {
                response.redirect('/thoughts/dashboard')
            })
        }
        catch(err){
            console.log(err)
        }
        

    }

    static async updateThought(request, response) {

        const id = request.params.id

        const thought = await Thought.findOne({where: {id: id}, raw: true})
        response.render('thoughts/edit', {thought})
    }

    static async updateThoughtSave(request, response) {

        const id = request.body.id
        const thought = {
            title: request.body.title,
        }

        await Thought.update(thought, {where: {id: id}});

        try {
        request.flash('message', 'Pensamento atualizado com sucesso!');

            request.session.save(() => {
                response.redirect('/thoughts/dashboard')
            })
        }
        catch(error){
            console.log("Ocorreu algum erro: " + error)
        }
    }


}