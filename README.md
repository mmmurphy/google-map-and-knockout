# google-map-and-knockout

## Project Overview
Develop a single-page application featuring a map of your neighborhood or a neighborhood you would like to visit. Then add additional functionality to this application, including: map markers to identify popular locations or places to visit, a search function to easily discover these locations, and a listview to support simple browsing of all locations. Then research and implement third-party APIs that provide additional information about each of these locations (such as StreetView images, Wikipedia articles, Yelp reviews, etc).

## My implementation

### Google Maps API
* Marker locations are defined as an array
* Bouncy Markers - marker labels do not bounce with the markers within the google maps API.  To overcome this I used the Google chart API to set the marker icon property as follows.  The label property remains null.
   icon: 'http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=' + (loop + 1) + '|FF9900'


### knockout


### Foursquare API


### Error Handling
