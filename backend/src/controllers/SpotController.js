const Spot = require("../models/Spot")
const User = require("../models/User")

module.exports ={
    async index(req, res){
        const { tech } = req.query

        const spots = await Spot.find({techs: tech})

        return res.json(spots)
    },


    async store(req, res){          // utilizada para inserir Spots 
        const {filename } = req.file;  // requisição para arquivos (Multipart no insomnia)
        const { company, techs, price } = req.body // o que veio no corpo
        const { user_id } = req.headers;  // usuário logado que está cadastrando o Spot

        const user = await User.findById(user_id)

        if(!user){
            return res.status(400).json({error: "User does not exist"}) // verifica se existe o usuário
        }
        const spot = await Spot.create({
            user: user_id,
            thumbnail: filename,
            company, 
            techs: techs.split(',').map(tech=> tech.trim()), // metodo split para cortar a string por virgula,
                                                            // e map para percorrer  e o trim para cortar espaços em branco
            price
        })
        return res.json(spot)
    }
}