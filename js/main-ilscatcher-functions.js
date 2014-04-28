function loadmore() {
    pagecount++;
    var searchquery = window.localStorage.getItem('query');
    var mediatype = window.localStorage.getItem('mt');
    var available = window.localStorage.getItem('avail');
    var loc = window.localStorage.getItem('loc');
    var facet = window.localStorage.getItem('facet');
    var searchtype = window.localStorage.getItem('searchtype');
    $.get(ILSCATCHER_BASE + "/main/searchjson.json?utf8=%E2%9C%93&q=" + searchquery + "&mt=" + mediatype + "&p=" + pagecount + "&avail=" + available + "&loc=" + loc  + "&facet=" + facet + "&st=" + searchtype, function(data) {
        if (data.more_results == "false") { delete data.more_results; }
        var results = data.message;
        if (results != "no results") {
            var template = Handlebars.compile($('#results-template_2').html());
            var info = template(data);
            $('#region-two').append(info).promise().done(function() {
                $('.spinning').hide();
                $('.spinning').parent().html('<h4 class="title">Page ' + (pagecount+1) + '</h4>');
            });
        } else {
            $('#region-two').html('<h4 class="title">No Further Results</h4>').show();
        }
    });
}

function getResults(query, mt, avail, location, searchtype, sort_type) {
    cleanhouse();
    cleandivs();
    pagecount = 0;
    var searchquery = query;
    var mediatype = mt;
    var available = avail;
    var loc = location;
    var searchtype = searchtype;
    window.localStorage.setItem('searchtype', searchtype);
    window.localStorage.setItem('query', searchquery);
    window.localStorage.setItem('mt', mediatype);
    window.localStorage.setItem('avail', available);
    window.localStorage.setItem('loc', location);
    window.localStorage.setItem('sort_type', sort_type);
    localStorage.removeItem('facet');
    $('#mediatype').val(decodeURIComponent(mediatype));
    $('#term').val(decodeURIComponent(searchquery));
    $('#location').val(decodeURIComponent(loc));
    $('#searchtype').val(decodeURIComponent(searchtype));
    if (available === 'true') {
        $('#available').prop('checked', true);
        var availablemsg = 'Only Available';
    } else {
        $('#available').prop('checked', false);
        var availablemsg = '';
    }
    var loctext = document.getElementById('location').options[document.getElementById('location').selectedIndex].text;
    var mediatypedecode = decodeURIComponent(mediatype);
    $('#search-params').html('<div class="grid-container"><div class="grid-10 tablet-grid-15 mobile-grid-20"><div class="params-content padtop">&nbsp;</div></div><div class="grid-90 tablet-grid-85 mobile-grid-80">Searching for <strong>'+ unescape(searchquery) +'</strong> in ' + mediatypedecode + ' at ' + loctext + ' ' + availablemsg + '.</div></div>').show(); // the spinner here should be improved. soon.
    $('.params-content').spin();
    changeBanner('Searching Catalog', color_tadlblue);
    $.getJSON(ILSCATCHER_BASE + "/main/searchjson.json?utf8=%E2%9C%93&q=" + unescape(searchquery) + "&mt=" + mediatypedecode +"&avail=" + available + "&loc=" + loc + "&st=" + searchtype + "&sort=" + sort_type, function(data) {
        if (data.more_results == "false") { delete data.more_results; }
        var results = data.message;
        linked_search = "false";
        if (results != "no results") {
            var template = Handlebars.compile($('#results-template_2').html());
            var facet_template = Handlebars.compile($('#searchfacets-template').html());
            var info = template(data);
            var info_facets = facet_template(data);
            if (searchquery == "cats") {
                var cat = '<div class="card"><div class="grid-container"><div class="grid-100 tablet-grid-100 mobile-grid-100"><img style="width:100%;padding-top:10px;" src="img/boxing.gif"/></div></div></div>';
            } else {
                var cat = '';
            }
            $('#region-two').html(cat + info);
            $('#region-one').html(info_facets);
            $('#search-params').html('Results for '+ unescape(searchtype) +': <strong>'+ unescape(searchquery) +'</strong> in ' + mediatypedecode + ' at ' + loctext + ' sorted by '+ unescape(sort_type) +' '+ availablemsg +'. <a onclick="openSearch_options()" class="button verysmall gray"><span>options...</span></a><a class="hide-on-desktop button verysmall gray" onclick="scroll_to(facets)"><span>Filters</span></a></div><a class="hide-on-desktop button verysmall gray" onclick="scroll_to(book_bag)"><span>Book Bag</span></a></div>');
        } else {
            $('#search-params').html("No Results");
        }
    });
    mylist();
}

function facetsearch(query, mt, avail, location, searchtype, sort_type, facet) {
    pagecount = 0;
    var searchtype = searchtype;
    var facet = facet;
    var searchquery = decodeURIComponent(query);
    var mediatype = mt;
    var available = avail;
    var loc = location;
    window.localStorage.setItem('facet', facet);
    window.localStorage.setItem('query', searchquery);
    window.localStorage.setItem('mt', mediatype);
    window.localStorage.setItem('avail', available);
    window.localStorage.setItem('loc', loc);
    window.localStorage.setItem('sort_type', sort_type);
    if (available === "true") {
        $('#available').prop('checked', true);
        var availablemsg = "Only Available";
    } else {
        $('#available').prop('checked', false);
        var availablemsg = "";
    }
    cleanhouse();
    cleandivs();
    var mediatypedecode = decodeURIComponent(mediatype);
    loctext = document.getElementById("location").options[document.getElementById('location').selectedIndex].text;
    $('#search-params').show();
    changeBanner('Searching Catalog', color_tadlblue);
    $('#search-params').html('&nbsp;Changing filter.').spin('tinyblack');
    $.getJSON(ILSCATCHER_BASE + "/main/searchjson.json?utf8=%E2%9C%93&q=" + searchquery + "&mt=" + mediatypedecode +"&avail=" + available + "&loc=" + loc + "&st=" + searchtype + "&sort=" + sort_type + "&facet=" + facet, function(data) {
        if (data.more_results == "false") { delete data.more_results; }
        var results = data.message;
        linked_search = "false";
        if (results != "no results") {
            var template = Handlebars.compile($('#results-template_2').html());
            var facet_template = Handlebars.compile($('#searchfacets-template').html());
            var selected_facet_template = Handlebars.compile($('#searchfacetsselected-template').html());
            var info = template(data);
            var info_facets = facet_template(data);
            var info_selected_facets = selected_facet_template(data);
            $('#region-two').html(info);
            $('#region-one').html(info_facets);
            $('#search-params').html('Results for <strong>'+ searchquery +'</strong> in ' + mediatypedecode + ' at ' + loctext + ' ' + availablemsg + '. <a onclick="openSearch_options()" class="button verysmall gray"><span>options...</span></a>');
            $('#search-params').append(info_selected_facets);
        } else {
            $('#region-two').replaceWith("No Results");
        }
    });
    mylist();
}

function subject_search(subject) {
    var subject = subject.replace(';qtype=subject','');
    $('#searchtype').val('subject');
    $('#term').val(decodeURIComponent(subject));
    startsearch();
}

function logged_in() {
    var token = window.localStorage.getItem('token');
    if (token && token != "undefined") {
        return true;
    } else {
        return false;
    }
}

function logout() {
    var source = $('#login_form-template').html();
    $('#login_form').html(source);
    window.localStorage.removeItem('patron_full_name');
    window.localStorage.removeItem('checkouts');
    window.localStorage.removeItem('holds');
    window.localStorage.removeItem('pickups');
    window.localStorage.removeItem('fines');
    window.localStorage.removeItem('current_user');
    window.localStorage.removeItem('token');
    window.localStorage.removeItem('username');
    current_user = 'false';
    location.reload();
}

function showmore(record_id) {
    var record_id = record_id;
    var e = document.getElementById(record_id);
    $('#more_details_' + record_id).removeClass('tadlblue').addClass('black').html('<span>Loading...</span>').spin('tiny').removeAttr('onclick');
    $.getJSON(ILSCATCHER_BASE + "/main/itemdetails.json?utf8=%E2%9C%93&record_id=" + record_id, function(data) {
        var results = data.message;
        var template = Handlebars.compile($('#more_details-template').html());
        var info = template(data);
        var isbn = data.items[0].isbn;
        $('#'+ record_id).html(info).promise().done(function() {
            $('#more_details_' + record_id).remove();
        });
        $('#' + record_id).show();
        check_googlebooks(record_id, isbn);
        $(".fancybox").fancybox({
            openEffect  : 'none',
            closeEffect : 'none',
            iframe : {
                preload: false
            }
        });
    });
}

function viewItem(record_id) {
    cleanhouse();
    cleandivs();
    changeBanner('Loading...', color_tadlblue);
    loading_animation('start');
    $.getJSON(ILSCATCHER_BASE + "/main/itemdetails.json?utf8=%E2%9C%93&record_id=" + record_id, function(data) {
        var template = Handlebars.compile($('#viewitem-template').html());
        var info = template(data);
        var isbn = data.items[0].isbn;
        mylist();
        $('#region-two').html(info).promise().done(function() {
            changeBanner(data.items[0].title, color_tadlblue);
            loading_animation('stop');
        });
        $('#region-one').html(logodiv);
        /*
        if (bagIsEmpty()) {
            $('#region-two').parent().removeClass('grid-50').addClass('grid-100').removeClass('push-25');
        } else {
            $('#region-two').parent().removeClass('grid-50').addClass('grid-75').removeClass('push-25');
        } */
        check_googlebooks(record_id, isbn);
    });
}

function viewmarc(record_id) {
    $.getJSON(ILSCATCHER_BASE + "/main/marc.json?record_id=" + record_id, function(data) {
        var content = data.marc;
        $.fancybox({
            content: content
        });
        $('.viewmarc_' + record_id).html('<span>view marc</span>').removeClass('black').addClass('tadlblue');
    });
}

// loader for items (sets state/route which calls viewItem(id))
function loadItem(record_id) {
    var record_id = record_id;
    var action = {action:"viewitem", record_id:record_id}
    var newstate = 'item/' + record_id;
    History.pushState(action, 'Item ' + record_id, newstate);
}

function pre_hold(record_id) {
    var record_id = record_id;
    link_id = '#place_hold_' + record_id;
    $(link_id).removeClass('green').addClass('black');
    if (logged_in()) {
        $(link_id).html('<span>Requesting hold...</span>').spin('tiny').removeAttr('onclick');
        hold(record_id);
    } else {
        $(link_id).html('<span>Log in to place hold</span>');
        $(link_id).addClass('hold_login_first');
        $('#login_form').slideDown('fast');
    }
}

function reset_hold_links() {
    $('.hold_login_first').each(function() {
        $(this).removeClass('hold_login_first').removeClass('black').addClass('green').html('<span>Place Hold</span>');
    });
      $('.multi_hold_login_first').each(function() {
        $(this).removeClass('multi_hold_login_first').removeClass('black').addClass('green').html('<span>Place All on Hold</span>');
    });
}

function hold(record_id) {
    var record_id = record_id;
    var token = window.localStorage.getItem('token');
    $.getJSON(ILSCATCHER_BASE + '/main/hold.json?token='+ token + '&record_id=' + record_id, function(data) {
        var message = data[':message'].replace('Placing this hold could result in longer wait times.', 'Unavailable for pick-up at your location.');
        var success = false;
        var button_id = '#place_hold_' + record_id;
        var hold_message = '#hold_message_' + record_id;
        if (message == 'Hold was successfully placed') {
            success = true;
            $(button_id).hide();
        }
        if (message) {
            $(hold_message).html(message).show().addClass((success) ? 'success' : 'error');
            $(button_id).hide();
        } else {
            $(hold_message).html('Unable to place hold.').show().addClass('error');
            $(button_id).hide();
        }
    });
    window.setTimeout(hold_partB,5000);
}

function hold_partB() {
    var token = window.localStorage.getItem('token');
    $.getJSON(ILSCATCHER_BASE + '/main/acctinfo.json?token=' + token, function(data) {
        var template = Handlebars.compile($('#logedin-template').html());
        var info = template(data);
        $('#login_form').html(info);
    });
}

function load_password_reset() {
    var login_form = $('#login_form');
    var source = $('#password-reset-template').html();
    login_form.html(source);
    set_login_form_keypress_event('password_reset');
}

function submit_password_reset() {
    var uservalue = $('#username_or_barcode').val();
    if (uservalue = '') { return };
    set_login_form_keypress_event();
    $.getJSON(ILSCATCHER_BASE + 'main/passwordreset.json?user=' + uservalue, function(data) {
        var login_form = $('#login_form');
        var source = $('#password-reset-complete-template').html();
        login_form.html(source);
    });
}

function cancel_password_reset() {
    var login_form = $('#login_form');
    var source = $('#login_form-template').html();
    login_form.html(source);
    set_login_form_keypress_event();
}

function complete_password_reset() {
    cancel_password_reset();
}

function set_login_form_keypress_event(do_what) {
    var login_form = $('#login_form');
    login_form.off('keydown');
    if (do_what == 'password_reset') {
        login_form.keydown(function(event) {
            if (event.keyCode == 13) { submit_password_reset(); }
        });
    } else {
        login_form.keydown(function(event) {
            if (event.keyCode == 13) { login(); }
        });
    }
}

function login() {
    var username = $('#username').val();
    var password = $('#pword').val();
    if (typeof(username) !== 'undefined' && username != '' && typeof(password) !== 'undefined' && password != '') {
        login_and_fetch_dash(username, password);
    }
}

function login_and_fetch_dash(username, password) {
    var username = username;
    var password = password;
    var first_state = window.localStorage.getItem('current_user');
    if (typeof(username) !== 'undefined' && username != '' && username !== null
        && typeof(password) !== 'undefined' && password != '' && password !== null) {
        if ($('#pword').length != 0) {
            $('#login_form').html('<div class="tempspin">&nbsp;Loading...</div>');
            $('.tempspin').spin('tinyblack');
        }
        /* if ($('#login').length != 0) {
            $('#login').html('<span><img src="img/spinner.gif" width="12" height="12"/>&nbsp;Refreshing...</span>').removeClass('tadlblue').addClass('black').removeAttr('onclick');
        } this doesn't seem to get used by anything */
        $.getJSON(ILSCATCHER_BASE + '/main/login.json?u='+ username +'&pw=' + password, function(data) {
            if (data['status'] == 'error') {
                var source = $('#login_form-template').html();
                $('#login_form').html(source);
                $('#login_msg').html('<span>Error logging in.</span>');
                current_user = 'false';
            } else {
                render_dash(data);
                var patron_full_name = data.users[0].user.name;
                var checkouts = data.users[0].user.checkouts;
                var holds = data.users[0].user.holds;
                var pickups = data.users[0].user.pickups;
                var fines = data.users[0].user.fines;
                var token = data.token;
                current_user = 'true';
                window.localStorage.setItem('patron_full_name', patron_full_name);
                window.localStorage.setItem('checkouts', checkouts);
                window.localStorage.setItem('holds', holds);
                window.localStorage.setItem('pickups', pickups);
                window.localStorage.setItem('fines', fines);
                window.localStorage.setItem('current_user', current_user);
                window.localStorage.setItem('token', token);
                window.localStorage.setItem('username', username);
                reset_hold_links();
                if (current_page == 'myaccount' && first_state != 'true' ) {
                	myAccount();
            	}
            }
        });
    } else {
        // Not logged in. Display the default login form.
        var source   = $('#login_form-template').html();
        $('#login_form').html(source);
        set_login_form_keypress_event();
    }
}

function refresh_acctinfo() {
    var token = window.localStorage.getItem('token');
    var username = window.localStorage.getItem('username');
    var first_state = window.localStorage.getItem('current_user');
    if (logged_in()) {
        $.getJSON(ILSCATCHER_BASE + '/main/acctinfo.json?token=' + token, function(data) {
            if (data['status'] == 'error') {
                var source = $('#login_form-template').html();
                $('#login_form').html(source);
                $('#login_msg').html('<span>Error logging in.</span>');
                current_user = 'false';
            } else {
                render_dash(data);
                var patron_full_name = data.users[0].user.name;
                var checkouts = data.users[0].user.checkouts;
                var holds = data.users[0].user.holds;
                var pickups = data.users[0].user.pickups;
                var fines = data.users[0].user.fines;
                current_user = 'true';
                window.localStorage.setItem('patron_full_name', patron_full_name);
                window.localStorage.setItem('checkouts', checkouts);
                window.localStorage.setItem('holds', holds);
                window.localStorage.setItem('pickups', pickups);
                window.localStorage.setItem('fines', fines);
                window.localStorage.setItem('current_user', current_user);
                window.localStorage.setItem('username', username);
                reset_hold_links();
            }
        });
    }
}

function render_dash(data) {
    var data = data;
    var template = Handlebars.compile($('#logedin-template').html());
    var info = template(data);
    $('#login_form').html(info);
}

function showcheckouts() {
    cleanhouse();
    cleandivs();
    if (logged_in()) {
        changeBanner('Checked Out', color_tadlblue);
        var action = {action:'showcheckouts'}
        History.pushState(action, psTitle + separator + 'Items currently checked out', 'checkout');
        loading_animation('start');
        var token = window.localStorage.getItem('token');
        state = History.getState();
        $.getJSON(ILSCATCHER_BASE + '/main/showcheckouts.json?token=' + token, function(data) {
            var template = Handlebars.compile($('#showcheckedout-template').html());
            var info = template(data);
            if (state.data.action === 'showcheckouts') {
                $('#two-thirds').html(info).show();
                myaccount_menu();
                loading_animation('stop');
            }
        });
    } else {
        changeBanner('Log In', color_tadlblue);
        openForm();
    }
}

function pre_cancelhold(hold_id) {
    var hold_id = hold_id;
    var element = '#cancel_' + hold_id;
    var confirm_text = '<span>Click to confirm</span>';
    $(element).removeClass('tadlblue').addClass('red').html(confirm_text).attr('onclick', 'holdaction(\'cancel\',' + hold_id + ');');
}

function holdaction(action,hold_id) {
    var todo = action;
    $('#' + todo + '_' + hold_id).html('<span>Working</span>').spin('tiny').removeAttr('onclick').removeClass('tadlblue').addClass('black');
    var token = window.localStorage.getItem('token');
    $.getJSON(ILSCATCHER_BASE + '/main/holdaction.json?token=' + token + '&hold_id=' + hold_id + '&todo=' + todo, function(data) {
        if (todo == 'suspend') {
            $('#suspend_' + hold_id).html('<span>Activate</span>').attr('onclick', 'holdaction(\'activate\',' + hold_id + ');').attr('id', 'activate_' + hold_id).removeClass('black').addClass('tadlblue');
            $('#holdstatus_' + hold_id).html('Suspended');
        } else if (todo == 'activate') {
            $('#activate_' + hold_id).html('<span>Suspend</span>').attr('onclick', 'holdaction(\'suspend\',' + hold_id + ');').attr('id', 'suspend_' + hold_id).removeClass('black').addClass('tadlblue');
            $('#holdstatus_' + hold_id).html('Active');
        } else if (todo == 'cancel') {
            $('#hold_' + hold_id).remove();
            var tempholdcount = parseInt(window.localStorage.getItem('holds'));
            tempholdcount--;
            window.localStorage.setItem('holds',tempholdcount);
            myaccount_menu();
        }
    });
}

function showholds() {
    cleanhouse();
    cleandivs();
    if (logged_in()) {
        var action = {action:'showholds'}
        History.pushState(action, psTitle + separator + 'Items currently on hold', 'holds');
        changeBanner('My Holds', color_tadlblue);
        loading_animation('start');
        var token = window.localStorage.getItem('token');
        state = History.getState();
        $.getJSON(ILSCATCHER_BASE + '/main/showholds.json?token=' + token, function(data) {
            var template = Handlebars.compile($('#showholds-template').html());
            var info = template(data);
            if (state.data.action === 'showholds') {
                $('#two-thirds').html(info).show();
                myaccount_menu();
                loading_animation('stop');
            }
        });
    } else {
        changeBanner('Log In', color_tadlblue);
        openForm();
    }
}

function show_checkout_history() {
    historycount=0;
    cleanhouse();
    cleandivs();
    if (logged_in()) {
        changeBanner('Checkout History', color_tadlblue);
        loading_animation('start');
        var token = window.localStorage.getItem('token');
        $.getJSON(ILSCATCHER_BASE + '/main/get_checkout_history.json?token=' + token, function(data) {
            var template = Handlebars.compile($('#showcheckout-history-template').html());
            var info = template(data);
            var more = data.more;
            $('#two-thirds').html(info).show();
            myaccount_menu();
            loading_animation('stop');
        });
    } else {
        changeBanner('Log In', color_tadlblue);
        openForm();
    }
}

function more_history() {
    historycount++;
    var username = window.localStorage.getItem('username');
    var token = window.localStorage.getItem('token');
    $.getJSON(ILSCATCHER_BASE + '/main/get_checkout_history.json?user=' + username + '&token=' + token + '&page=' + historycount, function(data) {
        if (data.more == 'false') { delete data.more; }
        var more = data.more;
        var template = Handlebars.compile($('#showcheckout-history-template').html());
        var info = template(data);
        $('#two-thirds').append(info).promise().done(function() {
            $('.spinning').hide();
            $('.spinning').parent().html('<h4 class="title">Page ' + (historycount+1) + '</h4>');
        });
    });
}

function billing_print(id) {
    loading_animation('start');
    $('body').scrollTop(0);
    var token = window.localStorage.getItem('token');
    $.getJSON(ILSCATCHER_BASE + '/main/receipt_print.json?pmt_id=' + id + '&token=' + token, function(data) {
        var message = data.message;
        message = '<div id="printThis">' + message + '</div><div class="clearfix"></div><div><a class="button verysmall tadlblue" onclick="billing_actually_print()"><span>print</span></a></div>';
        $.fancybox({
            content: message,
            type: 'iframe',
            autoScale: true
        });
        loading_animation('stop');
    });
}
function billing_actually_print() {
    $('#printThis').printElement();
}

function billing_email(id) {
    loading_animation('start');
    $('body').scrollTop(0);
    var token = window.localStorage.getItem('token');
    $.getJSON(ILSCATCHER_BASE + '/main/receipt_email.json?pmt_id=' + id + '&token=' + token, function(data) {
        console.log(data.message);
        var message = data.message[0].message;
        $.fancybox({
            content: message,
            type: 'iframe',
            autoScale: true
        });
        loading_animation('stop');
    });
}

function show_payment_history() {
    historycount = 0;
    cleanhouse();
    cleandivs();
    if (logged_in()) {
        changeBanner('Payment History', color_tadlblue);
        loading_animation('start');
        var username = window.localStorage.getItem('username');
        var token = window.localStorage.getItem('token');
        $.getJSON(ILSCATCHER_BASE + '/main/get_payment_history.json?token=' + token, function(data) {
            if (data.more == 'false') { delete data.more; }
            var template = Handlebars.compile($('#payments-template').html());
            var info = template(data);
            $('#two-thirds').html(info).show();
            myaccount_menu();
            loading_animation('stop');
        });
    } else {
        changeBanner('Log In', color_tadlblue);
        openForm();
    }
}
function more_payment_history() {
    historycount++;
    var username = window.localStorage.getItem('username');
    var token = window.localStorage.getItem('token');
    $.getJSON(ILSCATCHER_BASE + '/main/get_payment_history.json?user=' + username + '&token=' + token + '&page=' + historycount, function(data) {
        if (data.more == 'false') { delete data.more; }
        var template = Handlebars.compile($('#payments-template').html());
        var info = template(data);
        $('#two-thirds').append(info).promise().done(function() {
            $('.spinning').hide();
            $('.spinning').parent().html('<h4 class="title">Page ' + (historycount+1) + '</h4>');
        });
    });
}

function show_fines() {
    finepage = 0;
    cleanhouse();
    cleandivs();
    if (logged_in()) {
        changeBanner('Fines and Charges', color_tadlblue);
        loading_animation('start');
        var token = window.localStorage.getItem('token');
        $.getJSON(ILSCATCHER_BASE + '/main/get_fines.json?token=' + token, function(data) {
            var template = Handlebars.compile($('#fines-template').html());
            var info = template(data);
            var more = data.more;
            $('#two-thirds').html(info).show();
            myaccount_menu();
            loading_animation('stop');
        });
    } else {
        changeBanner('Log in', color_tadlblue);
        openForm();
    }
}

function showpickups() {
    cleanhouse();
    cleandivs();
    if (logged_in()) {
        changeBanner('Ready for Pickup', color_tadlblue);
        var action = {action:'showpickups'}
        History.pushState(action, 'Ready for Pickup', 'pickup');
        loading_animation('start');
        var token = window.localStorage.getItem('token');
        state = History.getState();
        $.getJSON(ILSCATCHER_BASE + '/main/showpickups.json?token=' + token, function(data) {
            var template = Handlebars.compile($('#showholds-template').html());
            data.ready = 'ready';
            var info = template(data);
            if (state.data.action === 'showpickups') {
                $('#two-thirds').html(info).show();
                myaccount_menu();
                loading_animation('stop');
            }
        });
    } else {
        changeBanner('Log in', color_tadlblue);
        openForm();
    }
}

function renew(circulation_id, barcode) {
    var circ_id = circulation_id;
    var bc = barcode;
    var token = window.localStorage.getItem('token');
    $('#renew_' + circ_id).removeClass('tadlblue').addClass('black').removeAttr('onclick').html('<span>&nbsp;Renewing...</span>').spin('tiny');
    $.getJSON(ILSCATCHER_BASE + '/main/renew.json?token=' + token + '&circ_id=' + circ_id + '&bc=' + bc, function(data) {
        var template = Handlebars.compile($('#renew-template').html());
        var info = template(data);
        $('#'+ circ_id).html(info);
        $('#renew_' + circ_id).hide();
    });
}


function showcard() {
    cleanhouse();
    cleandivs();
    if (logged_in()) {
        changeBanner('My Library Card', color_tadlblue);
        var action = {action:'showcard'}
        History.pushState(action, 'Your Card', 'card');
        loading_animation('start');
        var token = window.localStorage.getItem('token');
        state = History.getState();
        $.getJSON(ILSCATCHER_BASE + '/main/showcard.json?token=' + token, function(data) {
            if (state.data.action === 'showcard') {
                var card = data.barcode;
                var html = '<div class="card"><div id="barcodepage" class="padtop"><div class="barcode padtop"><div id="bcTarget"></div></div><div class="barcodelogo"><div class="bclogoTarget"><img src="img/clean-logo-header.png" alt="" /></div></div><div class="clearfix"></div></div></div>';
                $('#two-thirds').html(html).show();
                $('#bcTarget').barcode(card, 'code128', {barWidth:2, barHeight:80, fontSize:12});
                myaccount_menu();
                loading_animation('stop');
            }
        });
    } else {
        changeBanner('Log in', color_tadlblue);
        openForm();
    }
}

function idInList(id,list) {
    var list = list;
    var id = id;
    var response = false;
    for (i=0;i<list.length;i++) {
        if (list[i]['record'] == id) {
            response = true;
        }
    }
    return response;
}

function bagIsEmpty() {
    var result = false;
    var bag = window.localStorage.getItem('list');
    if (bag != undefined) {
        try { bag = JSON.parse(bag);
        } catch (e) { return true; }
        if (bag == null) {
            result = true;
        } else if (bag.length==0) {
            result = true;
        } else {
            result = false;
        }
    }
    return result;
}

function addtolist(record_id, image, format_icon, author, year, online, title) {
    var current_list;
    try { current_list = JSON.parse(window.localStorage.getItem('list')); } catch (e) { current_list = null; }
    var record_id = record_id;
    if (current_list) {
        var newitem = {"record": record_id, "image": image, "format_icon": format_icon, "author": author, "year": year, "online": online, "title": title };
        if (idInList(record_id,current_list) != true) {
            current_list.unshift(newitem);
            if (Object.keys(current_list).length <= 15) {
                window.localStorage.setItem('list', JSON.stringify(current_list));
            } else {
                var content = '<div>Your bag is too heavy. Place holds, remove an item or <s>save your bag to a list</s> to add more!</div><div class="center" style="padding-top:30px;"><a onclick="$.fancybox.close();" class="button tadlblue verysmall"><span>Ok</span></a></div>';
                $.fancybox({
                    content: content,
                    autoScale: true,
                    closeBtn: false
                });
            }
        }
    } else {
        var newitem = [{"record": record_id, "image": image, "format_icon": format_icon, "author": author, "year": year, "online": online, "title": title }];
        window.localStorage.setItem('list', JSON.stringify(newitem));
    };
    mylist();
}

function mylist() {
    if (bagIsEmpty()) {
        $('#region-three').empty();
        $('#region-two').parent().removeClass('grid-50').addClass('grid-75');
        $('#region-one').parent().removeClass('pull-50').addClass('pull-75');
    } else {
        $('#region-two').parent().removeClass('grid-75').addClass('grid-50');
        $('#region-one').parent().removeClass('pull-75').addClass('pull-50');
        var list = window.localStorage.getItem('list');
        var data = JSON.parse('{"objects": ' + decodeURIComponent(list) + ' }');
        var template = Handlebars.compile($('#mylist-template').html());
        var info = template(data);
        $('#region-three').html(info);
    }
}

function removefromlist(record) {
    var json;
    try { var json = JSON.parse(window.localStorage.getItem('list')); } catch (e) { json = []; }
    for (i=0;i<json.length;i++) {
        if (json[i].record == record) {
            json.splice(i,1);
        }
    }
    window.localStorage.setItem('list', JSON.stringify(json));
    mylist();
}


function pre_multi_hold() {
    try { var json = JSON.parse(window.localStorage.getItem('list')); } catch (e) { json = []; }
    var record_ids = [];
    for (i=0;i<json.length;i++) {
        record_ids.push(json[i].record);
    }
    var link_id = '#multi-pre-hold';
    $(link_id).removeClass('green').addClass('black');
    if (logged_in()) {
        $(link_id).html('<span>&nbsp;Requesting holds...</span>').removeAttr('onclick').spin('tiny');
        multi_hold(record_ids);
    } else {
        $(link_id).html('<span>Log in to place hold</span>');
        $(link_id).addClass('multi_hold_login_first');
        $openForm();
    }
}

function multi_hold(record_ids) {
    var records = record_ids.join();
    var token = window.localStorage.getItem('token');
    $.getJSON(ILSCATCHER_BASE + '/main/multihold.json?token=' + token + '&record_id=' + records, function(data) {
        $.each(data.items, function (index, value) {
            var message_div = '#multi_hold_message_' + this.record_id;
            var status = this.message.replace('Placing this hold could result in longer wait times.', 'Unavailable for pick-up at your location.');
            $(message_div).html(status);
            if (status == 'Hold was successfully placed') {
                $(message_div).show().addClass('success');
            } else {
                $(message_div).show().addClass('error');
            }
        });
        $('#multi-pre-hold').hide();
        refresh_acctinfo();
    });
}

function emptylist() {
    window.localStorage.setItem('list', '');
    $('html, body').animate({scrollTop: 0}, 500);
    mylist();
}

function check_googlebooks(record_id, isbn) {
    var isbn = isbn;
    var clean_isbn = isbn.split(",")[0].replace(/[^0-9]/g, "");
    var super_clean_isbn = $.trim(clean_isbn);
    var isbn_google = 'ISBN:'+ super_clean_isbn;
    var isbn_google_prep = "'"+ isbn_google +"'";
    var record_div = record_id;
    var url = 'https://books.google.com/books?bibkeys='+ isbn_google +'&jscmd=viewapi&callback=mycallback';
    var reviews = "";
    var googlebook_test = "";
    $.ajax({
        url: url,
        type: "GET",
        dataType: "jsonp",
        async: false,
        success: function (msg) {
            if (msg[isbn_google]) {
                googlebook_test = JSON.stringify(msg[isbn_google].preview);
                if ( googlebook_test == '"partial"' || googlebook_test == '"full"' ) {
                    $('#preview-'+ record_div).append('<a onclick="load_googlebooks('+ isbn_google_prep +')"><img src="https://www.google.com/intl/en/googlebooks/images/gbs_preview_button1.gif"></a>');
                }
            }
        },
        error: function () {
            $('#preview-'+ record_div).append("fail");
        },
    });
}

function load_googlebooks(isbn){
    var content = '<div id="viewerCanvas" style="width:700px;height:500px;"></div>';
    $.fancybox({
        content: content,
        autoScale: true
    });
    var viewer = new google.books.DefaultViewer(document.getElementById('viewerCanvas'));
    viewer.load(isbn);
}

function shelf_finder(library, location, call_number){
    var shelf_url = 'http://wjr.dev.tadl.org/locator/index.php?location='+ library + '&shelf=' + location +'&call=' + call_number;
    var content = '<iframe style="width: 90%; height: 90%; overflow: hidden" scrolling="no" src="' + shelf_url + '"></iframe>';
    $.fancybox({
        content : content,
        type : 'html',
        width : '90%',
        height : '90%',
        autoSize : false,
        scrolling : 'no'
    });
}

function change_account_settings() {
    if (logged_in()) {
        $('#save_settings_button').html('<span>&nbsp;Saving...</span>').removeClass('green').addClass('black').removeAttr('onclick')
        var base_url = 'https://mel-catcher.herokuapp.com/main/search_prefs?';
        var new_username = encodeURIComponent($('#new_username').val());
        var new_alias = encodeURIComponent($('#new_alias').val());
        var new_email = encodeURIComponent($('#new_email').val());
        var new_pickup_location = $('#new_pickup_location').val();
        var new_phone_notify = $('#hold_notify_phone').is(':checked').toString();
        var new_email_notify = $('#hold_notify_email').is(':checked').toString();
        var new_save_circs = $('#save_circs').is(':checked').toString();
        var new_save_holds = $('#save_holds').is(':checked').toString();
        var old_username = encodeURIComponent($('#new_username').prop("defaultValue"));
        var old_alias = encodeURIComponent($('#new_alias').prop("defaultValue"));
        var old_email = encodeURIComponent($('#new_email').prop("defaultValue"));
        var old_pickup_location = $('#new_pickup_location option[selected]').val();
        var old_phone_notify = $('#hold_notify_phone').prop("defaultValue");
        var old_email_notify = $('#hold_notify_email').prop("defaultValue");
        var old_save_circs = $('#save_circs').prop("defaultValue").toString();
        var old_save_holds = $('#save_holds').prop("defaultValue").toString();

        if (new_username != old_username) {
            var username_param = '&new_username=' + new_username;
        } else {
            var username_param = '';
        }

        if (new_alias != old_alias) {
            var alias_param = '&new_alias=' + new_alias;
        } else {
            var alias_param = '';
        }

        if (new_email != old_email) {
            var email_param = '&new_email=' + new_email;
        } else {
            var email_param = '';
        }

        if (new_pickup_location != old_pickup_location || new_save_circs != old_save_circs || new_save_holds != old_save_holds ) {
            var search_param = '&new_search_prefs=' + new_pickup_location + ',' + new_save_circs + ',' + new_save_holds;
        } else {
            var search_param = '';
        }

        if (new_phone_notify != old_phone_notify || new_email_notify != old_email_notify) {
            var notify_param = '&new_notify_prefs=' + new_phone_notify + ',' + new_email_notify;
        } else {
            var notify_param = '';
        }

        // this is going to need a form to enter current password to change things.

        var url = username_param + alias_param + email_param + search_param + notify_param;
        $.getJSON(ILSCATCHER_BASE + '/main/search_prefs.json?u='+ username +'&pw=' + password + url, function(data) {
            var cat = JSON.stringify(data);
            sessionStorage.setItem('account_settings', cat);
            account_settings = JSON.parse(sessionStorage.getItem("account_settings"));
            var prefs = myaccount_template(account_settings);
            $('#account_settings').html(prefs);
        });
    } else {
        // hey you're not logged in.
    }
}

function fetch_available_by_id(ids) {
    var url = 'main/by_id.json?ids=' + ids
    $.getJSON(ILSCATCHER_BASE + url, function(data) {
        $.each(data.items, function(){
            var target_div = '#available_' + this.record_id;
            $(target_div).html(this.availability);
        });
    });
}

