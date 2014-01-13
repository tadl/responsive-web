function loadmore() {
    pagecount++;
    state = History.getState();
    var searchquery = window.localStorage.getItem('query');
    var mediatype = window.localStorage.getItem('mt');
    var available = window.localStorage.getItem('avail');
    var loc = window.localStorage.getItem('loc');
    var facet = window.localStorage.getItem('facet');
    var searchtype = window.localStorage.getItem('searchtype');
    
    
    $('#loadmoretext').empty().append(loadingmoreText).trigger("create");
    $('#loadmoretext').trigger("create");
    $.get(ILSCATCHER_INSECURE_BASE + "/main/searchjson.json?utf8=%E2%9C%93&q=" + searchquery + "&mt=" + mediatype + "&p=" + pagecount + "&avail=" + available + "&loc=" + loc  + "&facet=" + facet + "&st=" + searchtype, function(data) {
        var results = data.message
         
            if (results != "no results") {
                var template = Handlebars.compile($('#results-template').html());
                var info = template(data);
                $('#region-two').append(info).promise().done(function() {
                    $('#loadmoretext').empty().append(loadmoreText);
                    $('#loadmoretext').trigger("create");
                });
            } else {
                $('#loadmoretext').html("No Further Results");
            }
        
    });
}



function getResults(query, mt, avail, location, searchtype) {      
    cleanhouse();
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
    localStorage.removeItem('facet');
    $("#mediatype").val(decodeURIComponent(mediatype));
    $("#term").val(decodeURIComponent(searchquery));
    $("#location").val(decodeURIComponent(loc));
    $("#searchtype").val(decodeURIComponent(searchtype));
    if (available === "true") {
        $('#available').prop('checked', true);
        var availablemsg = "Only Available";
    } else {
        $('#available').prop('checked', false);
        var availablemsg = "";
    }
    var loctext = document.getElementById("location").options[document.getElementById('location').selectedIndex].text; 
    var mediatypedecode = decodeURIComponent(mediatype);
    $('#search-params').html('<img class="spinner" src="img/spinner.gif">Searching for <strong>'+ unescape(searchquery) +'</strong> in ' + mediatypedecode + ' at ' + loctext + ' ' + availablemsg + '.');
    $('#search-params').show();
    changeBanner('Searching Catalog', '#0d4c78');
    $.getJSON(ILSCATCHER_INSECURE_BASE + "/main/searchjson.json?utf8=%E2%9C%93&q=" + unescape(searchquery) + "&mt=" + mediatypedecode +"&avail=" + available + "&loc=" + loc + "&st=" + searchtype, function(data) {
        var results = data.message;
        linked_search = "false";
            if (results != "no results") {
                var template = Handlebars.compile($('#results-template').html());
                var facet_template = Handlebars.compile($('#searchfacets-template').html());
                var info = template(data);
                var info_facets = facet_template(data);
                $('#region-two').html(info);
                $('#region-one').html(info_facets);
                $('#loadmoretext').empty().append(loadmoreText);
                $('#loadmoretext').trigger("create");
                $('#loadmore').show();
                $('#search-params').html('Results for <strong>'+ unescape(searchquery) +'</strong> in ' + mediatypedecode + ' at ' + loctext + ' ' + availablemsg + '. <a onclick="openSearch_options()" class="button verysmall gray"><span>options...</span></a>');
            } else {
                $('#search-params').html("No Results");
            }
    
    });
    mylist();
}

function facetsearch(query, mt, avail, location, searchtype, facet) {
    state = History.getState();
    pagecount = 0;
    var searchtype = searchtype;
    var facet = facet;
    var searchquery = query;
    var mediatype = mt;
    var available = avail;
    var loc = location;
    window.localStorage.setItem('facet', facet);
    window.localStorage.setItem('query', searchquery);
    window.localStorage.setItem('mt', mediatype);
    window.localStorage.setItem('avail', available);
    window.localStorage.setItem('loc', loc);
    if (available === "true") {
        $('#available').prop('checked', true);
        var availablemsg = "Only Available";
    } else {
        $('#available').prop('checked', false);
        var availablemsg = "";
    }
    cleanhouse();
    var mediatypedecode = decodeURIComponent(mediatype);    
    loctext = document.getElementById("location").options[document.getElementById('location').selectedIndex].text;
    $('#search-params').show();
    changeBanner('Searching Catalog', '#0d4c78');
    $('#search-params').html('<img class="spinner" src="img/spinner.gif"/>&nbsp;Changing filter.');
    $.getJSON(ILSCATCHER_INSECURE_BASE + "/main/searchjson.json?utf8=%E2%9C%93&q=" + searchquery + "&mt=" + mediatypedecode +"&avail=" + available + "&loc=" + loc + "&st=" + searchtype + "&facet=" + facet, function(data) {
        var results = data.message;
        state = History.getState();
        linked_search = "false";
        if (results != "no results") {
            var template = Handlebars.compile($('#results-template').html());
            var facet_template = Handlebars.compile($('#searchfacets-template').html());
            var selected_facet_template = Handlebars.compile($('#searchfacetsselected-template').html());
            var info = template(data);
            var info_facets = facet_template(data);
            var info_selected_facets = selected_facet_template(data);
            $('#region-two').html(info);
            $('#region-one').html(info_facets);
            $('#loadmoretext').empty().append(loadmoreText);
            $('#loadmoretext').trigger("create");
            $('#search-params').html('Results for <strong>'+ searchquery +'</strong> in ' + mediatypedecode + ' at ' + loctext + ' ' + availablemsg + '. <a onclick="openSearch_options()" class="button verysmall gray"><span>options...</span></a>');
            $('#search-params').append(info_selected_facets);
            $('#loadmore').show();
        } else {
            $('#second-region').replaceWith("No Results");
            
        }
    });
    mylist();
}



function subject_search(subject) {
	var subject = subject.replace(";qtype=subject","");
   $("#searchtype").val("subject");
   $("#term").val(decodeURIComponent(subject));
   startsearch();

}

function logged_in() {
    var username = window.localStorage.getItem('username');
    if (username) {
        return true;
    } else {
        return false;
    }
}

function logout() {
    $("#login_form").html('Username: <input type="text" id="username" /><br /> Password: <input type="password" id="pword" /><br /><button id="login" onclick="login()">Login</button><span id="login_msg"></span>'); 
    window.localStorage.clear();
    current_user = 'false';
    location.reload();
}

function showmore(record_id) {
    var record_id = record_id;
    var e = document.getElementById(record_id);

      
            $('#more_details_' + record_id).removeClass('tadlblue').addClass('black').html('<span><img src="img/spinner.gif" width="12" height="12" />&nbsp;Loading...</span>').removeAttr('onclick');
            $.getJSON(ILSCATCHER_INSECURE_BASE + "/main/itemdetails.json?utf8=%E2%9C%93&record_id=" + record_id, function(data) {
                var results = data.message;
                var template = Handlebars.compile($('#more_details-template').html());
                var info = template(data);
                var isbn = data.items[0].isbn;
                
              
            
                $('#'+ record_id).html(info).promise().done(function() {
                    $('#more_details_' + record_id).hide();
                });
                $('#'+ record_id).show();
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

function viewitem(record_id) {
    cleanhouse();
    state = History.getState();
    $('.load_more').show();
    $('#loadmoretext').empty().append(loadingmoreText).trigger("create");
    $.getJSON(ILSCATCHER_INSECURE_BASE + "/main/itemdetails.json?utf8=%E2%9C%93&record_id=" + record_id, function(data) {
        var template = Handlebars.compile($('#result-details-template').html());
        var info = template(data);
        if (state.data.action === "viewitem") {
            $('#results').html(info).promise().done(function() {
                $('#loadmoretext').empty();
            });
            $('#'+ record_id).css('display', 'block');
        }
    });
}

function viewmarc(record_id) {
    $.getJSON(ILSCATCHER_INSECURE_BASE + "/main/marc.json?record_id=" + record_id, function(data) {
    var content = data.marc;
    $.fancybox({
     content : content,
     type : 'ajax'
      });

    });
}




// not sure what this is for. It might be something I left half-done and has been replaced
function loaditem(record_id) {    
    var record_id = record_id;
    var action = {action:"viewitem", record_id:record_id}
    var newstate = 'item/' + record_id;
    History.pushState(action, 'Featured Item ' + record_id, newstate);
}

function showshelf(record_id) {
    var record_id = record_id;
    var e = document.getElementById(record_id +'shelf');
    if (e.style.display === 'none') {
        if (!$.trim($('#'+ record_id +'shelf').html()).length) {
            $('#'+ record_id +'-loading').html(loadingmoreText).trigger("create");
            $.getJSON(ILSCATCHER_INSECURE_BASE + "/main/itemonshelf.json?utf8=%E2%9C%93&record_id=" + record_id, function(data) {
                var results = data.message;
                var template = Handlebars.compile($('#shelf-template').html());
                var info = template(data);
                $('#'+ record_id +'shelf').html(info).promise().done(function() {
                    $('#'+ record_id +'-loading').empty();
                });
                $('#'+ record_id +'shelf').css('display', 'block');
            });
        } else {
            $('#'+ record_id +'shelf').css('display', 'block');
        }
    } else {
        $('#'+ record_id +'shelf').css('display', 'none');
    }
}

function pre_hold(record_id) {
    var record_id = record_id;
    link_id = '#place_hold_' + record_id;
    $(link_id).removeClass('green').addClass('black');
    if (logged_in()) {
        $(link_id).html('<span><img src="img/spinner.gif" width="12" height="12" />&nbsp;Requesting hold...</span>').removeAttr('onclick');
        hold(record_id);
    } else {
        $(link_id).html('<span>Log in to place hold</span>');
        $(link_id).addClass('hold_login_first');
        $("#login_form").slideDown("fast");
    }
}

function reset_hold_links() {
    $(".hold_login_first").each(function() {
        $(this).removeClass('hold_login_first').removeClass('black').addClass('green').html('<span>Place Hold</span>');
    });
      $(".multi_hold_login_first").each(function() {
        $(this).removeClass('multi_hold_login_first').removeClass('black').addClass('green').html('<span>Place All on Hold</span>');
    });
    
}

function hold(record_id) {
    var record_id = record_id;
    var username = window.localStorage.getItem('username');
    var password = window.localStorage.getItem('password');
    $.getJSON(ILSCATCHER_BASE + '/main/hold.json?u='+ username +'&pw=' + password + '&record_id=' + record_id, function(data) {
        var message = data[':message'].replace("Placing this hold could result in longer wait times.", "Unavailable for pick-up at your location.");
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
    window.setTimeout(partB,5000);
}

function partB() {
    var username = window.localStorage.getItem('username');
    var password = window.localStorage.getItem('password');
    $.getJSON(ILSCATCHER_BASE + '/main/login.json?u='+ username +'&pw=' + password, function(data) {
        var template = Handlebars.compile($('#logedin-template').html());
        var info = template(data);
        $('#login_form').html(info);
    });
}

function login() {
    var username = $('#username').val();
    var password = $('#pword').val();
    if (typeof(username) !== 'undefined' && username != '' && typeof(password) !== 'undefined' && password != '') {
        window.localStorage.setItem('username', username);
        window.localStorage.setItem('password', password);
        login_and_fetch_dash(username, password);
    }
}

function login_and_fetch_dash(username, password) {
    var username = username;
    var password = password;
    var first_state = window.localStorage.getItem('current_user');
    if (typeof(username) == 'undefined' || typeof(password) == 'undefined') {
        username = window.localStorage.getItem('username');
        password = window.localStorage.getItem('password');
    }
    if (typeof(username) !== 'undefined' && username != '' && username !== null
        && typeof(password) !== 'undefined' && password != '' && password !== null) {
        if ($('#pword').length != 0) {
            $('#login_form').html('<span><img src="img/spinner.gif" width="18" height="18"/>&nbsp;Refreshing...</span>');
        }
        if ($('#login').length != 0) {
            $('#login').html('<span><img src="img/spinner.gif" width="12" height="12"/>&nbsp;Refreshing...</span>').removeClass('tadlblue').addClass('black').removeAttr('onclick');
        } // I need help understanding this bit. what does the length of the login button have to do with anything? // wjr
        $.getJSON(ILSCATCHER_BASE + '/main/login.json?u='+ username +'&pw=' + password, function(data) {
            if (data['status'] == 'error') {
                $("#login_form").html('Username: <input type="text" id="username" /><br /> Password: <input type="password" id="pword" /><br /><a id="login" class="button small tadlblue" onclick="login()"><span>Login</span></a><span id="login_msg"></span>'); 
    			window.localStorage.clear();
                $('#login_msg').html('<span>Error logging in.</span>');
                current_user = 'false';
            } else {
                render_dash(data);
                var patron_full_name = data.users[0].user.name;
                var checkouts = data.users[0].user.checkouts;
                var holds = data.users[0].user.holds;
                var pickups = data.users[0].user.pickups;
                var fines = data.users[0].user.fines;
                window.localStorage.setItem('patron_full_name', patron_full_name);
                window.localStorage.setItem('checkouts', checkouts);
                window.localStorage.setItem('holds', holds);
                window.localStorage.setItem('pickups', pickups);
                window.localStorage.setItem('fines', fines);
                window.localStorage.setItem('current_user', "true");
                current_user = window.localStorage.getItem('current_user');
                reset_hold_links();
                if (current_page == 'myaccount' && first_state != 'true' ){
                	myAccount();      
            	};
            	
            }
        });
    } else {
        $("#login_form").html('Username: <input type="text" id="username" /><br /> Password: <input type="password" id="pword" /><br /><a id="login" class="button small tadlblue" onclick="login()"><span>Login</span></a><span id="login_msg"></span>'); 
        window.localStorage.clear();
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
    var action = {action:"showcheckouts"}
    History.pushState(action, psTitle + separator + "Items currently checked out", "checkout");   
    $('#working').show().spin('default');
    var username = window.localStorage.getItem('username');
    var password = window.localStorage.getItem('password');
    state = History.getState();
    $.getJSON(ILSCATCHER_BASE + '/main/showcheckouts.json?u='+ username +'&pw=' + password, function(data) {
        var template = Handlebars.compile($('#showcheckedout-template').html());
        var info = template(data);
        if (state.data.action === "showcheckouts") { 
            $('#region-wide').html(info).show();
            $('#working').hide().spin(false);
        }
    });
}

function pre_cancelhold(hold_id) {
    var hold_id = hold_id;
    var element = '#cancel_hold_' + hold_id;
    var confirm_text = '<span>Click to confirm</span>';
    var canceling_text = '<span><img class="spinner" src="img/spinner.gif" width="12" height="12"/>Canceling hold...</span>';
    $(element).removeClass('tadlblue').addClass('red').html(confirm_text);
    $(element).prop("onclick", null);
    $(element).on("click", function(event) {
        $(this).off('click');
        $(this).removeClass('red').addClass('black').html(canceling_text);
        cancelhold(hold_id);
    });
}

function cancelhold(hold_id) {
    var hold_id = hold_id;
    var username = window.localStorage.getItem('username');
    var password = window.localStorage.getItem('password');
    $.getJSON(ILSCATCHER_BASE + '/main/cancelhold.json?u='+ username +'&pw=' + password + '&hold_id=' + hold_id, function(data) {
        $('#hold_' + hold_id).remove();
    });
}

function showholds() {
    cleanhouse();
    cleandivs();
    var action = {action:"showholds"}
    History.pushState(action, "Your Holds", "holds"); 
    $('#working').show().spin('default');
    var username = window.localStorage.getItem('username');
    var password = window.localStorage.getItem('password'); 
    state = History.getState();
    $.getJSON(ILSCATCHER_BASE + '/main/showholds.json?u='+ username +'&pw=' + password, function(data) {
        var template = Handlebars.compile($('#showholds-template').html());
        var info = template(data);
        if (state.data.action === "showholds") {
            $('#region-wide').html(info).show();
            $('#working').hide().spin(false);
        }
    });   
}

function showpickups() {
    cleanhouse();
    cleandivs();
    var action = {action:"showpickups"}
    History.pushState(action, "Ready for Pickup", "pickup"); 
    $('#working').show().spin('default');
    var username = window.localStorage.getItem('username');
    var username = window.localStorage.getItem('username');
    var password = window.localStorage.getItem('password'); 
    state = History.getState();
    $.getJSON(ILSCATCHER_BASE + '/main/showpickups.json?u='+ username +'&pw=' + password, function(data) {
        var template = Handlebars.compile($('#showholds-template').html());
        var info = template(data);
        if (state.data.action === "showpickups") {
            $('#region-wide').html(info).show();
            $('#working').hide().spin(false);
        }
    });
}

function renew(circulation_id, barcode) {
    var circ_id = circulation_id;
    var bc = barcode;
    var username = window.localStorage.getItem('username');
    var password = window.localStorage.getItem('password');
    $('#renew_' + circ_id).removeClass('tadlblue').addClass('black').removeAttr('onclick').html('<span><img src="img/spinner.gif" width="12" height="12"/>&nbsp;Renewing...</span>');
    $.getJSON(ILSCATCHER_BASE + '/main/renew.json?u='+ username +'&pw=' + password + '&circ_id=' + circ_id + '&bc=' + bc, function(data) {
        var template = Handlebars.compile($('#renew-template').html());
        var info = template(data);
        $('#'+ circ_id).html(info);
        $('#renew_' + circ_id).hide();
    });
}


function showcard() {
    cleanhouse();
    var action = {action:"showcard"}
    History.pushState(action, "Your Card", "card"); 
    $('#working').show().spin('default');
    var username = window.localStorage.getItem('username');
    var password = window.localStorage.getItem('password'); 
    state = History.getState();
    $.getJSON(ILSCATCHER_BASE + '/main/showcard.json?u='+ username +'&pw=' + password, function(data) {
        if (state.data.action === "showcard") {   
            var card = data.barcode;
            var html = '<div class="card"><div id="barcodepage"><div class="barcode"><div id="bcTarget"></div></div><div class="barcodelogo"><div class="bclogoTarget"><img src="img/clean-logo-header.png" alt="" /></div></div><div class="clearfix"></div></div></div>';
            $('#working').hide().spin(false);
            $('#region-wide').html(html).show();
            $("#bcTarget").barcode(card, "code128", {barWidth:2, barHeight:80, fontSize:12}); 
        }
    });
}

function addtolist(record_id, image, format_icon, author, year, online, title) {
    var record_id = record_id;
    var image = image;
    var format_icon = format_icon;
    var author = author;
    var year = year;
    var online = online;
    var title = title;
    var current_list = localStorage["list"];
    var listvalue = {"record": record_id, "image": image, "format_icon": format_icon, "author": author, "year": year, "online": online, "title": title};
    var savelist = JSON.stringify(listvalue);
    if (current_list) {
        var mergelist = []
        mergelist.push(JSON.parse(current_list));
        mergelist.unshift(listvalue);
        localStorage['list'] = JSON.stringify(mergelist);  
    } else {
        window.localStorage.setItem('list', savelist);
    };
    mylist();
}


function mylist() {

if (window.localStorage.getItem('list')){
    var mylist = window.localStorage.getItem('list').replace(/[\[\]']+/g,'');
  
   
    var mylist_decode = decodeURI(mylist);
    var wrapper = '{"objects": ['+ mylist_decode +']}';
    var test = JSON.stringify(eval("(" + wrapper + ")"));
    var test2 = JSON.parse(test);
    var existingIDs = [];
    test2.objects = $.grep(test2.objects, function(v) {
        if ($.inArray(v.record, existingIDs) !== -1) {
            return false;
        } else { 
            existingIDs.push(v.record);
            return true;
        }
    });
    var savelist = JSON.stringify(test2.objects);
    window.localStorage.setItem('list', savelist);
    
	}
	else
	{
	var test2 = "empty";
	}
    var template = Handlebars.compile($('#mylist-template').html());
    var info = template(test2);
    $('#region-three').html(info);
  

}



function removefromlist(record) {
    var record = record;
    var mylist2 = window.localStorage.getItem('list').replace(/[\[\]']+/g,'');
    var wrapper = '['+ mylist2 +']';
    var test = JSON.stringify(eval("(" + wrapper + ")"));
    var json = JSON.parse(test);
    for (i=0;i<json.length;i++) {
        if (json[i].record == record) {
            json.splice(i,1);
        }
    }
    window.localStorage["list"] = JSON.stringify(json);
    mylist();
}


function pre_multi_hold(record_ids) {
    var record_ids = record_ids
    var record_ids_array = record_ids.split(',');
    
    link_id = '#multi-pre-hold';
    $(link_id).removeClass('green').addClass('black');
    if (logged_in()) {
        $(link_id).html('<span><img src="img/spinner.gif" width="12" height="12" />&nbsp;Requesting holds...</span>').removeAttr('onclick');
        multi_hold(record_ids);
    } else {
        $(link_id).html('<span>Log in to place hold</span>');
        $(link_id).addClass('multi_hold_login_first');
        $("#login_form").slideDown("fast");
    }
}

function multi_hold(record_ids) {
    var record_ids = record_ids;
    var username = window.localStorage.getItem('username');
    var password = window.localStorage.getItem('password');
    $.getJSON(ILSCATCHER_BASE + '/main/multihold.json?u='+ username +'&pw=' + password + '&record_id=' + record_ids, function(data) {
  
      $.each(data.items, function (index, value) {
      var message_div = '#multi_hold_message_'+this.record_id;
      var status = this.message.replace("Placing this hold could result in longer wait times.", "Unavailable for pick-up at your location.");
      $(message_div).html(status);
 
      
      if (status == "Hold was successfully placed"){
      
      $(message_div).show().addClass('success');
      }else{
      
      $(message_div).show().addClass('error');
      };
   
    });
       link_id = '#multi-pre-hold';
       $(link_id).html('<span>Request Finished: Empty Bag?</span>').removeClass('black').addClass('green').attr("onclick", "emptylist()");
        

    });
  
}

function emptylist(){
	localStorage.removeItem('list');
	mylist();


}

function check_googlebooks(record_id, isbn){
var isbn = isbn;
var clean_isbn = isbn.split(",")[0].replace(/[^0-9]/g, "");
var super_clean_isbn = $.trim(clean_isbn);
var isbn_google = 'ISBN:'+ super_clean_isbn;
var isbn_google_prep = "'"+ isbn_google +"'"
var record_div = record_id
var url = 'https://books.google.com/books?bibkeys='+ isbn_google +'&jscmd=viewapi&callback=mycallback';
var reviews = "";
var googlebook_test = "";
$.ajax({
    url: url,
    type: "GET",
    dataType: "jsonp",
    async: false,
    success: function (msg) {
         googlebook_test = JSON.stringify(msg[isbn_google].preview);
          if ( googlebook_test == '"partial"' || googlebook_test == '"full"' ){
         $('#preview-'+ record_div).append('<a onclick="load_googlebooks('+ isbn_google_prep +')"><img src="https://www.google.com/intl/en/googlebooks/images/gbs_preview_button1.gif"></a>');
         };
    },
    error: function () {
         $('#preview-'+ record_div).append("fail");
    },    
});
}

function load_googlebooks(isbn){
 var isbn = isbn;
 var content = '<div id="viewerCanvas" style="width: 500px; height: 600px"></div>'
 $.fancybox({
     content : content,
     type : 'iframe',
     autoScale : true,
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

