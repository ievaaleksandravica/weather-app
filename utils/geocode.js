const config = require('../../config.js');
const request = require('postman-request');

const geocode = (address, callback) => {
    // MapBox API
    // encoded address makes sure entering ? becomes %3F and doesn't break
    const mapboxAPI = config.keys.MAPBOX_TOKEN;
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${mapboxAPI}&limit=1`;
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.features.length === 0) {
            callback('No location could be found', undefined)
        } else if (body.message) {
            callback(`The following error have been found: ${body.message}`, undefined)
        } else {
            const data = body.features[0]
            const { center: coordinates, place_name: place } = data
            callback(undefined, {
                longitude: coordinates[0],
                latitude: coordinates[1],
                place
            })
        }
    })
};

module.exports = geocode