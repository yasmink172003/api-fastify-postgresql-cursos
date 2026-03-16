const authUsers = (pool, jwt, bcrypt, jwtSecret) => {//funcao para autenticar usuarios, recebe a conexao com o banco de dados e as depedendecias necessarias para gerar o token e hash 
  return async (request, reply) => {
  const{username, password}= req.body;
   const connection = await pool.connect();

    
   if(!req.body || !username ||!password)
         return rep.code (400).send({msg:'usuario deve colocar um corpo com as informaçoes necessarias a requisicao'});
   
    
    try {
       const result = await connection.query(//verificar se o email existe no banco de dados   
            "SELECT  "id", "password" FROM usuarios WHERE email=$1",//  consulta sql para selecionar o usuario com o email fornecido                                            
             [username]//passa o email como parametro para evitar sql injection
     );
    } cacth (error){
        console.log (error);
    } const senha= result.rows[0].password;
            await bcrypt.compare(password, senha).then(() => {
             //Gerando um token de 1hora de duração para segurança.
                const token = jwt.sign({username, id: result.rows[0].id}, jwtSecret, {expiresIn: '1h'});
                const tokenIssuedAt = jwt.verify(token, jwtSecret).iat;
                const tokenDuration = jwt.verify(token, jwtSecret).exp;


            //Devolvendo o token para o usuário utilizar nas Endpoints.
            //Aqui eu deixei o mais detalhado possivel para o usuário ter dados de quando termina seu acesso a API.
                return rep.code(200).send({
                    username,
                    token,
                    tokenIssuedAt,
                    tokenDuration,
                    tokenIssuedTimestamp: new Date(tokenIssuedAt * 1000).toLocaleString("pt-BR"),
                    tokenDurationTimestamp: new Date(tokenDuration * 1000).toLocaleString("pt-BR")
                });
   
            });

   }catch(error){
        return reply.status(500).send({
        erro:error.message
    })
    finally{
            connection.release();
        }

    }

    }

    module.exports={//exporta a funcao de autenticacao de usuarios para ser usada no server.js
        authUsers
    }
