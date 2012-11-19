load('application');


var WEATHER_BUG_KEY='';
var WEATHER_REST_API_SERVER_URL = "http://i.wxbug.net/REST/Direct/GetForecast.ashx?nf=6&ih=1&ht=t&ht=i&l=en&c=US&api_key="+WEATHER_BUG_KEY;

before(getWeatherByZipCode, {only: ['byzipcode']});

action('byzipcode', function () {
    send({
        weather: this.weather
    });
});



// ###### DATA METHODS #######

function getWeatherByZipCode() {

    var theThis = this;
    theThis.weather;

    doRequest(WEATHER_REST_API_SERVER_URL+"&zip="+params.weather_id, function(results) {
        theThis.weather = results.forecastList;
        next();
    });
}


function doRequest(url, callback) {
    var request = require('request');
    request(url,
        function (error, response, body) {
            if (!error && response.statusCode == 200) {
                //console.log("Results body: " + body); // Print json output.
                callback(JSON.parse(body));

            }
        }
    );
}