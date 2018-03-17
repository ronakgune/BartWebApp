

var date_for_map;
const myGoogleKey = "AIzaSyB-67FQjlm_ondcuSmBqnWNgjiMCfWVvn8";
var map;
var directionsDisplay;



function InitializeMapCallback() {
    var latlng = new google.maps.LatLng(37.7831, -122.4039);
    directionsDisplay = new google.maps.DirectionsRenderer();
    var myOptions = {
        zoom: 10,
        center: latlng,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    map = new google.maps.Map(document.getElementById("map"), myOptions);
    directionsDisplay.setMap(map);
}
window["InitializeMapCallback"] = InitializeMapCallback;

export function loadMap() {
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = "https://maps.googleapis.com/maps/api/js?key=" + myGoogleKey + "&callback=InitializeMapCallback";
   
    document.body.appendChild(script);
}

export function drawRoutesOnMap(map_source_lat, map_source_long, map_dest_lat, map_dest_long) {
    var selectedMode = "TRANSIT";
    if (map_source_lat && map_source_long && map_dest_lat && map_dest_long) {


        
        let sourcelatLng = new google.maps.LatLng(map_source_lat, map_source_long);
        let destlatLng = new google.maps.LatLng(map_dest_lat, map_dest_long);
     
        if (!date_for_map) {
            date_for_map = Date.now();
        }
        let date = Date.now();
       
        var request = {
            origin: sourcelatLng,
            destination: destlatLng,
            
            travelMode: google.maps.TravelMode[selectedMode],
            transitOptions: {
                departureTime: date.getTime, 
                modes: ['TRAIN'],
                
            }
        };
        var directionsService = new google.maps.DirectionsService();
        directionsService.route(request, function (response, status) {
            if (status == 'OK') {
                directionsDisplay.setDirections(response);
            }
        });
        return;
    }
}