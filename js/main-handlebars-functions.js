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
    var encode_data = data.replace(/'/g, "%27");
    return encode_data;
});

Handlebars.registerHelper('each_upto', function(ary, max, options) {
    if (!ary || ary.length == 0)
        return options.inverse(this);
    var result = [ ];
    for(var i = 0; i < max && i < ary.length; ++i)
        result.push(options.fn(ary[i]));
    return result.join('');
});

Handlebars.registerHelper('youtubeify', function(title){
	var youtube_url = 'http://gdata.youtube.com/feeds/api/videos?q=' + title + '-trailer-official&start-index=1&max-results=1&v=2&alt=json';
	
	jQuery.extend({
    getValues: function(url) {
        var result = null;
        $.ajax({
            url: url,
            type: 'get',
            dataType: 'json',
            async: false,
            success: function(data) {
            	if (data.feed.entry !== undefined){
                result = data.feed.entry[0].media$group.yt$videoid.$t
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
	
var test = $.getValues(youtube_url)

if (test != 'fail'){

var embed_code = '<iframe class="youtube-player" type="text/html" width="320" height="240" src="http://www.youtube.com/embed/'+ test +'" allowfullscreen frameborder="0"></iframe>'


return embed_code;
};


});
