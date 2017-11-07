angular.module('vidaApp', []).controller('vidaController', function ($scope, $http) {
    var domain = 'https://vida-core-development.herokuapp.com/';

    $scope.loginProcedure = true;
    $scope.loading = false;

    $scope.login = function () {
        $scope.loading = true;
        $http({
            method: 'POST',
            url: domain + 'api/sessions',
            data: {
                api_user: {
                    email: $scope.email,
                    password: $scope.password
                }
            }
        })
        .then(vidaSuccess, vidaError);
    };

    function vidaSuccess(response) {
        console.log('success');
        console.log(response);
//        $scope.id = response.data.data.attributes.role.id;
        $scope.token = response.data.data.attributes.token;
        $scope.showClientsList($scope.token);
    }

    function vidaError(response) {
        $scope.loading = false;
        console.log('http login error');
    }

    $scope.showClientsList = function (token) {
        $http({
            method: 'GET',
            url: domain + 'api/clients',
            headers: {
                'X-USER-EMAIL': $scope.email,
                'X-USER-TOKEN': $scope.token
            }
        })
        .then(vidaClientsSuccess, vidaClientsError);
    };

    function vidaClientsSuccess(response) {
        $scope.loading = false;
        $scope.clientsSuccess = true;
        $scope.loginProcedure = false;
        console.log('success');
        return $scope.clients = response.data.data;
    }

    function vidaClientsError(response) {
        $scope.loading = false;
        console.log('http clients error');
    }

    $scope.clientDetails = function (id) {
        $scope.loading = true;
        $http({
            method: 'GET',
            url: domain + 'api/clients/' + id,
            headers: {
                'X-USER-EMAIL': $scope.email,
                'X-USER-TOKEN': $scope.token
            }
        })
        .then(vidaClientDetailsSuccess, vidaClientDetailsError);
    };

    function vidaClientDetailsSuccess(response) {
        $scope.loading = false;
        $scope.clientDetailsSuccess = true;
        console.log('success');
        return $scope.details = response.data.data;
    }

    function vidaClientDetailsError(response) {
        $scope.loading = false;
        console.log('http client details error');
    }
});
