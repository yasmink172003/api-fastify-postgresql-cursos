const GetCursos = (pool) => {
  return async (request, reply) => {
    try {

      const result = await pool.query(`
        SELECT id, nome, horas, ano
        FROM cursos
      `)

      return reply.status(200).send(result.rows)//retorna os cursos encontrados n banco de dados

    } catch (error) {
      return reply.status(500).send({
        erro: error.message
      })

    }
  }
}


const PostCursos = (pool) => {
  return async (request, reply) => {
    try {

      const { nome, horas, ano } = request.body//pega os dados do curso do campo de requisicao

      const result = await pool.query(`
        INSERT INTO cursos
        (nome, horas, ano)
        VALUES ($1,$2,$3)
        RETURNING *
      `, [nome, horas, ano])//insere o curso no banco de dados e retrorna o curso inserido

      return reply.status(201).send(result.rows)//retorna o curso inserido

    } catch (error) {
      return reply.status(500).send({
        erro: error.message
      })

    }
  }
}


const PutCursos = (pool) => {
  return async (request, reply) => {
    try {

      const { id } = request.params//pega o id do curso da url
      const { nome, horas, ano } = request.body//pega os dados do curso do campo de requisicao

      const result = await pool.query(`
        UPDATE cursos
        SET nome=$1, horas=$2, ano=$3
        WHERE id=$4
        RETURNING *
      `, [nome, horas, ano, id])

      if (result.rows.length === 0) {//se o curso com o id fornecido nao existir no banco de dados, retorna um erro
        return reply.status(404).send({
          mensagem: "Curso não encontrado"
        })
      }

      return reply.status(200).send(result.rows)//retorna o resultado atualizado

    } catch (error) {
      return reply.status(500).send({
        erro: error.message
      })

    }
  }
}
const DeleteCursos = (pool) => {
  return async (request, reply) => {
    try {

      const { id } = request.params//pega o id do curso da url
      const result = await pool.query(`
        DELETE FROM cursos
        WHERE id=$1
        RETURNING *
      `, [id])

      if (result.rows.length === 0) {
        return reply.status(404).send({
          mensagem: "Curso não encontrado"
        })
      }

      return reply.status(200).send({
        mensagem: "Curso deletado",
        curso: result.rows
      })

    } catch (error) {
      return reply.status(500).send({
        erro: error.message
      })

    }
  }
}


module.exports = {//exporta as funcoes de cursos para serem usados no server.js
  GetCursos,
  PostCursos,
  PutCursos,
  DeleteCursos
}