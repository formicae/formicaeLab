const googleMapClient = require('@google/maps').createClient({
    key : process.env.GOOGLE_API_KEY,
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
