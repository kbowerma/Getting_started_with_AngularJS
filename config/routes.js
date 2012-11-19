exports.routes = function (map) {
    map.resources('users');

    map.post('signin', 'user_sessions#create');

    map.resources('weather', {only: ['byzipcode']}, function (weather) {
        weather.get('weather', 'weather#byzipcode');
    });


    // Generic routes. Add all your routes below this line
    // feel free to remove generic routes
    map.all(':controller/:action');
    map.all(':controller/:action/:id');
};