// place your application-wide javascripts here

var app = angular.module('selfService', ['ngResource', 'backendServices']);


app.controller('AppCtrl', function($scope,$resource, Weather, User, UserSession) {

    $scope.emailText = null;
    $scope.states = ['Alabama', 'Alaska', 'California', 'Delaware', 'Pennsylvania'];
    $scope.sushiTypes = [
          'Amaebi – Sweet shrimp',
          'Boston Rolls – Crab, salmon, and scallion',
          'California – Crab and avocado',
          'Ebi – Shrimp',
          'Hamachi – Yellow Tail'];

    $scope.signUp = function() {
        var newUser = new User({"name":$scope.signUpName,"email":$scope.signUpEmail,"password":$scope.signUpPassword});
        newUser.$save();
        $scope.user = newUser;
        $scope.$broadcast('event:auth-loginConfirmed');

        $scope.signUpName = null;
        $scope.signUpEmail = null;
        $scope.signUpPassword = null;
        $scope.signUpVerifyPassword = null;

    };

    $scope.signIn = function() {
        var userSession = new UserSession();
        var user = userSession.$signin({email:$scope.signInEmail, password:$scope.signInPassword}, function(success){
            $scope.user = success;

            if($scope.user.user.zipcode) {
                $scope.zipcode = $scope.user.user.zipcode;
                $scope.weatherList = Weather.get({zipcode:$scope.zipcode}, function() {
                });
            }
            if($scope.user.user.sushitype) {
                $scope.sushitype = $scope.user.user.sushitype;
            }
            if($scope.user.user.state) {
                $scope.state = $scope.user.user.state;
            }

            $scope.$broadcast('event:auth-loginConfirmed');
            $scope.signInEmail = null;
            $scope.signInPassword = null;
        }, function(error) {
            $scope.$broadcast('event:auth-loginFailed');
             //console.log('Unable to authorize user: ' + error);
        });



    };

    $scope.save = function() {

       if($scope.zipcode || $scope.state || $scope.sushitype)  {
           var user = User.get({userId:$scope.user.user.id}, function() {
               user.zipcode = $scope.zipcode;
               user.state = $scope.state;
               user.sushitype = $scope.sushitype;
               user.$update({userId:$scope.user.user.id}, function() {
                   $scope.$broadcast('event:preferences-updated');
               });
           });
           if($scope.zipcode) {
             $scope.weatherList = Weather.get({zipcode:$scope.zipcode}, function() {
             });
           }
        }
    };

    $scope.logout = function() {
        $scope.user = null;
        $scope.signUpName = null;
        $scope.signUpEmail = null;
        $scope.signUpPassword = null;
        $scope.signUpVerifyPassword = null;
        $scope.zipcode = null;
        $scope.state = null;
        $scope.sushitype = null;
        $scope.$broadcast('event:auth-loginRequired');
    };

});


/**
 * This directive will find itself inside HTML as a class,
 * and will remove that class, so CSS will remove loading image and show app content.
 * It is also responsible for showing/hiding login form.
 */
app.directive('selfServiceApp', function() {
    return {
        restrict: 'C',
        link: function(scope, elem, attrs) {
            //once Angular is started, show login and hide content:
            //console.log("Called when Agnular starts!!!!");
            var login = elem.find('#login-holder');
            var main = elem.find('#content');
            var pref = elem.find('#preferences');
            var loginFailed = elem.find('#login-failed');
            var notification = elem.find('.show-blackgloss');

           login.show();
            main.hide();
            pref.hide();
            loginFailed.hide();


            scope.$on('event:auth-loginRequired', function() {
                login.show();
                main.hide();
                pref.hide();
                loginFailed.hide();
            });

            scope.$on('event:auth-loginFailed', function() {
                loginFailed.show();
            });

            scope.$on('event:auth-loginConfirmed', function() {
                login.hide();
                main.show();
                pref.show();
                loginFailed.hide();
            });

            scope.$on('event:preferences-updated', function() {
                notification.notify({
                    message: { text: 'Preferences Update!' },
                    type: 'blackgloss'
                }).show();
            });



        }
     }
});