/* Feeds for Books page */
var FEED_BOOKS_FEATURED_FICTION = 'https://www.tadl.org/mobile/export/items/67/json'; //left
var FEED_BOOKS_FEATURED_NONFIC = 'https://www.tadl.org/mobile/export/items/68/json'; //left
var FEED_BOOKS_BOOKLISTS = 'https://www.tadl.org/export/node/json/80'; //top-middle
var FEED_BOOKS_REVIEWS = 'https://www.tadl.org/export/reviews/Books/json'; //bottom-middle

/* Feeds for Music page */
var FEED_MUSIC_NEW = 'https://www.tadl.org/mobile/export/items/29/json'; //left
var FEED_MUSIC_HOT = 'https://www.tadl.org/mobile/export/items/31/json'; //left
var FEED_MUSIC_REVIEWS = 'https://www.tadl.org/export/reviews/Music/json'; //bottom-middle
var FEED_MUSIC_LINKS = 'https://www.tadl.org/export/node/json/113'; //top-middle

/* Feeds for Video page */
var FEED_VIDEO_NEW = 'https://www.tadl.org/mobile/export/items/32/json'; //left
var FEED_VIDEO_HOT = 'https://www.tadl.org/mobile/export/items/34/json'; //left
var FEED_VIDEO_TCFF = 'https://www.tadl.org/mobile/export/items/165/all/json'; //left
var FEED_VIDEO_MET = 'https://www.tadl.org/mobile/export/items/286/all/json'; //left
var FEED_VIDEO_REVIEWS = 'https://www.tadl.org/export/reviews/Video/json'; //middle

/* Feeds for Adults page */
var FEED_ADULTS_DISPLAY = ''; //left
var FEED_ADULTS_CLUBKITS = ''; //left
var FEED_ADULTS_BUSINESS = ''; //left
var FEED_ADULTS_EVENTS = ''; //right
var FEED_ADULTS_REVIEWS = ''; //bottom-middle
var FEED_ADULTS_MEL = ''; //middle-middle
var FEED_ADULTS_RESOURCES = ''; //top-middle
var FEED_ADULTS_LEGAL = ''; //middle-middle

/* Feeds for Youth page */
var FEED_YOUTH_DISPLAY = ''; //left
var FEED_YOUTH_NEWBOOKS = ''; //left
var FEED_YOUTH_REVIEWS = ''; //bottom-middle
var FEED_YOUTH_EVENTS = ''; //right
var FEED_YOUTH_RESOURCES = ''; //top-middle
var FEED_YOUTH_AWARDWINS = ''; //middle-middle

/* Feeds for Teens page */
var FEED_TEENS_NEW = ''; //left
var FEED_TEENS_ANIMANGA = ''; //left
var FEED_TEENS_EVENTS = ''; //right
var FEED_TEENS_REVIEWS = ''; //bottom-middle
var FEED_TEENS_HOMEWORK = ''; //middle-middle
var FEED_TEENS_LISTS = ''; //top-middle

function showAdultsPage() {
}
function showYouthPage() {
}
function showTeensPage() {
}

function showVideoPage() {
    cleanhouse();
    cleandivs();
    $('#working').show().spin('default');
    $.getJSON(FEED_VIDEO_NEW, function(data) {
        var template = Handlebars.compile($('#showfeatureditembox-template').html());
        var info = template(data);
        $('#region-one').prepend(info);
    });
    $.getJSON(FEED_VIDEO_HOT, function(data) {
        var template = Handlebars.compile($('#showfeatureditembox-template').html());
        var info = template(data);
        $('#region-one').prepend(info);
    });
    $.getJSON(FEED_VIDEO_MET, function(data) {
        var template = Handlebars.compile($('#showfeatureditemboxall-template').html());
        var info = template(data);
        $('#region-one').append(info);
    });
    $.getJSON(FEED_VIDEO_TCFF, function(data) {
        var template = Handlebars.compile($('#showfeatureditemboxall-template').html());
        var info = template(data);
        $('#region-one').append(info);
    });
    $.getJSON(EVENTS_URL, function(data) { // Events (something else should go here)
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
        $('#region-one').append(info);
    });
    $.getJSON(FEED_MUSIC_HOT, function(data) {
        var template = Handlebars.compile($('#showfeatureditembox-template').html());
        var info = template(data);
        $('#region-one').append(info);
    });
    $.getJSON(FEED_MUSIC_LINKS, function(data) {
        var template = Handlebars.compile($('#drupalnode-template').html());
        var info = template(data);
        $('#region-three').prepend(info);
    });
    $.getJSON(FEED_MUSIC_REVIEWS, function(data) {
        var template = Handlebars.compile($('#showreviews-template').html());
        var info = template(data);
        $('#region-three').append(info);
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
        $('#region-one').append(info);
    });
    $.getJSON(FEED_BOOKS_FEATURED_NONFIC, function(data) {
        var template = Handlebars.compile($('#showfeatureditembox-template').html());
        var info = template(data);
        $('#region-one').append(info);
    });
    $.getJSON(EVENTS_URL, function(data) { // Events (something else should go here)
        var template = Handlebars.compile($('#showevents-template').html());
        var info = template(data);
        $('#region-three').html(info);
    });
    $.getJSON(FEED_BOOKS_BOOKLISTS, function(data) {
        var template = Handlebars.compile($('#drupalnode-template').html());
        var info = template(data);
        $('#region-two').prepend(info);
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
    $.getJSON('https://www.tadl.org/mobile/export/items/67/json', function(data) {
        var template = Handlebars.compile($('#showfeatureditembox-template').html());
        var info = template(data);
        $('#region-three').append(info).prepend('<div class="card"><h4 class="title">Featured Items</h4></div>');
    });
    $.getJSON('https://www.tadl.org/mobile/export/items/68/json', function(data) {
        var template = Handlebars.compile($('#showfeatureditembox-template').html());
        var info = template(data);
        $('#region-three').append(info);
    });
    $.getJSON('https://www.tadl.org/mobile/export/items/29/json', function(data) {
        var template = Handlebars.compile($('#showfeatureditembox-template').html());
        var info = template(data);
        $('#region-three').append(info);
    });
    $.getJSON(NEWS_URL, function(data) {
        var template = Handlebars.compile($('#showfeaturednews-template').html());
        var info = template(data);
        $('#region-two').append(info).prepend('<div class="card"><h4 class="title">Featured News</h4></div>');
        $('#working').hide().spin(false);
    });
    $.getJSON(EVENTS_URL, function(data) {
        var template = Handlebars.compile($('#showevents-template').html());
        var info = template(data);
        $('#region-one').append(info).prepend('<div class="card"><h4 class="title">Upcoming Events</h4></div>');
    });
}
