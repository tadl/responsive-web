var drupal_json_url = "https://mel-catcher.herokuapp.com/drupal/drupal.json";

function showAllEventsByTerm(term) {
    cleanhouse();
    cleandivs();
    var banner;
    var selector = term;
    loading_animation('start');
    if (term == 'kbl') {
        banner = 'Kingsley Events';
    } else if (term == 'pcl') {
        banner = 'Peninsula Events';
    } else if (term == 'wood') {
        banner = 'Woodmere Events';
    } else if (term == 'flpl') {
        banner = 'Fife Lake Events';
    } else if (term == 'ipl') {
        banner = 'Interlochen Events';
    } else if (term == 'ebb') {
        banner = 'East Bay Events';
    } else if (term == 'youth') {
        banner = 'Youth Events';
    } else if (term == 'teens') {
        banner = 'Teen Events';
    } else if (term == 'adults') {
        banner = 'Adult Events';
    }
    if ((term == null) || (term == 'events')) { 
        selector = 'events'; 
        banner = 'Events';
    } else {
        selector = 'events_' + term;
    }
    var alljson = JSON.parse(sessionStorage.getItem('events'));
    if (alljson == null || typeof alljson['events'] == undefined || alljson['events'] == null) {
        $.getJSON(drupal_json_url + '?content=events', function(data) {
            var jstring = JSON.stringify(data);
            sessionStorage.setItem('events', jstring);
            showAllEventsByTerm(term);
        });
    } else {
        var template = Handlebars.compile($('#allevents-template').html());
        var info = template(alljson[selector]);
        changeBanner(banner, color_tadlblue);
        $('#third-two').html(info).show();
        $('#third-one').html(eventsnav); // defined in main-vars
        loading_animation('stop');
    }
}

function list_node_to_name(list_id) {
    var info;
    if (list_id == '67') {
        info = 'books_featured_fiction';
    } else if (list_id == '68') {
        info = 'books_featured_nonfiction';
    } else if (list_id == '45') {
        info = 'books_adult_display';
    } else if (list_id == '224') {
        info = 'books_adult_clubkits';
    } else if (list_id == '234') {
        info = 'books_adult_business';
    } else if (list_id == '29') {
        info = 'music_new';
    } else if (list_id == '31') {
        info = 'music_hot';
    } else if (list_id == '32') {
        info = 'videos_new';
    } else if (list_id == '34') {
        info = 'videos_hot';
    } else if (list_id == '165') {
        info = 'videos_tcff';
    } else if (list_id == '286') {
        info = 'videos_met';
    } else if (list_id == '47') {
        info = 'youth_display';
    } else if (list_id == '52') {
        info = 'youth_new_books';
    } else if (list_id == '41') {
        info = 'teens_manga';
    } else if (list_id == '51') {
        info = 'teens_new';
    }
    return info;
}

function lib_firstname_to_shortname(name) {
    var shortname;
    if (name == 'Fife Lake') {
        shortname = 'flpl';
    } else if (name == 'East Bay') {
        shortname = 'ebb';
    } else if (name == 'Interlochen') {
        shortname = 'ipl';
    } else if (name == 'Peninsula') {
        shortname = 'pcl';
    } else if (name == 'Kingsley') {
        shortname = 'kbl';
    } else if (name == 'Woodmere') {
        shortname = 'wood';
    }
    return shortname;
}

function showitemlist(list_name, list_id) {
    cleanhouse();
    cleandivs();
    var list_name = htmlEncode(decodeURIComponent(list_name));
    loading_text = 'Loading ' + list_name + '...';
    changeBanner(loading_text, color_tadlblue);
    loading_animation('start');
    var drupal_json_url = 'http://mel-catcher.herokuapp.com/main/get_list.json?list_id=' + list_id;
        $.getJSON(drupal_json_url, function(data) {
        var template = Handlebars.compile($('#results-template_2').html());
        var info = template(data);
        $('#region-two').html(info);
        loading_animation('stop');
        changeBanner(list_name, color_tadlblue);
        mylist();
    });       
}


function showfeaturedlist(list_name, list_id) {
    cleanhouse();
    cleandivs();
    var list_name = htmlEncode(decodeURIComponent(list_name));
    loading_text = 'Loading ' + list_name + '...';
    changeBanner(loading_text, color_tadlblue);
    loading_animation('start');
    var data = JSON.parse(sessionStorage.getItem('featured_lists'));
    if (data == null) {
        var drupal_json_url = 'http://mel-catcher.herokuapp.com/drupal/drupal.json?content=lists'
        $.getJSON(drupal_json_url, function(data) {
                var cat = JSON.stringify(data);
                sessionStorage.setItem('featured_lists', cat);
                showfeaturedlist(list_name, list_id);
                return;
        });
    } else {
        var template = Handlebars.compile($('#results-template_2').html());
        var list_code = 'l_' + list_id
        var info = template(data[list_code]);
        var ids = '';
        $('#region-two').html(info);
        loading_animation('stop');
        changeBanner(list_name, color_tadlblue);
        if (!bagIsEmpty()) {
            mylist();
        } else {
            $('#region-two').parent()
                .removeClass('grid-50')
                .addClass('grid-75');
        }
        $.each(data[list_code].items, function(){
            fetch_available_by_id(this.record_id);
            ids = ids + this.record_id + ',';
        });
        //fetch_available_by_id(ids);
    }       
}


function showreviews(review_type) { 
    cleanhouse();
    loading_animation('start');
    $.getJSON('https://www.tadl.org/export/reviews/'+ review_type +'/json', function(data) {
        var template = Handlebars.compile($('#showreviews-template').html());
        var info = template(data);
        loading_animation('stop');
        $('#region-two').html(info);
    });
}

function locHoursAndInfo(loc) {
    window.localStorage.setItem('location', loc);
    $('#locinfo').hide();
    var template = Handlebars.compile($('#locationinfo-template').html());
    if (loc == 'tadl') {
        var data = {"nodes": [{"node": {"fullname": "Traverse Area District Library","shortname": "tadl","sunday": "12pm to 5pm","monday": "9am to 9pm","tuesday": "9am to 9pm","wednesday": "9am to 9pm","thursday": "9am to 9pm","friday": "9am to 6pm","saturday": "9am to 6pm","address": "610 Woodmere Ave","citystatezip": "Traverse City, MI 49686","phone": "(231) 932-8500","fax": "(231) 932-8538","email": "libadmin@tadl.org","libfirstname": "Traverse Area","liblastname": "District Library"}}]}
        var info = template(data);
        $('#locinfo').html(info).show();
    } else {
        var data = JSON.parse(sessionStorage.getItem("everything"));
        if (data == null) {
            $.getJSON(drupal_json_url, function(data) {
                var cat = JSON.stringify(data);
                sessionStorage.setItem('everything', cat);
                locHoursAndInfo(loc);
                return;
            });
        } else {
            var current_loc = data['hours_' + loc];
            var info = template(current_loc);
            $('#locinfo').html(info).show();
        }
    }
}

function hoursAndInfo(loc) {
    $('#locinfo').hide();
    var data = JSON.parse(sessionStorage.getItem("everything"));
    if (data == null) {
        $.getJSON(drupal_json_url, function(data) {
            var cat = JSON.stringify(data);
            sessionStorage.setItem('everything', cat);
            hoursAndInfo(loc);
            return;
        });
    } else {
        var template = Handlebars.compile($('#locationinfo-template').html());
        var current_loc = data['hours_' + loc];
        var info = template(current_loc);
        $('#locinfo').html(info).show();
    }
}

function showNode(nid) {
    cleanhouse();
    cleandivs();
    loading_animation('start');
    $.getJSON('https://www.tadl.org/export/node/json/' + nid, function(data) {
        var template = Handlebars.compile($('#node-template').html());
        var info = template(data);
        $('#region-wide').html(info).show();
        loading_animation('stop');
    });
}

function showNewsNode(nid) {
    cleanhouse();
    cleandivs();
    loading_animation('start');
    $.getJSON('https://www.tadl.org/export/node/json/' + nid, function(data) {
        var template = Handlebars.compile($('#newsnode-template').html());
        var info = template(data);
        $('#third-two').html(info).show();
        loading_animation('stop');
    });
}
        
function showEventNode(nid) {
    cleanhouse();
    cleandivs();
    loading_animation('start');
    $.getJSON('https://www.tadl.org/export/node/json/' + nid, function(data) {
        var template = Handlebars.compile($('#eventnode-template').html());
        var firstname = data.nodes[0].node.location;
        var shortname = lib_firstname_to_shortname(firstname);
        var locnode = 'events_' + shortname;
        events_template = Handlebars.compile($('#someevents-template').html());
        var stuff = JSON.parse(sessionStorage.getItem("events"));
        if (stuff == null) {
            $.getJSON(drupal_json_url + '?content=events', function(data) {
                var jstring = JSON.stringify(data);
                sessionStorage.setItem('events', jstring);
                showEventNode(nid);
            });
        }
        var events = events_template(stuff[locnode]);
        var info = template(data);
        var alleventslink = "load('events/" + shortname + "')";
        $('#third-two').html(info).show();
        $('#third-one').html('<div class="card"><h4 class="title">Coming soon at ' + firstname + '</h4></div>' + events + '<a class="pointer button tadlblue medium wide center" onclick="' + alleventslink + '"><span>All ' + firstname + ' events</span></a>').show();
        loading_animation('stop');
    });
}

function showAnnouncements() {
    var seenIt = window.sessionStorage.getItem('announcements');
    if (seenIt == null) {
        $.getJSON('http://mel-catcher.herokuapp.com/drupal/drupal.json?content=announcements', function(data) {
            var template = Handlebars.compile($('#announcements-template').html());
            var output = template(data);
            $('#locsel').prepend(output);
        });
    }
}
