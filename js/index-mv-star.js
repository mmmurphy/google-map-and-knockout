var map;

/* **********************************************
*  Model
*     variables and constants go here
* ***********************************************/
var data = {
     // data for individual markers
     //     {"title": "", "position": "{"lat": "", "lng": ""}},
     mapMarkersJSON: '[' +
          '{"title": "Pandoras Pies", "position": {"lat": 36.1014897, "lng": -79.50681}, "type": "Resturaunt"}, ' +
          '{"title": "The Root", "position": {"lat": 36.1007668, "lng": -79.5073888}, "type": "Resturaunt"}, ' +
          '{"title": "Elon Fountain", "position": {"lat": 36.1031529, "lng": -79.5049359}, "type": "Landmark"}, ' +
          '{"title": "markerCoffee", "position": {"lat": 36.104145, "lng": -79.5059}, "type": "Resturaunt"}, ' +
          '{"title": "Steve Wosniak", "position": {"lat": 36.102726, "lng": -79.504673}, "type": "Event"}]',

     // Map variables for centering and the Zoom level
     mapCenter: {lat: 36.1013906, lng: -79.5067275},
     mapDefaultZoom: 16,

     activeMarkers: [],
     // Header title text
     pageHeader: {
          main: 'Elon, NC 27244',
          sub: ''
     }

};

/* **********************************************
*  View
*     updates to html go here
* ***********************************************/
var view = {
     // update text for the page Header.
     //    main and sub input variables are text strings
     header: function(main, sub) {
          document.getElementById('mainPageHeader').innerText = main;
          document.getElementById('subPageHeader').innerText = sub;
     },

     displayFilterControls: function() {
          document.getElementById('filterControls').innerHTML = '' +
          '<input onclick="controller.init();" type=button value="Display All Markers">' +
          '<input onclick="controller.init();" type=button value="Display Resturaunts">' +
          '<input onclick="controller.init();" type=button value="Display Event Areas">' +
          '<input onclick="controller.init();" type=button value="Display Landmarks">' +
          '<input onclick="controller.init();" type=button value="Hide Markers">'
     }
};

/* **********************************************
*  controller
*     logic operations go here
* ***********************************************/
var controller = {
     // init is executed by the callback for the google maps API URL in the HTML file
     init: function() {
          // display page header information
          view.header(data.pageHeader.main, data.pageHeader.sub);

          // display map area
          map = new google.maps.Map(document.getElementById('map'), {
               center: data.mapCenter,
               zoom: data.mapDefaultZoom
          });

          // add markers to map
          this.initMarkers(map, data.mapMarkersJSON, "All");

          // add filter displayButtons
          view.displayFilterControls();

          this.filterMarkers("Resturaunt")
     },

     //initMarkers parses the jsonMarkers string and creates each marker
     initMarkers: function(mapRef, jsonMarkers, filter) {
//          console.log(jsonMarkers);
          var arrMarkers = ko.utils.parseJson(jsonMarkers);
//          console.log ('title 1 = ' + arrMarkers[0].title);
          var loopStop = arrMarkers.length;
//          console.log('lat = ' + arrMarkers[0].position);
          var visible = true;

          // loop through the marksers and create a new marker for each one
          for (loop = 0; loop < loopStop; loop++) {
               console.log('position for marker ' + loop + ' is :  ' + arrMarkers[loop].position.lat);
               //add marker object to activeMarkers array
               this.marker = new google.maps.Marker({
                    position: arrMarkers[loop].position,
                    map: mapRef,
                    title: arrMarkers[loop].title,
                    visible:  visible
               });
               // add marker to marker object array
               data.activeMarkers.push(this.marker);
          }
     },
     // filter Markers from display using the marker.visible property
     filterMarkers: function(filter) {
          var loopStop = data.activeMarkers.length;
          var arrMarkers = ko.utils.parseJson(data.mapMarkersJSON);
          for (var loop = 0; loop < loopStop; loop++) {
               // set visible to true if marker.type matches filter
               if (arrMarkers[loop].type == filter || filter == "All") {
                    data.activeMarkers[loop].visible = true;
               } else {
                    data.activeMarkers[loop].visible = false;
               }
               //activeMarkers[loop].setMap(filter);
          }
     },


     hideMarkers: function() {
          filterMarkers(null);
     }
};
