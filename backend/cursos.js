const GetCursos = (pool) => {
  return async (request, reply) => {
    const connection = await pool.connect(); 
    // abre uma conexão com o banco de dados
    
    try {
        const result = await pool.query(`
        SELECT id, nome, horas, ano
        FROM cursos
      `)
    return result.rows.length === 0
        ? rep.code(204).send()
        // se não encontrar nenhum registro retorna 204 

        : rep.code(200).send(result.rows);
        // se encontrar registros returna 200

    }  
    catch (error) {

      console.log(error); 
      // mostra o erro nso terminal

      return rep.code(500).send({ error: "Erro ao buscar clientes" });
      // retorna erro 5000 caso aconteça algum problema no servidor

    } 
    finally {
      connection.release();
      // libera a conexão com o banco 
    }
  };
};


const PostCursos = (pool) => {
  return async (request, reply) => {
    const data = req.body
    const connection = await pool.connect(); 
    // abre uma conexão com o banco de dadostry {
      const { nome, horas, ano } = request.body//pega os dados do curso do campo de requisicao

       try{
      await connection.query("BEGIN");
      const result = await pool.query(`
        INSERT INTO cursos
        (nome, horas, ano)
        VALUES ($1,$2,$3
        )
        RETURNING *
      `,
        const values =[
        data.nome, data.horas, data.ano
        ];                            
     
      const result = await connection.query(sql, values);
      // executa a query passando os valores

      await connection.query("COMMIT");
      // confirma a transação no banco

      return rep.code(201).send({
        msg: "Inserido cokm sucesso",
        id: result.rows[0].id
      });
      // retorna status 201 com o id do cliente criado

    } 
    catch (error) {
      await connection.query("ROLLBACK");
      // desfaz qualquer alteração caso ocorra erro
      console.log(error);
      // mostra o erro no terminal

      return rep.code(500).send({
        error: "Erro ao inserir cliente"
      });
      // retorna erro interno do servidor

    }
    finally {
      connection.release();
      // libera a conexão com o banco

    }
  };
};

const PutCursos = (pool) => {
  return async (request, reply) => {
   const connection = await pool.connect(); 
    const data= req.body;
    const { id } = request.params//pega o id do curso da url
    
      try {
      const { nome, horas, ano } = request.body//pega os dados do curso do campo de requisicao

      const result = await pool.query(`
        UPDATE cursos
        SET nome=$1, horas=$2, ano=$3
        WHERE id=$4
      `, 

        const values =[
        data.nome,
        data.horas,
        data.ano
        ]                              
                                      
       await connection.query(sql, values);
      // executa a atualização

      return rep.code(200).send({
        msg: "Cliente atualizado com sucesso"
      });
      // retorna sucwsso se atualizar corretamente

    } catch (error) {
      console.log(error);
      // mostra erro no telminal

      return rep.code(500).send({
        error: "Erro ao atualçizar cliente"
      });
      // retorna erro interno caso algo falhe

    } finally {
      connection.release();
      // libera a conexãl com o banco
    }
  };
};


const DeleteCursos = (pool) => {
 return async (request, reply) => {
    const connection = await pool.connect(); 
    // abre uma conexão com o banco de dados

   try {

      const { id } = request.params//pega o id do curso da url
      const result = await pool.query(`
        DELETE FROM cursos
        WHERE id=$1
        RETURNING *
      `, [id])

      return reply.status(200).send({
        mensagem: "Curso deletado",
        curso: result.rows
      })
   }
   catch (error) {
      console.log(error);
      // mostra erro no terminal

      return rep.code(500).send({
        error: "Erro ao deletar cliente"
      });
      // retorna erro caso algo dê errado

    } 
   finally {
      connection.release();
      // libera conexão com o banco
    }
  };
};


module.exports = {//exporta as funcoes de cursos para serem usados no server.js
  GetCursos,
  PostCursos,
  PutCursos,
  DeleteCursos
}
