function loadJson(key, url) {
    $.getJSON(url, function(data) {
        sessionStorage.setItem(key, JSON.stringify(data));
    });
}

function loadAllJson() {
    /* Home */
    loadJson("items67", 'https://www.tadl.org/mobile/export/items/67/json'); 
    loadJson("items68", 'https://www.tadl.org/mobile/export/items/68/json');
    loadJson("items29", 'https://www.tadl.org/mobile/export/items/29/json');
    loadJson("featurednews", 'https://www.tadl.org/export/news/json');
    loadJson("tadlevents", 'https://www.tadl.org/mobile/export/events/formatted/json/all');

    /* Books */
    loadJson("items67", FEED_BOOKS_FEATURED_FICTION);
    loadJson("items68", FEED_BOOKS_FEATURED_NONFIC);
    loadJson("booklists", FEED_BOOKS_BOOKLISTS);
    loadJson("bookreviews", FEED_BOOKS_REVIEWS);
    loadJson("items45", FEED_BOOKS_ADULTS_DISPLAY);
    loadJson("items224", FEED_BOOKS_ADULTS_CLUBKITS);
    loadJson("items234", FEED_BOOKS_ADULTS_BUSINESS);

    /* Music */
    loadJson("items29", FEED_MUSIC_NEW);
    loadJson("items31", FEED_MUSIC_HOT);
    loadJson("musicreviews", FEED_MUSIC_REVIEWS);
    loadJson("musiclinks", FEED_MUSIC_LINKS);

    /* Video */
    loadJson("items32", FEED_VIDEO_NEW);
    loadJson("items34", FEED_VIDEO_HOT);
    loadJson("items165", FEED_VIDEO_TCFF);
    loadJson("items286", FEED_VIDEO_MET);
    loadJson("videoreviews", FEED_VIDEO_REVIEWS);

    /* Online */
    loadJson("melresources", FEED_ONLINE_MEL);
    loadJson("tadlresources", FEED_ONLINE_RESOURCES);
    loadJson("legalresources", FEED_ONLINE_LEGAL);
    loadJson("ebooks", FEED_ONLINE_EBOOKS);

    /* Youth */
    loadJson("items47", FEED_YOUTH_DISPLAY);
    loadJson("items52", FEED_YOUTH_NEWBOOKS);
    loadJson("youthreviews", FEED_YOUTH_REVIEWS);
    loadJson("youthevents", FEED_YOUTH_EVENTS);
    loadJson("youthresources", FEED_YOUTH_RESOURCES);
    loadJson("youthawards", FEED_YOUTH_AWARDWINS);

    /* Teens */
    loadJson("items51", FEED_TEENS_NEW);
    loadJson("items41", FEED_TEENS_ANIMANGA);
    loadJson("teenevents", FEED_TEENS_EVENTS);
    loadJson("teenreviews", FEED_TEENS_REVIEWS);
    loadJson("teenhomework", FEED_TEENS_HOMEWORK);
    loadJson("teenlists", FEED_TEENS_LISTS);

    /* Fife Lake */
    loadJson("flplhours", LOC_FLPL_HOURS);
    loadJson("flplevents", FEED_LOC_FLPL_EVENTS); /* FEED_LOC_FLPL_EVENTS */
    loadJson("flplinfo", FEED_LOC_FLPL_INFOBOX); /* FEED_LOC_FLPL_INFOBOX */
    loadJson("flplnews", FEED_LOC_FLPL_NEWS); /* FEED_LOC_FLPL_NEWS */

    /* East Bay */
    loadJson("ebbhours", LOC_EBB_HOURS);
    loadJson("ebbevents", FEED_LOC_EBB_EVENTS);
    loadJson("ebbinfo", FEED_LOC_EBB_INFOBOX);
    loadJson("ebbnews", FEED_LOC_EBB_NEWS);

    /* Kingsley */
    loadJson("kblhours", LOC_KBL_HOURS);
    loadJson("kblevents", FEED_LOC_KBL_EVENTS);
    loadJson("kblinfo", FEED_LOC_KBL_INFOBOX);
    loadJson("kblnews", FEED_LOC_KBL_NEWS);

    /* Interlochen */
    loadJson("iplhours", LOC_IPL_HOURS);
    loadJson("iplevents", FEED_LOC_IPL_EVENTS);
    loadJson("iplinfo", FEED_LOC_IPL_INFOBOX);
    loadJson("iplnews", FEED_LOC_IPL_NEWS);

    /* Peninsula */
    loadJson("pclhours", LOC_PCL_HOURS);
    loadJson("pclevents", FEED_LOC_PCL_EVENTS);
    loadJson("pclinfo", FEED_LOC_PCL_INFOBOX);
    loadJson("pclnews", FEED_LOC_PCL_NEWS);

    /* Woodmere */
    loadJson("woodhours", LOC_WOOD_HOURS);
    loadJson("woodevents", FEED_LOC_WOOD_EVENTS);
    loadJson("woodinfo", FEED_LOC_WOOD_INFOBOX);
    loadJson("woodnews", FEED_LOC_WOOD_NEWS);
}
