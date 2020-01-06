var testApp = angular.module("testApp", []);

testApp.controller("testController", function ($scope, $http) {
    $scope.show = false
    $scope.isRepo = false
    $scope.isRepos = false
    $scope.getRequestSearch = function () {
        $scope.isRepo = true
        $scope.show = true
        $scope.isRepos = false
        var userName = $scope.username
        var repoName = $scope.reponame

        if (repoName === undefined || repoName === '') {
            var url = "https://api.github.com/users/" + userName + "/repos"
            $http.get(url).then(
                function successCallback(response) {
                    if (response.data.message === "Not Found") {
                        alert('Username name not exist')
                    }
                    $scope.dataInfo = response.data
                },
                function errorCallback(response) {
                    alert('Username not exist')
                }
            )
        } else {
            $scope.isRepos = true
            $scope.isRepo = false
            $scope.show = false
            var url = "https://api.github.com/repos/" + userName + "/" + repoName
            $http.get(url).then(
                function successCallback(response) {
                    if (response.data.message === "Not Found") {
                        alert('Repository name not exist')
                    }
                    $scope.dataInfo = response.data
                },
                function errorCallback(response) {
                    alert('Repository name not exist')
                }
            )
        }
    }
    $scope.getRequestPicked = function () {
        $scope.show = false
        for (var i = 0; i < $scope.dataInfo.length; i++) {
            if ($scope.dataInfo[i].checked) {
                $scope.dataInfo[i].checked = true
            }
        }
    }
})