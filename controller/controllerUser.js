var app = angular.module('Login', []);

    app.controller('controlLogin', 
        function($scope, $http, $window) {
            $scope.autenticaLogin = function() {
                //alert("entrou p validar");
                var resposta;
                $http.post('http://127.0.0.1:3000/autenticaLogin', $scope.login)
                    .then(function (response) {
                        resposta = response.data[0].count;
                        if(resposta == 0) {
                            alert("Usuário e/ou senha inválidos!!");
                        }
                        else {
                            $window.location.href = "http://127.0.0.1:8080/home.html";
                    }
                    });
            };
    });
	
	
    app.controller('controlUsuario', 
        function($scope, $http, $window) {
            $scope.adicionarUsuario = function() {
                $http.post('http://127.0.0.1:3000/adicionarUsuario', $scope.usuario)
                    .then(function (response) {
                        alert("Cadastro concluído com sucesso!!");
                        $window.location.href = "http://127.0.0.1:8080/login.html";
                    });
            };
    });