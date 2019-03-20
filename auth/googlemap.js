const apiKey = require('./googleMapApi.json');
const googleMapClient = require('@google/maps').createClient({
    key : apiKey.key,
    Promise : Promise
});
// googleMapClient.geocode({address: '잠실 리시온'})
//     .asPromise()
//     .then((response) => {
//         console.log(response.json.results);
//     })
//     .catch((err) => {
//         console.log(err);
//     });

module.exports = googleMapClient;
