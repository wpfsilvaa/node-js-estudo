import { consulta } from '../database/conexao.js';

class PratosRepository {

    async create(prato) {
        const { nome, ingredientes} = prato;
        try {
            const sql_preco = 'SELECT preco FROM ingredientes WHERE nome = $1';
            let totalPreco = 0;
            for (let ingrediente of ingredientes) {
                const result = await consulta(sql_preco, [ingrediente]);
                
                if (result.length > 0) {
                    totalPreco += parseFloat(result[0].preco);
                }
            }
            const sql = 'INSERT INTO pratos(nome, preco, ingredientes) VALUES ($1, $2, $3) RETURNING *;';
            const resultado = await consulta(sql, [nome, totalPreco, ingredientes]);
            
            return resultado;
        } catch (e) {
            return JSON.parse(JSON.stringify(e));
        }
    }
    

    async findAll() {

        const sql = 'SELECT * from pratos;';
        try {
            const resultado = await consulta(sql);
            return resultado;
        } catch (e) {
            return JSON.parse(JSON.stringify(e));
        }
    }
    async findById(id) {
        const sql = 'SELECT * from pratos WHERE id_prato = $1;';
        try {
            const resultado = await consulta(sql, [id]);
            return resultado;
        } catch (e) {
            return JSON.parse(JSON.stringify(e));
        }
    }
    async update(id, parametros) {
        let sql = 'UPDATE pratos SET ';
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
        sql += ' WHERE id_prato = $1 RETURNING *';
        try {
            return await consulta(sql, values);
        } catch (e) {
            return JSON.parse(JSON.stringify(e));
        }
    }

    async delete(id) {
        const sql = 'DELETE FROM pratos WHERE id_prato = $1 RETURNING *;';
        try {
            const resultado = await consulta(sql, [id]);
            return resultado;
        } catch (e) {
            return JSON.parse(JSON.stringify(e));
        }
    }
}
export default new PratosRepository()