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
var FEED_LOC_EVENTS = 'https://www.tadl.org/mobile/export/events/formatted/json/'; // add location id to end
var FEED_LOC_NEWS = 'https://www.tadl.org/export/news/location/json/';
/* infoboxes */
var FEED_LOC_PCL_INFOBOX = 'https://www.tadl.org/export/node/json/583';
var FEED_LOC_EBB_INFOBOX = 'https://www.tadl.org/export/node/json/5439';
var FEED_LOC_KBL_INFOBOX = 'https://www.tadl.org/export/node/json/23123';
var FEED_LOC_IPL_INFOBOX = 'https://www.tadl.org/export/node/json/580';
var FEED_LOC_FLPL_INFOBOX = 'https://www.tadl.org/export/node/json/578';
var FEED_LOC_WOOD_INFOBOX = 'https://www.tadl.org/export/node/json/5439';
/* item lists */
/* NYI
var FEED_LOC_ITEMS_BASE = 'https://melcatcher....';
var FEED_LOC_ITEMS_FLPL = 31323;
var FEED_LOC_ITEMS_WOOD = 23523;
var FEED_LOC_ITEMS_IPL = 14324;
var FEED_LOC_ITEMS_KBL = 23524;
var FEED_LOC_ITEMS_EBB = 23523;
var FEED_LOC_ITEMS_PCL = 46233;
*/

function showEastBay() {
    cleanhouse();
    cleandivs();
    $('#working').show().spin('default');
    var ebbevents = JSON.parse(sessionStorage.getItem("ebbevents"));
    if (ebbevents == null) {
        $.getJSON(FEED_LOC_EVENTS + '19', function(data) {
            sessionStorage.setItem("ebbevents", JSON.stringify(data));
            var template = Handlebars.compile($('#showevents-template').html());
            var info = template(data);
            $('#region-two').append(info).prepend('<div class="card"><h4 class="title">Upcoming Events</h4></div>');
        });
    } else {
        var template = Handlebars.compile($('#showevents-template').html());
        var info = template(ebbevents);
        $('#region-two').append(info).prepend('<div class="card"><h4 class="title">Upcoming Events</h4></div>');
    }
    var ebbinfo = JSON.parse(sessionStorage.getItem("ebbinfo"));
    if (ebbinfo == null) {
        $.getJSON(FEED_LOC_EBB_INFOBOX, function(data) {
            sessionStorage.setItem("ebbinfo", JSON.stringify(data));
            var template = Handlebars.compile($('#drupalnode-template').html());
            var info = template(data);
            $('#region-one').prepend(info);
        });
    } else {
        var template = Handlebars.compile($('#drupalnode-template').html());
        var info = template(ebbinfo);
        $('#region-one').prepend(info);
    }
    var ebbnews = JSON.parse(sessionStorage.getItem("ebbnews"));
    if (ebbnews == null) {
        $.getJSON(FEED_LOC_NEWS + '19', function(data) {
            sessionStorage.setItem("ebbnews", JSON.stringify(data));
            var template = Handlebars.compile($('#showfeaturednews-template').html());
            var info = template(data);
            $('#region-three').prepend(info).prepend('<div class="card"><h4 class="title">Recent News</h4></div>');
            $('#working').hide().spin(false);
            hoursAndInfo('ebb');
        });
    } else {
        var template = Handlebars.compile($('#showfeaturednews-template').html());
        var info = template(ebbnews);
        $('#region-three').prepend(info).prepend('<div class="card"><h4 class="title">Recent News</h4></div>');
        $('#working').hide().spin(false);
        hoursAndInfo('ebb');
    }
}

function showFifeLake() {
    cleanhouse();
    cleandivs();
    $('#working').show().spin('default');
    var flplevents = JSON.parse(sessionStorage.getItem("flplevents"));
    if (flplevents == null) {
        $.getJSON(FEED_LOC_EVENTS + '20', function(data) {
            sessionStorage.setItem("flplevents", JSON.stringify(data));
            var template = Handlebars.compile($('#showevents-template').html());
            var info = template(data);
            $('#region-two').append(info).prepend('<div class="card"><h4 class="title">Upcoming Events</h4></div>');
        });
    } else {
        var template = Handlebars.compile($('#showevents-template').html());
        var info = template(flplevents);
        $('#region-two').append(info).prepend('<div class="card"><h4 class="title">Upcoming Events</h4></div>');
    }
    var flplinfo = JSON.parse(sessionStorage.getItem("flplinfo"));
    if (flplinfo == null) {
        $.getJSON(FEED_LOC_FLPL_INFOBOX, function(data) {
            sessionStorage.setItem("flplinfo", JSON.stringify(data));
            var template = Handlebars.compile($('#drupalnode-template').html());
            var info = template(data);
            $('#region-one').prepend(info);
        });
    } else {
        var template = Handlebars.compile($('#drupalnode-template').html());
        var info = template(flplinfo);
        $('#region-one').prepend(info);
    }
    var flplnews = JSON.parse(sessionStorage.getItem("flplnews"));
    if (flplnews == null) {
        $.getJSON(FEED_LOC_NEWS + '20', function(data) {
            sessionStorage.setItem("flplnews", JSON.stringify(data));
            var template = Handlebars.compile($('#showfeaturednews-template').html());
            var info = template(data);
            $('#region-three').prepend(info).prepend('<div class="card"><h4 class="title">Recent News</h4></div>');
            $('#working').hide().spin(false);
            hoursAndInfo('flpl');
        });
    } else {
        var template = Handlebars.compile($('#showfeaturednews-template').html());
        var info = template(flplnews);
        $('#region-three').prepend(info).prepend('<div class="card"><h4 class="title">Recent News</h4></div>');
        $('#working').hide().spin(false);
        hoursAndInfo('flpl');
    }
}

function showInterlochen() {
    cleanhouse();
    cleandivs();
    $('#working').show().spin('default');
    var iplevents = JSON.parse(sessionStorage.getItem("iplevents"));
    if (iplevents == null) {
        $.getJSON(FEED_LOC_EVENTS + '21', function(data) {
            sessionStorage.setItem("iplevents", JSON.stringify(data));
            var template = Handlebars.compile($('#showevents-template').html());
            var info = template(data);
            $('#region-two').append(info).prepend('<div class="card"><h4 class="title">Upcoming Events</h4></div>');
        });
    } else {
        var template = Handlebars.compile($('#showevents-template').html());
        var info = template(iplevents);
        $('#region-two').append(info).prepend('<div class="card"><h4 class="title">Upcoming Events</h4></div>');
    }
    var iplinfo = JSON.parse(sessionStorage.getItem("iplinfo"));
    if (iplinfo == null) {
        $.getJSON(FEED_LOC_IPL_INFOBOX, function(data) {
            sessionStorage.setItem("iplinfo", JSON.stringify(data));
            var template = Handlebars.compile($('#drupalnode-template').html());
            var info = template(data);
            $('#region-one').prepend(info);
        });
    } else {
        var template = Handlebars.compile($('#drupalnode-template').html());
        var info = template(iplinfo);
        $('#region-one').prepend(info);
    }
    var iplnews = JSON.parse(sessionStorage.getItem("iplnews"));
    if (iplnews == null) {
        $.getJSON(FEED_LOC_NEWS + '21', function(data) {
            sessionStorage.setItem("iplnews", JSON.stringify(data));
            var template = Handlebars.compile($('#showfeaturednews-template').html());
            var info = template(data);
            $('#region-three').prepend(info).prepend('<div class="card"><h4 class="title">Recent News</h4></div>');
            $('#working').hide().spin(false);
            hoursAndInfo('ipl');
        });
    } else {
        var template = Handlebars.compile($('#showfeaturednews-template').html());
        var info = template(iplnews);
        $('#region-three').prepend(info).prepend('<div class="card"><h4 class="title">Recent News</h4></div>');
        $('#working').hide().spin(false);
        hoursAndInfo('ipl');
    }
}

function showKingsley() {
    cleanhouse();
    cleandivs();
    $('#working').show().spin('default');
    var kblevents = JSON.parse(sessionStorage.getItem("kblevents"));
    if (kblevents == null) {
        $.getJSON(FEED_LOC_EVENTS + '22', function(data) {
            sessionStorage.setItem("kblevents", JSON.stringify(data));
            var template = Handlebars.compile($('#showevents-template').html());
            var info = template(data);
            $('#region-two').append(info).prepend('<div class="card"><h4 class="title">Upcoming Events</h4></div>');
        });
    } else {
        var template = Handlebars.compile($('#showevents-template').html());
        var info = template(kblevents);
        $('#region-two').append(info).prepend('<div class="card"><h4 class="title">Upcoming Events</h4></div>');
    }
    var kblinfo = JSON.parse(sessionStorage.getItem("kblinfo"));
    if (kblinfo == null) {
        $.getJSON(FEED_LOC_KBL_INFOBOX, function(data) {
            sessionStorage.setItem("kblinfo", JSON.stringify(data));
            var template = Handlebars.compile($('#drupalnode-template').html());
            var info = template(data);
            $('#region-one').prepend(info);
        });
    } else {
        var template = Handlebars.compile($('#drupalnode-template').html());
        var info = template(kblinfo);
        $('#region-one').prepend(info);
    }
    var kblnews = JSON.parse(sessionStorage.getItem("kblnews"));
    if (kblnews == null) {
        $.getJSON(FEED_LOC_NEWS + '22', function(data) {
            sessionStorage.setItem("kblnews", JSON.stringify(data));
            var template = Handlebars.compile($('#showfeaturednews-template').html());
            var info = template(data);
            $('#region-three').prepend(info).prepend('<div class="card"><h4 class="title">Recent News</h4></div>');
            $('#working').hide().spin(false);
            hoursAndInfo('kbl');
        });
    } else {
        var template = Handlebars.compile($('#showfeaturednews-template').html());
        var info = template(kblnews);
        $('#region-three').prepend(info).prepend('<div class="card"><h4 class="title">Recent News</h4></div>');
        $('#working').hide().spin(false);
        hoursAndInfo('kbl');
    }
}

function showPeninsula() {
    cleanhouse();
    cleandivs();
    $('#working').show().spin('default');
    var pclevents = JSON.parse(sessionStorage.getItem("pclevents"));
    if (pclevents == null) {
        $.getJSON(FEED_LOC_EVENTS + '24', function(data) {
            sessionStorage.setItem("pclevents", JSON.stringify(data));
            var template = Handlebars.compile($('#showevents-template').html());
            var info = template(data);
            $('#region-two').append(info).prepend('<div class="card"><h4 class="title">Upcoming Events</h4></div>');
        });
    } else {
        var template = Handlebars.compile($('#showevents-template').html());
        var info = template(pclevents);
        $('#region-two').append(info).prepend('<div class="card"><h4 class="title">Upcoming Events</h4></div>');
    }
    var pclinfo = JSON.parse(sessionStorage.getItem("pclinfo"));
    if (pclinfo == null) {
        $.getJSON(FEED_LOC_PCL_INFOBOX, function(data) {
            sessionStorage.setItem("pclinfo", JSON.stringify(data));
            var template = Handlebars.compile($('#drupalnode-template').html());
            var info = template(data);
            $('#region-one').prepend(info);
        });
    } else {
        var template = Handlebars.compile($('#drupalnode-template').html());
        var info = template(pclinfo);
        $('#region-one').prepend(info);
    }
    var pclnews = JSON.parse(sessionStorage.getItem("pclnews"));
    if (pclnews == null) {
        $.getJSON(FEED_LOC_NEWS + '24', function(data) {
            sessionStorage.setItem("pclnews", JSON.stringify(data));
            var template = Handlebars.compile($('#showfeaturednews-template').html());
            var info = template(data);
            $('#region-three').prepend(info).prepend('<div class="card"><h4 class="title">Recent News</h4></div>');
            $('#working').hide().spin(false);
            hoursAndInfo('pcl');
        });
    } else {
        var template = Handlebars.compile($('#showfeaturednews-template').html());
        var info = template(pclnews);
        $('#region-three').prepend(info).prepend('<div class="card"><h4 class="title">Recent News</h4></div>');
        $('#working').hide().spin(false);
        hoursAndInfo('pcl');
    }
}

function showWoodmere() {
    cleanhouse();
    cleandivs();
    $('#working').show().spin('default');
    var woodevents = JSON.parse(sessionStorage.getItem("woodevents"));
    if (woodevents == null) {
        $.getJSON(FEED_LOC_EVENTS + '25', function(data) {
            sessionStorage.setItem("woodevents", JSON.stringify(data));
            var template = Handlebars.compile($('#showevents-template').html());
            var info = template(data);
            $('#region-two').append(info).prepend('<div class="card"><h4 class="title">Upcoming Events</h4></div>');
        });
    } else {
        var template = Handlebars.compile($('#showevents-template').html());
        var info = template(woodevents);
        $('#region-two').append(info).prepend('<div class="card"><h4 class="title">Upcoming Events</h4></div>');
    }
    var woodinfo = JSON.parse(sessionStorage.getItem("woodinfo"));
    if (woodinfo == null) {
        $.getJSON(FEED_LOC_WOOD_INFOBOX, function(data) {
            sessionStorage.setItem("woodinfo", JSON.stringify(data));
            var template = Handlebars.compile($('#drupalnode-template').html());
            var info = template(data);
            $('#region-one').prepend(info);
        });
    } else {
        var template = Handlebars.compile($('#drupalnode-template').html());
        var info = template(woodinfo);
        $('#region-one').prepend(info);
    }
    var woodnews = JSON.parse(sessionStorage.getItem("woodnews"));
    if (woodnews == null) {
        $.getJSON(FEED_LOC_NEWS + '25', function(data) {
            sessionStorage.setItem("woodnews", JSON.stringify(data));
            var template = Handlebars.compile($('#showfeaturednews-template').html());
            var info = template(data);
            $('#region-three').prepend(info).prepend('<div class="card"><h4 class="title">Recent News</h4></div>');
            $('#working').hide().spin(false);
            hoursAndInfo('wood');
        });
    } else {
        var template = Handlebars.compile($('#showfeaturednews-template').html());
        var info = template(woodnews);
        $('#region-three').prepend(info).prepend('<div class="card"><h4 class="title">Recent News</h4></div>');
        $('#working').hide().spin(false);
        hoursAndInfo('wood');
    }
}

function showTeensPage() {
    cleanhouse();
    cleandivs();
    $('#working').show().spin('default');
    var items51 = JSON.parse(sessionStorage.getItem("items51"));
    if (items51 == null) {
        $.getJSON(FEED_TEENS_NEW, function(data) {
            sessionStorage.setItem("items51", JSON.stringify(data));
            var template = Handlebars.compile($('#showfeatureditembox-template').html());
            var info = template(data);
            $('#region-one').prepend(info).prepend('<div class="card"><h4 class="title">Featured Items</h4></div>');
            applyTips();
        });
    } else {
        var template = Handlebars.compile($('#showfeatureditembox-template').html());
        var info = template(items51);
        $('#region-one').prepend(info).prepend('<div class="card"><h4 class="title">Featured Items</h4></div>');
        applyTips();
    }
    var items41 = JSON.parse(sessionStorage.getItem("items41"));
    if (items41 == null) {
        $.getJSON(FEED_TEENS_ANIMANGA, function(data) {
            sessionStorage.setItem("items41", JSON.stringify(data));
            var template = Handlebars.compile($('#showfeatureditembox-template').html());
            var info = template(data);
            $('#region-one').append(info);
            applyTips();
        });
    } else {
        var template = Handlebars.compile($('#showfeatureditembox-template').html());
        var info = template(items41);
        $('#region-one').append(info);
        applyTips();
    }
    var teenhomework = JSON.parse(sessionStorage.getItem("teenhomework"));
    if (teenhomework == null) {
        $.getJSON(FEED_TEENS_HOMEWORK, function(data) {
            sessionStorage.setItem("teenhomework", JSON.stringify(data));
            var template = Handlebars.compile($('#drupalnode-template').html());
            var info = template(data);
            $('#region-one').append(info);
        });
    } else {
        var template = Handlebars.compile($('#drupalnode-template').html());
        var info = template(teenhomework);
        $('#region-one').append(info);
    }
    var teenlists = JSON.parse(sessionStorage.getItem("teenlists"));
    if (teenlists == null) {
        $.getJSON(FEED_TEENS_LISTS, function(data) {
            sessionStorage.setItem("teenlists", JSON.stringify(data));
            var template = Handlebars.compile($('#drupalnode-template').html());
            var info = template(data);
            $('#region-two').prepend(info);
        });
    } else {
        var template = Handlebars.compile($('#drupalnode-template').html());
        var info = template(teenlists);
        $('#region-two').prepend(info);
    }
    var teenevents = JSON.parse(sessionStorage.getItem("teenevents"));
    if (teenevents == null) {
        $.getJSON(FEED_TEENS_EVENTS, function(data) {
            sessionStorage.setItem("teenevents", JSON.stringify(data));
            var template = Handlebars.compile($('#showevents-template').html());
            var info = template(data);
            $('#region-three').html(info).prepend('<div class="card"><h4 class="title">Upcoming Events</h4></div>');
        });
    } else {
        var template = Handlebars.compile($('#showevents-template').html());
        var info = template(teenevents);
        $('#region-three').html(info).prepend('<div class="card"><h4 class="title">Upcoming Events</h4></div>');
    }
    var teenreviews = JSON.parse(sessionStorage.getItem("teenreviews"));
    if (teenreviews == null) {
        $.getJSON(FEED_TEENS_REVIEWS, function(data) {
            sessionStorage.setItem("teenreviews", JSON.stringify(data));
            var template = Handlebars.compile($('#showreviews-template').html());
            var info = template(data);
            $('#region-two').append(info);
            $('#working').hide().spin(false);
        });
    } else {
        var template = Handlebars.compile($('#showreviews-template').html());
        var info = template(teenreviews);
        $('#region-two').append(info);
        $('#working').hide().spin(false);
    }
}

function showOnlinePage() {
    cleanhouse();
    cleandivs();
    $('#working').show().spin('default');
    var melresources = JSON.parse(sessionStorage.getItem("melresources"));
    if (melresources == null) {
        $.getJSON(FEED_ONLINE_MEL, function(data) {
            sessionStorage.setItem("melresources", JSON.stringify(data));
            var template = Handlebars.compile($('#drupalnode-template').html());
            var info = template(data);
            $('#region-two').append(info);
        });
    } else {
        var template = Handlebars.compile($('#drupalnode-template').html());
        var info = template(melresources);
        $('#region-two').append(info);
    }
    var tadlresources = JSON.parse(sessionStorage.getItem("tadlresources"));
    if (tadlresources == null) {
        $.getJSON(FEED_ONLINE_RESOURCES, function(data) {
            sessionStorage.setItem("tadlresources", JSON.stringify(data));
            var template = Handlebars.compile($('#drupalnode-template').html());
            var info = template(data);
            $('#region-two').prepend(info);
            $('#working').hide().spin(false);
        });
    } else {
        var template = Handlebars.compile($('#drupalnode-template').html());
        var info = template(tadlresources);
        $('#region-two').prepend(info);
        $('#working').hide().spin(false);
    }
    var legalresources = JSON.parse(sessionStorage.getItem("legalresources"));
    if (legalresources == null) {
        $.getJSON(FEED_ONLINE_LEGAL, function(data) {
            sessionStorage.setItem("legalresources", JSON.stringify(data));
            var template = Handlebars.compile($('#drupalnode-template').html());
            var info = template(data);
            $('#region-one').append(info);
        });
    } else {
        var template = Handlebars.compile($('#drupalnode-template').html());
        var info = template(legalresources);
        $('#region-one').append(info);
    }
    var ebooks = JSON.parse(sessionStorage.getItem("ebooks"));
    if (ebooks == null) {
        $.getJSON(FEED_ONLINE_EBOOKS, function(data) {
            sessionStorage.setItem("ebooks", JSON.stringify(data));
            var template = Handlebars.compile($('#drupalnode-template').html());
            var info = template(data);
            $('#region-three').prepend(info);
        });
    } else {
        var template = Handlebars.compile($('#drupalnode-template').html());
        var info = template(ebooks);
        $('#region-three').prepend(info);
    }
}
function showYouthPage() {
    cleanhouse();
    cleandivs();
    $('#working').show().spin('default');
    var youthresources = JSON.parse(sessionStorage.getItem("youthresources"));
    if (youthresources == null) {
        $.getJSON(FEED_YOUTH_RESOURCES, function(data) {
            sessionStorage.setItem("youthresources", JSON.stringify(data));
            var template = Handlebars.compile($('#drupalnode-template').html());
            var info = template(data);
            $('#region-one').append(info);
        });
    } else {
        var template = Handlebars.compile($('#drupalnode-template').html());
        var info = template(youthresources);
        $('#region-one').append(info);
    }
    var youthawards = JSON.parse(sessionStorage.getItem("youthawards"));
    if (youthawards == null) {
        $.getJSON(FEED_YOUTH_AWARDWINS, function(data) {
            sessionStorage.setItem("youthawards", JSON.stringify(data));
            var template = Handlebars.compile($('#drupalnode-template').html());
            var info = template(data);
            $('#region-one').append(info);
            $('a[rel="lightframe"]').fancybox({type: 'iframe'});
        });
    } else {
        var template = Handlebars.compile($('#drupalnode-template').html());
        var info = template(youthawards);
        $('#region-one').append(info);
        $('a[rel="lightframe"]').fancybox({type: 'iframe'});
    }
    var items47 = JSON.parse(sessionStorage.getItem("items47"));
    if (items47 == null) {
        $.getJSON(FEED_YOUTH_DISPLAY, function(data) {
            sessionStorage.setItem("items47", JSON.stringify(data));
            var template = Handlebars.compile($('#showfeatureditemboxall-template').html());
            var info = template(data);
            $('#region-one').prepend(info);
            applyTips();
        });
    } else {
        var template = Handlebars.compile($('#showfeatureditemboxall-template').html());
        var info = template(items47);
        $('#region-one').prepend(info);
        applyTips();
    }
    var items52 = JSON.parse(sessionStorage.getItem("items52"));
    if (items52 == null) {
        $.getJSON(FEED_YOUTH_NEWBOOKS, function(data) {
            sessionStorage.setItem("items52", JSON.stringify(data));
            var template = Handlebars.compile($('#showfeatureditembox-template').html());
            var info = template(data);
            $('#region-one').prepend(info).prepend('<div class="card"><h4 class="title">Featured Items</h4></div>');
            applyTips();
        });
    } else {
        var template = Handlebars.compile($('#showfeatureditembox-template').html());
        var info = template(items52);
        $('#region-one').prepend(info).prepend('<div class="card"><h4 class="title">Featured Items</h4></div>');
        applyTips();
    }
    var youthevents = JSON.parse(sessionStorage.getItem("youthevents"));
    if (youthevents == null) {
        $.getJSON(FEED_YOUTH_EVENTS, function(data) {
            sessionStorage.setItem("youthevents", JSON.stringify(data));
            var template = Handlebars.compile($('#showevents-template').html());
            var info = template(data);
            $('#region-three').html(info).prepend('<div class="card"><h4 class="title">Upcoming Events</h4></div>');
        });
    } else {
        var template = Handlebars.compile($('#showevents-template').html());
        var info = template(youthevents);
        $('#region-three').html(info).prepend('<div class="card"><h4 class="title">Upcoming Events</h4></div>');
    }
    var youthreviews = JSON.parse(sessionStorage.getItem("youthreviews"));
    if (youthreviews == null) {
        $.getJSON(FEED_YOUTH_REVIEWS, function(data) {
            sessionStorage.setItem("youthreviews", JSON.stringify(data));
            var template = Handlebars.compile($('#showreviews-template').html());
            var info = template(data);
            $('#region-two').append(info);
            $('#working').hide().spin(false);
        });
    } else {
        var template = Handlebars.compile($('#showreviews-template').html());
        var info = template(youthreviews);
        $('#region-two').append(info);
        $('#working').hide().spin(false);
    }
}

function showVideoPage() {
    cleanhouse();
    cleandivs();
    $('#working').show().spin('default');
    var items32 = JSON.parse(sessionStorage.getItem("items32"));
    if (items32 == null) {
        $.getJSON(FEED_VIDEO_NEW, function(data) {
            sessionStorage.setItem("items32", JSON.stringify(data));
            var template = Handlebars.compile($('#showfeatureditembox-template').html());
            var info = template(data);
            $('#region-one').prepend(info).prepend('<div class="card"><h4 class="title">Featured Items</h4></div>');
            applyTips();
        });
    } else {
        var template = Handlebars.compile($('#showfeatureditembox-template').html());
        var info = template(items32);
        $('#region-one').prepend(info).prepend('<div class="card"><h4 class="title">Featured Items</h4></div>');
        applyTips();
    }
    var items34 = JSON.parse(sessionStorage.getItem("items34"));
    if (items34 == null) {
        $.getJSON(FEED_VIDEO_HOT, function(data) {
            sessionStorage.setItem("items34", JSON.stringify(data));
            var template = Handlebars.compile($('#showfeatureditembox-template').html());
            var info = template(data);
            $('#region-one').append(info);
            applyTips();
        });
    } else {
        var template = Handlebars.compile($('#showfeatureditembox-template').html());
        var info = template(items34);
        $('#region-one').append(info);
        applyTips();
    }
    var items286 = JSON.parse(sessionStorage.getItem("items286"));
    if (items286 == null) {
        $.getJSON(FEED_VIDEO_MET, function(data) {
            sessionStorage.setItem("items286", JSON.stringify(data));
            var template = Handlebars.compile($('#showfeatureditemboxall-template').html());
            var info = template(data);
            $('#region-three').append(info);
            applyTips();
        });
    } else {
        var template = Handlebars.compile($('#showfeatureditemboxall-template').html());
        var info = template(items286);
        $('#region-three').append(info);
        applyTips();
    }
    var items165 = JSON.parse(sessionStorage.getItem("items165"));
    if (items165 == null) {
        $.getJSON(FEED_VIDEO_TCFF, function(data) {
            sessionStorage.setItem("items165", JSON.stringify(data));
            var template = Handlebars.compile($('#showfeatureditemboxall-template').html());
            var info = template(data);
            $('#region-three').prepend(info).prepend('<div class="card"><h4 class="title">Featured Items</h4></div>');
            applyTips();
        });
    } else {
        var template = Handlebars.compile($('#showfeatureditemboxall-template').html());
        var info = template(items165);
        $('#region-three').prepend(info).prepend('<div class="card"><h4 class="title">Featured Items</h4></div>');
        applyTips();
    }
    var videoreviews = JSON.parse(sessionStorage.getItem("videoreviews"));
    if (videoreviews == null) {
        $.getJSON(FEED_VIDEO_REVIEWS, function(data) {
            sessionStorage.setItem("videoreviews", JSON.stringify(data));
            var template = Handlebars.compile($('#showreviews-template').html());
            var info = template(data);
            $('#region-two').append(info);
            $('#working').hide().spin(false);
        });
    } else {
        var template = Handlebars.compile($('#showreviews-template').html());
        var info = template(videoreviews);
        $('#region-two').append(info);
        $('#working').hide().spin(false);
    }
}

function showMusicPage() {
    cleanhouse();
    cleandivs();
    $('#working').show().spin('default');
    var items29 = JSON.parse(sessionStorage.getItem("items29"));
    if (items29 == null) {
        $.getJSON(FEED_MUSIC_NEW, function(data) {
            sessionStorage.setItem("items29", JSON.stringify(data));
            var template = Handlebars.compile($('#showfeatureditembox-template').html());
            var info = template(data);
            $('#region-one').append(info).prepend('<div class="card"><h4 class="title">Featured Items</h4></div>');
            applyTips();
        });
    } else {
        var template = Handlebars.compile($('#showfeatureditembox-template').html());
        var info = template(items29);
        $('#region-one').append(info).prepend('<div class="card"><h4 class="title">Featured Items</h4></div>');
        applyTips();
    }
    var items31 = JSON.parse(sessionStorage.getItem("items31"));
    if (items31 == null) {
        $.getJSON(FEED_MUSIC_HOT, function(data) {
            sessionStorage.setItem("items31", JSON.stringify(data));
            var template = Handlebars.compile($('#showfeatureditembox-template').html());
            var info = template(data);
            $('#region-one').append(info);
            applyTips();
        });
    } else {
        var template = Handlebars.compile($('#showfeatureditembox-template').html());
        var info = template(items31);
        $('#region-one').append(info);
        applyTips();
    }
    var musiclinks = JSON.parse(sessionStorage.getItem("musiclinks"));
    if (musiclinks == null) {
        $.getJSON(FEED_MUSIC_LINKS, function(data) {
            sessionStorage.setItem("musiclinks", JSON.stringify(data));
            var template = Handlebars.compile($('#drupalnode-template').html());
            var info = template(data);
            $('#region-three').prepend(info);
        });
    } else {
        var template = Handlebars.compile($('#drupalnode-template').html());
        var info = template(musiclinks);
        $('#region-three').prepend(info);
    }
    var musicreviews = JSON.parse(sessionStorage.getItem("musicreviews"));
    if (musicreviews == null) {
        $.getJSON(FEED_MUSIC_REVIEWS, function(data) {
            sessionStorage.setitem("musicreviews", JSON.stringify(data));
            var template = Handlebars.compile($('#showreviews-template').html());
            var info = template(data);
            $('#region-two').append(info);
            $('#working').hide().spin(false);
        });
    } else {
        var template = Handlebars.compile($('#showreviews-template').html());
        var info = template(musicreviews);
        $('#region-two').append(info);
        $('#working').hide().spin(false);
    }
}

function showBooksPage() {
    cleanhouse();
    cleandivs();
    $('#working').show().spin('default');
    var items67 = JSON.parse(sessionStorage.getItem("items67"));
    if (items67 == null) {
        $.getJSON(FEED_BOOKS_FEATURED_FICTION, function(data) {
            sessionStorage.setItem("items67", JSON.stringify(data));
            var template = Handlebars.compile($('#showfeatureditembox-template').html());
            var info = template(data);
            $('#region-one').prepend(info).prepend('<div class="card"><h4 class="title">Featured Items</h4></div>');
            applyTips();
        });
    } else {
        var template = Handlebars.compile($('#showfeatureditembox-template').html());
        var info = template(items67);
        $('#region-one').prepend(info).prepend('<div class="card"><h4 class="title">Featured Items</h4></div>');
        applyTips();
    }
    var items68 = JSON.parse(sessionStorage.getItem("items68"));
    if (items68 == null) {
        $.getJSON(FEED_BOOKS_FEATURED_NONFIC, function(data) {
            sessionStorage.setItem("items68", JSON.stringify(data));
            var template = Handlebars.compile($('#showfeatureditembox-template').html());
            var info = template(data);
            $('#region-one').append(info);
            applyTips();
        });
    } else {
        var template = Handlebars.compile($('#showfeatureditembox-template').html());
        var info = template(items68);
        $('#region-one').append(info);
        applyTips();
    }
    var items45 = JSON.parse(sessionStorage.getItem("items45"));
    if (items45 == null) {
        $.getJSON(FEED_BOOKS_ADULTS_DISPLAY, function(data) {
            sessionStorage.setItem("items45", JSON.stringify(data));
            var template = Handlebars.compile($('#showfeatureditemboxall-template').html());
            var info = template(data);
            $('#region-one').append(info);
            applyTips();
        });
    } else {
        var template = Handlebars.compile($('#showfeatureditemboxall-template').html());
        var info = template(items45);
        $('#region-one').append(info);
        applyTips();
    }
    var items224 = JSON.parse(sessionStorage.getItem("items224"));
    if (items224 == null) {
        $.getJSON(FEED_BOOKS_ADULTS_CLUBKITS, function(data) {
            sessionStorage.setItem("items224", JSON.stringify(data));
            var template = Handlebars.compile($('#showfeatureditemboxall-template').html());
            var info = template(data);
            $('#region-three').prepend(info).prepend('<div class="card"><h4 class="title">Featured Items</h4></div>');
            applyTips();
        });
    } else {
        var template = Handlebars.compile($('#showfeatureditemboxall-template').html());
        var info = template(items224);
        $('#region-three').prepend(info).prepend('<div class="card"><h4 class="title">Featured Items</h4></div>');
        applyTips();
    }
    var items234 = JSON.parse(sessionStorage.getItem("items234"));
    if (items234 == null) {
        $.getJSON(FEED_BOOKS_ADULTS_BUSINESS, function(data) {
            sessionStorage.setItem("items234", JSON.stringify(data));
            var template = Handlebars.compile($('#showfeatureditemboxall-template').html());
            var info = template(data);
            $('#region-three').append(info);
            applyTips();
        });
    } else {
        var template = Handlebars.compile($('#showfeatureditemboxall-template').html());
        var info = template(items234);
        $('#region-three').append(info);
        applyTips();
    }
    var booklists = JSON.parse(sessionStorage.getItem("booklists"));
    if (booklists == null) {
        $.getJSON(FEED_BOOKS_BOOKLISTS, function(data) {
            sessionStorage.setItem("booklists", JSON.stringify(data));
            var template = Handlebars.compile($('#drupalnode-template').html());
            var info = template(data);
            $('#region-two').prepend(info);
            $('a[rel="lightframe"]').fancybox({type: 'iframe'});
        });
    } else {
        var template = Handlebars.compile($('#drupalnode-template').html());
        var info = template(booklists);
        $('#region-two').prepend(info);
        $('a[rel="lightframe"]').fancybox({type: 'iframe'});
    }
    var bookreviews = JSON.parse(sessionStorage.getItem("bookreviews"));
    if (bookreviews == null) {
        $.getJSON(FEED_BOOKS_REVIEWS, function(data) {
            sessionStorage.setItem("bookreviews", JSON.stringify(data));
            var template = Handlebars.compile($('#showreviews-template').html());
            var info = template(data);
            $('#region-two').append(info);
            $('#working').hide().spin(false);
        });
    } else {
        var template = Handlebars.compile($('#showreviews-template').html());
        var info = template(bookreviews);
        $('#region-two').append(info);
        $('#working').hide().spin(false);
    }
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
