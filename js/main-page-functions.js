function showBooksPage() {
    cleanhouse();
    cleandivs();
    $('#working').show();
    $.getJSON('https://www.tadl.org/mobile/export/items/67/json', function(data) { // Featured Fiction
        var template = Handlebars.compile($('#showfeatureditembox-template').html());
        var info = template(data);
        $('#region-one').append(info);
    });
    $.getJSON('https://www.tadl.org/mobile/export/items/68/json', function(data) { // Featured Non-fiction
        var template = Handlebars.compile($('#showfeatureditembox-template').html());
        var info = template(data);
        $('#region-one').append(info);
    });
    $.getJSON(EVENTS_URL, function(data) { // Events (something else should go here)
        var template = Handlebars.compile($('#showevents-template').html());
        var info = template(data);
        $('#region-three').html(info);
    });
    $.getJSON('https://www.tadl.org/export/node/json/80', function(data) { // Recommended Book Lists
        var template = Handlebars.compile($('#drupalnode-template').html());
        var info = template(data);
        $('#region-two').prepend(info);
    });
    $.getJSON('https://www.tadl.org/export/reviews/Books/json', function(data) { // book reviews
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
