
	//5. CONTROLE ENERGIA
	var app = angular.module('Energia', []);
				app.controller('ctrlEnergia', 
					function($scope, $http) {
						// consulta no banco de dados e atualiza tabela 	
						var atualizaTabela = function(){
							$http.get('http://127.0.0.1:3000/consultaEnergia')
							.then(function (response){
								$scope.listaEnergia = response.data;		
								}
							);
						};
						//carrega estas informações para o combo-box
						$scope.Meses = [
							{id: 1, mes: "Janeiro"},
							{id: 2, mes: "Fevereiro"},
							{id: 3, mes: "Março"},
							{id: 4, mes: "Abril"},
							{id: 5, mes: "Maio"},
							{id: 6, mes: "Junho"},
							{id: 7, mes: "Julho"},
							{id: 8, mes: "Agosto"},
							{id: 9, mes: "Setembro"},
							{id: 10, mes: "Outubro"},
							{id: 11, mes: "Novembro"},
							{id: 12, mes: "Dezembro"},
						];
						//carrega estas informações para o combo-box
						$scope.Ano = [
							{ano: 2015},
							{ano: 2016},
							{ano: 2017},
							{ano: 2018},
							{ano: 2019},
							{ano: 2020},
						];

						// consulta as contas no banco de dados
						$scope.consultaEnergia = function(){
							atualizaTabela();
						};

						// remove do banco de dados
						$scope.excluirEnergia = function(mes){
							var resposta = confirm("Confirma a exclusão deste elemento?");
							if (resposta == true){
								$http.delete('http://localhost:3000/excluirEnergia/' + mes)
								.then(function (response){
									atualizaTabela();
								});
							}
						};
						// insere no banco de dados
						$scope.insereEnergia = function(){
							
							$http.post('http://localhost:3000/insereEnergia', $scope.energia)
							.then(function (response){
								atualizaTabela();
								//alert("Inserção com sucesso!!");
							}
							);							
						};

						// atualiza no banco de dados
						$scope.atualizaEnergia = function(){
							$http.put('http://localhost:3000/atualizaEnergia', $scope.energia)
							.then(function (response){
								atualizaTabela();
								alert("Atualização com sucesso!!");
							}
							);
							
						};	

						// função que retorna a posição da conta pelo seu mes 
						function retornaIndice(mes){
							var i;
							for (i=0;i<$scope.listaEnergia.length;i++){
									if ($scope.listaEnergia[i].mes == mes){
										return i; // retorna posição do produto desejado
									}
							}
							return -1;
						}
						// coloca a conta para edição
						$scope.atualizaEnergia = function(mes){
							var posicao = retornaIndice(mes);
							$scope.energia = $scope.listaEnergia[posicao];
						}
							
					}
				);	

