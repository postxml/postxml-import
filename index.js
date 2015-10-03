var fs = require('fs'),
    _ = require('lodash');

module.exports = function (options) {
    
    var path = function (attr) {
        return process.cwd() + '/' + attr;
    }
    var options = options || {};
    options.selector = options.selector || 'import[src]';
    options.attr = options.attr || 'src';
    options.path = options.path || path;
    
    return function ($) {
        var importFile = function (element, path) {
            var file = '';
        
            if ( fs.existsSync(path) ) {
                file = String( fs.readFileSync(path) );
                
                // merge attributes
                var attrs = element.attribs;
                if (attrs) {
                    attrs = _.omit(attrs, options.attr);
                    
                    if (!_.isEmpty(attrs)) {
                        
                        var el = $.load(file);
                        
                        // add attributes to the root elements
                        el.root().children().each(function () {
                            this.attribs = _.merge(this.attribs, attrs, function (a, b) {
                                
                                // merge same attributes
                                if (a) {
                                    return a.concat(b);
                                }
                            });
                        });
                        
                        file = el.html();
                    }
                }
                
            } else {
                file = '';
            }
        
            $(element).replaceWith(file);
        }
        
        while ($(options.selector).length > 0) {
            $(options.selector).each(function () {
                importFile(
                    this,
                    options.path($(this).attr(options.attr))
                );
            });
        }
    };
};
