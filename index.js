var fs = require('fs');
var postxml = require('postxml');

module.exports = function () {
    return function ($) {
        $('import[src]').each(function () {
            var path = __dirname + '/' + $(this).attr('src'),
                file = '';

            console.log( $(this).html() );

            if ( fs.existsSync(path) ) {
                file = String( fs.readFileSync(path) );
            }

            $(this).replaceWith(file);

        });
    };
};
