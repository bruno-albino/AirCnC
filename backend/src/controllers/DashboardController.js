const Spot = require("../models/Spot")

module.exports = {
    async show(req, res){
        const { user_id } = req.headers; // pegar o ID do usuário logado

        const spots = await Spot.find({ user: user_id }) // pegar todos os spots do usuário web

        return res.json(spots)
    }
}