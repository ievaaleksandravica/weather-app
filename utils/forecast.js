const config = require('../../config.js');
const request = require('postman-request');
const chalk = require('chalk');


const forecast = (longitude, latitude, callback) => {
    // Weather API
    const weatherAPI = config.keys.WEATHERSTACK_KEY;
    const url = `http://api.weatherstack.com/current?access_key=${weatherAPI}&query=${latitude},${longitude}`;
    // printing a small forecast to the user 
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service', undefined)
        } else if (body.error) {
            callback(`The following error have been found: ${body.error.info}`)
        } else {
            const data = body.current;
            const { temperature, feelslike, weather_descriptions } = data
            callback(undefined, 'It is currently ' + chalk.green.bold(temperature) + ' degrees out! It feels like ' + chalk.yellow.bold(feelslike) + ' degrees out. It is ' + chalk.green(weather_descriptions[0].toLowerCase()) + '.'
            )
        }
    });

}

module.exports = forecast