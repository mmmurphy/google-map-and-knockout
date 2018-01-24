/* **********************************************
*  Model
*     variables and constants go here
* ***********************************************/
var data = {
     map: null,
     // data for individual markers
     //     {"title": "", "position": "{"lat": "", "lng": ""}},
     mapMarkersJSON: '[' +
          '{"title": "Pandoras Pies", "position": {"lat": 36.1014897, "lng": -79.50681}, "type": "Resturaunt", "fsID": "4f0f20e7e4b050cad0ee9282"}, ' +
          '{"title": "The Root", "position": {"lat": 36.1007668, "lng": -79.5073888}, "type": "Resturaunt", "fsID": "4ddbb641fa7637ab73e0949d"}, ' +
          '{"title": "Fonville Fountain", "position": {"lat": 36.10201, "lng": -79.504}, "type": "Landmark"}, ' +
          '{"title": "Irazu Coffee", "position": {"lat": 36.10521, "lng": -79.505}, "type": "Resturaunt"}, ' +
          '{"title": "Steve Wosniak", "position": {"lat": 36.1038, "lng": -79.506}, "type": "Event"}, ' +
          '{"title": "Simply Thai", "position": {"lat": 36.102721, "lng": -795145798}, "type": "Resturaunt", "fsID": "4b5e1cedf964a520527e29e3"}]',

     // Map variables for centering and the Zoom level
     mapCenter: {lat: 36.1013906, lng: -79.5067275},
     mapDefaultZoom: 15,

     //used to store map marker objects
     activeMarkers: ko.observableArray([]),

     // holds dropdown list selectedMarker
     selectedMarker: ko.observable(),

     // used to store an array of marker titles only.  This set will be used for the marker drobdown filter
     activeMarkerTitles: ko.observableArray([]),

     // Header title text
     pageHeader: {
          main: 'Elon, NC 27244',
          sub: ''
     },

     // string of HTML code to display filter buttons and dropdown
     filterButtons: '<a href="javascript:void(0)" class="closebtn" onclick="closeNav()">&times;</a>' +
          '<input onclick="controller.filterMarkers(\'All\');" type="button" value="Display All Markers">' +
          '<input onclick="controller.filterMarkers(\'Resturaunt\');" type="button" value="Display Resturaunts">' +
          '<input onclick="controller.filterMarkers(\'Event\');" type="button" value="Display Event Areas">' +
          '<input onclick="controller.filterMarkers(\'Landmark\');" type="button" value="Display Landmarks">' +
          '<input onclick="controller.filterMarkers();" type="button" value="Hide Markers">' +
          '<select data-bind="options: data.activeMarkers,' +
                         ' optionsText: \'title\',' +
                         ' optionsCaption: \'-- Or Select a Place ---\',' +
                         ' event: {onchange: controller.filterMarkersKO()},' +
                         ' value: data.selectedMarker"></select>'
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

     displayFilterControls: function(filterHTML) {
          //document.getElementById('floating-panel').innerHTML = filterHTML;
          document.getElementById('mySidenav').innerHTML = filterHTML;

     }
};
