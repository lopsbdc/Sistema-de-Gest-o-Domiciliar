//2. CONTROLE UNIDADES
	var app = angular.module('UNIDADES', []);
				app.controller('controlador', 
					function($scope, $http) {
						
						// consulta no banco de dados e atualiza tabela na camada view	
						var atualizaTabela = function(){
							$http.get('http://localhost:3000/consulta')
							.then(function (response){
								$scope.listaProdutos = response.data;			
								}
							);
						};
						// consulta os produtos no banco de dados
						$scope.consulta = function(){
							atualizaTabela();
						};
						// remove do banco de dados
						$scope.remover = function(id_unidade){
							var resposta = confirm("Confirma a exclusão deste elemento?");
							if (resposta == true){
								$http.delete('http://localhost:3000/remove/' + id_unidade)
								.then(function (response){
									atualizaTabela();
								});
							}
						};
						// insere no banco de dados
						$scope.inserir = function(){
							$http.post('http://localhost:3000/insere', $scope.produto)
							.then(function (response){
								atualizaTabela();
								alert("Inserção com sucesso!!");
							}
							);
							
						};
						// atualiza no banco de dados
						$scope.atualizar = function(){
							$http.put('http://localhost:3000/atualiza', $scope.produto)
							.then(function (response){
								atualizaTabela();
								alert("Atualização com sucesso!!");
							}
							);
							
						};	

					// coloca o produto para edição
					$scope.Atualizar = function(id_unidade){
						var posicao = retornaIndice(id_unidade);
						$scope.produto = $scope.listaProdutos[posicao];
					}
					// função que retorna a posição de um produto pelo seu código 
					function retornaIndice(id_unidade){
						var i;
						for (i=0;i<$scope.listaProdutos.length;i++){
								if ($scope.listaProdutos[i].id_unidade == id_unidade){
									return i; // retorna posição do produto desejado
								}
						}
						return -1;
					}
						
					}
				);	

