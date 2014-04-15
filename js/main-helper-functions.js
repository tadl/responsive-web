var simplenode_template;
var featured_item_template;
var review_template;
var events_template;
var featured_news_template;
var location_news_template;
var showlocations_template;
var current_page;
var myaccount_template;
var current_user = window.localStorage.getItem('current_user');


$(document).ready(function() {
    compile_templates(); 
    router.perform();

    var state = History.getState();
    var check = state.data.action

    $('#term').keydown(function(event) {
        if (event.keyCode == 13) { startsearch(); }
    });

    $('#login_form').keydown(function(event) {
        if (event.keyCode == 13) { login(); }
    });

    $('#search').click(getResults);

    $('.checkChangedbutton').click(function() {
  		if($(this).closest('form').data('changed')) {
        }
	});

    jQuery.support.cors = true;

    if (window.localStorage.getItem('location') == null) {
        window.localStorage.setItem('location', 'tadl');
        locHoursAndInfo('tadl');
    } else {
        locHoursAndInfo(window.localStorage.getItem('location'));
    }

    // pushmenu
    $menuLeft = $('.pushmenu-left');
    $nav_list = $('#nav_list');
    $nav_list.click(function() {
        $(this).toggleClass('active');
        $('.pushmenu-push').toggleClass('pushmenu-push-toright');
        $menuLeft.toggleClass('pushmenu-open');
    });

    // back to top button
    var offset = 220;
    var duration = 500;
    $(window).scroll(function() {
        if ($(this).scrollTop() > offset) {
            $('.back-to-top').fadeIn(duration);
        } else {
            $('.back-to-top').fadeOut(duration);
        }
    });

    /*
     * $('.back-to-top').click(function(event) {
     *     event.preventDefault();
     *     $('html, body').animate({scrollTop: 0}, duration);
     *     return false;
     * });
     */

    $('a[rel="lightframe"]').fancybox();

    setTimeout(function(){ showAnnouncements(); },2000);

});

$(document).ajaxComplete(function(){
    try{
        FB.XFBML.parse(); 
    }catch(ex){}
});

function load_drupal_json(content) {
var drupal_json_url = "https://mel-catcher.herokuapp.com/drupal/drupal.json"
$.getJSON(drupal_json_url, function(data) {
 		var payload = JSON.stringify(data)
        sessionStorage.setItem('everything', payload );
    });
}


function stateLoader(action, title, url){
var page = {action: action}
History.pushState(page, title, url);
}


function startsearch() {
    var searchquery = encodeURIComponent($('#term').val());
    var mediatype = encodeURIComponent($('#mediatype').val());
    var searchtype = encodeURIComponent($('#searchtype').val());
    var sort_type = encodeURIComponent($('#sort').val());
    var loc = $('#location').val();
    if (document.getElementById('available').checked) {
        var available = "true";
        var availablemsg = "Only Available";
    } else {
        var available = "false";
        var availablemsg = "";
    }
    var newstate = 'search/'+searchquery+'/'+mediatype+'/'+available+'/'+loc+'/'+searchtype+'/'+sort_type; 
    var action = {action:"getsearch", query:searchquery, mt:mediatype, avail:available, location:loc, search:searchtype, sort:sort_type, state:newstate}
    History.pushState(action, psTitle + "Search", newstate);
    
}

function facetstartsearch(facet) { 
    var facet = facet;
    state = History.getState();
    var searchquery = window.localStorage.getItem('query');
    var mediatype = window.localStorage.getItem('mt');
    var searchtype = encodeURIComponent($('#searchtype').val());
    var	sort_type = encodeURIComponent($('#sort').val());
    var available = window.localStorage.getItem('avail');
    var loc = window.localStorage.getItem('loc');
    var newstate = 'search-facets/'+searchquery+'/'+mediatype+'/'+available+'/'+loc+'/'+searchtype+'/'+sort_type+'/'+facet; 
    var action = {action:"getsearch", query:searchquery, mt:mediatype, avail:available, location:loc, state:newstate, ft:facet}
    History.pushState(action, psTitle + "Search", newstate);
}

function unhide(eventId) {
    var e = document.getElementById(eventId);
    if (e.style.display === 'none') {
        $('.cardblock').not('#' + eventId).hide();
        $('#' + eventId).show();
        $(window).scrollTop($("#card-" + eventId).offset().top - 60);
        $('#more' + eventId).hide();
        $('.showmore').not('#more' + eventId).show();
    } else {
        $('#' + eventId).hide();
        $('#more' + eventId).show();
    }
}

function toggleBody(id) {
    $('.full-review-body').not('#review_full_' + id).hide();
    $('.review-body').not('#review_' + id).show();
    $('#review_' + id).hide();
    $('#review_full_' + id).show();
    $(window).scrollTop($("#card-" + id).offset().top - 60);
}

function openForm() {
    if ($("#login_form").is(":hidden")) {
        if ($("#search_options").is(":visible")) {
            openSearch_options();
        }
        $("#login_form").slideDown("fast");
        login_and_fetch_dash();
    } else {
        $("#login_form").slideUp("fast");
    }
}

function openSearch_options() {
    if ($("#search_options").is(":hidden")) {
        $("#login_form").slideUp("fast");
        $("#search_options").slideDown("fast");
        $("#searchicon").attr("src", "img/icon-arrow-up-b-256.png");
    } else {
        $("#search_options").slideUp("fast");
        $("#searchicon").attr("src", "img/icon-arrow-down-b-256.png");
    }
}

function linkify(inputText, options) {
    this.options = {linkClass: 'url', targetBlank: true}
    this.options = $.extend(this.options, options);
    inputText = inputText.replace(/\u200B/g, "");
    var replacePattern1 = /(src="|href="|">|\s>)?(https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;ï]*[-A-Z0-9+&@#\/%=~_|ï]/gim;
    var replacedText = inputText.replace(replacePattern1, function($0,$1) { return $1?$0:'<br/><a class="'+ this.options.linkClass + '" onclick="try { navigator.app.loadUrl(\'' + $0 + '?nomobi=true\', {openExternal: true}); } finally { window.location = \'' + $0 + '?nomobi=true\'; }"' + (this.options.targetBlank?'target="_blank"':'') + '>'+ $0.trunc(32) + '</a>';});
    var replacePattern2 = /(src="|href="|">|\s>|https?:\/\/|ftp:\/\/)?www\.[-A-Z0-9+&@#\/%?=~_|!:,.;ï]*[-A-Z0-9+&@#\/%=~_|ï]/gim;
    var replacedText = replacedText.replace(replacePattern2, function($0,$1) { return $1?$0:'<br/><a class="'+ this.options.linkClass + '" onclick="try { navigator.app.loadUrl(\'http://' + $0 + '?nomobi=true\', {openExternal: true}); } finally { window.location = \'http://' + $0 + '?nomobi=true\'; }"' + (this.options.targetBlank?'target="_blank"':'') + '>'+ $0.trunc(32) + '</a>';});
    return replacedText;
}

$.fn.doLinks = function() {
    this.each(function() {
        $(this).html(linkify($(this).html()));
    });
}

String.prototype.trunc = function(n) {
    return this.substr(0,n-1)+(this.length>n?'&hellip;':'');
}

String.prototype.truncate = function(n) {
    var p  = new RegExp("^.{0," + n + "}[\\S]*", 'g');
    var re = this.match(p);
    var l  = re[0].length;
    var re = re[0].replace(/\s$/,'');
    if (l < this.length) return re + '&hellip;';
}

function img_check(img) {
    var img = img;
    if ($(img).width() == 1) {
        img_error(img);
    }
}

function img_error(img) {
    var img = img;
    $(img).attr('src', PLACEHOLDER_IMG);
}

function loadmenu() {
    $('#menu').animate({width: 'show'}, 200);
    $('#dark_overlay').show();
}

function hidemenu() {
    $('#menu').animate({width: 'hide'}, 200);
    $('#dark_overlay').hide();
}

function cleanhouse() {
    hidemenu();
    $('body').scrollTop(0);
    document.querySelector('#page_banner').style.display = 'none';
    $("#login_form").slideUp("fast");
    if ($("#search_options").is(":visible")) {
        openSearch_options();
    }
    $('#search-params').empty().hide();
    $('#loadmore').hide();
}

function cleandivs() {
    current_page = "";
    template = Handlebars.compile($('#layout-template').html());
    $('#layout').html(template);
}

function load(page) {
    state = History.getState();
    if (state.data.action != page) { 
        cleanhouse();
        cleandivs();
        var action = {action:page}
        if (page == 'home') {
            var title = psTitle + separator + "Home";
        } else if (page == 'books') {
            var title = psTitle + separator + "Books";
        } else if (page == 'music') {
            var title = psTitle + separator + "Music";
        } else if (page == 'video') {
            var title = psTitle + separator + "Video";
        } else if (page == 'online') {
            var title = psTitle + separator + "Online";
        } else if (page == 'youth') {
            var title = psTitle + separator + "Youth";
        } else if (page == 'teens') {
            var title = psTitle + separator + "Teens";
        } else if (page == 'woodmere') {
            var title = psTitle + separator + "Woodmere Main Branch Library";
        } else if (page == 'kingsley') {
            var title = psTitle + separator + "Kingsley Branch Library";
        } else if (page == 'eastbay') {
            var title = psTitle + separator + "East Bay Branch Library";
        } else if (page == 'fifelake') {
            var title = psTitle + separator + "Fife Lake Public Library";
        } else if (page == 'interlochen') {
            var title = psTitle + separator + "Interlochen Public Library";
        } else if (page == 'peninsula') {
            var title = psTitle + separator + "Peninsula Community Library";
        } else if (page == 'myaccount') {
            var title = psTitle + separator + "My Account";
        } else if (page == 'history') {
            var title = psTitle + separator + "Checkout History";
        } else if (page == 'events') {
            var title = psTitle + separator + "Events";
        } else if (page == 'events/kbl') {
            var title = psTitle + separator + "Kingsley Events";
        } else if (page == 'events/ebb') {
            var title = psTitle + separator + "East BayEvents";
        } else if (page == 'events/flpl') {
            var title = psTitle + separator + "Fife Lake Events";
        } else if (page == 'events/pcl') {
            var title = psTitle + separator + "Peninsula Events";
        } else if (page == 'events/ipl') {
            var title = psTitle + separator + "Interlochen Events";
        } else if (page == 'events/wood') {
            var title = psTitle + separator + "Woodmere Events";
        } else if (page == 'events/teens') {
            var title = psTitle + separator + "Teen Events";
        } else if (page == 'events/youth') {
            var title = psTitle + separator + "Youth Events";
        } else if (page == 'events/adults') {
            var title = psTitle + separator + "Adult Events";
        } else if (page == 'fines') {
            var title = psTitle + separator + "Fines";
        } else if (page == 'payments') {
            var title = psTitle + separator + "Payment History";
        }
        if (page != null) {
            History.pushState(action, title, page);
        }
    }
}

function nodePage(page) {
    if (page == 'governance') {
    	changeBanner('Governance', '#0d4c78');
        loadNodes({left:573, middle:7180, right:577});
    }
    if (page == 'tbl') {
    	changeBanner('Talking Book Library', '#0d4c78');
        loadNodes({third:5048, twothirds:729});
    }
    if (page == 'public-computing') {
    	changeBanner('Public Computing', '#0d4c78');
        loadNodes({third:851, twothirds:643});
    }
    if (page == 'rooms') {
    	changeBanner('Meeting Room', '#0d4c78');
        loadNodes({third:863, twothirds:730});
    }
}

function loadNode(nid) {
    cleanhouse();
    cleandivs();
    var newpage = "node/" + nid;
    var action = {action:newpage}
    History.pushState(action, psTitle + separator + "Story " + nid, newpage);
}

function loadEventNode(nid) {
    cleanhouse();
    cleandivs();
    var newpage = "event/" + nid;
    var action = {action:newpage}
    History.pushState(action, psTitle + separator + "Event " + nid, newpage);
}


function loadlist(list_id, list_name) {
	cleanhouse();
    cleandivs();
    state = History.getState();
    if (state.data.list != list_id) {
        var action = {action:'showlist', list:list_id}
        var url = 'list/'+ list_name +'/'+list_id;
        History.pushState(action, psTitle + separator + "Lists", url);
    };
}

function loadfeaturelist(list_id, list_name) {
    cleanhouse();
    cleandivs();
    state = History.getState();
    if (state.data.list != list_id) {
        var action = {action:'showfeaturedlist', list:list_id}
        var url = 'featured_list/'+ list_name +'/'+list_id;
        History.pushState(action, psTitle + separator + "Lists", url);
    };
}




// examples of what to pass to the following loadNodes func:
// 
// var nodes = {};
// nodes['left'] = 24241;
// nodes['right'] = 4241;
// nodes['middle'] = 13532;
// loadNodes(nodes);
//
// alternately:
// loadNodes({left: 24241, right: 4241, middle: 13531});
//

// governance: loadNodes({left:573, middle:7180, right:577})
//

function loadNodes(nodes) {
    if (nodes !== null) {
        loading_animation('start');
        if (nodes.left != null) {
            $.getJSON(NODEPREFIX + nodes.left, function(data) {
                var template = Handlebars.compile($('#simplenode-template').html());
                var info = template(data);
                $('#region-one').append(info);
                loading_animation('stop');
            });
        }
        if (nodes.middle != null) {
            $.getJSON(NODEPREFIX + nodes.middle, function(data) {
                var template = Handlebars.compile($('#simplenode-template').html());
                var info = template(data);
                $('#region-two').append(info);
                loading_animation('stop');
            });
        }
        if (nodes.right != null) {
            $.getJSON(NODEPREFIX + nodes.right, function(data) {
                var template = Handlebars.compile($('#simplenode-template').html());
                var info = template(data);
                $('#region-three').append(info);
                loading_animation('stop');
            });
        }
        if (nodes.third != null) {
            $.getJSON(NODEPREFIX + nodes.third, function(data) {
                var template = Handlebars.compile($('#simplenode-template').html());
                var info = template(data);
                $('#one-third').append(info);
                loading_animation('stop');
            });
        }
        if (nodes.twothirds != null) {
            $.getJSON(NODEPREFIX + nodes.twothirds, function(data) {
                var template = Handlebars.compile($('#simplenode-template').html());
                var info = template(data);
                $('#two-thirds').append(info);
                loading_animation('stop');
            });
        }
    }
}




$.fn.spin.presets.default = {
    lines: 13,
    length: 15,
    width: 10,
    radius: 20,
    corners: 1,
    rotate: 0,
    direction: 1,
    color: '#fff',
    speed: 0.8,
    trail: 68,
    shadow: true,
    hwaccel: false,
    className: 'spinner',
    zIndex: 2e9
}

$.fn.spin.presets.tiny = {
    lines: 10,
    length: 10,
    width: 3,
    radius: 5,
    corners: 1,
    direction: 1,
    color: '#fff',
    speed: 0.6,
    trail: 11,
    shadow: false,
    hwaccel: false,
    className: 'tinyspinner',
    zIndex: 2e9
}

$.fn.spin.presets.tinyblack = {
    lines: 10,
    length: 10,
    width: 3,
    radius: 5,
    corners: 1,
    direction: 1,
    color: '#000',
    speed: 0.6,
    trail: 11,
    shadow: false,
    hwaccel: false,
    className: 'tinyspinner',
    zIndex: 2e9
}

function account_settings_reset() {
	$('#account_settings_form').get(0).reset();
	$("#account_settings_form").hide();
	$("#settings_save").hide();
	$("#account_settings_display").show();
}

function show_edit_account_settings(){
	$("#account_settings_display").hide();
	$("#settings_save").show();
	$("#account_settings_form").show();
}

function loading_animation(state) {
    if (state == 'start') {
        $('#working').show().spin('default');
        $('#footer-wrapper').hide();
    }
    if(state == 'stop') {
        $('#working').hide().spin('default');
        $('#footer-wrapper').show();
    }
}

function myaccount_menu_build() {
    $('#one-third').html('<div id="myaccount_menu" style="display:none;"></div>');
    var acctMenuHtmlStart = '<div class="card"><div class="grid-container"><div class="grid-100 mobile-grid-100 tablet-grid-100" style="text-align:center;">';
    var acctMenuHtmlEnd = '</div></div></div>';
    var checkouts = window.localStorage.getItem('checkouts');
    var holds = window.localStorage.getItem('holds');
    var pickups = window.localStorage.getItem('pickups');
    var fines = window.localStorage.getItem('fines');
    if (checkouts >= 1) { var checkoutsHtml = '<a class="button wide medium tadlblue" onclick="showcheckouts()"><span>Checkouts: ' + checkouts + '</span></a><br/><br/>'; } else { var checkoutsHtml = ''; }
    if (holds >= 1) { var holdsHtml = '<a class="button wide medium tadlblue" onclick="showholds()"><span>Holds: ' + holds + '</span></a><br/><br/>'; } else { var holdsHtml = ''; }
    if (pickups >= 1) { var pickupsHtml = '<a class="button wide medium tadlblue" onclick="showpickups()"><span>Ready for Pickup: ' + pickups + '</span></a><br/><br/>'; } else { var pickupsHtml = ''; }
    if (fines != "") { var finesHtml = '<a class="button wide medium tadlblue" data-dropdown="#dropdown-4"><span>Fines: ' + fines + '</span></a><br/><br/>'; } else { var finesHtml = '<a class="button wide medium tadlblue" data-dropdown="#dropdown-4"><span>Fines and Payments</span></a><br/><br/>'; }
    var settingsHtml = '<a class="button wide medium tadlblue" onclick="load(\'myaccount\')"><span>Account Settings</span></a><br/><br/>';
    var historyHtml = '<a class="button wide medium tadlblue" onclick="load(\'history\')"><span>Checkout History</span></a><br/><br/>';
    var cardHtml = '<a class="button wide medium tadlblue" onclick="showcard()"><span>Library Card</span></a><br/><br/>';
    var listsHtml = '<a class="button wide medium tadlblue" onclick="load(\'my_lists\')"><span>My Lists</span></a><br/><br/>';
    $('#myaccount_menu').html(acctMenuHtmlStart + '<h4 class="title">Account Menu</h4>' + checkoutsHtml + holdsHtml + pickupsHtml + finesHtml + settingsHtml + historyHtml + cardHtml + listsHtml + acctMenuHtmlEnd).hide();
}
function myaccount_menu() {
    myaccount_menu_build();
    $('#myaccount_menu').show();
}

function htmlEncode(value){
    if (value) {
        return jQuery('<div />').text(value).html();
    } else {
        return '';
    }
}
 
function htmlDecode(value) {
    if (value) {
        return $('<div />').html(value).text();
    } else {
        return '';
    }
}

function scroll_to(div) {
    $.trim(div);
    $('html, body').animate({scrollTop:$(div).offset().top -55}, 750);
}

function loadJson(key, url) {
    $.getJSON(url, function(data) {
        sessionStorage.setItem(key, JSON.stringify(data));
    });
}

function changeBanner(content, color) {
    document.querySelector('#page_banner').style.backgroundColor = color;
    $('#page_banner').css({"display" : "block"});
    $('#page_banner').html('<h2 class="hide-on-mobile">' + content + '</h2><div class="grid-container"><div class="mobile-grid-100 hide-on-desktop hide-on-tablet small left" style="padding-top:4px;">' + content + '</div></div>')
}

function feedback(action) {
    if (action == 'show'){
        var content = '<div id="feedback_form" style="width:300px;height:300px;"> Name: <input type="text" id="feedback_name" /><br />Feedback:<br /> <textarea rows="8" cols="30" id="feedback_text" /></textarea></br><a class="button small green" id="send_feedback_button" onclick="feedback(\'send\')"><span>Send</span></a></div>';
    $.fancybox({
        content: content,
        autoScale: true
    });
    } else if (action == 'send'){
        var feedback_name = encodeURIComponent($('#feedback_name').val());
        var feedback_text = encodeURIComponent($('#feedback_text').val());
        var current_url = encodeURIComponent(document.URL);
        $.get(ILSCATCHER_BASE + '/feedback/staff.json?name='+ feedback_name +'&url='+ current_url +'&issue='+ feedback_text, function(data){
            console.log('feedback sent');
        })
        .done(function() {
            $('#feedback_form').html('Your feedback has been submitted. Thanks!');   
        })
        .fail(function() {
            $('#feedback_form').html('Sorry. Something went wrong. Please try again later'); 
        });
    }

}

