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
var templist = {};
templist.localArray = []; 
var mylist2 = []
var color_tadlblue = '#0d4c78';

var NODEPREFIX = 'https://www.tadl.org/export/node/json/';

/* Feeds for Books page */
var FEED_BOOKS_FEATURED_FICTION = 'https://www.tadl.org/mobile/export/items/67/json';
var FEED_BOOKS_FEATURED_NONFIC = 'https://www.tadl.org/mobile/export/items/68/json';
var FEED_BOOKS_BOOKLISTS = NODEPREFIX + '80';
var FEED_BOOKS_REVIEWS = 'https://www.tadl.org/export/reviews/Books/json';
var FEED_BOOKS_ADULTS_DISPLAY = 'https://www.tadl.org/mobile/export/items/45/all/json';
var FEED_BOOKS_ADULTS_CLUBKITS = 'https://www.tadl.org/mobile/export/items/224/all/json';
var FEED_BOOKS_ADULTS_BUSINESS = 'https://www.tadl.org/mobile/export/items/234/all/json';

/* Feeds for Music page */
var FEED_MUSIC_NEW = 'https://www.tadl.org/mobile/export/items/29/json';
var FEED_MUSIC_HOT = 'https://www.tadl.org/mobile/export/items/31/json';
var FEED_MUSIC_REVIEWS = 'https://www.tadl.org/export/reviews/Music/json';
var FEED_MUSIC_LINKS = NODEPREFIX + '113';

/* Feeds for Video page */
var FEED_VIDEO_NEW = 'https://www.tadl.org/mobile/export/items/32/json';
var FEED_VIDEO_HOT = 'https://www.tadl.org/mobile/export/items/34/json';
var FEED_VIDEO_TCFF = 'https://www.tadl.org/mobile/export/items/165/all/json';
var FEED_VIDEO_MET = 'https://www.tadl.org/mobile/export/items/286/all/json';
var FEED_VIDEO_REVIEWS = 'https://www.tadl.org/export/reviews/Video/json';

/* Feeds for Online page */
var FEED_ONLINE_MEL = NODEPREFIX + '3373';
var FEED_ONLINE_RESOURCES = NODEPREFIX + '3372';
var FEED_ONLINE_LEGAL = NODEPREFIX + '25242';
var FEED_ONLINE_EBOOKS = NODEPREFIX + '14040';

/* Feeds for Youth page */
var FEED_YOUTH_DISPLAY = 'https://www.tadl.org/mobile/export/items/47/all/json';
var FEED_YOUTH_NEWBOOKS = 'https://www.tadl.org/mobile/export/items/52/json';
var FEED_YOUTH_REVIEWS = 'https://www.tadl.org/export/reviews/Youth/json';
var FEED_YOUTH_EVENTS = 'https://www.tadl.org/mobile/export/events/formatted/json/27';
var FEED_YOUTH_RESOURCES = NODEPREFIX + '647';
var FEED_YOUTH_AWARDWINS = NODEPREFIX + '644';

/* Feeds for Teens page */
var FEED_TEENS_NEW = 'https://www.tadl.org/mobile/export/items/51/json';
var FEED_TEENS_ANIMANGA = 'https://www.tadl.org/mobile/export/items/41/json';
var FEED_TEENS_EVENTS = 'https://www.tadl.org/mobile/export/events/formatted/json/28';
var FEED_TEENS_REVIEWS = 'https://www.tadl.org/export/reviews/Teens/json';
var FEED_TEENS_HOMEWORK = NODEPREFIX + '409';
var FEED_TEENS_LISTS = NODEPREFIX + '12784';

/* Feeds for Locations */
var LOCATION_BASE = 'https://www.tadl.org/mobile/export/locations/';
var FEED_LOC_EVENTS = 'https://www.tadl.org/mobile/export/events/formatted/json/'; // add location id to end
var FEED_LOC_NEWS = 'https://www.tadl.org/export/news/location/json/';

/* Hours and address info */
var LOC_PCL_HOURS = LOCATION_BASE + 'pcl';
var LOC_EBB_HOURS = LOCATION_BASE + 'ebb';
var LOC_KBL_HOURS = LOCATION_BASE + 'kbl';
var LOC_IPL_HOURS = LOCATION_BASE + 'ipl';
var LOC_FLPL_HOURS = LOCATION_BASE + 'flpl';
var LOC_WOOD_HOURS = LOCATION_BASE + 'wood';

/* infoboxes */
var FEED_LOC_PCL_INFOBOX = 'https://www.tadl.org/export/node/json/583';
var FEED_LOC_EBB_INFOBOX = 'https://www.tadl.org/export/node/json/5439';
var FEED_LOC_KBL_INFOBOX = 'https://www.tadl.org/export/node/json/23123';
var FEED_LOC_IPL_INFOBOX = 'https://www.tadl.org/export/node/json/580';
var FEED_LOC_FLPL_INFOBOX = 'https://www.tadl.org/export/node/json/578';
var FEED_LOC_WOOD_INFOBOX = 'https://www.tadl.org/export/node/json/5439';

/* location events */
var FEED_LOC_PCL_EVENTS = FEED_LOC_EVENTS + '24';
var FEED_LOC_EBB_EVENTS = FEED_LOC_EVENTS + '19';
var FEED_LOC_KBL_EVENTS = FEED_LOC_EVENTS + '22';
var FEED_LOC_IPL_EVENTS = FEED_LOC_EVENTS + '21';
var FEED_LOC_FLPL_EVENTS = FEED_LOC_EVENTS + '20';
var FEED_LOC_WOOD_EVENTS = FEED_LOC_EVENTS + '25';

/* location news */
var FEED_LOC_PCL_NEWS = FEED_LOC_NEWS + '24';
var FEED_LOC_EBB_NEWS = FEED_LOC_NEWS + '19';
var FEED_LOC_KBL_NEWS = FEED_LOC_NEWS + '22';
var FEED_LOC_IPL_NEWS = FEED_LOC_NEWS + '21';
var FEED_LOC_FLPL_NEWS = FEED_LOC_NEWS + '20';
var FEED_LOC_WOOD_NEWS = FEED_LOC_NEWS + '25';

/* item lists */

/* NYI var FEED_LOC_ITEMS_BASE = 'https://melcatcher....';
        var FEED_LOC_ITEMS_FLPL = 31323;
        */

