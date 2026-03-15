const authUsers = (pool, jwt, bcrypt, jwtSecret) => {//funcao para autenticar usuarios, recebe a conexao com o banco de dados e as depedendecias necessarias para gerar o token e hash 
  return async (request, reply) => {
  
    try {
        const { email, senha } = request.body//pega o email e a senha do campo de requisicao

        const user = await pool.query(//verificar se o email existe no banco de dados   
            "SELECT * FROM usuarios WHERE email=$1",//  consulta sql para selecionar o usuario com o email fornecido                                            
             [email]//passa o email como parametro para evitar sql injection
     )

    if(user.rows.length === 0){//se o email nao existir no banco de dados, ele cria outro usuario

        const hash = await bcrypt.hash(senha,10)//gera um hash da senha para armazanar no banco de dados

    //insere o email e asenha hash no banco de dados para criar o usuario 
    await pool.query(`
    "INSERT INTO usuarios (email,senha) 
         VALUES ($1,$2)",
            [email,hash]
    `)

    return reply.send({
     mensagem:"Usuário criado"
    })
    }
        const usuario = user.rows[0]//pega o usuario do banco de dados

     const senhaValida = await bcrypt.compare(senha,usuario.senha)//compara a senha digitada com a senha hash armazenada no banco 

    if(!senhaValida){
        return reply.status(401).send({
            erro:"Senha inválida"
        })
    }

    const token = jwt.sign(//gera um token jwt com o id e email do usuario, a chave secreta e o tempo de epiraçao de 1h
         { id: usuario.id, email: usuario.email },jwtSecret,
         { expiresIn: "1h" }
    )

    return reply.send({
        token
})

   }catch(error){
        return reply.status(500).send({
        erro:error.message
    })

    }

    }

    }

    module.exports={//exporta a funcao de autenticacao de usuarios para ser usada no server.js
        authUsers
    }