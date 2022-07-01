const request = require('postman-request');

// const forcast = (address, callback) => {

//     const url = 'http://api.weatherstack.com/current?access_key=652c5aab326e19761a34ea58a2c39e33&query=' + address;

//     request({ url: url, json: true }, (error, response) => {
//         if (error) {
//             callback('unable to connect to forcast services please check for internet', undefined)
//         } else if (response.body.current.length === 0) {
//             callback('unable to find forcast', undefined)
//         } else {
//             callback(undefined, {

//                 temperature: response.body.current.temperature

//             })
//         }
//     })
// }



const forcast = (latitude,longitude,callback) => {

    const url = 'http://api.weatherstack.com/current?access_key=652c5aab326e19761a34ea58a2c39e33&query=' + latitude + ',' + longitude + '&units=m';

    request({ url, json: true }, (error, {body}) => {      // Object destruc here earlier code-  (error, response)
        if (error) {
            callback('unable to connect to forcast services please check for internet', undefined)
        } else if (body.error) {             // earlier code -  (response.body.error)
            callback('unable to find forcast', undefined)
        } else {
            callback(undefined, 'It is currently ' + body.current.temperature + ' degrees out but feels like ' + body.current.feelslike)
        }
    })
}

module.exports = forcast;


