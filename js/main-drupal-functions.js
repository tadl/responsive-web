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
    cleandivs();
    changeBanner('Featured Items', '#0d4c78');
    var data = JSON.parse(sessionStorage.getItem("everything"));
 	if (data == null) {
 	var drupal_json_url = "https://mel-catcher.herokuapp.com/drupal/drupal.json";
 	 $.getJSON(drupal_json_url, function(data) {
 		var cat = JSON.stringify(data)
        sessionStorage.setItem('everything', cat );
        showitemlistall(list_id);
        return;
    });
 	} else { 
 	   var template = Handlebars.compile($('#showitemlist-template').html());
       if (list_id == "67") {
       var info = template(data.books_featured_fiction)
       } else if (list_id == "68") {
       var info = template(data.books_featured_nonfiction)
       } else if (list_id == "45") {
       var info = template(data.books_adult_display) 
       } else if (list_id == "224") {
       var info = template(data.books_adult_clubkits) 
       } else if (list_id == "234") {
       var info = template(data.books_adult_business) 
       } else if (list_id == "29") {
       var info = template(data.music_new) 
       } else if (list_id == "31") {
       var info = template(data.music_hot) 
       } else if (list_id == "32") {
       var info = template(data.videos_new) 
       } else if (list_id == "34") {
       var info = template(data.videos_hot) 
       } else if (list_id == "165") {
       var info = template(data.videos_tcff) 
       } else if (list_id == "286") {
       var info = template(data.videos_met) 
       } else if (list_id == "47") {
       var info = template(data.youth_display) 
       } else if (list_id == "52") {
       var info = template(data.youth_new_books) 
       } else if (list_id == "41") {
       var info = template(data.teens_manga) 
       } else if (list_id == "51") {
       var info = template(data.teens_new) 
       } else {
       return;
       }
        $('#region-two').html(info);
        mylist();
      }
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



function locHoursAndInfo(loc) {
    window.localStorage.setItem('location', loc);
    $('#locinfo').hide();
    $('#locsel').css('background-image', 'url(img/' + loc + '.jpg)');
    if (loc == 'tadl') {
        var data = {"nodes": [{"node": {"fullname": "Traverse Area District Library","shortname": "tadl","sunday": "12pm to 5pm","monday": "9am to 9pm","tuesday": "9am to 9pm","wednesday": "9am to 9pm","thursday": "9am to 9pm","friday": "9am to 6pm","saturday": "9am to 6pm","address": "610 Woodmere Ave","citystatezip": "Traverse City, MI 49686","phone": "(231) 932-8500","fax": "(231) 932-8538","email": "libadmin@tadl.org","libfirstname": "Traverse Area","liblastname": "District Library"}}]}
        var template = Handlebars.compile($('#locationinfo-template').html());
        var info = template(data);
        $('#locinfo').html(info).show();
    } else {
        var currentLoc = JSON.parse(sessionStorage.getItem(loc + "hours"));
        if (currentLoc == null) {
            $('#working').show().spin('default');
            $.getJSON(LOCATION_BASE + loc, function(data) {
                sessionStorage.setItem(loc + "hours", JSON.stringify(data));
                var template = Handlebars.compile($('#locationinfo-template').html());
                var info = template(data);
                $('#locinfo').html(info).show();
                $('#working').hide().spin(false);
            });
        } else {
            var template = Handlebars.compile($('#locationinfo-template').html());
            var info = template(currentLoc);
            $('#locinfo').html(info).show();
        }
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
