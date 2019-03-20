function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 10,
        center: {lat: 37.4972, lng: 127.029}
    });

    // Create an array of alphabetical characters used to label the markers.
    var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    // Add some markers to the map.
    // Note: The code uses the JavaScript Array.prototype.map() method to
    // create an array of markers based on a given "locations" array.
    // The map() method here has nothing to do with the Google Maps API.
    var markers = locations.map(function(location, i) {
        return new google.maps.Marker({
            position: location,
            label: labels[i % labels.length]
        });
    });

    // Add a marker clusterer to manage the markers.
    var markerCluster = new MarkerClusterer(map, markers,
        {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});
}
var locations = [
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

const inputForm = document.getElementById('geoPoint');
function markPosition(inputButton){
    document.getElementById(inputButton).addEventListener('click', () => {
        console.log('inputform : ',inputForm);
        const formData = new FormData(inputForm);
        console.log('formdata : ',formData);
        formData.append('locations', locations);
        const xhr = new XMLHttpRequest();
        xhr.addEventListener('load', () => {
            // window.location.reload();
        });
        xhr.open('post', '/map', true);
        xhr.send(formData);
    });
}
markPosition('confirmPosition');