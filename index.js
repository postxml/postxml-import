var fs = require('fs'),
    _ = require('lodash');

module.exports = function (opts) {
    
    var options = options || {};
    options.selectors = options.selectors || {};
    options.selectors.base = options.selectors.base || 'import[src]';
    options.selectors.block = options.selectors.block || 'import[block]';
    options.selectors.component = options.selectors.component || 'link[rel=import][href]'
    
    return function ($) {
        var importFile = function (element, path) {
            var file = '';
        
            if ( fs.existsSync(path) ) {
                file = String( fs.readFileSync(path) );
                
                // merge attributes
                var attrs = element.attribs;
                if (attrs) {
                    attrs = _.omit(attrs, 'block');
                    
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
        
        // base syntax (<import src="">)
        while ($(options.selectors.base).length > 0) {
            $(options.selectors.base).each(function () {
                var path = process.cwd() + '/' + $(this).attr('src');
                
                importFile($(this), path);
            });
        }
        
        // block syntax (<import block="">)
        while ($(options.selectors.block).length > 0) {
            $(options.selectors.block).each(function () {
                var block = $(this).attr('block'),
                    path = process.cwd() + '/blocks/' + block + '/' + block + '.htm';
                
                importFile(this, path);
            });
        }
        
        // web components syntax (<link rel="import" href="">)
        while ($(options.selectors.component).length > 0) {
            $(options.selectors.component).each(function () {
                var path = process.cwd() + '/' + $(this).attr('href');
                
                importFile($(this), path);
            });
        }
    };
};
