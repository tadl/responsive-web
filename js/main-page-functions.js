/* Feeds for Books page */
var FEED_BOOKS_FEATURED_FICTION = 'https://www.tadl.org/mobile/export/items/67/json';
var FEED_BOOKS_FEATURED_NONFIC = 'https://www.tadl.org/mobile/export/items/68/json';
var FEED_BOOKS_BOOKLISTS = 'https://www.tadl.org/export/node/json/80';
var FEED_BOOKS_REVIEWS = 'https://www.tadl.org/export/reviews/Books/json';

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


function showVideoPage() {
    cleanhouse();
    cleandivs();
    $('#working').show();
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
        var template = Handlebars.compile($('#showfeatureditembox-template').html());
        var info = template(data);
        $('#region-one').append(info);
    });
    $.getJSON(FEED_VIDEO_TCFF, function(data) {
        var template = Handlebars.compile($('#showfeatureditembox-template').html());
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
        $('#working').hide();
    });
}

function showMusicPage() {
    cleanhouse();
    cleandivs();
    $('#working').show();
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
    $.getJSON(EVENTS_URL, function(data) { // Events (something else should go here)
        var template = Handlebars.compile($('#showevents-template').html());
        var info = template(data);
        $('#region-three').html(info);
    });
    $.getJSON(FEED_MUSIC_LINKS, function(data) {
        var template = Handlebars.compile($('#drupalnode-template').html());
        var info = template(data);
        $('#region-two').prepend(info);
    });
    $.getJSON(FEED_MUSIC_REVIEWS, function(data) {
        var template = Handlebars.compile($('#showreviews-template').html());
        var info = template(data);
        $('#region-two').append(info);
        $('#working').hide();
    });
}

function showBooksPage() {
    cleanhouse();
    cleandivs();
    $('#working').show();
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
        $('#working').hide();
    });
}

function goHome() {
    cleanhouse();
    cleandivs();
    $('#working').show();
    $.getJSON('https://www.tadl.org/mobile/export/items/67/json', function(data) {
        var template = Handlebars.compile($('#showfeatureditembox-template').html());
        var info = template(data);
        $('#region-three').append(info);
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
        $('#region-two').html(info);
        $('#working').hide();
    });
    $.getJSON(EVENTS_URL, function(data) {
        var template = Handlebars.compile($('#showevents-template').html());
        var info = template(data);
        $('#region-one').html(info);
    });
}
