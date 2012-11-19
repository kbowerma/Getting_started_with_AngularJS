== Welcome to the Getting Started with AngularJS
== Challenge #1814 - Getting Started with AngularJS

Challenge Requirements

Create a simple self-service registration/login and user preferences application using using Angular,
node and Mongo. Once logged in, create a preferences page that stores some dummy preference in MongoDB but
make sure to include state, zip code and favorite type of sushi. Show the temperature/weather based on the user's zip code.


This sample application demonstrates how to:

   - Build a simple MVC AngularJS, Node.js and MongoDB application.
   - AngularJS Module resources, simple form validation.
   - Use Twitter Bootsrap for styling and transitions.
   - The backend code runs on Node.js.


Here is the Nodester URL of the application:
  https://challenge1814.aws.af.cm



The starting point of this sample application was made with a combination of:

   -  The Building an AngularJS App (AngularJS NYC Meetup 2012-07-13) video
     http://www.youtube.com/watch?v=GJey_oygU3Y

   - The AngularJS Developer's Guide:
    http://docs.angularjs.org/guide/



MVC Architecture:
================
This sample application was built with the AngularJS MVC (front-end) and Node.js RailwayJS MVC (back-end) framework
and MongoDB as the datasource repository.

Node.js RailwayJS MVC Routes:
=============================

      POST   /users.:format?              users#create
         Used to create the user account.

      PUT    /users/:id.:format?          users#update
         Used to update the user account information/preferences.

      GET    /users/:id.:format?          users#show
         Used to load the user account information.

      POST   /signin                      user_sessions#create
         Used to sigin the user into the application.

      GET    /weather/:weather_id/weather weather#byzipcode
         Used to get the Weather information. This uses the WeatherBug REST API.
         The var WEATHER_BUG_KEY='...' in the app/controllers/weather_controller.js needs to be set
         with your WeatherBug Key.
         Register at: http://developer.weatherbug.com/member/register


   	See config/routes.js file for details on the routes configured.
   	See the RailwayJS routes documentation for more information on how to configure routes:
   	       http://railwayjs.com/#routing

Node.js RailwayJS MVC Controllers:
=================================
    There are three controllers in this application.

    users_controller: CRUD for user account.

    user_sessions: Creates session for users.

    weather_controller: Proxy Service for WeatherBug REST API.


Node.js RailwayJS MVC Model:
===========================
   - The model app/models/user.js takes care of mapping the user properties
     to MongoDB using the Mongoose library.

    See the db/schema.js file.




AngularJS MVC Controllers:
==========================
  The file public/javascripts/application.js defines the AngularJS 'AppCtrl' Controller.
  This controller manages the flow of data between the views and the backend Node.js application.


AngularJS MVC Views:
===================
   The only view in this application index.html.

   - The (public/index.html) displays the home page (login/signup) and user home page.








