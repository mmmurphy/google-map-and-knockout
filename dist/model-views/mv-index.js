var data={map:null,arrMarkerInput:[{"title":"Pandoras Pies","position":{"lat":36.1014897,"lng":-79.50681},"type":"Restaurant","fsID":"4f0f20e7e4b050cad0ee9282"},{"title":"The Root","position":{"lat":36.1007668,"lng":-79.5073888},"type":"Restaurant","fsID":"4ddbb641fa7637ab73e0949d"},{"title":"Fonville Fountain","position":{"lat":36.10201,"lng":-79.504},"type":"Landmark"},{"title":"Irazu Coffee","position":{"lat":36.10521,"lng":-79.505},"type":"Restaurant"},{"title":"Steve Wosniak","position":{"lat":36.1038,"lng":-79.506},"type":"Event"},{"title":"Simply Thai","position":{"lat":36.1025,"lng":-79.5145},"type":"Restaurant","fsID":"4b5e1cedf964a520527e29e3"}],mapCenter:{lat:36.103,lng:-79.509},mapDefaultZoom:15,activeMarkers:ko.observableArray(),selectedMarker:ko.observable(),arrFoursquareData:ko.observableArray([]),pageHeader:{main:'Elon, NC 27244',sub:''},filterButtons:'<a href="javascript:void(0)" class="closebtn" onclick="closeNav()">&times;</a>'+'<input onclick="controller.filterMarkers(\'All\');" type="button" value="Display All Markers">'+'<input onclick="controller.filterMarkers(\'Restaurant\');" type="button" value="Display Restaurants">'+'<input onclick="controller.filterMarkers(\'Event\');" type="button" value="Display Event Areas">'+'<input onclick="controller.filterMarkers(\'Landmark\');" type="button" value="Display Landmarks">'+'<input onclick="controller.filterMarkers();" type="button" value="Hide Markers">'+'<select data-bind="options: data.activeMarkers,'+' optionsText: \'title\','+' optionsCaption: \'-- Or Select a Place ---\','+' event: {onchange: controller.filterMarkersKO()},'+' value: data.selectedMarker"></select>',fsAPIBaseURL:'https://api.foursquare.com/v2/venues/%replace%/?client_id=2YOUP4JC4Z4S1BQ4USE5XIPHMUOWTCJUAWXJSPXTD2RC3S0N&client_secret=M1R2B2BQWUTASVJFDLNQ42ZQK4TMQNJVXYSO3G4OZ0J2QNXN&v=20180125'};var view={header:function(main,sub){document.getElementById('mainPageHeader').innerText=main;document.getElementById('subPageHeader').innerText=sub},displayFilterControls:function(filterHTML){document.getElementById('mySidenav').innerHTML=filterHTML},detailVisibility(prefix,specific,toggle){var detailId=prefix+specific;var liId='li-'+specific;if(toggle){document.getElementById(detailId).style.display='block';document.getElementById(detailId).style.background='#aaa';document.getElementById(detailId).style.fontStyle='italic';document.getElementById(detailId).style.fontWeight='bold';document.getElementById(liId).style.display='block';document.getElementById(liId).style.background='#aaa';document.getElementById(liId).style.fontStyle='italic';document.getElementById(liId).style.fontWeight='bold'}else{if(document.getElementById(detailId)!==null){document.getElementById(detailId).style.display='none';document.getElementById(detailId).style.background='#fff';document.getElementById(detailId).style.fontStyle='normal';document.getElementById(detailId).style.fontWeight='normal';document.getElementById(liId).style.background='#fff';document.getElementById(liId).style.fontStyle='normal';document.getElementById(liId).style.fontWeight='normal'}}}}
