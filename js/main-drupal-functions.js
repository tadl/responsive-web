function load(page) {
    var pagename = page;
    state = History.getState();
    if (state.data.action != pagename) { 
     cleanhouse();
    if (pagename == 'home'){
    var action = {action:"home"}
    var newstate = "home"; 
    History.pushState(action, "Home", newstate);
    };
    };
 
}

function goHome() {
    $('#region-three').empty();
    $('#search-params').show();
    $('#search-params').html('<img style="margin-right: 10px; margin-left: 10px;" src="img/spinner.gif"> Loading page.');

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
        $('#search-params').hide();
    });
    $.getJSON(EVENTS_URL, function(data) {
        var template = Handlebars.compile($('#showevents-template').html());
        var info = template(data);
        $('#region-one').html(info);
    });
}

function showevents() { 
    cleanhouse();
    var action = {action:"showevents"}
    History.pushState(action, "Upcoming Event", "events"); 
    state = History.getState();
    $('.load_more').show();
    $('#loadmoretext').empty().append(loadingmoreText).trigger("create");
    $.getJSON(EVENTS_URL, function(data) {
        var template = Handlebars.compile($('#showevents-template').html());
        var info = template(data);
        if (state.data.action === "showevents") {
            $('.load_more').hide();
            $('#results').html(info);
        }
    });
}

function showlocations() { 
    cleanhouse();
    var action = {action:"showlocations"}
    History.pushState(action, "Locations", "locations"); 
    state = History.getState();
    $('.load_more').show();
    $('#loadmoretext').empty().append(loadingmoreText).trigger("create");
    $.getJSON(LOCATIONS_BASE + "/all", function(data) {
        var template = Handlebars.compile($('#showlocations-template').html());
        var info = template(data);
        $('.load_more').hide();
        if (state.data.action === "showlocations") {
            $('#results').html(info);
        }
    });
}

function showitemlist(list_id) {
    cleanhouse();
    $('.load_more').show();
    $('#loadmoretext').empty().append(loadingmoreText).trigger("create");
    $.getJSON('https://www.tadl.org/mobile/export/items/' + list_id + '/json', function(data) {
        var template = Handlebars.compile($('#showitemlist-template').html());
        var info = template(data);
        $('.load_more').hide();
        $('#region-two').html(info);
    });
}

function showreviews(review_type) { 
    cleanhouse();
    $.getJSON('https://www.tadl.org/export/reviews/'+ review_type +'/json', function(data) {
        var template = Handlebars.compile($('#showreviews-template').html());
        var info = template(data);
        $('.load_more').hide();
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
            console.log("yoda");
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
