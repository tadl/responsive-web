var ILSCATCHER_HOST = 'mel-catcher.herokuapp.com/';
var ILSCATCHER_BASE = 'https://' + ILSCATCHER_HOST;
var ILSCATCHER_INSECURE_BASE = 'https://' + ILSCATCHER_HOST; /* we will actually use https here also */
var FEATURED_URL = 'https://www.tadl.org/mobile/export/items/json/featured';
var EVENTS_URL = 'https://www.tadl.org/mobile/export/events/formatted/json/all';
var NEWS_URL = 'https://www.tadl.org/export/news/json';
var LOCATIONS_BASE = 'https://www.tadl.org/mobile/export/locations';
var PLACEHOLDER_IMG = 'img/clocktower100.png';
var FACEBOOK_URL = 'https://graph.facebook.com/TraverseAreaDistrictLibrary/feed?access_token=CAAFh5Quq0YMBAENgjPYY9MY0y3cdiAMvXmLl6Fq3H4LDZBBZBukKlXFwWPq0xMLa6hqDrfxfGqvFpBlIZCjFKg0rKdd37qHLsjwcBve4UeZAQymPksV7ddAeZAJOyaeZC05WqlLzrVpOUQEtjiCZArjB6NMUHjvU90qXZAGEOESKDgZDZD';
var loadingmoreText = '<span class="loadmore"><img class="spinner" src="img/spinner.gif">Loading...</span>';
var logoutText = '<span class="loadmore"><img class="spinner" src="img/spinner.gif">Logging Out...</span>';
//var loadmoreText = '<a class="button wide large tadlblue" onclick="loadmore();"><span>More</span></a>';
var psTitle = "Traverse Area District Library";
var eventsnav = '<a class="button small tadlblue wide" id="eventlocs" data-dropdown="#dropdown-2"><span>Filter by location</span></a><br/><br/><a class="button small tadlblue wide" id="eventaudis" data-dropdown="#dropdown-3"><span>Filter by audience</span></a>';
var separator = " | ";
var platform = 'web';
var version_id = '0';
var pagecount = 0;
var historycount = 0;
var state = {}
var linked_search = false;
var templist = {};
templist.localArray = []; 
var mylist2 = []
var color_tadlblue = '#0d4c78';
var itemlists = ["13541","15132","13512","11234","15153"];

var NODEPREFIX = 'https://www.tadl.org/export/node/json/';

