
/* **********************************************
*  Model
*     variables and constants go here
* ***********************************************/
var data = {
     mapMarkersJSON: '[{"title": "Pandoras Pies", "position": "{\'lat\': \'36.1014897\', \'lng\': \'-79.50681\'}"}, {"title": "The Root", "position": "{\'lat\': \'36.1007668\', \'lng\': \'-79.5073888\'}"}, {"title": "Elon Fountain", "position": "{\'lat\': \'36.0823893\', \'lng\': \'-79.5224609\'}"}, {"title": "markerCoffee", "position": "{\'lat\': \'36.1051821\', \'lng\': \'-79.5051737\'}"}, {"title": "Steve Wosniak", "position": "{\'lat\': \'36.1038291\', \'lng\': \'-79.5082237\'}"}]',
          //     {"title": "", "position": "{"lat": "", "lng": ""}},
     mapMarkersKO: ko.utils.parseJson(this.mapMarkersJSON),


     mapCenter: {lat: 36.1013906, lng: -79.5067275},
     mapDefaultZoom: 16,


     mappedMarkers: ko.utils.arrayMap(this.mapMarkersKO, function(mapMarker) {
          console.log('data.mappedMarkers');
          return new Marker(mapMarker);
     }),

     pageHeader: {
          main: 'Elm Street',
          sub: 'Greensboro, NC'
     }

};

/* **********************************************
*  View
*     updates to html go here
* ***********************************************/
var view = {
     header: function(main, sub) {
          document.getElementById('mainPageHeader').innerText = main;
          document.getElementById('subPageHeader').innerText = sub;
     }
};

/* **********************************************
*  controller
*     logic operations go here
* ***********************************************/

var controller = {
     init: function() {
          // display page header information
          view.header(data.pageHeader.main, data.pageHeader.sub);

          // display map area
          map = new google.maps.Map(document.getElementById('map'), {
               center: data.mapCenter,
               zoom: data.mapDefaultZoom
          });

          // add markers to map

     },

     mapMarker: function (title, position) {
          this.title = ko.observable();
          this.position = ko.observable();
     }


};

/* ~~~~~  HTML Script
var map;
function initMap() {
     var markerPandorasPies = {lat: 36.1014897, lng: -79.50681};
     var markerTheRoot = {lat: 36.1007668, lng: -79.5073888};
     var markerElonFountain = {lat: 36.0823893, lng: -79.5224609};
     var markerCoffee = {lat: 36.1051821, lng: -79.5051737};
     var markerSteveWosniak = {lat: 36.1038291, lng: -79.5082237};
     var mapCenter = {lat: 36.1013906, lng: -79.5067275};
     var mapDefaultZoom = 16;
     map = new google.maps.Map(document.getElementById('map'), {
          center: mapCenter,
          zoom: mapDefaultZoom
     });
     var marker = new google.maps.Marker({
          position: markerSteveWosniak,
          map: map,
          title: 'First Marker!',
          draggable: true
     });
}
*/
