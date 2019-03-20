const router = require('express').Router();
const googleApiKey = require('../auth/googleMapApi.json');
const googleMapClient = require('../auth/googlemap');
const User = require('../schema/users');
const locations = [
    {lat: 37.4972, lng: 127.329},
    {lat: 37.4773, lng: 127.529},
    {lat: 37.4921, lng: 127.129},
    {lat: 37.4804, lng: 126.949},
    {lat: 37.5354, lng: 127.129},
    {lat: 37.4488, lng: 126.855},
    {lat: 37.4961, lng: 127.098},
    {lat: 37.4979, lng: 126.946},
    {lat: 37.4913, lng: 127.229},
    {lat: 37.4861, lng: 127.001},
    {lat: 37.4924, lng: 127.165},
    {lat: 37.5172, lng: 126.729},
    {lat: 37.4972, lng: 126.929},
    {lat: 37.5272, lng: 127.429},
    {lat: 37.9062, lng: 127.029},
    {lat: 37.4472, lng: 127.329},
]
// User.find({})
//     .then(result => {
//         console.log(`find User data : ${result}`);
//     })
router.get('/', (req, res, next) => {
    res.render('index');
});

router.get('/info', (req, res, next) => {
    res.render('index');
})

router.get('/map', (req, res, next) => {
    res.render('googlemap', {source:`https://maps.googleapis.com/maps/api/js?key=${process.env.GOOGLE_API_KEY}&callback=initMap`});
})

router.post('/map', (req, res, next) => {
    locations.push([req.body.latitude, req.body.longitude]);
    console.log('location added : ',[req.body.latitude, req.body.longitude]);
    const markers = locations.map(function(location, i) {
        return new googleMapClient.maps.Marker({
            position: location,
            label: labels[i % labels.length]
        });
    });
    const markerCluster = new MarkerClusterer(map, markers, {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});
    res.send(markerCluster);
})

router.get('/board', (req, res, next) => {
    res.render('index');
})

module.exports = router;