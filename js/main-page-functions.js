var NODEPREFIX = 'https://www.tadl.org/export/node/json/';

/* Feeds for Books page */
var FEED_BOOKS_FEATURED_FICTION = 'https://www.tadl.org/mobile/export/items/67/json';
var FEED_BOOKS_FEATURED_NONFIC = 'https://www.tadl.org/mobile/export/items/68/json';
var FEED_BOOKS_BOOKLISTS = 'https://www.tadl.org/export/node/json/80';
var FEED_BOOKS_REVIEWS = 'https://www.tadl.org/export/reviews/Books/json';
var FEED_BOOKS_ADULTS_DISPLAY = 'https://www.tadl.org/mobile/export/items/45/all/json';
var FEED_BOOKS_ADULTS_CLUBKITS = 'https://www.tadl.org/mobile/export/items/224/all/json';
var FEED_BOOKS_ADULTS_BUSINESS = 'https://www.tadl.org/mobile/export/items/234/all/json';

/* Feeds for Music page */
var FEED_MUSIC_NEW = 'https://www.tadl.org/mobile/export/items/29/json';
var FEED_MUSIC_HOT = 'https://www.tadl.org/mobile/export/items/31/json';
var FEED_MUSIC_REVIEWS = 'https://www.tadl.org/export/reviews/Music/json';
var FEED_MUSIC_LINKS = 'https://www.tadl.org/export/node/json/113';

/* Feeds for Video page */
var FEED_VIDEO_NEW = 'https://www.tadl.org/mobile/export/items/32/json';
var FEED_VIDEO_HOT = 'https://www.tadl.org/mobile/export/items/34/json';
var FEED_VIDEO_TCFF = 'https://www.tadl.org/mobile/export/items/165/all/json';
var FEED_VIDEO_MET = 'https://www.tadl.org/mobile/export/items/286/all/json';
var FEED_VIDEO_REVIEWS = 'https://www.tadl.org/export/reviews/Video/json';

/* Feeds for Online page */
var FEED_ONLINE_MEL = 'https://www.tadl.org/export/node/json/3373';
var FEED_ONLINE_RESOURCES = 'https://www.tadl.org/export/node/json/3372';
var FEED_ONLINE_LEGAL = 'https://www.tadl.org/export/node/json/25242';
var FEED_ONLINE_EBOOKS = 'https://www.tadl.org/export/node/json/14040';

/* Feeds for Youth page */
var FEED_YOUTH_DISPLAY = 'https://www.tadl.org/mobile/export/items/47/all/json';
var FEED_YOUTH_NEWBOOKS = 'https://www.tadl.org/mobile/export/items/52/json';
var FEED_YOUTH_REVIEWS = 'https://www.tadl.org/export/reviews/Youth/json';
var FEED_YOUTH_EVENTS = 'https://www.tadl.org/mobile/export/events/formatted/json/27';
var FEED_YOUTH_RESOURCES = 'https://www.tadl.org/export/node/json/647';
var FEED_YOUTH_AWARDWINS = 'https://www.tadl.org/export/node/json/644';

/* Feeds for Teens page */
var FEED_TEENS_NEW = 'https://www.tadl.org/mobile/export/items/51/json';
var FEED_TEENS_ANIMANGA = 'https://www.tadl.org/mobile/export/items/41/json';
var FEED_TEENS_EVENTS = 'https://www.tadl.org/mobile/export/events/formatted/json/28';
var FEED_TEENS_REVIEWS = 'https://www.tadl.org/export/reviews/Teens/json';
var FEED_TEENS_HOMEWORK = 'https://www.tadl.org/export/node/json/409';
var FEED_TEENS_LISTS = 'https://www.tadl.org/export/node/json/12784';

/* Feeds for Locations */
var FEED_LOC_EVENTS = 'https://www.tadl.org/mobile/export/events/formatted/json/'; // add location id to end
var FEED_LOC_NEWS = 'https://www.tadl.org/export/news/location/json/';
/* infoboxes */
var FEED_LOC_PCL_INFOBOX = 'https://www.tadl.org/export/node/json/NNN';
var FEED_LOC_EBB_INFOBOX = 'https://www.tadl.org/export/node/json/NNN';
var FEED_LOC_KBL_INFOBOX = 'https://www.tadl.org/export/node/json/NNN';
var FEED_LOC_IPL_INFOBOX = 'https://www.tadl.org/export/node/json/NNN';
var FEED_LOC_FLPL_INFOBOX = 'https://www.tadl.org/export/node/json/578';
var FEED_LOC_WOOD_INFOBOX = 'https://www.tadl.org/export/node/json/NNN';
/* item lists */
var FEED_LOC_ITEMS_BASE = 'https://melcatcher....';
var FEED_LOC_ITEMS_FLPL = 31323;
var FEED_LOC_ITEMS_WOOD = 23523;
var FEED_LOC_ITEMS_IPL = 14324;
var FEED_LOC_ITEMS_KBL = 23524;
var FEED_LOC_ITEMS_EBB = 23523;
var FEED_LOC_ITEMS_PCL = 46233;

function showWoodmere() {
}
function showEastBay() {
}
function showKingsley() {
}
function showInterlochen() {
}
function showPeninsula() {
}
function showFifeLake() {
    cleanhouse();
    cleandivs();
    $('#working').show().spin('default');
    $.getJSON(FEED_LOC_EVENTS + '20', function(data) {
        var template = Handlebars.compile($('#showevents-template').html());
        var info = template(data);
        $('#region-two').append(info).prepend('<div class="card"><h4 class="title">Upcoming Events</h4></div>');
    });
    $.getJSON(FEED_LOC_FLPL_INFOBOX, function(data) {
        var template = Handlebars.compile($('#drupalnode-template').html());
        var info = template(data);
        $('#region-one').prepend(info);
    });
    $.getJSON(FEED_LOC_NEWS + '20', function(data) {
        var template = Handlebars.compile($('#showfeaturednews-template').html());
        var info = template(data);
        $('#region-three').prepend(info).prepend('<div class="card"><h4 class="title">Recent News</h4></div>');
        $('#working').hide().spin(false);
        hoursAndInfo('flpl');
    });
}

function showTeensPage() {
    cleanhouse();
    cleandivs();
    $('#working').show().spin('default');
    $.getJSON(FEED_TEENS_NEW, function(data) {
        var template = Handlebars.compile($('#showfeatureditembox-template').html());
        var info = template(data);
        $('#region-one').prepend(info).prepend('<div class="card"><h4 class="title">Featured Items</h4></div>');
        applyTips();
    });
    $.getJSON(FEED_TEENS_ANIMANGA, function(data) {
        var template = Handlebars.compile($('#showfeatureditembox-template').html());
        var info = template(data);
        $('#region-one').append(info);
        applyTips();
    });
    $.getJSON(FEED_TEENS_HOMEWORK, function(data) {
        var template = Handlebars.compile($('#drupalnode-template').html());
        var info = template(data);
        $('#region-two').prepend(info);
    });
    $.getJSON(FEED_TEENS_LISTS, function(data) {
        var template = Handlebars.compile($('#drupalnode-template').html());
        var info = template(data);
        $('#region-two').prepend(info);
    });
    $.getJSON(FEED_TEENS_EVENTS, function(data) {
        var template = Handlebars.compile($('#showevents-template').html());
        var info = template(data);
        $('#region-three').html(info).prepend('<div class="card"><h4 class="title">Upcoming Events</h4></div>');
    });
    $.getJSON(FEED_TEENS_REVIEWS, function(data) {
        var template = Handlebars.compile($('#showreviews-template').html());
        var info = template(data);
        $('#region-two').append(info);
        $('#working').hide().spin(false);
    });
}

function showOnlinePage() {
    cleanhouse();
    cleandivs();
    $('#working').show().spin('default');
    $.getJSON(FEED_ONLINE_MEL, function(data) {
        var template = Handlebars.compile($('#drupalnode-template').html());
        var info = template(data);
        $('#region-two').append(info);
    });
    $.getJSON(FEED_ONLINE_RESOURCES, function(data) {
        var template = Handlebars.compile($('#drupalnode-template').html());
        var info = template(data);
        $('#region-two').prepend(info);
        $('#working').hide().spin(false);
    });
    $.getJSON(FEED_ONLINE_LEGAL, function(data) {
        var template = Handlebars.compile($('#drupalnode-template').html());
        var info = template(data);
        $('#region-one').append(info);
    });
    $.getJSON(FEED_ONLINE_EBOOKS, function(data) {
        var template = Handlebars.compile($('#drupalnode-template').html());
        var info = template(data);
        $('#region-three').prepend(info);
    });
}
function showYouthPage() {
    cleanhouse();
    cleandivs();
    $('#working').show().spin('default');
    $.getJSON(FEED_YOUTH_RESOURCES, function(data) {
        var template = Handlebars.compile($('#drupalnode-template').html());
        var info = template(data);
        $('#region-one').append(info);
    });
    $.getJSON(FEED_YOUTH_AWARDWINS, function(data) {
        var template = Handlebars.compile($('#drupalnode-template').html());
        var info = template(data);
        $('#region-one').append(info);
        $('a[rel="lightframe"]').fancybox({type: 'iframe'});
    });
    $.getJSON(FEED_YOUTH_DISPLAY, function(data) {
        var template = Handlebars.compile($('#showfeatureditemboxall-template').html());
        var info = template(data);
        $('#region-one').prepend(info);
        applyTips();
    });
    $.getJSON(FEED_YOUTH_NEWBOOKS, function(data) {
        var template = Handlebars.compile($('#showfeatureditembox-template').html());
        var info = template(data);
        $('#region-one').prepend(info).prepend('<div class="card"><h4 class="title">Featured Items</h4></div>');
        applyTips();
    });
    $.getJSON(FEED_YOUTH_EVENTS, function(data) {
        var template = Handlebars.compile($('#showevents-template').html());
        var info = template(data);
        $('#region-three').html(info).prepend('<div class="card"><h4 class="title">Upcoming Events</h4></div>');
    });
    $.getJSON(FEED_YOUTH_REVIEWS, function(data) {
        var template = Handlebars.compile($('#showreviews-template').html());
        var info = template(data);
        $('#region-two').append(info);
        $('#working').hide().spin(false);
    });
}

function showVideoPage() {
    cleanhouse();
    cleandivs();
    $('#working').show().spin('default');
    $.getJSON(FEED_VIDEO_NEW, function(data) {
        var template = Handlebars.compile($('#showfeatureditembox-template').html());
        var info = template(data);
        $('#region-one').prepend(info).prepend('<div class="card"><h4 class="title">Featured Items</h4></div>');
        applyTips();
    });
    $.getJSON(FEED_VIDEO_HOT, function(data) {
        var template = Handlebars.compile($('#showfeatureditembox-template').html());
        var info = template(data);
        $('#region-one').prepend(info);
        applyTips();
    });
    $.getJSON(FEED_VIDEO_MET, function(data) {
        var template = Handlebars.compile($('#showfeatureditemboxall-template').html());
        var info = template(data);
        $('#region-one').append(info);
        applyTips();
    });
    $.getJSON(FEED_VIDEO_TCFF, function(data) {
        var template = Handlebars.compile($('#showfeatureditemboxall-template').html());
        var info = template(data);
        $('#region-one').append(info);
        applyTips();
    });
    $.getJSON(EVENTS_URL, function(data) {
        var template = Handlebars.compile($('#showevents-template').html());
        var info = template(data);
        $('#region-three').html(info);
    });
    $.getJSON(FEED_VIDEO_REVIEWS, function(data) {
        var template = Handlebars.compile($('#showreviews-template').html());
        var info = template(data);
        $('#region-two').append(info);
        $('#working').hide().spin(false);
    });
}

function showMusicPage() {
    cleanhouse();
    cleandivs();
    $('#working').show().spin('default');
    $.getJSON(FEED_MUSIC_NEW, function(data) {
        var template = Handlebars.compile($('#showfeatureditembox-template').html());
        var info = template(data);
        $('#region-one').append(info).prepend('<div class="card"><h4 class="title">Featured Items</h4></div>');
        applyTips();
    });
    $.getJSON(FEED_MUSIC_HOT, function(data) {
        var template = Handlebars.compile($('#showfeatureditembox-template').html());
        var info = template(data);
        $('#region-one').append(info);
        applyTips();
    });
    $.getJSON(FEED_MUSIC_LINKS, function(data) {
        var template = Handlebars.compile($('#drupalnode-template').html());
        var info = template(data);
        $('#region-three').prepend(info);
    });
    $.getJSON(FEED_MUSIC_REVIEWS, function(data) {
        var template = Handlebars.compile($('#showreviews-template').html());
        var info = template(data);
        $('#region-two').append(info);
        $('#working').hide().spin(false);
    });
}

function showBooksPage() {
    cleanhouse();
    cleandivs();
    $('#working').show().spin('default');
    $.getJSON(FEED_BOOKS_FEATURED_FICTION, function(data) {
        var template = Handlebars.compile($('#showfeatureditembox-template').html());
        var info = template(data);
        $('#region-one').append(info).prepend('<div class="card"><h4 class="title">Featured Items</h4></div>');
        applyTips();
    });
    $.getJSON(FEED_BOOKS_FEATURED_NONFIC, function(data) {
        var template = Handlebars.compile($('#showfeatureditembox-template').html());
        var info = template(data);
        $('#region-one').append(info);
        applyTips();
    });
    $.getJSON(FEED_BOOKS_ADULTS_DISPLAY, function(data) {
        var template = Handlebars.compile($('#showfeatureditemboxall-template').html());
        var info = template(data);
        $('#region-one').append(info);
        applyTips();
    });
    $.getJSON(FEED_BOOKS_ADULTS_CLUBKITS, function(data) {
        var template = Handlebars.compile($('#showfeatureditemboxall-template').html());
        var info = template(data);
        $('#region-one').append(info);
        applyTips();
    });
    $.getJSON(FEED_BOOKS_ADULTS_BUSINESS, function(data) {
        var template = Handlebars.compile($('#showfeatureditemboxall-template').html());
        var info = template(data);
        $('#region-one').append(info);
        applyTips();
    });
    $.getJSON(EVENTS_URL, function(data) {
        var template = Handlebars.compile($('#showevents-template').html());
        var info = template(data);
        $('#region-three').html(info);
    });
    $.getJSON(FEED_BOOKS_BOOKLISTS, function(data) {
        var template = Handlebars.compile($('#drupalnode-template').html());
        var info = template(data);
        $('#region-two').prepend(info);
        $('a[rel="lightframe"]').fancybox({type: 'iframe'});
    });
    $.getJSON(FEED_BOOKS_REVIEWS, function(data) {
        var template = Handlebars.compile($('#showreviews-template').html());
        var info = template(data);
        $('#region-two').append(info);
        $('#working').hide().spin(false);
    });
}

function showHomePage() {
    cleanhouse();
    cleandivs();
    $('#working').show().spin('default');
    var items67 = JSON.parse(sessionStorage.getItem("items67"));
    if (items67 == null) {
        $.getJSON('https://www.tadl.org/mobile/export/items/67/json', function(data) {
            sessionStorage.setItem("items67", JSON.stringify(data));
            var template = Handlebars.compile($('#showfeatureditembox-template').html());
            var info = template(data);
            $('#region-three').prepend(info).prepend('<div class="card"><h4 class="title">Featured Items</h4></div>');
            applyTips();
        });
    } else {
        var template = Handlebars.compile($('#showfeatureditembox-template').html());
        var info = template(items67);
        $('#region-three').prepend(info).prepend('<div class="card"><h4 class="title">Featured Items</h4></div>');
        applyTips();
    }
    var items68 = JSON.parse(sessionStorage.getItem("items68"));
    if (items68 == null) {
        $.getJSON('https://www.tadl.org/mobile/export/items/68/json', function(data) {
            sessionStorage.setItem("items68", JSON.stringify(data));
            var template = Handlebars.compile($('#showfeatureditembox-template').html());
            var info = template(data);
            $('#region-three').append(info);
            applyTips();
        });
    } else {
        var template = Handlebars.compile($('#showfeatureditembox-template').html());
        var info = template(items68);
        $('#region-three').append(info);
        applyTips();
    }
    var items29 = JSON.parse(sessionStorage.getItem("items29"));
    if (items29 == null) {
        $.getJSON('https://www.tadl.org/mobile/export/items/29/json', function(data) {
            sessionStorage.setItem("items29", JSON.stringify(data));
            var template = Handlebars.compile($('#showfeatureditembox-template').html());
            var info = template(data);
            $('#region-three').append(info);
            applyTips();
        });
    } else {
        var template = Handlebars.compile($('#showfeatureditembox-template').html());
        var info = template(items29);
        $('#region-three').append(info);
        applyTips();
    }
    var featurednews = JSON.parse(sessionStorage.getItem("featurednews"));
    if (featurednews == null) {
        $.getJSON(NEWS_URL, function(data) {
            sessionStorage.setItem("featurednews", JSON.stringify(data));
            var template = Handlebars.compile($('#showfeaturednews-template').html());
            var info = template(data);
            $('#region-two').append(info).prepend('<div class="card"><h4 class="title">Featured News</h4></div>');
            $('#working').hide().spin(false);
        });
    } else {
        var template = Handlebars.compile($('#showfeaturednews-template').html());
        var info = template(featurednews);
        $('#region-two').append(info).prepend('<div class="card"><h4 class="title">Featured News</h4></div>');
        $('#working').hide().spin(false);
    }
    var tadlevents = JSON.parse(sessionStorage.getItem("tadlevents"));
    if (tadlevents == null) {
        $.getJSON(EVENTS_URL, function(data) {
            sessionStorage.setItem("tadlevents", JSON.stringify(data));
            var template = Handlebars.compile($('#showevents-template').html());
            var info = template(data);
            $('#region-one').append(info).prepend('<div class="card"><h4 class="title">Upcoming Events</h4></div>');
        });
    } else {
        var template = Handlebars.compile($('#showevents-template').html());
        var info = template(tadlevents);
        $('#region-one').append(info).prepend('<div class="card"><h4 class="title">Upcoming Events</h4></div>');
    }
}
