const request = require('postman-request');


const geoCode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoicmFuZG9tdXNlcm5hbWUxMyIsImEiOiJjbDRwbDNtd2gwZnA3M2ptd3djM2d5MzZoIn0.IagWlb5zQXqt3b4r9Y7F-Q';
    request({ url, json: true }, (error, { body }) => {               // Object destruc here earlier code-  (error, response)
        if (error) {
            callback('unable to connect to location services', undefined)
        } else if (body.features.length === 0) {
            callback('unable to find location', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}





module.exports = geoCode;