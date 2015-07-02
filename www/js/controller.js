// Define the angular module
angular.module('test.controllers', ['ionic', 'ngCordova.plugins.geolocation',
    'ngCordova.plugins.backgroundGeolocation'])
	
.controller('MapCtrl', ['$scope', '$ionicPopup', '$cordovaGeolocation', '$cordovaBackgroundGeolocation', '$timeout', '$http', function ($scope, $ionicPopup, $cordovaGeolocation, $cordovaBackgroundGeolocation, $timeout, $http) {
	$scope.loaded = false;
	var options = {
		// https://github.com/christocracy/cordova-plugin-background-geolocation#config
    };
	
	var posOptions = { timeout: 5000, enableHighAccuracy: true, maximumAge: 5000 };
	$cordovaGeolocation.getCurrentPosition(posOptions)
		.then(function (location) {
			$scope.currentLat = location.coords.latitude;
			$scope.currentLong = location.coords.longitude;
			$scope.loaded = true;
			//console.log($scope.currentLat, $scope.currentLong);
		});
		
		document.addEventListener("deviceready", onDeviceReady, false);
		
		function onDeviceReady() {
			var bgGeo = $cordovaBackgroundGeolocation;
			
			// BackgroundGeoLocation is highly configurable.
			bgGeo.configure({
				url: 'http://ottoplayapi-prod.elasticbeanstalk.com/user/addVisit/',
				params: {
					deviceId: "0502fd09-09e7-4756-97fa-7a0106d3fd45",
					"location": {
						"latitude": "38.896339999999995",
						"longitude": "-77.08521460000001"
					}
				},
				desiredAccuracy: 10,
				stationaryRadius: 20,
				distanceFilter: 30,
				notificationTitle: 'TestTitle', // <-- android only, customize the title of the notification
				notificationText: 'TestText', // <-- android only, customize the text of the notification
				activityType: 'OtherNavigation',
				debug: true, // <-- enable this hear sounds for background-geolocation life-cycle.
				stopOnTerminate: false // <-- enable this to clear background location settings when the app terminates
			});

			bgGeo.start(); // Sahil: Do we need this?? Configure calls start internally.
		};
}])

.directive('bgeo', ['$cordovaGeolocation', '$cordovaBackgroundGeolocation', '$http', function ($cordovaGeolocation, $cordovaBackgroundGeolocation, $http) {
    return {
		scope: {
           lat: '=',
           lng: '='
       },
        link: function (scope) {
			console.log("directive: ", scope.lat, scope.lng);
				myLatLng = new google.maps.LatLng(scope.lat, scope.lng);
				mapOptions = {
					zoom: 16,
					center: myLatLng
				};
				map = new google.maps.Map(document.getElementById('map'), mapOptions);
				marker = new google.maps.Marker({
					position: myLatLng,
					map: map,
					draggable: false,
					icon: 'small-orange-pin.png'
				});
        }
    }
}])


// ALTERNATIVE DECLARATION OF BACKGROUND GEO
  // document.addEventListener("deviceready", function () {

    // // `configure` calls `start` internally
    // $cordovaBackgroundGeolocation.configure(options)
    // .then(
      // null, // Background never resolves
      // function (err) { // error callback
        // console.error(err);
      // },
      // function (location) { // notify callback
        // console.log(location);
      // });

    // $scope.stopBackgroundGeolocation = function () {
      // $cordovaBackgroundGeolocation.stop();
    // };

  // }, false);