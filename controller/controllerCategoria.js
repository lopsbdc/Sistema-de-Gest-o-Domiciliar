//3. CONTROLE CATEGORIAS
	var app = angular.module('Categorias', []);
				app.controller('ctrlCategorias', 
					function($scope, $http) {
						//alert("OK");
						// consulta no banco de dados e atualiza tabela na camada view	
						var atualizaTabela = function(){
							$http.get('http://127.0.0.1:3000/consultaCategorias')
							.then(function (response){
								$scope.listaCategorias = response.data;			
								}
							);
						};
						
						// consulta as categorias no banco de dados
						$scope.consultaCategorias = function(){
							atualizaTabela();
						};
						// remove do banco de dados
						$scope.removeCategoria = function(id_categoria){
							var resposta = confirm("Confirma a exclusão deste elemento?");
							if (resposta == true){
								$http.delete('http://localhost:3000/removeCategoria/' + id_categoria)
								.then(function (response){
									atualizaTabela();
									
								});
							}
						};
						// insere no banco de dados
						$scope.insereCategoria = function(){
							$http.post('http://localhost:3000/insereCategoria', $scope.categoria)
							.then(function (response){
								atualizaTabela();
								//alert("Inserção com sucesso!!");
							}
							);
							
						};
						// atualiza no banco de dados
						$scope.atualizaCategorias = function(){
							$http.put('http://localhost:3000/atualizaCategorias', $scope.categoria)
							.then(function (response){
								atualizaTabela();
								alert("Atualização com sucesso!!");
							}
							);
							
						};	

					// coloca a categoria para edição
					$scope.atualizaCategorias = function(id_categoria){
						var posicao = retornaIndice(id_categoria);
						$scope.categoria = $scope.listaCategorias[posicao];
					}
					// função que retorna a posição da categoria pelo seu código 
					function retornaIndice(id_categoria){
						var i;
						for (i=0;i<$scope.listaCategorias.length;i++){
								if ($scope.listaCategorias[i].id_categoria == id_categoria){
									return i; 
								}
						}
						return -1;
					}
						
					}
				);	
				
