import UsuarioRepository from "../repositories/UsuarioRepository.js";


class UsuarioController {

    async index(req, res) {
        const row = await UsuarioRepository.findAll();
        if (row.length > 0) {
            res.status(200).json({row,success: true});
        }
        else {
            res.status(404).json({ Message: "Sem usuários cadastrados.",success: false});
        }
    }

    async buscarNome(req,res){
        const nome = req.params;
        const row = await UsuarioRepository.findName(nome);
        
        if (row.length > 0) {
            res.status(200).json({row,success: true});
        }
        else {
            res.status(404).json({ Message: "Usuário não encontrado.",success: false});
        }

    }

    async show(req, res) {
        const id = req.params.id;
        if(isNaN(id))
        {
            var row = await UsuarioRepository.findName(id);
        }else
        {
            var row = await UsuarioRepository.findById(id);
        }
        if (row.length > 0) {
            res.status(200).json({row,success: true});
        }
        else {
            res.status(404).json({ Message: "Usuário não encontrado.",success: false});
        }
    }
    // funciona
    async store(req, res) {
        const user = req.body;
        const row = await UsuarioRepository.create(user);
        if (row.length > 0) {
            res.status(201).json({row,success: true});
        }
        else {
            res.status(500).json({ Message: "Não foi possível criar o usuário.", Code: row.Detail ,success: false})
        }


    }
    // funciona
    async update(req, res) {
        const id = req.params.id;
        const parametros = req.body;
        const row = await UsuarioRepository.update(id, parametros);
        if (row.Code) {
            res.status(400).json({ Message: "Não foi possível alterar o usuário.", Code: row.Code, Detail: row.Detail,success: false });
        } else {
            if (row.length == 0) res.status(404).json({ Message: "Não foi possível encontrar o usuário" ,success: false})
            else res.status(200).json({row,success: true});
        }
    }
    // funciona
    async delete(req, res) {
        const id = req.params.id;
        const row = await UsuarioRepository.delete(id);
        if (row.Code) {
            res.status(500).json({ Message: "Não foi possível deletar o usuário.", Code: row.Code, Detail: row.Detail,success: false });
        } else {
            if (row.length > 0) res.status(200).json({row,success: true});
            else res.status(404).json({ Message: "Usuario não existe.", Code: row.Code, Detail: row.Detail ,success: false});
        }
    }
}

//Padrao Singleton
export default new UsuarioController();
