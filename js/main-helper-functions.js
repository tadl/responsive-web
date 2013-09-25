$(document).ready(function() {
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
    jQuery.support.cors = true;

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
    $('.back-to-top').click(function(event) {
        event.preventDefault();
        $('html, body').animate({scrollTop: 0}, duration);
        return false;
    });

    if (window.localStorage.getItem('location') == null) {
        window.localStorage.setItem('location', 'tadl');
        locHoursAndInfo('tadl');
    } else {
        locHoursAndInfo(window.localStorage.getItem('location'));
    }

    $('img.tips').cluetip({
        splitTitle: '|',
        cluetipClass: 'rounded',
        dropShadow: false,
        width: '400px',
        showTitle: false,
        hoverIntent: {
            sensitivity: 3,
            interval: 100,
            timeout: 0
        }
    });
});

function startsearch() {
    var searchquery = encodeURIComponent($('#term').val());
    var mediatype = encodeURIComponent($('#mediatype').val());
    var loc = $('#location').val();
    if (document.getElementById('available').checked) {
        var available = "true";
        var availablemsg = "Only Available";
    } else {
        var available = "false";
        var availablemsg = "";
    }
    var newstate = 'search/'+searchquery+'/'+mediatype+'/'+available+'/'+loc; 
    var action = {action:"getsearch", query:searchquery, mt:mediatype, avail:available, location:loc, state:newstate}
    History.pushState(action, psTitle + "Search", newstate);
    
}

function facetstartsearch(facet) { 
    var facet = facet;
    state = History.getState();
    var searchquery = state.data.query;
    var mediatype = state.data.mt;
    var available = state.data.avail;
    var loc = state.data.location;
    var newstate = 'search-facets/'+searchquery+'/'+mediatype+'/'+available+'/'+loc+'/'+facet; 
    var action = {action:"getsearch", query:searchquery, mt:mediatype, avail:available, location:loc, state:newstate, ft:facet}
    History.pushState(action, psTitle + "Search", newstate);
}

function unhide(eventId) {
    var eventId = eventId;
    var e = document.getElementById(eventId);
    if (e.style.display === 'none') {
        $('#' + eventId).css('display', 'block');
        $('#more' + eventId).css('display', 'none');
    } else {
        $('#' + eventId).css('display', 'none');
        $('#more' + eventId).css('display', 'block');
    }
}

function openForm() {
    if ($("#login_form").is(":hidden")) {
        $("#search_options").slideUp("fast");
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
    } else {
        $("#search_options").slideUp("fast");
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
    $("#login_form").slideUp("fast");
    $("#search_options").slideUp("fast");
    $('#search-params').empty().hide();
    $('#loadmore').hide();
    $("html, body").animate({ scrollTop: 0}, "slow");
}

function cleandivs() {
    $('#region-wide').empty();
    $('#region-one').empty();
    $('#region-two').empty();
    $('#region-three').empty();
}

function load(page) {
    state = History.getState();
    if (state.data.action != page) { 
        cleanhouse();
        cleandivs();
        var action = {action:page}
        if (page == 'home') {
            History.pushState(action, psTitle + separator + "Home", page);
        } else if (page == 'books') {
            History.pushState(action, psTitle + separator + "Books", page);
        } else if (page == 'music') {
            History.pushState(action, psTitle + separator + "Music", page);
        } else if (page == 'video') {
            History.pushState(action, psTitle + separator + "Video", page);
        } else if (page == 'online') {
            History.pushState(action, psTitle + separator + "Online", page);
        } else if (page == 'youth') {
            History.pushState(action, psTitle + separator + "Youth", page);
        } else if (page == 'teens') {
            History.pushState(action, psTitle + separator + "Teens", page);
        } else if (page == 'governance') {
            History.pushState(action, psTitle + separator + "Governance", page);
        }
    }
}

function loadNode(nid) {
    cleanhouse();
    cleandivs();
    var newpage = "node/" + nid;
    var action = {action:newpage}
    History.pushState(action, psTitle + separator + "Story " + nid, newpage);
}


function loadlist(list) {
    var list_id = list;
    state = History.getState();
    if (state.data.list != list) {
        var action = {action:'showlist', list:list_id}
        var url = 'list/'+list_id;
        History.pushState(action, psTitle + separator + "Featured", url);
    };
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
    lines: 9,
    length: 11,
    width: 4,
    radius: 12,
    corners: 1,
    direction: 1,
    color: '#fff',
    speed: 0.6,
    trail: 35,
    shadow: false,
    hwaccel: false,
    className: 'tinyspinner',
    zIndex: 2e9
}

function applyTips() {
    $('img.tips').cluetip({
        splitTitle: '|', cluetipClass: 'rounded', dropShadow: false, width: '250px', showTitle: false,
        hoverIntent: { sensitivity: 3, interval: 100, timeout: 0 }
    });
}
