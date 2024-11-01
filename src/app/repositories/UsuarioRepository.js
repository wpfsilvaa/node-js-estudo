import { consulta } from '../database/conexao.js';

class UsuarioRepository {
    async create(usuario) {
        const { nome, sobrenome, email, senha, endereco, bairro, telefone, cpf } = usuario;

        const sql = 'INSERT INTO usuarios(nome, sobrenome,email, senha, endereco, bairro,telefone,cpf) VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *;';
        try {
            const resultado = await consulta(sql, [nome, sobrenome, email, senha, endereco, bairro, telefone, cpf]);
            return resultado;
        } catch (error) {
            return JSON.parse(JSON.stringify(error));
        }
    }



    async findName(id) {
        const sql = "SELECT id_usuario,nome,sobrenome FROM usuarios WHERE nome ILIKE '%' || $1 || '%';";
        try {
            const resultado = await consulta(sql, [id]);
            return resultado;
        } catch (error) {
            return JSON.parse(JSON.stringify(error));
        }
    }

    async findAll() {
        const sql = 'SELECT id_usuario,nome,sobrenome,email,telefone,endereco,bairro,telefone,cpf,data_registro FROM usuarios;';
        try {
            const resultado = await consulta(sql);
            return resultado;
        } catch (e) {
            return JSON.parse(JSON.stringify(e));
        }
    }

    async findById(id) {
        const sql = 'SELECT id_usuario,nome,sobrenome,email,telefone,endereco,bairro,telefone,cpf FROM usuarios WHERE id_usuario = $1;';
        try {
            const resultado = await consulta(sql, [id]);
            return resultado;
        } catch (error) {
            return JSON.parse(JSON.stringify(error));
        }
    }

    async update(id, parametros) {
        let sql = 'UPDATE usuarios SET ';
        let values = [id];
        let aux = 1;

        
        for (let parametro in parametros) {
            if (parametros[parametro]) {
                aux += 1;
                sql += `${parametro} = \$${aux}, `;
                values.push(parametros[parametro]);
            }
        }

        // Remover a vírgula extra no final da string SQL
        sql = sql.slice(0, -2);
        sql += ' WHERE id_usuario = $1 RETURNING *';

        try {
            return await consulta(sql, values);
        } catch (error) {
            return JSON.parse(JSON.stringify(error));
        }
    }

    async delete(id) {
        const sql = 'DELETE FROM usuarios WHERE id_usuario = $1 RETURNING *;';
        try {
            const resultado = await consulta(sql, [id]);
            return resultado;
        } catch (e) {
            return JSON.parse(JSON.stringify(e));
        }
    }

}

export default new UsuarioRepository()