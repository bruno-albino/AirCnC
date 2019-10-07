const multer = require("multer")
const path = require("path")


module.exports = {
    storage: multer.diskStorage({  // gravar em disco
        destination: path.resolve(__dirname, '..', '..', 'uploads'), // path.resolve deixa as / de acordo com o S.O utilizado 
        filename: (req, file, cb)=>{
            const ext = path.extname(file.originalname)   // retira a extensão do arquivo e salva em ext
            const name = path.basename(file.originalname, ext);  // pega o nome original do arquivo, sem a extensão

            cb(null, `${name}-${Date.now()}${ext}`)  // função de callback utilizada após criar o arquivo (erro, nomearquivo)
        },
    }),
}