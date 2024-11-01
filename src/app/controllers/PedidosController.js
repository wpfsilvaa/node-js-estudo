import PedidosRepository from "../repositories/PedidosRepository.js";

class PedidosController {
    async index(req, res) {
        const row = await PedidosRepository.findAll();
        if (row.length > 0) {
            res.status(200).json({row,success: true});
        }
        else {
            res.status(200).json({ Message: "Sem pedidos cadastrados.",success: false });
        }
    }

    async index2(req, res) {
        const row = await PedidosRepository.findAllbyDay();
        if (row.length > 0) {
            res.status(200).json({row,success: true});
        }
        else {
            res.status(200).json({ Message: "Sem pedidos cadastrados.",success: false });
        }
    }

    async show(req, res) {
        const id = req.params.id;
        const row = await PedidosRepository.findById(id);
        if (row.length > 0) {
            res.status(200).json({row,success: true});
        }
        else {
            res.status(404).json({ Message: "Pedido não encontrado." ,success: false});
        }
    }
    

    async store(req, res) {
        const pedido = req.body;
        const row = await PedidosRepository.create(pedido);
        if (row.length > 0) {
            res.status(201).json({row,success: true});
        }
        else {
            res.status(500).json({ Message: "Não foi possível cadastrar o pedido.", Detail: row ,success: false})
        }
    }

    async update(req, res) {
        const id = req.params.id;
        const parametros = req.body;
        const row = await PedidosRepository.update(id, parametros);
        if (row.Code) {
            res.status(400).json({ Message: "Não foi possível alterar o pedido.", Code: row.Code, Detail: row.Detail,success: false });
        } else {
            if (row.length == 0) res.status(404).json({ Message: "Pedido não existe." ,success: false})
            else res.status(200).json({row,success: true});
        }
    }

    async delete(req, res) {
        const id = req.params.id;
        const row = await PedidosRepository.delete(id);
        if (row.Code) {
            res.status(500).json({ Message: "Não foi possível deletar o pedido.", Code: row.Code, Detail: row.Detail ,success: false});
        } else {
            if (row.length > 0) res.status(200).json({row,success: true});
            else res.status(404).json({ Message: "O pedido não existe.", Code: row.Code, Detail: row.Detail ,success: false});
        }
    }
}

export default new PedidosController();