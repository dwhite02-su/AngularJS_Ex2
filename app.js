var app = angular.module('weather', []);

app.run(function($rootScope){
    //Your API Key
    $rootScope.key = 'cba02b432420ebbe7ac17ba393d26424';
    

    //Searched for ZIP code
    $rootScope.zip = null;


    //Toggle between views
    $rootScope.displayWeather = false;
});

//Navbar component
app.component('navbar', {
    template: 
    `
        <nav class="navbar navbar-inverse bg-inverse mt-0 mb-0" style="background-color: #343A40;">
            <a class="navbar-brand" style="color:#fff;" href="#">Angular Weather</a>
            <div class="d-flex justify-content-end">
                <button class="btn my-2 my-sm-0" style="color:#fff; border: 1px solid #fff; background-color:#343A40;"type="submit">Register</button>
                <button class="btn my-2 ml-2 my-sm-0" style="color:#fff; border: 1px solid #fff; background-color:#343A40;"type="submit">Sign In</button>    
            </div>
        </nav>
    
    `
})




//Search component
app.component('search', {
    template:
    `
         <form class="mt-4" ng-submit="getZip()">
            <div class="form-group d-flex">
                <input ng-model="zip" type="text" placeholder="Enter ZIP Code for weather." class="form-control" />
                <button type="submit" class="btn btn-dark">Search</button>
            </div>
        </form>
    `
    ,
    controller: function ($scope, $rootScope) {
        $scope.zip;

        $scope.getZip = function () {
            $rootScope.zip = $scope.zip;
            $rootScope.displayWeather = true;
        }
    }
})





//Curent Weather Widget Component
app.component('currentWeather', {
    template:
    `
        <div class="current-city" class="display-2">
            {{ current.name }}
        </div>

        <div class="current-temp" class="mt-4 mb-4 display-4">
            Temperature: {{9/5 * (current.main.temp - 273) +32 | number:0 }} °F 
        </div>

        <div class="current-weather mt-4 mb-4 d-flex align-items-center justify-content-center">
            <img />

            <div>

            </div>
        </div>
    `
    //  "|" is a filter 
    ,
    controller:'currentWeatherCtrl'
})

//Controller for Current Weather Component
app.controller('currentWeatherCtrl', function ($http, $scope, $rootScope) {
    $scope.current,
 
    $http({
        url: 'https://api.openweathermap.org/data/2.5/weather',
        method: 'GET',
        params: {
            'appid': $rootScope.key,
            'zip': $rootScope.zip + ',us'
        }
    }).then(function(response) {
       // console.log(response.data);
        $scope.current = response.data;
    })
})




//Forecast Controller
app.controller('forecastCtrl', function ($http, $scope, $rootScope) {
    $scope.forecast;

    $http({
        url: 'https://api.openweathermap.org/data/2.5/forecast',
        method: 'GET',
        params: {
            'appid': $rootScope.key,
            'zip': $rootScope.zip + ',us'
        }
    }).then(function (response) {
        console.log(response);
        $scope.forecast = response.data.list.slice(0, 8)
    })
})




//Forecast Item Component
app.component('forecastItem', {
    bindings: {
        data: '<'
    }
    ,
    template:
    `
    <div class="d-flex row">
        <div class="col-2">
            <img />
        </div>

        <div class="col-3">
            <span></span>
        </div>

        <div class="col-3">
            <span>Temperature: °F</span>
        </div>

        <div class="col-4">
            <span></span>
        </div>
    </div>
    `
})