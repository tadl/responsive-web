function compile_templates() {
drupalnode_template = Handlebars.compile($('#drupalnode-template').html());
featured_item_template = Handlebars.compile($('#showfeatureditembox-template').html());
review_template = Handlebars.compile($('#showreviews-template').html());
events_template = Handlebars.compile($('#showevents-template').html());
featured_news_template =  Handlebars.compile($('#showfeaturednews-template').html());
showlocations_template = Handlebars.compile($('#showlocations-template').html());
myaccount_template = Handlebars.compile($('#myaccount-template').html());
}


function showEastBay() {
    cleanhouse();
    cleandivs();
    var data = JSON.parse(sessionStorage.getItem("everything"));
 	if (data == null) {
 	var drupal_json_url = "https://mel-catcher.herokuapp.com/drupal/drupal.json";
 	 $.getJSON(drupal_json_url, function(data) {
 		var cat = JSON.stringify(data)
        sessionStorage.setItem('everything', cat );
        showEastBay();
        return;
    });
 	} else { 
 	changeBanner('East Bay', '#0d4c78');
 	var events_ebb = events_template(data.events_ebb)
 	var infobox_ebb = drupalnode_template(data.infobox_ebb)
 	var news_ebb = featured_news_template(data.news_ebb)
 	var hours_ebb = showlocations_template(data.hours_ebb)
 	$('#region-one').html(infobox_ebb);
 	$('#region-two').html(hours_ebb + '<div class="card"><h4 class="title">Upcoming Events</h4></div>' + events_ebb);
 	$('#region-three').html('<div class="card"><h4 class="title">Recent News</h4></div>' + news_ebb);
 	}
 	
}

function showFifeLake() {
    cleanhouse();
    cleandivs();
    var data = JSON.parse(sessionStorage.getItem("everything"));
 	if (data == null) {
 	var drupal_json_url = "https://mel-catcher.herokuapp.com/drupal/drupal.json";
 	 $.getJSON(drupal_json_url, function(data) {
 		var cat = JSON.stringify(data)
        sessionStorage.setItem('everything', cat );
        showFifeLake();
        return;
    });
 	} else { 
 	changeBanner('Fife Lake', '#0d4c78');
 	var events_flpl = events_template(data.events_flpl)
 	var infobox_flpl = drupalnode_template(data.infobox_flpl)
 	var news_flpl = featured_news_template(data.news_flpl)
 	var hours_flpl = showlocations_template(data.hours_flpl)
 	$('#region-one').html(infobox_flpl);
 	$('#region-two').html(hours_flpl + '<div class="card"><h4 class="title">Upcoming Events</h4></div>' + events_flpl);
 	$('#region-three').html('<div class="card"><h4 class="title">Recent News</h4></div>' + news_flpl);
 	}
}

function showInterlochen() {
    cleanhouse();
    cleandivs();
    var data = JSON.parse(sessionStorage.getItem("everything"));
 	if (data == null) {
 	var drupal_json_url = "https://mel-catcher.herokuapp.com/drupal/drupal.json";
 	 $.getJSON(drupal_json_url, function(data) {
 		var cat = JSON.stringify(data)
        sessionStorage.setItem('everything', cat );
        showInterlochen();
        return;
    });
 	} else { 
 	changeBanner('Interlochen', '#0d4c78');
 	var events_ipl = events_template(data.events_ipl)
 	var infobox_ipl = drupalnode_template(data.infobox_ipl)
 	var news_ipl = featured_news_template(data.news_ipl)
 	var hours_ipl = showlocations_template(data.hours_ipl)
 	$('#region-one').html(infobox_ipl);
 	$('#region-two').html(hours_ipl + '<div class="card"><h4 class="title">Upcoming Events</h4></div>' + events_ipl);
 	$('#region-three').html('<div class="card"><h4 class="title">Recent News</h4></div>' + news_ipl);
 	}
}

function showKingsley() {
    cleanhouse();
    cleandivs();
    var data = JSON.parse(sessionStorage.getItem("everything"));
 	if (data == null) {
 	var drupal_json_url = "https://mel-catcher.herokuapp.com/drupal/drupal.json";
 	 $.getJSON(drupal_json_url, function(data) {
 		var cat = JSON.stringify(data)
        sessionStorage.setItem('everything', cat );
        showKingsley();
        return;
    });
 	} else { 
 	changeBanner('Kingsley', '#0d4c78');
 	var events_kbl = events_template(data.events_kbl)
 	var infobox_kbl = drupalnode_template(data.infobox_kbl)
 	var news_kbl = featured_news_template(data.news_kbl)
 	var hours_kbl = showlocations_template(data.hours_kbl)
 	$('#region-one').html(infobox_kbl);
 	$('#region-two').html(hours_kbl + '<div class="card"><h4 class="title">Upcoming Events</h4></div>' + events_kbl);
 	$('#region-three').html('<div class="card"><h4 class="title">Recent News</h4></div>' + news_kbl);
 	}
}

function showPeninsula() {
    cleanhouse();
    cleandivs();
    var data = JSON.parse(sessionStorage.getItem("everything"));
 	if (data == null) {
 	var drupal_json_url = "https://mel-catcher.herokuapp.com/drupal/drupal.json";
 	 $.getJSON(drupal_json_url, function(data) {
 		var cat = JSON.stringify(data)
        sessionStorage.setItem('everything', cat );
        showPeninsula();
        return;
    });
 	} else { 
 	changeBanner('Peninsula', '#0d4c78');
 	var events_pcl = events_template(data.events_pcl)
 	var infobox_pcl = drupalnode_template(data.infobox_pcl)
 	var news_pcl = featured_news_template(data.news_pcl)
 	var hours_pcl = showlocations_template(data.hours_pcl)
 	$('#region-one').html(infobox_pcl);
 	$('#region-two').html(hours_pcl + '<div class="card"><h4 class="title">Upcoming Events</h4></div>' + events_pcl);
 	$('#region-three').html('<div class="card"><h4 class="title">Recent News</h4></div>' + news_pcl);
 	}
}

function showWoodmere() {
    cleanhouse();
    cleandivs();
    var data = JSON.parse(sessionStorage.getItem("everything"));
 	if (data == null) {
 	var drupal_json_url = "https://mel-catcher.herokuapp.com/drupal/drupal.json";
 	 $.getJSON(drupal_json_url, function(data) {
 		var cat = JSON.stringify(data)
        sessionStorage.setItem('everything', cat );
        showWoodmere();
        return;
    });
 	} else { 
 	changeBanner('Woodmere', '#0d4c78');
 	var events_wood = events_template(data.events_wood)
 	var infobox_wood = drupalnode_template(data.infobox_wood)
 	var news_wood = featured_news_template(data.news_wood)
 	var hours_wood = showlocations_template(data.hours_wood)
 	$('#region-one').html(infobox_wood);
 	$('#region-two').html(hours_wood + '<div class="card"><h4 class="title">Upcoming Events</h4></div>' + events_wood);
 	$('#region-three').html('<div class="card"><h4 class="title">Recent News</h4></div>' + news_wood);
 	}
}

function showTeensPage() {
    cleanhouse();
    cleandivs();
    var data = JSON.parse(sessionStorage.getItem("everything"));
 	if (data == null) {
 	var drupal_json_url = "https://mel-catcher.herokuapp.com/drupal/drupal.json";
 	 $.getJSON(drupal_json_url, function(data) {
 		var cat = JSON.stringify(data)
        sessionStorage.setItem('everything', cat );
        showTeensPage();
        return;
    });
 	} else { 
 	changeBanner('Teens', '#8a178a');
 	var teens_new = featured_item_template(data.teens_new)
 	var teens_manga = featured_item_template(data.teens_manga)
 	var teens_events = events_template(data.teens_events)
 	var teens_reviews = review_template(data.teens_reviews)
 	var teens_homework = drupalnode_template(data.teens_homework)
 	var teens_lists = drupalnode_template(data.teens_lists)
 	$('#region-one').html(teens_new + teens_manga);
 	$('#region-two').html(teens_lists + teens_reviews);
 	$('#region-three').html(teens_events);
 	}
}

function showOnlinePage() {
    cleanhouse();
    cleandivs();
    var data = JSON.parse(sessionStorage.getItem("everything"));
 	if (data == null) {
 	var drupal_json_url = "https://mel-catcher.herokuapp.com/drupal/drupal.json";
 	 $.getJSON(drupal_json_url, function(data) {
 		var cat = JSON.stringify(data)
        sessionStorage.setItem('everything', cat );
        showOnlinePage();
        return;
    });
 	} else {  
 	changeBanner('Online', '#99c11f');
 	var online_legal = drupalnode_template(data.online_legal)
 	$('#region-one').append(online_legal);
 	var online_mel = drupalnode_template(data.online_mel)
 	var online_resources = drupalnode_template(data.online_resources)
 	$('#region-two').append(online_resources + online_mel);
 	var online_ebooks = drupalnode_template(data.online_ebooks)
 	$('#region-three').append(online_ebooks);
 	}
}


function showYouthPage() {
    cleanhouse();
    cleandivs();
    var data = JSON.parse(sessionStorage.getItem("everything"));
 	if (data == null) {
 	var drupal_json_url = "https://mel-catcher.herokuapp.com/drupal/drupal.json";
 	 $.getJSON(drupal_json_url, function(data) {
 		var cat = JSON.stringify(data)
        sessionStorage.setItem('everything', cat );
        showYouthPage();
        return;
    });
 	} else {
 	changeBanner('Youth', '#15b1eb');
 	var youth_display = featured_item_template(data.youth_display);
 	var youth_new_books = featured_item_template(data.youth_new_books);
 	var youth_resources = drupalnode_template(data.youth_resources);
 	var youth_award_winners = drupalnode_template(data.youth_award_winners);
 	$('#region-one').append(youth_display + youth_new_books + youth_resources + youth_award_winners);
 	$('a[rel="lightframe"]').fancybox({type: 'iframe'});
 	var youth_reviews = review_template(data.youth_reviews);
 	$('#region-two').append(youth_reviews);
 	var youth_events = events_template(data.youth_events);
 	$('#region-three').append(youth_events).prepend('<div class="card"><h4 class="title">Upcoming Events</h4></div>');
 	}
}

function showVideoPage() {
    cleanhouse();
    cleandivs();
    var data = JSON.parse(sessionStorage.getItem("everything"));
 	if (data == null) {
 	var drupal_json_url = "https://mel-catcher.herokuapp.com/drupal/drupal.json";
 	 $.getJSON(drupal_json_url, function(data) {
 		var cat = JSON.stringify(data)
        sessionStorage.setItem('everything', cat );
        showVideoPage();
        return;
    });
 	} else {
 	changeBanner('Video', '#ffc341');
 	var videos_new = featured_item_template(data.videos_new);
 	var videos_hot = featured_item_template(data.videos_hot);
 	$('#region-one').append(videos_new + videos_hot);
 	var videos_met = featured_item_template(data.videos_met);
 	var videos_tcff= featured_item_template(data.videos_tcff);
 	$('#region-three').append(videos_met + videos_tcff);
 	var videos_reviews = review_template(data.videos_reviews);
 	$('#region-two').append(videos_reviews);
 	}
}

function showMusicPage() {
    cleanhouse();
    cleandivs();
    var data = JSON.parse(sessionStorage.getItem("everything"));
 	if (data == null) {
 	var drupal_json_url = "https://mel-catcher.herokuapp.com/drupal/drupal.json";
 	 $.getJSON(drupal_json_url, function(data) {
 		var cat = JSON.stringify(data)
        sessionStorage.setItem('everything', cat );
        showMusicPage();
        return;
    });
 	} else {
 	changeBanner('Music', '#fe6b18');
 	var music_new = featured_item_template(data.music_new);
 	var music_hot = featured_item_template(data.music_hot);
 	$('#region-one').append(music_new + music_hot);
 	var music_reviews = review_template(data.music_reviews);
 	$('#region-two').prepend(music_reviews);
 	var music_links = drupalnode_template(data.music_links);
 	$('#region-three').append(music_links);
 	}
}

function showBooksPage() {
    cleanhouse();
    cleandivs();
    var data = JSON.parse(sessionStorage.getItem("everything"));
 	if (data == null) {
 	var drupal_json_url = "https://mel-catcher.herokuapp.com/drupal/drupal.json";
 	 $.getJSON(drupal_json_url, function(data) {
 		var cat = JSON.stringify(data)
        sessionStorage.setItem('everything', cat );
        showBooksPage();
        return;
    });
 	} else {
 	changeBanner('Books', '#e03434');
    var books_featured_fiction = featured_item_template(data.books_featured_fiction);
    var books_featured_nonfiction = featured_item_template(data.books_featured_nonfiction);
    var books_adult_display = featured_item_template(data.books_adult_display)
    $('#region-one').append(books_featured_fiction + books_featured_nonfiction + books_adult_display);
    var books_adult_clubkits = featured_item_template(data.books_adult_clubkits)
    var books_adult_business = featured_item_template(data.books_adult_business)
    $('#region-three').append(books_adult_clubkits + books_adult_business);
    var books_book_list = drupalnode_template(data.books_book_list)
    $('#region-two').prepend(books_book_list);
    $('a[rel="lightframe"]').fancybox({type: 'iframe'});
    var books_reviews = review_template(data.books_reviews)
    $('#region-two').prepend(books_reviews);
 	}
}

function showHomePage() {
    cleanhouse();
    cleandivs();
 	var data = JSON.parse(sessionStorage.getItem("everything"));
 	if (data == null) {
 	var drupal_json_url = "https://mel-catcher.herokuapp.com/drupal/drupal.json";
 	 $.getJSON(drupal_json_url, function(data) {
 		var cat = JSON.stringify(data)
        sessionStorage.setItem('everything', cat );
        showHomePage();
        return;
    });
 	} else {
    var books_featured_fiction = featured_item_template(data.books_featured_fiction);
    var books_featured_nonfiction = featured_item_template(data.books_featured_nonfiction);
    var music_new = featured_item_template(data.music_new);
    var videos_new = featured_item_template(data.videos_new);
    $('#region-three').append(books_featured_fiction + videos_new + books_featured_nonfiction + music_new);
	var featured_news = featured_news_template(data.featured_news);
    $('#region-two').append(featured_news).prepend('<div class="card"><h4 class="title">Featured News</h4></div>');
    var events = events_template(data.events);
    $('#region-one').append(events).prepend('<div class="card"><h4 class="title">Upcoming Events</h4></div>');
    }
}

function myAccount(){
	cleanhouse();
    cleandivs();
    current_page = "myaccount";
    changeBanner('My Account', '#0d4c78'); 
    username = window.localStorage.getItem('username');
    password = window.localStorage.getItem('password');
    account_settings = window.localStorage.getItem('account_settings');
	if (current_user == 'true') {
    	var patron_full_name = window.localStorage.getItem('patron_full_name');
    	$('#region-two').html('<div class="card"><h4 class="title">Account Settings</h4></div><div class="card"><div id="account_settings">Loading!</div></div>');
	    
	    
	    
	    $.getJSON(ILSCATCHER_BASE + '/main/search_prefs.json?u='+ username +'&pw='+ password, function(data) {
	     var prefs = myaccount_template(data);
	     $('#account_settings').html(prefs);
	     });
	} else {
		$('#region-two').html('<div class="card"><h4 class="title">Login to View Your Account</h4></div>');
		$("#login_form").slideDown("fast");
	};
}

function changeBanner(content, color) {
document.querySelector('#page_banner').style.backgroundColor = color;
$('#page_banner').css({"display" : "block"});
$('#page_banner').html('<h2>'+content +'</h2>')
}
