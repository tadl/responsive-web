Handlebars.registerHelper('fixurls', function(text) {
    var response = text.replace(/href="\//gi, 'href="https://www.tadl.org/');
    response = response.replace(/src="\/\//gi, 'src="https://');
    response = response.replace(/src="\//gi, 'src="https://www.tadl.org/');
    return response;
});

Handlebars.registerHelper('compare', function(lvalue, rvalue, options) {
    if (arguments.length < 3)
        throw new Error("Handlerbars Helper 'compare' needs 2 parameters");
    operator = options.hash.operator || "==";
    var operators = {
        '==':       function(l,r) { return l == r; },
        '===':      function(l,r) { return l === r; },
        '!=':       function(l,r) { return l != r; },
        '<':        function(l,r) { return l < r; },
        '>':        function(l,r) { return l > r; },
        '<=':       function(l,r) { return l <= r; },
        '>=':       function(l,r) { return l >= r; },
        'typeof':   function(l,r) { return typeof l == r; }
    }
    if (!operators[operator])
        throw new Error("Handlerbars Helper 'compare' doesn't know the operator "+operator);
    var result = operators[operator](lvalue,rvalue);
    if (result) {
        return options.fn(this);
    } else {
        return options.inverse(this);
    }
});

Handlebars.registerHelper('make_https', function(url, options) {
    var url = url;
    var https_url = url.replace(/^http:/, 'https:');
    return https_url;
});

Handlebars.registerHelper('encode', function(data, options) {
    var data = data;
    var encode_data = encodeURIComponent(data);
    var encode_data = encode_data.replace(/'/g, "%27");
    return encode_data;
});

Handlebars.registerHelper('idtoname', function(id) {
    var idname;
    if (id == 23) {
        idname = "Woodmere (Main) Branch Library";
    } else if (id == 24) {
        idname = "Interlochen Public Library";
    } else if (id == 25) {
        idname = "Kingsley Branch Library";
    } else if (id == 26) {
        idname = "Peninsula Community Library";
    } else if (id == 27) {
        idname = "Fife Lake Public Library";
    } else if (id == 28) {
        idname = "East Bay Branch Library";
    } else {
        idname = id;
    }
    return idname;
});

Handlebars.registerHelper('each_upto', function(ary, max, options) {
    if (!ary || ary.length == 0)
        return options.inverse(this);
    var result = [ ];
    for(var i = 0; i < max && i < ary.length; ++i)
        result.push(options.fn(ary[i]));
    return result.join('');
});

Handlebars.registerHelper('checked_or_not', function(value) {
    if (value == 'on'){
    check = "checked"
    }else{
    check = ''
    }
    return check
});



Handlebars.registerHelper('checkbox_value', function(value) {
    if (value == 'on'){
    check = "true"
    }else{
    check = "false"
    }
    return check
});


Handlebars.registerHelper('check_for_select', function(value1, value2) {
    if (value1 == value2){
    check = 'selected="selected"'
    }else{
    check = ''
    }
    return check
});


Handlebars.registerHelper('youtubeify', function(record_id){
	var check_url = 'http://trailer-tank.herokuapp.com/main/get_trailer.json?id=' + record_id

jQuery.extend({
	getValues: function(url) {
        var result = null;
        $.ajax({
            url: url,
            type: 'get',
            dataType: 'json',
            async: false,
            success: function(data) {
            	if (data['message'] != 'error'){
                result = data['message']
                }
                else
                {
                result = "fail"
                };
            },
            error: function() {
                result = "fail";
            },
            
        });
       return result;
    }
});

var test = $.getValues(check_url)
if (test != "fail"){
var url = 'https://www.youtube.com/embed/'+ test +'?iv_load_policy=3&rel=0'
var embed_code = '<div class="videoWrapper"><iframe class="youtube-player" type="text/html" src="'+ url +'"allowfullscreen frameborder="0"></iframe></div>';
return embed_code;
}
});

Handlebars.registerHelper('trunc', function(str) {
    var textstr = jQuery('<p>' + str + '</p>').text();
    if (textstr.length > 100) {
        var retstr = textstr.truncate(100);
    } else {
        var retstr = textstr;
    }
    return retstr;
});


Handlebars.registerHelper('makedate', function(str) {
    return $.format.toBrowserTimeZone(str, "yyyyMMdd") + "T" + $.format.date(str, "HHmmss");
});

