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
          data.map = new google.maps.Map(document.getElementById('map'), {
                         center: data.mapCenter,
                         zoom: data.mapDefaultZoom,
                         mapTypeId: 'terrain',
                         mapTypeControlStyle: 'dropdown_menu'
          });

          // add markers to map
          this.initMarkers(data.map, data.mapMarkersJSON);

          // add filter displayButtons
          view.displayFilterControls(data.filterButtons);

          // Knockout.js framework implementation.  Must be executed last to implement defined bindings.
          ko.options.useOnlyNativeEvents = true;
          ko.applyBindings(view);

          // URL for ll search
          var fsURL="https://api.foursquare.com/v2/venues/explore/?client_id=2YOUP4JC4Z4S1BQ4USE5XIPHMUOWTCJUAWXJSPXTD2RC3S0N&client_secret=M1R2B2BQWUTASVJFDLNQ42ZQK4TMQNJVXYSO3G4OZ0J2QNXN&v=20180125&ll=36.101,-79.506&limit=20";
          this.foursquareData(fsURL,
               function(data) { console.log(data); },
               function(xhr) { console.error(xhr); }
          );
     },

     //initMarkers parses the jsonMarkers string and creates each marker
     initMarkers: function(mapRef, jsonMarkers) {
          // parse marker string to JSON format using Knockout API
          var arrMarkers = ko.utils.parseJson(jsonMarkers);
          var loopStop = arrMarkers.length;

          data.activeMarkers = [];
          // loop through the marksers and create a new marker for each one
          for (loop = 0; loop < loopStop; loop++) {
//               console.log('position for marker ' + loop + ' is :  ' + arrMarkers[loop].position.lat);
               //add marker object to activeMarkers array
               this.marker = new google.maps.Marker({
                    position: arrMarkers[loop].position,
                    map: data.map,
                    title: arrMarkers[loop].title,
                    visible:  true,
                    animation: google.maps.Animation.DROP,
                    icon: 'http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=' + (loop + 1) + '|FF9900'
                    //label: '' + (loop + 1)
               });
               // add marker to marker object array
               data.activeMarkers.push(this.marker);
               data.activeMarkerTitles.push(arrMarkers[loop].title);
          }
     },

     // use filter string to hide mMarkers from map
     //     setMap(null) to hide
     filterMarkers: function(filter) {
          var loopStop = data.activeMarkers.length;
          // temporary array to hold non-google API location properties
          var arrMarkers = ko.utils.parseJson(data.mapMarkersJSON);
          // loop through markers and add or remove from active map
          for (var loop = 0; loop < loopStop; loop++) {
               // add to map and turn bounce on if marker matches filter
               if (arrMarkers[loop].type == filter || filter == "All" || arrMarkers[loop].title == filter) {
                    // add marker to map.  This must come first as the function resets animation
                    data.activeMarkers[loop].setMap(data.map);
                    //initiate marker bounce when adding to map
                    if (data.activeMarkers[loop].getAnimation() === 1 ) {

                         //already bouncing
                    } else {
                         //Turn on Bounce
                         data.activeMarkers[loop].animation = google.maps.Animation.BOUNCE;
                    }
               } else {
                    data.activeMarkers[loop].setMap(null);
               }
          }
     },

     // called when select item is defined.  No need for action in this implementation
     filterMarkersKO: function() { },

     // triggered when user selects a dropdown item.  Undefined is passed when
     //          the user selects the initial instruction value that is not a place
     selectedMarker: data.selectedMarker.subscribe(function(newValue) {
          if (typeof newValue != 'undefined') {
               controller.filterMarkers(newValue.title);
          } else { controller.filterMarkers("All"); }

     }),

     foursquareData: function(path, success, error) {
          var xhr = new XMLHttpRequest();
          xhr.onreadystatechange = function()
          {
              if (xhr.readyState === XMLHttpRequest.DONE) {
                  if (xhr.status === 200) {
                      if (success)
                         success(JSON.parse(xhr.responseText));
                  } else {
                      if (error)
                         error(xhr);
                  }
              }
          };
          xhr.open("GET", path, true);
          xhr.send();
     }
};
