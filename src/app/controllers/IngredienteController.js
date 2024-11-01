import IngredienteRepository from '../repositories/IngredienteRepository.js';

class IngredienteController {

    async index(req, res) {
        const row = await IngredienteRepository.findAll();
        if (row.length > 0) {
            res.status(200).json({row,success: true});
        }
        else {
            res.status(200).json({ Message: "Sem ingredientes cadastrados." ,success: false});
        }
    }

    async show(req, res) {
        const id = req.params.id;
        const row = await IngredienteRepository.findById(id);
        if (row.length > 0) {
            res.status(200).json({row,success: true});
        }
        else {
            res.status(404).json({ Message: "Ingrediente não encontrado." });
        }
    }

    async store(req, res) {
        const ingrediente = req.body;
        const row = await IngredienteRepository.create(ingrediente);
        if (row.length > 0) {
            res.status(201).json({row,success: true});
        }
        else {
            res.status(500).json({ Message: "Não foi possível cadastrar o ingrediente.", Detail: row.Detail })
        }
    }

    async update(req, res) {
        const id = req.params.id;
        const parametros = req.body;
        const row = await IngredienteRepository.update(id, parametros);
        if (row.Code) {
            res.status(400).json({ Message: "Não foi possível alterar o ingrediente.", Code: row.Code, Detail: row.Detail });
        } else {
            if (row.length == 0) res.status(404).json({ Message: "Ingrediente não existe." })
            else res.status(200).json({row,success: true});
        }
    }

    async delete(req, res) {
        const id = req.params.id;
        const row = await IngredienteRepository.delete(id);
        if (row.Code) {
            res.status(500).json({ Message: "Não foi possível deletar o pedido.", Code: row.Code, Detail: row.Detail });
        } else {
            if (row.length > 0) res.status(200).json({row,success: true});
            else res.status(404).json({ Message: "O ingrediente não existe.", Code: row.Code, Detail: row.Detail });
        }
    }
}

//Padrao Singleton
export default new IngredienteController();
