/**
 * Created with JetBrains PhpStorm.
 * User: rrojas
 * Date: 10/7/12
 * Time: 8:06 PM
 * To change this template use File | Settings | File Templates.
 */

var app = angular.module('backendServices', ['ngResource']);

app.factory('Weather', function($resource) {
    return $resource('weather/:zipcode/weather', {}, {
        query: {method:'GET', params:{}, isArray:false}
    });
});

app.factory('User', function($resource) {
    var User = $resource('/users/:userId', {
        userId:'@id'
    }, {
        signin: {method: 'POST'}, update: {method: 'PUT'}
    });

    return User;

});

app.factory('UserSession', function($resource) {
    var UserSession = $resource('/signin', {}, {
        signin: {method: 'POST'}
    });

    return UserSession;

});
