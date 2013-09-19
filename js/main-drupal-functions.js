function showevents() { 
    cleanhouse();
    var action = {action:"showevents"}
    History.pushState(action, "Upcoming Event", "events"); 
    state = History.getState();
    $('#working').show();
    $.getJSON(EVENTS_URL, function(data) {
        var template = Handlebars.compile($('#showevents-template').html());
        var info = template(data);
        if (state.data.action === "showevents") {
            $('#region-two').html(info);
            $('#working').hide();
        }
    });
}

function showlocations() { 
    cleanhouse();
    var action = {action:"showlocations"}
    History.pushState(action, "Locations", "locations"); 
    state = History.getState();
    $('#working').show();
    $.getJSON(LOCATIONS_BASE + "/all", function(data) {
        var template = Handlebars.compile($('#showlocations-template').html());
        var info = template(data);
        if (state.data.action === "showlocations") {
            $('#region-two').html(info);
            $('#working').hide();
        }
    });
}

function showitemlist(list_id) {
    cleanhouse();
    $('#working').show();
    $.getJSON('https://www.tadl.org/mobile/export/items/' + list_id + '/json', function(data) {
        var template = Handlebars.compile($('#showitemlist-template').html());
        var info = template(data);
        $('#region-two').html(info);
        $('#working').hide();
    });
}

function showitemlistall(list_id) {
    cleanhouse();
    $('#working').show();
    $.getJSON('https://www.tadl.org/mobile/export/items/' + list_id + '/all/json', function(data) {
        var template = Handlebars.compile($('#showitemlist-template').html());
        var info = template(data);
        $('#region-two').html(info);
        $('#working').hide();
    });
}

function showreviews(review_type) { 
    cleanhouse();
    $('#working').show();
    $.getJSON('https://www.tadl.org/export/reviews/'+ review_type +'/json', function(data) {
        var template = Handlebars.compile($('#showreviews-template').html());
        var info = template(data);
        $('#working').hide();
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

function locHoursAndInfo(loc) {
    cleanhouse();
//    $('#locinfo').html('<br/>' + $('#working').html() + '<br/><br/>');
    $('#locinfo').hide();
    $('#working').show();
    $('#locsel').css('background-image', 'url(img/' + loc + '.jpg)');
    $.getJSON('https://www.tadl.org/mobile/export/locations/' + loc, function(data) {
        var template = Handlebars.compile($('#locationinfo-template').html());
        var info = template(data);
        $('#working').hide();
        $('#locinfo').html(info).show();
    });
}
