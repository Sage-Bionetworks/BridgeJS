if ( !window.requestAnimationFrame ) {
    window.requestAnimationFrame = ( function() {
        return window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function(callback, element) {
            window.setTimeout(callback, 1000 / 60);
        };
    } )();
}

var neurod = angular.module('neurod', ['bridge.shared']);

neurod.config(function($sceDelegateProvider) {
    $sceDelegateProvider.resourceUrlWhitelist([
        'self',
	'https://' + window.assetsHost + '/**'
    ]);
}).config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/about', {
        templateUrl: 'https://' + window.assetsHost + '/neurod/views/about.html'
    })
    .when('/join', {
        templateUrl: 'https://' + window.assetsHost + '/neurod/views/join.html',
        controller: 'JoinController'
    })
    .when('/joined/:email', {
        templateUrl: 'https://' + window.assetsHost + '/neurod/views/joined.html',
        controller: 'JoinedController'
    })
    .otherwise({
        templateUrl: 'https://' + window.assetsHost + '/neurod/views/main.html'
    });
}]);
