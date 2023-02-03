
	//4.CONTROLE SUPRIMENTOS
	var app = angular.module('Suprimentos', []);
				app.controller('ctrlSuprimentos', 
					function($scope, $http) {
						
						// consulta no banco de dados e atualiza tabela na camada view	da tabela de suprimentos
						var atualizaTabela = function(){
							$http.get('http://127.0.0.1:3000/consultaSup')
							.then(function (response){
								$scope.listaSuprimentos = response.data;			
								}
							);
							// consulta no banco de dados e atualiza a tabela de categorias na tabela de suprimentos
							$http.get('http://127.0.0.1:3000/consultaCategorias')
							.then(function (response){
								//alert ("entrou");
								$scope.listaCategorias = response.data;			
								}
							);
							// consulta no banco de dados e atualiza tabela de unidades na tabela de suprimentos
							$http.get('http://127.0.0.1:3000/consultaUnidades')
							.then(function (response){
								//alert ("entrou");
								$scope.listaUnidades = response.data;			
								}
							);
						};
	
						// consulta a tabela de categoria para mostrar no combo box para o usuario escolher
						$scope.consultaSup = function(){
							atualizaTabela();
						};

						// remove do banco de dados
						$scope.removeSup = function(id_suprimento){
							var resposta = confirm("Confirma a exclusão deste elemento?");
							if (resposta == true){
								$http.delete('http://127.0.0.1:3000/removeSup/' + id_suprimento)
								.then(function (response){
									atualizaTabela();
								});
							}
						};
						// insere no banco de dados
						$scope.insereSup = function(){
							$http.post('http://127.0.0.1:3000/insereSup', $scope.suprimento)
							.then(function (response){
								atualizaTabela();
							}
							);
						};

						// atualiza no banco de dados
						$scope.atualizaSup = function(){
							$http.put('http://127.0.0.1:3000/atualizaSup', $scope.suprimento)
							.then(function (response){
								atualizaTabela();
								alert("Atualização com sucesso!!");
							}
							);
							
						};	

						// função que retorna a posição de um produto pelo seu código 
						function retornaIndice(id_suprimento){
							var i;
							for (i=0;i<$scope.listaSuprimentos.length;i++){
									if ($scope.listaSuprimentos[i].id_suprimento == id_suprimento){
										return i; 
									}
							}		
							return -1;
						}

						// coloca o produto para edição
						$scope.atualizaSup = function(id_suprimento){
							var posicao = retornaIndice(id_suprimento);
							$scope.suprimento = $scope.listaSuprimentos[posicao];
							console.log( $scope.listaSuprimentos[posicao]);
						}

					//Geração de PDF com as informações para Compra
					$scope.generatePDF = function()	{
							var docDefinition = {
								content: [
								    {
								        text: 'RELAÇÃO DE SUPRIMENTOS PARA COMPRA'
								    },
								    {
								        style: 'demoTable',
								        table: {
								        widths: ['*', '*', '*', '*'],
								        body: [
								            [{text: 'Descrição', style: 'header'}, {text: 'Unidade', style: 'header'},
								              {text: 'Qnt. Estoque', style: 'header'}, {text: 'Qnt. Mensal', style: 'header'}
								            ],
								            ['Arroz', 'Kilo', '2', '3'],
								            ['Carnes', 'Kilo', '2', '6'],
								            ['Oleo', 'Unidade', '1', '6'],
								            ['Molho de Tomate', 'Unidade', '5', '8'],
								            ['Creme Dental', 'Unidade', '4', '5'],
								            ['Desinfetante', 'Litro', '5', '7'],
								            ['Manteiga', 'Unidade', '1','2']
								        ]
								        }
								    }
								],
						    styles: {
							    header: {
							        bold: true,
							        color: '#000',
							        fontSize: 11
							    },
							    demoTable: {
							        color: '#666',
							        fontSize: 10
							      }
						    }
						};
							pdfMake.createPdf(docDefinition).open();
							// pdfMake.createPdf(docDefinition).print(); 
							 
							// download the PDF 
							pdfMake.createPdf(docDefinition).download();
					        }
						
					}
				);
