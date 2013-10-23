function loadJson(key, url) {
    $.getJSON(url, function(data) {
        sessionStorage.setItem(key, JSON.stringify(data));
    });
}
function loadAllJson() {
/* Feeds for all main sections */
    /* Home */
    loadJson("items67", 'https://www.tadl.org/mobile/export/items/67/json'); 
    loadJson("items68", 'https://www.tadl.org/mobile/export/items/68/json');
    loadJson("items29", 'https://www.tadl.org/mobile/export/items/29/json');
    loadJson("featurednews", 'https://www.tadl.org/export/news/json');
    loadJson("tadlevents", 'https://www.tadl.org/mobile/export/events/formatted/json/all');
    /* Books */
    loadJson("items67", 'https://www.tadl.org/mobile/export/items/67/json'); /* FEED_BOOKS_FEATURED_FICTION */
    loadJson("items68", 'https://www.tadl.org/mobile/export/items/68/json'); /* FEED_BOOKS_FEATURED_NONFIC */
    loadJson("booklists", 'https://www.tadl.org/export/node/json/80'); /* FEED_BOOKS_BOOKLISTS */
    loadJson("bookreviews", 'https://www.tadl.org/export/reviews/Books/json'); /* FEED_BOOKS_REVIEWS */
    loadJson("items45", 'https://www.tadl.org/mobile/export/items/45/all/json'); /* FEED_BOOKS_ADULTS_DISPLAY */
    loadJson("items224", 'https://www.tadl.org/mobile/export/items/224/all/json'); /* FEED_BOOKS_ADULTS_CLUBKITS */
    loadJson("items234", 'https://www.tadl.org/mobile/export/items/234/all/json'); /* FEED_BOOKS_ADULTS_BUSINESS */
    /* Music */
    loadJson("items29", 'https://www.tadl.org/mobile/export/items/29/json'); /* FEED_MUSIC_NEW */
    loadJson("items31", 'https://www.tadl.org/mobile/export/items/31/json'); /* FEED_MUSIC_HOT */
    loadJson("musicreviews", 'https://www.tadl.org/export/reviews/Music/json'); /* FEED_MUSIC_REVIEWS */
    loadJson("musiclinks", 'https://www.tadl.org/export/node/json/113'); /* FEED_MUSIC_LINKS */
    /* Video */
    loadJson("items32", 'https://www.tadl.org/mobile/export/items/32/json'); /* FEED_VIDEO_NEW */
    loadJson("items34", 'https://www.tadl.org/mobile/export/items/34/json'); /* FEED_VIDEO_HOT */
    loadJson("items165", 'https://www.tadl.org/mobile/export/items/165/all/json'); /* FEED_VIDEO_TCFF */
    loadJson("items286", 'https://www.tadl.org/mobile/export/items/286/all/json'); /* FEED_VIDEO_MET */
    loadJson("videoreviews", 'https://www.tadl.org/export/reviews/Video/json'); /* FEED_VIDEO_REVIEWS */
    /* Online */
    loadJson("melresources", 'https://www.tadl.org/export/node/json/3373'); /* FEED_ONLINE_MEL */
    loadJson("tadlresources", 'https://www.tadl.org/export/node/json/3372'); /* FEED_ONLINE_RESOURCES */
    loadJson("legalresources", 'https://www.tadl.org/export/node/json/25242'); /* FEED_ONLINE_LEGAL */
    loadJson("ebooks", 'https://www.tadl.org/export/node/json/14040'); /* FEED_ONLINE_EBOOKS */
    /* Youth */
    loadJson("items47", 'https://www.tadl.org/mobile/export/items/47/all/json'); /* FEED_YOUTH_DISPLAY */
    loadJson("items52", 'https://www.tadl.org/mobile/export/items/52/json'); /* FEED_YOUTH_NEWBOOKS */
    loadJson("youthreviews", 'https://www.tadl.org/export/reviews/Youth/json'); /* FEED_YOUTH_REVIEWS */
    loadJson("youthevents", 'https://www.tadl.org/mobile/export/events/formatted/json/27'); /* FEED_YOUTH_EVENTS */
    loadJson("youthresources", 'https://www.tadl.org/export/node/json/647'); /* FEED_YOUTH_RESOURCES */
    loadJson("youthawards", 'https://www.tadl.org/export/node/json/644'); /* FEED_YOUTH_AWARDWINS */
    /* Teens */
    loadJson("items51", 'https://www.tadl.org/mobile/export/items/51/json'); /* FEED_TEENS_NEW */
    loadJson("items41", 'https://www.tadl.org/mobile/export/items/41/json'); /* FEED_TEENS_ANIMANGA */
    loadJson("teenevents", 'https://www.tadl.org/mobile/export/events/formatted/json/28'); /* FEED_TEENS_EVENTS */
    loadJson("teenreviews", 'https://www.tadl.org/export/reviews/Teens/json'); /* FEED_TEENS_REVIEWS */
    loadJson("teenhomework", 'https://www.tadl.org/export/node/json/409'); /* FEED_TEENS_HOMEWORK */
    loadJson("teenlists", 'https://www.tadl.org/export/node/json/12784'); /* FEED_TEENS_LISTS */
/* Feeds for library pages */
    /* Fife Lake */
    loadJson("flplevents", FEED_LOC_EVENTS + '20'); /* FEED_LOC_FLPL_EVENTS */
    loadJson("flplinfo", FEED_LOC_FLPL_INFOBOX); /* FEED_LOC_FLPL_INFOBOX */
    loadJson("flplnews", FEED_LOC_NEWS + '20'); /* FEED_LOC_FLPL_NEWS */
    /* East Bay */
    loadJson("ebbevents", FEED_LOC_EVENTS + '20'); /* FEED_LOC_FLPL_EVENTS */
    loadJson("ebbinfo", FEED_LOC_FLPL_INFOBOX); /* FEED_LOC_FLPL_INFOBOX */
    loadJson("ebbnews", FEED_LOC_NEWS + '20'); /* FEED_LOC_FLPL_NEWS */
    /* Kingsley */
    loadJson("kblevents", FEED_LOC_EVENTS + '20'); /* FEED_LOC_FLPL_EVENTS */
    loadJson("kblinfo", FEED_LOC_FLPL_INFOBOX); /* FEED_LOC_FLPL_INFOBOX */
    loadJson("kblnews", FEED_LOC_NEWS + '20'); /* FEED_LOC_FLPL_NEWS */
    /* Interlochen */
    loadJson("iplevents", FEED_LOC_EVENTS + '20'); /* FEED_LOC_FLPL_EVENTS */
    loadJson("iplinfo", FEED_LOC_FLPL_INFOBOX); /* FEED_LOC_FLPL_INFOBOX */
    loadJson("iplnews", FEED_LOC_NEWS + '20'); /* FEED_LOC_FLPL_NEWS */
    /* Peninsula */
    loadJson("pclevents", FEED_LOC_EVENTS + '20'); /* FEED_LOC_FLPL_EVENTS */
    loadJson("pclinfo", FEED_LOC_FLPL_INFOBOX); /* FEED_LOC_FLPL_INFOBOX */
    loadJson("pclnews", FEED_LOC_NEWS + '20'); /* FEED_LOC_FLPL_NEWS */
    /* Woodmere */
    loadJson("woodevents", FEED_LOC_EVENTS + '20'); /* FEED_LOC_FLPL_EVENTS */
    loadJson("woodinfo", FEED_LOC_FLPL_INFOBOX); /* FEED_LOC_FLPL_INFOBOX */
    loadJson("woodnews", FEED_LOC_NEWS + '20'); /* FEED_LOC_FLPL_NEWS */
}
