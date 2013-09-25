function showevents() { 
    cleanhouse();
    var action = {action:"showevents"}
    History.pushState(action, "Upcoming Event", "events"); 
    state = History.getState();
    $('#working').show().spin('default');
    $.getJSON(EVENTS_URL, function(data) {
        var template = Handlebars.compile($('#showevents-template').html());
        var info = template(data);
        if (state.data.action === "showevents") {
            $('#region-two').html(info);
            $('#working').hide().spin(false);
        }
    });
}

function showlocations() { 
    cleanhouse();
    var action = {action:"showlocations"}
    History.pushState(action, "Locations", "locations"); 
    state = History.getState();
    $('#working').show().spin('default');
    $.getJSON(LOCATIONS_BASE + "/all", function(data) {
        var template = Handlebars.compile($('#showlocations-template').html());
        var info = template(data);
        if (state.data.action === "showlocations") {
            $('#region-two').html(info);
            $('#working').hide().spin(false);
        }
    });
}

function showitemlist(list_id) {
    cleanhouse();
    $('#working').show().spin('default');
    $.getJSON('https://www.tadl.org/mobile/export/items/' + list_id + '/json', function(data) {
        var template = Handlebars.compile($('#showitemlist-template').html());
        var info = template(data);
        $('#region-two').html(info);
        $('#working').hide().spin(false);
    });
}

function showitemlistall(list_id) {
    cleanhouse();
    $('#working').show().spin('default');
    $.getJSON('https://www.tadl.org/mobile/export/items/' + list_id + '/all/json', function(data) {
        var template = Handlebars.compile($('#showitemlist-template').html());
        var info = template(data);
        $('#region-two').html(info);
        $('#working').hide().spin(false);
    });
}

function showreviews(review_type) { 
    cleanhouse();
    $('#working').show().spin('default');
    $.getJSON('https://www.tadl.org/export/reviews/'+ review_type +'/json', function(data) {
        var template = Handlebars.compile($('#showreviews-template').html());
        var info = template(data);
        $('#working').hide().spin(false);
        $('#region-two').html(info);
        
    });
}


function showfeatureditembox() {
    cleanhouse();
//    var action = {action:"showfeatureditembox"}
//    var newstate = 'featured'; 
//    History.pushState(action, "Featured Items", newstate); 
    state = History.getState();
    $('.load_more').show();
    $('#loadmoretext').empty().append(loadingmoreText).trigger("create");
    $('#results').html();
    if (state.data.action === "showfeatureditembox") {
        $.getJSON('http://www.tadl.org/mobile/export/items/41/json', function(data) {
            var template = Handlebars.compile($('#showfeatureditembox-template').html());
            var info = template(data);
            $('.load_more').hide();
            $('#results').append(info);
        });
    }
}

function showfeaturednews() { 
    cleanhouse();
    var action = {action:"showfeaturednews"}
    History.pushState(action, "Featured News", "featurednews");
    state = History.getState();
    $('.load_more').show();
    $('#loadmoretext').empty().append(loadingmoreText).trigger("create");
    $.getJSON(NEWS_URL, function(data) {
        var template = Handlebars.compile($('#showfeaturednews-template').html());
        var info = template(data);
        $('.load_more').hide();
        if (state.data.action === "showfeaturednews") {
            $('#results').append(info);
        }
    });
}


function showmain() {
    cleanhouse();
    $('#results').html('<div id="mainpage"><div class="mainlogo"><img class="homelogo" src="img/clean-logo-header.png" alt="" /></div><div class="clearfix"></div><div class="mainlinks"></div><div class="clearfix"></div></div>');
    var action = {action:"showmain"}
    History.pushState(action,  psTitle + "Search and Explore", "");
    state = History.getState();
    $('.mainlinks').html('');
    $('#results').show();
    setTimeout(login,1000);
}

function facebookfeed() { 
    cleanhouse();
    var action = {action:"facebookfeed"}
    History.pushState(action, "Facebook Feed", "facebook"); 
    state = History.getState();
    $('.load_more').show();
    $('#loadmoretext').empty().append(loadingmoreText).trigger("create");
    $.getJSON(FACEBOOK_URL, function(data) {
        var template = Handlebars.compile($('#facebookfeed-template').html());
        var info = template(data);
        if (state.data.action === "facebookfeed") { 
            $('.load_more').hide();
            $('#results').html(info);
            $('.linkable').doLinks();
            $(".shortDateFormat").each(function (idx, elem) {
                if ($(elem).is(":input")) {
                    $(elem).val($.format.date($(elem).val(), 'MM/dd/yyyy'));
                } else {
                    $(elem).text($.format.date($(elem).text(), 'MM/dd/yyyy'));
                }
            });
        }
    });
}

var LOCATION_BASE = 'https://www.tadl.org/mobile/export/locations/';
function locHoursAndInfo(loc) {
    window.localStorage.setItem('location', loc);
    $('#locinfo').hide();
    $('#working').show().spin('default');
    $('#locsel').css('background-image', 'url(img/' + loc + '.jpg)');
    if (loc == 'tadl') {
        var data = {"nodes": [{"node": {"fullname": "Traverse Area District Library","shortname": "tadl","sunday": "12pm to 5pm","monday": "9am to 9pm","tuesday": "9am to 9pm","wednesday": "9am to 9pm","thursday": "9am to 9pm","friday": "9am to 6pm","saturday": "9am to 6pm","address": "610 Woodmere Ave","citystatezip": "Traverse City, MI 49686","phone": "(231) 932-8500","fax": "(231) 932-8538","email": "libadmin@tadl.org","libfirstname": "Traverse Area","liblastname": "District Library"}}]}
        var template = Handlebars.compile($('#locationinfo-template').html());
        var info = template(data);
        $('#locinfo').html(info).show();
        $('#working').hide().spin(false);
    } else {
        $.getJSON(LOCATION_BASE + loc, function(data) {
            var template = Handlebars.compile($('#locationinfo-template').html());
            var info = template(data);
            $('#locinfo').html(info).show();
            $('#working').hide().spin(false);
        });
    }
}

function showNode(nid) {
    cleanhouse();
    cleandivs();
    $('#working').show().spin('default');
    // this will eventually need some logic that checks what *kind* of node it is
    // so we can handle different node types differently (images are different sizes
    // etc, for example).
    $.getJSON('https://www.tadl.org/export/node/json/' + nid, function(data) {
        var template = Handlebars.compile($('#node-template').html());
        var info = template(data);
        $('#region-wide').html(info).show();
        $('#working').hide().spin(false);
    });
}
