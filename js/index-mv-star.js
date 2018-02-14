/* **********************************************
*  controller
*     logic operations go here
* ***********************************************/
var controller = {
     // init is executed by the callback for the google maps API URL in the HTML file
     init: function() {
          //initialize markers before creating
          data.activeMarkers = [];

          // display page header information
          view.header(data.pageHeader.main, data.pageHeader.sub);

          closeNav();

          this.createMap();

          // add markers to map
          this.initMarkers();

          // add filter displayButtons
          view.displayFilterControls(data.filterButtons);

          // Knockout.js framework implementation.  Must be executed last to implement defined bindings.
          ko.options.useOnlyNativeEvents = true;
          ko.applyBindings(view);
     },

     //temp create map
     createMap: function() {
          // display map area
          data.map = new google.maps.Map(document.getElementById('map'), {
               center: data.mapCenter,
               zoom: data.mapDefaultZoom,
               mapTypeId: 'terrain',
               mapTypeControlStyle: 'dropdown_menu'
          });

          var trafficLayer = new google.maps.TrafficLayer();
          trafficLayer.setMap(data.map);
     },

     //initMarkers parses the jsonMarkers string and creates each marker object
     initMarkers: function() {
          // parse marker string to JSON format using Knockout API
          var arrMarkers = ko.utils.parseJson(data.mapMarkersJSON);
          var loopStop = arrMarkers.length;
          var infoWindowContentString, infoWindow, marker, stringLoop,
               strFsqURL, arrFsq, fourSqData, fsSuccess, fsError;

          // loop through the marksers and create a new marker for each one
          for (loop = 0; loop < loopStop; loop++) {

               //create marker object with default values
               marker = new google.maps.Marker({
                    position: arrMarkers[loop].position,
                    map: data.map,
                    //icon: 'http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=' + (loop + 1) + '|FF9900',
                    title: arrMarkers[loop].title,
                    visible:  true,
                    animation: google.maps.Animation.DROP,
                    fsCategory: arrMarkers[loop].type,
                    fsName: '',
                    fsID: arrMarkers[loop].fsID,
                    fsPhone: 'No listing in Foursquare',
                    fsAddress: '',
                    fsUrl: '#',
                    fsRating: '',
                    localId: (loop + 1)
               });

               // add marker to marker object array
               data.activeMarkers.push(marker);

               // get foursquare data for marker
               // need to catch meta.code 40x and display meta.errorType and/or meta.errorDetail
               if (arrMarkers[loop].fsID === undefined) {
//                    console.log('No Foursquare ID for ' + arrMarkers[loop].title);
               } else {
//                    console.log('Getting Foursquare data for ' + arrMarkers[loop].title);
                    strFsqURL = data.fsAPIBaseURL.replace('%replace%', arrMarkers[loop].fsID);
                    this.foursquareData(loop, strFsqURL, fsSuccess, fsError);
               }




               // add click event listener to create marker infoWindow
               // http://you.arenot.me/2010/06/29/google-maps-api-v3-0-multiple-markers-multiple-infowindows/
               google.maps.event.addListener(data.activeMarkers[loop], 'click', function() {
                    // create HTML content string for google.maps.InfoWindow
                    infoWindowContentString =  '<div><div class="iwTitle"><pre>' +
                         this.title + '\t'+ this.fsCategory + '\t'+ (this.fsRating * 10) + '%</pre><p>'+ this.fsPhone + '</p><p>'+ this.fsAddress + '</p><a href="' + this.fsUrl +'">Foursquare site</a></div></div>';

                         // expand the text listing
                         controller.listItemExpand(this.loop);

                    // create InfoWindow object
                    infoWindow = new google.maps.InfoWindow({
                         content: infoWindowContentString
                    });


                    // open the InfoWinto
                    infoWindow.open(data.map, this);
               });

               // create a listener for the Marker
               data.activeMarkerTitles.push({'title': marker.title});
               console.log('Title = ' + marker.title);
               console.log('Catgegory = ' + marker.fsCategory);
               console.log('Address = ' + marker.fsAddress);
               console.log('Rating = ' + marker.fsRating);

               data.visibleMarkerList.push({'title': marker.title,
                                             'fsCategory': marker.fsCategory,
                                             'fsAddress': marker.fsAddress,
                                             'fsRating': marker.fsRating,
                                             'number': loop + 1});
          }


     },

     // use filter string to hide mMarkers from map
     //     setMap(null) to hide
     filterMarkers: function(filter) {
          // temporary array to hold non-google API location properties
          var arrMarkers = ko.utils.parseJson(data.mapMarkersJSON);
          // set limit for looping through marker array
          var loopStop = data.activeMarkers.length;
          // clear list view of Markers
          // must use the knockout removeAll function vs JS array = [] to clear
          data.visibleMarkerList.removeAll();
          // loop through markers and add or remove from active map
          for (var loop = 0; loop < loopStop; loop++) {
               // add to map and turn bounce on if marker matches filter
               if (arrMarkers[loop].type == filter || filter == "All" || arrMarkers[loop].title == filter) {
                    // add marker to map.  This must come first as the function resets animation
                    data.activeMarkers[loop].setMap(data.map);
                    // add marker title to list view
                    data.visibleMarkerList.push({'title': arrMarkers[loop].title,
                                                  'number': loop + 1,
                                                  'fsCategory': arrMarkers[loop].fsCategory,
                                                  'fsAddress': arrMarkers[loop].fsAddress,
                                                  'fsRating': arrMarkers[loop].fsRating});
                    //initiate marker bounce when adding to map
                    if (data.activeMarkers[loop].getAnimation() === 1 ) {
                         //already bouncing
                    } else {
                         //Turn on Bounce
                         data.activeMarkers[loop].animation = google.maps.Animation.BOUNCE;
                    }
               } else {
                    //remove marker from map
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

     // AJAX function to get Foursquare data for a marker
     foursquareData: function(int, path, success, error) {
          var xhr = new XMLHttpRequest();
          var fsJson, loopStop;
          var fsReturnData = ko.observableArray([]);
          xhr.onreadystatechange = function()
          {
              if (xhr.readyState === XMLHttpRequest.DONE) {
                  if (xhr.status === 200) {
                      if (success)
                         success(JSON.parse(xhr.responseText));
                         fsJson = ko.utils.parseJson(xhr.responseText);

                         // locate marker to add Foursquare fourSqData
                         //loopStop = data.activeMarkers.length;
                         //for (int = 0; int < loopStop; int++) {
                              if (fsJson.response.venue.id === data.activeMarkers[int].fsID){
                                   data.activeMarkers[int].fsCategory = fsJson.response.venue.categories[0].shortName;
                                   data.activeMarkers[int].fsPhone = fsJson.response.venue.contact.formattedPhone;
                                   data.activeMarkers[int].fsAddress = fsJson.response.venue.location.formattedAddress;
                                   data.activeMarkers[int].fsUrl = fsJson.response.venue.canonicalUrl;
                                   data.activeMarkers[int].fsRating = fsJson.response.venue.rating;
                              } else {console.log('There is an error with what marker the Foursqare data is for');}
                         //}
                         console.log('activeMarkers em: ' + int);
                         console.log('Fousquare data retrieved for... ' + data.activeMarkers[int].title + ' at the address of... ' + data.activeMarkers[int].fsAddress);
                         //return(fsReturnData);
                         //return('goodbye==============');
                  } else {
                      if (error)
                         error(xhr);
                         console.log('FoursquareData error = ');
                  }
              }
          };
          xhr.open("GET", path, true);
          xhr.send();
     },

     listItemExpand: function(input) {
          console.log('Expanding List Item... ' + input);
     }
};
