import { consulta } from '../database/conexao.js';

class IngredienteRepository {
    //CRUD
    async create(ingrediente) {
        const { nome, preco, descricao } = ingrediente;
        const sql = 'INSERT INTO ingredientes(nome, preco, descricao)VALUES ($1, $2, $3) RETURNING *;';
        try {
            const precoFormatted = parseFloat(preco.replace(',', '.')).toFixed(2);
            const resultado = await consulta(sql, [nome, precoFormatted, descricao]);
            return resultado;
        } catch (e) {
            return JSON.parse(JSON.stringify(e));
        }
    }

    async findAll() {
        const sql = 'SELECT * FROM ingredientes';
        try {
            const resultado = await consulta(sql);
            return resultado;
        } catch (e) {
            return JSON.parse(JSON.stringify(e));
        }

    }

    async findById(id) {
        const sql = 'SELECT * FROM ingredientes WHERE id_ingrediente = $1';
        try {
            const resultado = await consulta(sql, [id]);
            return resultado;
        } catch (e) {
            return JSON.parse(JSON.stringify(e));
        }
    }
    async update(id, parametros) {
        let sql = 'UPDATE ingredientes SET ';
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
        sql += ' WHERE id_ingrediente = $1 RETURNING *';
        try {
            return await consulta(sql, values);
        } catch (e) {
            return JSON.parse(JSON.stringify(e));
        }

    }

    async delete(id) {

        const sql = 'DELETE FROM ingredientes WHERE id_ingrediente = $1 RETURNING *;';

        try {
            const resultado = await consulta(sql, [id]);
            return resultado;
        } catch (e) {
            return JSON.parse(JSON.stringify(e));
        }
    }
}

export default new IngredienteRepository();