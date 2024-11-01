import pg from 'pg';


const { Client } = pg;
const conexao = new Client({
  user: 'postgres',
  password: 'postgres',
  host: 'localhost',
  port: 5432,
  database: 'SaborALaCarte_v2',
});
try{
await conexao.connect();
console.log(`Conectado ao banco de dados ${conexao.database}`)
}
catch(e)
{
  console.log("Falha ao conectar ao banco de dados. O banco de dados está rodando?")
}
export const consulta = (sql, values = '') => {
  return new Promise((resolve, reject) => {
    conexao.query(sql, values, (error, resultado) => {
      if (error) return reject(error)
      // reject({Code: error['code'], Detail: error['detail'] });
      else {
          if (resultado['rowCount'] == 0) {
            return reject( resultado );
          }
          return resolve(resultado.rows);
      }
    });
  });
}

export default conexao;
