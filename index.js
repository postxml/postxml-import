var fs = require('fs');

module.exports = function () {
    return function ($) {
        $('import[src]').each(function () {
            var path = __dirname + '/' + $(this).attr('src'),
                file = '';

            if ( fs.existsSync(path) ) {
                file = String( fs.readFileSync(path) );
            }

            $(this).replaceWith(file);
        });
    };
};
