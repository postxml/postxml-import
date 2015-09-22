var fs = require('fs'),
    _ = require('lodash');

module.exports = function (opts) {
    
    var options = opts || {}; 
    
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
                        
                        el.root().children().each(function () {
                            this.attribs = _.merge(this.attribs, attrs);
                        });
                        
                        file = el.html();
                    }
                }
                
            } else {
                file = '';
            }
        
            $(element).replaceWith(file);
        }

        $('import[src]').each(function () {
            var path = process.cwd() + '/' + $(this).attr('src');
            
            importFile($(this), path);
        });
        $('import[block]').each(function () {
            var block = $(this).attr('block'),
                path = process.cwd() + '/blocks/' + block + '/' + block + '.htm';
            
            importFile(this, path);
        });
    };
};
