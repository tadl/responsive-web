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
var loadmoreText = '<a class="button wide large tadlblue" style="color: #fff;"onclick="loadmore();">Load More Results</a>';
var psTitle = "Traverse Area District Library";
var separator = " | ";
var platform = 'web';
var version_id = '0';
var pagecount = 0;
var state = {}
var linked_search = false;
var home_url = 'http://scott-lap.in.tcnet.org/responsive-web';
var templist = {};
templist.localArray = []; 
var mylist2 = []
