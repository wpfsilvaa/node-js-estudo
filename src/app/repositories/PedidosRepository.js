import { consulta } from '../database/conexao.js';

class PedidosRepository {
    async create(pedido) {
        const { nome, endereco , observacoes , telefone , pratos , ingredientes , precoTotal, pagamento} = pedido;
        const status_pedido = "pendente";
        const sql = 'INSERT INTO pedidos(nome,endereco,observacoes,telefone,status_pedido,pratos,ingredientes_extras, total , pagamento) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING *;';
        try {
            const resultado = await consulta(sql, [nome,endereco,observacoes,telefone,status_pedido,[pratos], [ingredientes],precoTotal,pagamento ]);
            return resultado;
        } catch (error) {
            return JSON.parse(JSON.stringify(error));
        }
    }

    async findAll() {
        const sql = `
            SELECT * 
            FROM Pedidos 
            ORDER BY data_pedido ASC;
        `;
        try {
            const resultado = await consulta(sql);
            return resultado;
        } catch (e) {
            return JSON.parse(JSON.stringify(e));
        }
    }

    async findAllbyDay() {
        const sql = `SELECT * FROM Pedidos WHERE DATE(data_pedido) = CURRENT_DATE;`;
        try {
            const resultado = await consulta(sql);
            return resultado;
        } catch (e) {
            return JSON.parse(JSON.stringify(e));
        }
    }
    

    async findById(id) {
        const sql = 'SELECT * FROM pedidos;';
        try {
            const resultado = await consulta(sql,[id]);
            return resultado;
        } catch (e) {
            return JSON.parse(JSON.stringify(e));
        }
    }

    async update(id, parametros) {
        let sql = 'UPDATE pedidos SET ';
        let aux = 1;
        const values = [id];
        for (let parametro in parametros) {
            if (parametros[parametro]) {
                aux += 1;
                sql += `${parametro} = \$${aux}, `;
                values.push(parametros[parametro]);
            }
        }

        sql = sql.slice(0, -2);
        sql += ' WHERE id_pedido = $1 RETURNING *';
        try {
            return await consulta(sql, values);
        } catch (e) {
            return JSON.parse(JSON.stringify(e));
        }
    }

    async delete(id) {
        const sql = 'DELETE FROM pedidos WHERE id_pedido = $1 RETURNING *;';
        try {
            const resultado = await consulta(sql, [id]);
            return resultado;
        } catch (e) {
            return JSON.parse(JSON.stringify(e));
        }

    }

}

export default new PedidosRepository();