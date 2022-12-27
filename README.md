# Get Started with WEBAR on Web


## About this repository

This App shows different shapes and models in the AR mode. 

To run this application you need to have a mobile or tablet device that supports AR

This App is deployed at https://getting-started-webar.netlify.app/

## Running the app

To get up and running, clone the repo and run the following commands to install dependencies and start the app using [localtunnel](https://github.com/localtunnel/localtunnel).

    npm install
    npm start:live

This will install the app dependencies, start an instance of webpack-dev-server and expose the local web server to the internet using. The localtunnel URL will be printed to your terminal.

## A note on debugging

As the app is running on a mobile device, you won't be able to easily access the devtools directly in the mobile browser. For development and debugging, attach the device to your machine using a cable and access the url `chrome://inspect/#devices` in your desktop version of Chrome. Allow debug access when prompted on your device. You should then be able to see your device appear in the inspection window you opened earlier, where you can use the `inspect` functionality to get access to the running app instance for debugging.

## Credits

Thanks to [*Poly by Google*](https://poly.pizza/m/fzCu8FM0HfB) for the Koala model.

Thanks to [*Sopra Steria Norge*](https://github.com/sopra-steria-norge) for the boiler plate code

Note: This repository is forked from https://github.com/sopra-steria-norge/get-started-with-ar-web
