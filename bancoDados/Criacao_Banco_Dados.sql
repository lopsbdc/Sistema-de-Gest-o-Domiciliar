--CRIAÇÃO DO BANCO DE DADOS 

CREATE DATABASE "HOME_HELPER"
ENCODING = 'WIN1252'
TEMPLATE = TEMPLATE0
CONNECTION LIMIT = -1;

----CRIAÇÃO DA TABELAS
--1. Criação da tabela Usuários 

CREATE TABLE tb_usuarios(
id_usuario		SERIAL,
nome			VARCHAR(30),
sobrenome		VARCHAR(30),
e_mail			VARCHAR(50),
senha			VARCHAR(8),
fg_ativo		INTEGER,

CONSTRAINT pk_tb_usuarios_id_usuario PRIMARY KEY (id_usuario)
);

--2. Criação da tabela de Unidades
CREATE TABLE tb_unidades(
id_unidade		SERIAL,
descricao		VARCHAR(15),
fg_ativo 		INTEGER,

CONSTRAINT pk_tb_unidades_id_unidade PRIMARY KEY (id_unidade)
);

--3. Criação da tabela de Categorias
CREATE TABLE tb_categorias(
id_categoria		SERIAL,
descricao		VARCHAR(30),
fg_ativo		INTEGER,

CONSTRAINT pk_tb_categorias_id_categoria PRIMARY KEY (id_categoria)
);

--4. Criação da tabela de Suprimentos
CREATE TABLE tb_controle_suprimentos(
id_suprimento		SERIAL,
id_unidade   		INTEGER,
id_categoria		INTEGER,
descricao		VARCHAR(30),
quantidade		INTEGER,
qnt_mensal		INTEGER,
valor_unit		NUMERIC(7,2)
			CONSTRAINT valor_unit CHECK (valor_unit > 0),
fg_ativo		INTEGER,			

CONSTRAINT pk_tb_controle_suprimentos_id_suprimento PRIMARY KEY (id_suprimento),
CONSTRAINT fk_tb_controle_suprimentos_id_unidade FOREIGN KEY (id_unidade)			
	   REFERENCES tb_unidades (id_unidade),
CONSTRAINT fk_tb_controle_suprimentos_id_categoria FOREIGN KEY (id_categoria)			
	   REFERENCES tb_categorias (id_categoria)
);


--5. Criação da tabela de Controle Energia
CREATE TABLE tb_controle_energia(
mes			VARCHAR(9),
ano			INTEGER,
tarifa	        	NUMERIC(7,2),
consumo         	INTEGER,
valor_conta     	NUMERIC(10,2),
fg_ativo		INTEGER,

CONSTRAINT pk_tb_controle_energia_mes_ano PRIMARY KEY (mes,ano)
);	



--Carga na tabela de Unidades
INSERT INTO tb_unidades(descricao, fg_ativo)
VALUES
('Unidade',1),
('Kilo', 1),
('Litro', 1),
('Lata', 1);


--Carga na tabela de energia
INSERT INTO tb_controle_energia(mes, ano, tarifa, consumo, valor_conta, fg_ativo)
values
('janeiro', 2016, 2, 3, , 1);

 select * 
 from tb_controle_energia
 order by ano;

 select * 
 from tb_categorias;

 delete from tb_controle_energia
 where mes = 'Junho';