var locations = [
    {location :{lat: 37.4972, lng: 127.329}, place_id : "ChIJi4EBGRtNYzURfllWRwR7aeQ"},
    {location :{lat: 37.4773, lng: 127.529}, place_id : "ChIJrTx045ZGYzURfadnKwpLg2M"},
    {location :{lat: 37.4921, lng: 127.129}, place_id : "ChIJD_G4PGOvfDURLCGaAPhDLvs"},
    {location :{lat: 37.4804, lng: 126.949}, place_id : "ChIJkTf1k1OffDUR4mYX2rhiAlE"},
    {location :{lat: 37.5354, lng: 127.129}, place_id : "ChIJobWu3f6vfDURCCVJRz22q0w"},
    {location :{lat: 37.4488, lng: 126.855}, place_id : "ChIJ35aQk85jezURcTQfdFRifk8"},
    {location :{lat: 37.4961, lng: 127.098}, place_id : "ChIJbWf_w7ilfDUR5awbMIe8BCc"},
    {location :{lat: 37.4979, lng: 126.946}, place_id : "ChIJo5PRp3mffDURE276dvulfxU"},
    {location :{lat: 37.4913, lng: 127.229}, place_id : "ChIJTRjmS-ytfDURfDlv0hYrqfc"},
    {location :{lat: 37.4861, lng: 127.001}, place_id : "ChIJOdEZ3wihfDURrhh6s4U8XV4"},
    {location :{lat: 37.4924, lng: 127.165}, place_id : "ChIJy0sjwquvfDUR6DqPuxSTRsg"},
    {location :{lat: 37.5172, lng: 126.729}, place_id : "ChIJ4fEhu6J9ezUR6tQf90yGinQ"},
    {location :{lat: 37.4972, lng: 126.929}, place_id : "ChIJ3fX_bqGffDUR45ojxKK58kQ"},
    {location :{lat: 37.5272, lng: 127.429}, place_id : "ChIJyf3ypeNIYzURGsggLiMX9lg"},
    {location :{lat: 37.9062, lng: 127.029}, place_id : "ChIJX8FvCIjcfDUR9Luq8ueUm3E"},
    {location :{lat: 37.4472, lng: 127.329}, place_id : "ChIJYZpEW41SYzUR8rrbEGtYpz8"}
];
var forkImg = 'resize_forkflag.png';
var availableMarkers = new Map([]);
var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
var markers = [];
let count = 0;
let clusterClick = false;
let cluster;

function initAutocomplete() {
    function addMarker(location, place_id, count, data){
        let marker = new google.maps.Marker({
            position : location,
            map : map,
            icon : forkImg,
            label: labels[count % labels.length],
            // title : `${result[0].formatted_address}`,
            // info : `검색된 장소의 갯수 : ${result.length}`,
            place_id : place_id
        });
        markers.push(marker);
        availableMarkers.set(location, marker);
        availableMarkers.set(marker, location);
        var infowindow = new google.maps.InfoWindow();
        if (data) {
            console.log(data);
            let reviewString = '';
            if (data.reviews) {
                data.reviews.forEach(review => {
                    reviewString += `${getLocalTime(review.time, data.utc_offset)} / ` + '[' + review.author_name + '] : '
                        + review.text + ' < Rate : ' + review.rating + ' >' + '<br><br>';
                    console.log(reviewString)
                })
            }
            infowindow.setContent('<div><strong>' + data.name + place_id + '</strong><br>' + '<br>' + '리뷰 : ' + `${reviewString}` + '전화번호 : ' + data.formatted_phone_number);
            infowindow.open(map, marker);
        }
        marker.addListener('click', function(target) {
            let tempObj = availableMarkers.get(marker);
            availableMarkers.delete(marker);
            availableMarkers.delete(tempObj);
            marker.setMap(null);
            cluster.removeMarker(marker, true);
        });
        cluster.addMarker(marker , true);
        previousCluster = markerCluster;
    }
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 10,
        center: {lat: 37.4972, lng: 127.029}
    });

    // Add a marker clusterer to manage the markers.
    var clusterStyles = [
        {
            textColor: 'white',
            url: 'salt50.png',
            height: 50,
            width: 50
        },
        {
            textColor: 'white',
            url: 'salt70.png',
            height: 70,
            width: 70
        },
        {
            textColor: 'white',
            url: 'salt100.png',
            height: 100,
            width: 100
        }
    ];
    var mcOptions = {
        gridSize: 50,
        styles: clusterStyles,
        maxZoom: 15
    };
    var markerCluster = new MarkerClusterer(map, [], mcOptions);
    cluster = markerCluster;
    google.maps.event.addListener(markerCluster, 'clusterclick', (cluster) => {
        console.log('cluster click : ',cluster);
        clusterClick = true;
    });

    locations.map(function(location, i) {
        addMarker(location.location, location.place_id, i);
        count += 1;
    });

    // // Create the search box and link it to the UI element.
    var input = document.getElementById('pac-input');
    var searchbox = new google.maps.places.SearchBox(input);
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
    // Bias the searchbox results towards current map's viewport.
    map.addListener('bounds_changed', function() {
        searchbox.setBounds(map.getBounds());
    });

    // Listen for the event fired when the user selects a prediction and retrieve
    // more details for that place.
    searchbox.addListener('places_changed', function() {
        var places = searchbox.getPlaces();
        if (places.length == 0) return;
        var bounds = new google.maps.LatLngBounds();
        places.forEach(function(place) {
            if (!place.geometry) return;
            // console.log('place info : ',place)
            let latLng = JSON.parse(JSON.stringify(place.geometry)).location;
            addMarker(latLng, place.place_id, count, place)
            count += 1;
            if (place.geometry.viewport) bounds.union(place.geometry.viewport);
            else bounds.extend(place.geometry.location);
        });
        map.fitBounds(bounds);
    });

    map.addListener('click', function(event) {
        if (clusterClick) {
            clusterClick = false;
        } else {
            let latLng = JSON.parse(JSON.stringify(event.latLng));
            // console.log(JSON.parse(JSON.stringify(event)));
            geocodeSearch(latLng, (result, placeData) => {
                addMarker(latLng, result[0].place_id, count, placeData);
                count += 1;
            })
        }
    });
    function geocodeSearch(latLng, callback) {
        let geocoder = new google.maps.Geocoder;
        geocoder.geocode({'location':latLng}, (result, status) => {
            if (status !== 'OK') return setTimeout(() => {return geocodeSearch(latLng, callback)}, 200);
            getDetailInformation(result[0].place_id)
                .then(placeData => {callback(result, placeData)})
        })
    }
    function getDetailInformation(place_id){
        let request = {
            placeId: place_id,
            fields: ['name', 'formatted_address', 'place_id', 'geometry','formatted_phone_number', 'utc_offset', 'time',
                'opening_hours','reviews', 'types','url','website','price_level','rating','user_ratings_total','url','id','reference']};
        let service = new google.maps.places.PlacesService(map);
        return new Promise((resolve, reject) => {
            service.getDetails(request, (place, status) => {
                if (status === google.maps.places.PlacesServiceStatus.OK) {
                    resolve(place);
                }
            });
        })
    }
    function getLocalTime(timeData, time_offset){
        let date = new Date(Number(timeData + '000'));
        return new Date(date - ((-1) * Number(time_offset) * 60000)).toISOString().split('T')[0];
    }
}

