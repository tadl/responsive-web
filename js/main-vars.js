var logodiv = '<div class="card"><div class="grid-container"><div class="grid-100 tablet-grid-100 mobile-grid-100"><img src="img/logo-horizontal-web.png" style="padding-top:10px;width:100%;" /></div><div class="grid-100 tablet-grid-100 mobile-grid-100" style="text-align:center;padding-top:20px;"><a class="pointer" onclick="load(\'woodmere\')">Woodmere</a> &bull; <a class="pointer" onclick="load(\'interlochen\')">Interlochen</a><br/><a class="pointer" onclick="load(\'kingsley\')">Kingsley</a> &bull; <a class="pointer" onclick="load(\'fifelake\')">Fife Lake</a><br/><a class="pointer" onclick="load(\'peninsula\')">Peninsula</a> &bull; <a class="pointer" onclick="load(\'eastbay\')">East Bay</a></div></div></div>';
var ILSCATCHER_HOST = 'mel-catcher.herokuapp.com/';
var ILSCATCHER_BASE = 'https://' + ILSCATCHER_HOST;
var PLACEHOLDER_IMG = 'img/clocktower100.png';
var psTitle = "Traverse Area District Library";
var eventsnav = '<a class="button large tadlblue wide" id="eventlocs" data-dropdown="#dropdown-2"><span>Filter by location</span></a><br/><br/><a class="button large tadlblue wide" id="eventaudis" data-dropdown="#dropdown-3"><span>Filter by audience</span></a>';
var separator = " | ";
var pagecount = 0;
var historycount = 0;
var state = {}
//var linked_search = false;
//var templist = {};
//templist.localArray = []; 
//var mylist2 = []

// colors
var color_tadlblue = '#0d4c78';
var color_red = '#e03434';
var color_orange = '#fe6b18';
var color_yellow = '#ffc341';
var color_green = '#99c11f';
var color_blue = '#15b1eb';
var color_purple = '#8a178a';

var NODEPREFIX = 'https://www.tadl.org/export/node/json/';

$.ajaxSetup({
    timeout: 5*1000,
    error: function(jqXHR, status, errorThrown){
        console.log('WAAAAA: ' + errorThrown);
        console.log('jqXHR: ' + jqXHR);
        console.log('status: ' + status);
        if (errorThrown == 'timeout') {
            loading_animation('stop');
            changeBanner('Error', color_red);
            var content = '<div>Sorry, the server took too long to respond.<br/>Our technology staff have been notified.<br/>Please try again later.</div><div class="center" style="padding-top:30px;"><a onclick="$.fancybox.close();window.location=\'/responsive-web/\';" class="button tadlblue medium"><span>Ok</span></a></div>';
            $.fancybox({
                content: content,
                autoScale: true,
                closeBtn: false
            });
        } else {
            window.location='/responsive-web/';
        }
    }
});
