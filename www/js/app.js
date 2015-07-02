// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
//angular.module('starter', ['ionic'])
var app = angular.module('testApp', ['ionic','testApp.controllers'])

.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('template', {
            url: '/template',
            templateUrl: 'template.html',
            controller: 'MapCtrl'
        })
    $urlRouterProvider.otherwise('/home');
})

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
	
    if (window.cordova) {
      if (window.plugins && window.plugins.backgroundGeoLocation) {
        BackgroundGeolocation.configurePlugin(window.plugins.backgroundGeoLocation);
      }
    }
  });
})