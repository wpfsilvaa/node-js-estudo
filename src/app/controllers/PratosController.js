import PratosRepository from "../repositories/PratosRepository.js";

class PratosController {
    async index(req, res) {
        const row = await PratosRepository.findAll();
        if (row.length > 0) {
            res.status(200).json({row,success: true});
        }
        else {
            res.status(200).json({ Message: "Sem pratos cadastrados." ,success: false});
        }
    }

    async show(req, res) {
        const id = req.params.id;
        const row = await PratosRepository.findById(id);
        if (row.length > 0) {
            res.status(200).json({row,success: true});
        }
        else {
            res.status(404).json({ Message: "Prato não encontrado.",success: false });
        }
    }

    async store(req, res) {
        const pedido = req.body;
        const row = await PratosRepository.create(pedido);
        if (row.length > 0) {
            res.status(201).json({row,success: true});
        }
        else {
            res.status(500).json({ Message: "Não foi possível cadastrar o prato.", Detail: row.Detail , success: false})
        }
    }

    async update(req, res) {
        const id = req.params.id;
        const parametros = req.body;
        const row = await PratosRepository.update(id, parametros);
        if (row.Code) {
            res.status(400).json({ Message: "Não foi possível alterar o prato.", Code: row.Code, Detail: row.Detail ,success: false});
        } else {
            if (row.length == 0) res.status(404).json({ Message: "Não foi possível encontrar o prato." ,success: false})
            else res.status(201).json({row,success: true});
        }
    }

    async delete(req, res) {
        const id = req.params.id;
        const row = await PratosRepository.delete(id);
        if (row.Code) {
            res.status(500).json({ Message: "Não foi possível deletar o prato.", Code: row.Code, Detail: row.Detail ,success: false});
        } else {
            if (row.length > 0) res.status(200).json({row,success: true});
            else res.status(404).json({ Message: "O prato não existe.", Code: row.Code, Detail: row.Detail ,success: false});
        }
    }
}

export default new PratosController();