# google-map-and-knockout

## Project Overview
Develop a single-page application featuring a map of your neighborhood or a neighborhood you would like to visit. Then add additional functionality to this application, including: map markers to identify popular locations or places to visit, a search function to easily discover these locations, and a listview to support simple browsing of all locations. Then research and implement third-party APIs that provide additional information about each of these locations (such as StreetView images, Wikipedia articles, Yelp reviews, etc).

## My implementation
The location displayed is downtown Elon, NC near the ELON university.  Predefined markers are for some of my favorite restaurants as well as a local scenic spot on campus and a place where I attended a speech given by co-founder of Apple, Steve Wosniak.

The user interface creates an initial display of the Google map with location markers and a hamburger menu to provide filter choices. Below the map is a list of the active markers that can be selected to show additional details provided via the Foursquare API.  The list is updated as filters are applied.

### UI Features
* CSS Side Menu with navigation buttons
* Navigation menu accessed via the hamburger icon
* From the navigation menu, selecting a marker category button or single marker in the dropdown will animate and make visible any marker matching the selected search filter

### Google Maps API
* Marker locations are defined as an array
* Markers drop on the map upon initialization
* Bouncy Markers - Google API marker labels DO NOT BOUNCE with the markers within the Google Maps API. To overcome this, I used the Google chart API to set the marker icon property as follows.  The label property remains null.
   icon: 'http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=' + (loop + 1) + '|FF9900'
* Attempting to set BOUNCE annimation on an already bouncing marker has a toggle effect and turns off the marker animation.  To bypass this effect, I used the Google API function marker.getAnimation() === 1 in advance to either leave the marker bouncing or turn on the state if the marker is not animated.

### knockout
* Parsed JSON data strings of initial data for the marker locations
* Monitor dropdown button for a change in the selection

### Foursquare API


### Error Handling
