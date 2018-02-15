/* **********************************************
*  controller
*     logic operations go here
* ***********************************************/
var controller = {
     // init is executed by the callback for the google maps API URL in the HTML file
     init: function() {
          // clear array in memory before use
          data.activeMarkers = [];  // done

          // display page header information
          view.header(data.pageHeader.main, data.pageHeader.sub);  // done

          // ensure hamburger menu is closed
          closeNav();  // done

          // create the google map instance
          this.createMap(); // done

          // create markers
     //     this.initMarkers();
          this.createMarkers();  // done

          // add fsData to markers
          this.addMarkerFousquareData();

          // add filter displayButtons
          view.displayFilterControls(data.filterButtons);

          // Knockout.js framework implementation.  Must be executed last to implement defined bindings.
          ko.options.useOnlyNativeEvents = true;
          ko.applyBindings(view);
     },

     // create map
     createMap: function() {
          // display map area
          data.map = new google.maps.Map(document.getElementById('map'), {
               center: data.mapCenter,
               zoom: data.mapDefaultZoom,
               mapTypeId: 'terrain',
               mapTypeControlStyle: 'dropdown_menu'
          });

          // add recent traffic conditions to map
          var trafficLayer = new google.maps.TrafficLayer();
          trafficLayer.setMap(data.map);
     },

     createMarkers: function() {
          var loopStop = data.arrMarkerInput.length;
          for (loop = 0; loop < loopStop; loop++) {

               //create marker object with default values
               marker = new google.maps.Marker({
                    position: data.arrMarkerInput[loop].position,
                    map: data.map,
                    //icon: 'http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=' + (loop + 1) + '|FF9900',
                    title: data.arrMarkerInput[loop].title,
                    visible:  true,
                    animation: google.maps.Animation.DROP,
                    inputCategory: data.arrMarkerInput[loop].type,
                    fsCategory: ko.observable(null),
                    fsName: ko.observable(),
                    fsID: data.arrMarkerInput[loop].fsID,
                    fsPhone: ko.observable('No listing in Foursquare'),
                    fsAddress: ko.observable(),
                    fsUrl: ko.observable('#'),
                    fsRating: ko.observable(null),
                    number: (loop + 1)
               });
               // add marker to marker object array
               data.activeMarkers.push(marker);
          }
     },

     // add Foursquare data to markers
     addMarkerFousquareData: function() {
          var fsSuccess, fsError;
          var loopStop = data.activeMarkers.length;
//          console.log('Number of activeMarker Elements... ' + loopStop);
          for (loop = 0; loop < loopStop; loop++) {
               // get foursquare data for marker
               // need to catch meta.code 40x and display meta.errorType and/or meta.errorDetail
               if (data.activeMarkers[loop].fsID === undefined) {
                    // no Foursquare ID -- Create InfoWindow
                    controller.addMarkerInfoWindow(loop);
               } else {
                    // generate Foursquare API URL and retreive data
                    strFsqURL = data.fsAPIBaseURL.replace('%replace%', data.activeMarkers[loop].fsID);
                    this.foursquareData(loop, strFsqURL, fsSuccess, fsError);
                    console.log('=== Did this get updated' + data.activeMarkers[loop].fsCategory())
               }

          }


     },

     addMarkerInfoWindow: function(int) {
          // add click event listener to create marker infoWindow
          // http://you.arenot.me/2010/06/29/google-maps-api-v3-0-multiple-markers-multiple-infowindows/
          google.maps.event.addListener(data.activeMarkers[int], 'click', function() {
               // create HTML content string for google.maps.InfoWindow

               infoWindowContentString =  '<div><div class="iwTitle"><pre>' +
                    this.title + '\t'+ data.activeMarkers[int].inputCategory;

               console.log('Rating... ' + this.fsRating());

               if (this.fsRating() === null) {
                    infoWindowContentString = infoWindowContentString + '</div></div>';
               } else {
                    infoWindowContentString = infoWindowContentString + ' (' + data.activeMarkers[int].fsCategory() + ')\t'+ this.fsRating() + '</pre><p>'+ this.fsPhone() + '</p><p>'+ this.fsAddress() + '</p><a href="' + this.fsUrl() +'">Foursquare site</a></div></div>';
               }

               // expand the text listing
               controller.listItemExpand(this.loop);

               // create InfoWindow object
               infoWindow = new google.maps.InfoWindow({
                    content: infoWindowContentString
               });

               // open the InfoWindow
               infoWindow.open(data.map, this);
          });

     },
/*
     //initMarkers parses the jsonMarkers string and creates each marker object
     initMarkers: function() {
          var loopStop = data.arrMarkers.length;
          var infoWindowContentString, infoWindow, marker, stringLoop,
               strFsqURL, arrFsq, fourSqData, fsSuccess, fsError;

          // loop through the marksers and create a new marker for each one
          for (loop = 0; loop < loopStop; loop++) {

               //create marker object with default values
               marker = new google.maps.Marker({
                    position: data.arrMarkers[loop].position,
                    map: data.map,
                    //icon: 'http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=' + (loop + 1) + '|FF9900',
                    title: data.arrMarkers[loop].title,
                    visible:  true,
                    animation: google.maps.Animation.DROP,
                    fsCategory: data.arrMarkers[loop].type,
                    fsName: '',
                    fsID: data.arrMarkers[loop].fsID,
                    fsPhone: 'No listing in Foursquare',
                    fsAddress: '',
                    fsUrl: '#',
                    fsRating: '',
                    number: (loop + 1)
               });

               // add marker to marker object array
               data.activeMarkers.push(marker);

               // get foursquare data for marker
               // need to catch meta.code 40x and display meta.errorType and/or meta.errorDetail
               if (data.arrMarkers[loop].fsID === undefined) {
//                    console.log('No Foursquare ID for ' + arrMarkers[loop].title);
               } else {
//                    console.log('Getting Foursquare data for ' + arrMarkers[loop].title);
                    strFsqURL = data.fsAPIBaseURL.replace('%replace%', data.arrMarkers[loop].fsID);
                    this.foursquareData(loop, strFsqURL, fsSuccess, fsError);
               }

               // add click event listener to create marker infoWindow
               // http://you.arenot.me/2010/06/29/google-maps-api-v3-0-multiple-markers-multiple-infowindows/
               google.maps.event.addListener(data.activeMarkers[loop], 'click', function() {
                    // create HTML content string for google.maps.InfoWindow
                    infoWindowContentString =  '<div><div class="iwTitle"><pre>' +
                         this.title + '\t'+ this.fsCategory + '\t'+ this.fsRating + '</pre><p>'+ this.fsPhone + '</p><p>'+ this.fsAddress + '</p><a href="' + this.fsUrl +'">Foursquare site</a></div></div>';

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
*/
     // use filter string to hide mMarkers from map
     //     setMap(null) to hide
     filterMarkers: function(filter) {
          // set limit for looping through marker array
          var loopStop = data.activeMarkers.length;
          // clear list view of Markers
          // must use the knockout removeAll function vs JS array = [] to clear
//          data.visibleMarkerList.removeAll();
          // loop through markers and add or remove from active map
          for (var loop = 0; loop < loopStop; loop++) {
               console.log('Filtering ' + loopStop + ' for... ' + filter + ' ...against... ' + data.activeMarkers[loop].type);
               // add to map and turn bounce on if marker matches filter
               if (filter == data.activeMarkers[loop].type  || filter == "All" || filter == data.activeMarkers[loop].title) {
                    // add marker to map.  This must come first as the function resets animation
                    data.activeMarkers[loop].setMap(data.map);
                    // add marker title to list view
/*                    data.visibleMarkerList.push({'title': data.activeMarkers[loop].title,
                                                  'number': loop + 1,
                                                  'fsCategory': data.activeMarkers[loop].fsCategory,
                                                  'fsAddress': data.activeMarkers[loop].fsAddress,
                                                  'fsRating': data.activeMarkers[loop].fsRating});
*/                    //initiate marker bounce when adding to map
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
                         // add Foursqare data to the marker object
                         if (fsJson.response.venue.id === data.activeMarkers[int].fsID){
                              console.log('Updating ' + data.activeMarkers[int].fsCategory() + ' to ' + fsJson.response.venue.categories[0].shortName);
                              data.activeMarkers[int].fsCategory(fsJson.response.venue.categories[0].shortName);
                              data.activeMarkers[int].fsPhone(fsJson.response.venue.contact.formattedPhone);
                              data.activeMarkers[int].fsAddress(fsJson.response.venue.location.formattedAddress[0] + ', ' + fsJson.response.venue.location.formattedAddress[1] + ', ' + fsJson.response.venue.location.formattedAddress[2]);
                              data.activeMarkers[int].fsUrl(fsJson.response.venue.canonicalUrl);
                              data.activeMarkers[int].fsRating((fsJson.response.venue.rating * 10) + '%');
                         } else {console.log('There is an error with what marker the Foursqare data is for');}

                         console.log('activeMarkers em: ' + int);
                         console.log('Fousquare data retrieved for... ' + data.activeMarkers[int].title + ' at the address of... ' + data.activeMarkers[int].fsAddress());
                         // create infoWindow with Foursquare data
                         controller.addMarkerInfoWindow(int);
                  } else {
                      if (error)
                         error(xhr);
                         console.log('FoursquareData error = ');
                  }
                  console.log('Checking again.  ' + data.activeMarkers[int].fsCategory() + ' to ' + fsJson.response.venue.categories[0].shortName);
              }
          };
          xhr.open("GET", path, true);
          xhr.send();
     },

     listItemExpand: function(input) {
          console.log('Expanding List Item... ' + input);
     }
};
