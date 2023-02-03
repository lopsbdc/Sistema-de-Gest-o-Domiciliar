
var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var core_use = require('cors');
var pg = require('pg');

app.use(core_use());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
 
var config = {
  user: 'postgres', //usuario 
  database: 'HOME_HELPER', //banco de dados
  password: '1234', //PASSWORD 
  port: 5432, //porta 
  max: 10, // numero maximo de conexao
  //idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed 
};

var pool = new pg.Pool(config);

//-------------------------------------------------- USUARIOS ----------------------------------------------------//
// rota com protocolo Post para autenticação do usuario
app.post('/autenticaLogin', function (req, res) {
    
  pool.connect(function(err, client, done) {
    if(err) {
    return console.error('error fetching client from pool', err);
    }
    console.log(req.body.email);
    console.log(req.body.senha);
    client.query('SELECT COUNT(*) FROM tb_usuarios WHERE e_mail = \'' + req.body.email + '\' and senha = \'' + req.body.senha + '\'', function(err, result) {
    done();
   
    if(err) {
      return console.error('error running query', err);
    }
    res.setHeader('Access-Control-Allow-Origin','*');
    res.json(result.rows); 
    });
  });
});

// rota com protocolo POST para inserção do usuario no banco de dados
app.post('/adicionarUsuario', function (req, res) {

    pool.connect(function(err, client, done) {
      if(err) {
        return console.error('error fetching client from pool', err);
      }
      console.log(req.body.nome);
      console.log(req.body.sobrenome);
      console.log(req.body.e_mail);
      console.log(req.body.senha);

      client.query('INSERT INTO tb_usuarios (nome, sobrenome, e_mail, senha, fg_ativo) VALUES ( \'' + req.body.nome + '\', \'' + req.body.sobrenome + '\', \'' + req.body.email + '\', \'' + req.body.senha + '\', 1)', function(err, result) {
  
        done();
        if(err) {
          return console.error('error running query', err);
        }

        res.setHeader('Access-Control-Allow-Origin','*');
        res.json(result.rows); 
      });
    });
});


//--------------------------------------------------CATEGORIAS----------------------------------------------------//
// rota com protocolo GET para seleção das categorias no banco de dados
app.get('/consultaCategorias', function (req, res) {
    
  pool.connect(function(err, client, done) {
    if(err) {
    return console.error('error fetching client from pool', err);
    }
    client.query('SELECT * FROM tb_categorias ORDER BY id_categoria', function(err, result) {
    done();
   
    if(err) {
      return console.error('error running query', err);
    }
    res.setHeader('Access-Control-Allow-Origin','*');
    res.json(result.rows); 
    });
  });
});


// rota com protocolo POST para inserção da categoria no banco de dados
app.post('/insereCategoria', function (req, res) {

    pool.connect(function(err, client, done) {
      if(err) {
        return console.error('error fetching client from pool', err);
      }
      client.query('INSERT INTO tb_categorias (descricao, fg_ativo) VALUES (\''+ req.body.descricao +'\',1)', function(err, result) {
        
        done();
        if(err) {
          return console.error('error running query', err);
        }

        res.setHeader('Access-Control-Allow-Origin','*');
        res.json(result.rows); 
      });
    });
});

// rota com protocolo DELETE para remoção da categoria no banco de dados
app.delete('/removeCategoria/:id_categoria', function (req, res) {

  var id_categoria = req.params.id_categoria
    pool.connect(function(err, client, done) {
      if(err) {
        return console.error('error fetching client from pool', err);
      }
      client.query('DELETE FROM tb_categorias WHERE id_categoria = ' + id_categoria, function(err, result) {
        
        done();
     
        if(err) {
          return console.error('error running query', err);
        }

        res.setHeader('Access-Control-Allow-Origin','*');
        res.json(result.rows); 
      });
    });
});

// rota com protocolo PUT para atualização das Categorias no banco de dados
app.put('/atualizaCategorias', function (req, res) {

  pool.connect(function(err, client, done) {
    if(err) {
      return console.error('error fetching client from pool', err);
    }
    client.query('UPDATE tb_categorias set descricao = \'' + req.body.descricao + ' \' WHERE id_categoria = '+ req.body.id_categoria , function(err, result) {
      
      done();
   
      if(err) {
        return console.error('error running query', err);
      }
      res.setHeader('Access-Control-Allow-Origin','*');
      res.json(result.rows); 
    });
  });
});
//-------------------------------------------------- FIM - CATEGORIAS----------------------------------------------------//


//-------------------------------------------------UNIDADES---------------------------------------------------------//
//usado apenas para fazer a rota e mostrar os dados na tabela de suprimentos
// rota com protocolo GET para seleção das unidades no banco de dados
app.get('/consultaUnidades', function (req, res) {
    
  pool.connect(function(err, client, done) {
    if(err) {
    return console.error('error fetching client from pool', err);
    }
    client.query('SELECT * FROM tb_unidades order by descricao', function(err, result) {
    done();
   
    if(err) {
      return console.error('error running query', err);
    }
    res.setHeader('Access-Control-Allow-Origin','*');
    res.json(result.rows); 
    });
  });
});
//-------------------------------------------------FIM - UNIDADES---------------------------------------------------------//

//--------------------------------------------------CONTROLE SUPRIMENTOS-----------------------------------------//
// rota com protocolo GET para seleção dos suprimentos no banco de dados
app.get('/consultaSup', function (req, res) {
  
    pool.connect(function(err, client, done) {
      if(err) {
      return console.error('error fetching client from pool', err);
      }       
       client.query('SELECT s.id_suprimento, s.descricao AS SUPRIMENTO, u.descricao AS UNIDADE, c.descricao AS CATEGORIA, s.quantidade, s.qnt_mensal, s.valor_unit  FROM tb_controle_suprimentos s INNER JOIN tb_unidades u on(s.id_unidade = u.id_unidade)INNER JOIN tb_categorias c ON(s.id_categoria = c.id_categoria) ORDER BY s.id_suprimento;', function(err, result) {
      
      done();
      
      if(err) {
        return console.error('error running query', err);
      }
      res.setHeader('Access-Control-Allow-Origin','*');
      res.json(result.rows); 
        
      });
    });
});

// rota com protocolo POST para inserção de suprimentos no banco de dados
app.post('/insereSup', function (req, res) {

    pool.connect(function(err, client, done) {
      if(err) {
        return console.error('error fetching client from pool', err);
      }
      client.query('INSERT INTO tb_controle_suprimentos (descricao, id_unidade, id_categoria, quantidade, qnt_mensal, valor_unit, fg_ativo)'+
                  'values (\''+req.body.suprimento +'\','+req.body.unidade+','+req.body.categoria+','+
                  req.body.quantidade+','+req.body.qnt_mensal+','+req.body.valor_unit+', 1)', function(err, result) {
        
        done();
     
        if(err) {
          return console.error('error running query', err);
        }

        res.setHeader('Access-Control-Allow-Origin','*');
        res.json(result.rows); 
      });
    });
});

// rota com protocolo DELETE para remoção do suprimento no banco de dados
app.delete('/removeSup/:id_suprimento', function (req, res) {

  var id_suprimento = req.params.id_suprimento
    pool.connect(function(err, client, done) {
      if(err) {
        return console.error('error fetching client from pool', err);
      }
      client.query('DELETE FROM tb_controle_suprimentos WHERE id_suprimento = ' + id_suprimento, function(err, result) {
        
        done();
     
        if(err) {
          return console.error('error running query', err);
        }

        res.setHeader('Access-Control-Allow-Origin','*');
        res.json(result.rows); 
      });
    });
});

// rota com protocolo PUT para atualização das informações no banco de dados
app.put('/atualizaSup/id:suprimento', function (req, res) {

  pool.connect(function(err, client, done) {
    if(err) {
      return console.error('error fetching client from pool', err);
    }
    console.log(descricao);
    console.log(unidade);
    console.log(categoria);
    console.log(quantidade);
    console.log(qnt_mensal);
    console.log(valor_unit);

    client.query('UPDATE tb_controle_suprimentos SET descricao = \'' + 
            req.body.descricao + '\', unidade ='+req.body.unidade+', categoria =' + req.body.categoria + ', quantidade =  ' + req.body.quantidade + 
            ', qnt_mensal = '+ req.body.qnt_mensal + ', valor_unit = ' + req.body.valor_unit +  
            'where id_suprimento = ' + req.body.id_suprimento , function(err, result) {
      
      done();
   
      if(err) {
        return console.error('error running query', err);
      }
      res.setHeader('Access-Control-Allow-Origin','*');
      res.json(result.rows); 
    });
  });
});

//--------------------------------------------------FIM - CONTROLE SUPRIMENTOS-----------------------------------------//

//--------------------------------------------------CONTROLE ENERGIA-----------------------------------------//
// rota com protocolo GET para seleção do controle de energia no banco de dados
app.get('/consultaEnergia', function (req, res) {
  
    pool.connect(function(err, client, done) {
      if(err) {
      return console.error('error fetching client from pool', err);
      }
       client.query('SELECT * FROM tb_controle_energia ORDER BY ano', function(err, result) {
      
      done();
      if(err) {
        return console.error('error running query', err);
      }
      res.setHeader('Access-Control-Allow-Origin','*');

      res.json(result.rows); 
        
      });
    });
});

// rota com protocolo POST para inserção das contas de energia no banco de dados
app.post('/insereEnergia', function (req, res) {

    pool.connect(function(err, client, done) {
      if(err) {
        return console.error('error fetching client from pool', err);
      } 
      client.query('INSERT INTO tb_controle_energia (mes, ano, tarifa, consumo, valor_conta, fg_ativo) VALUES (\''+ req.body.mes + '\', '+ req.body.ano + ', '+ req.body.tarifa + ', '+ req.body.consumo + ', ' + req.body.valor_conta + ',1)', function(err, result) {
        
        
        done();
     
        if(err) {
          return console.error('error running query', err);
        }

        res.setHeader('Access-Control-Allow-Origin','*');
        res.json(result.rows); 
      });
    });
});

// rota com protocolo DELETE para remoção da conta no banco de dados
app.delete('/excluirEnergia/:mes', function (req, res) {

  var mes = req.params.mes
    pool.connect(function(err, client, done) {
      if(err) {
        return console.error('error fetching client from pool', err);
      }
      console.log(mes);
      client.query('DELETE FROM tb_controle_energia WHERE mes = \'' + mes +'\'' , function(err, result) {
        
        done();
     
        if(err) {
          return console.error('error running query', err);
        }

        res.setHeader('Access-Control-Allow-Origin','*');
        res.json(result.rows); 
      });
    });
});

// rota com protocolo PUT para atualização do Controle de Energia no banco de dados
app.put('/atualizaEnergia', function (req, res) {

  pool.connect(function(err, client, done) {
    if(err) {
      return console.error('error fetching client from pool', err);
    }
    client.query('UPDATE tb_controle_energia SET mes = \'' + 
            req.body.mes + '\', ano =' + req.body.id_ano + ', tarifa =  ' + req.body.tarifa + 
            ', consumo = '+ req.body.consumo + ',' + req.body.valor_conta + 
            'where mes = ' + req.body.mes , function(err, result) {
      
      done();
   
      if(err) {
        return console.error('error running query', err);
      }
      res.setHeader('Access-Control-Allow-Origin','*');
      res.json(result.rows); 
    });
  });
});

//--------------------------------------------------FIM - CONTROLE ENERGIA-----------------------------------------//

//--------------------------------------------------GRAFICO - ENERGIA----------------------------------------------//
//usado apenas para fazer a rota e mostrar os dados no grafico de energia
app.get('/graficoEnergia', function (req, res) {
    
  pool.connect(function(err, client, done) {
    if(err) {
    return console.error('error fetching client from pool', err);
    }
    client.query('SELECT mes, consumo, * FROM tb_controle_energia WHERE ano = 2016', function(err, result) {
    done();
   
    if(err) {
      return console.error('error running query', err);
    }
    res.setHeader('Access-Control-Allow-Origin','*');
    res.json(result.rows); 
    });
  });
});
//--------------------------------------------------FIM GRAFICO - ENERGIA----------------------------------------------//
app.listen(3000);


