var fs = require('fs'),
    _ = require('lodash');

module.exports = function (options) {

    var path = function (attr) {
        return attr;
    };
    options = options || {};
    options.selector = options.selector || 'import[src]';
    options.attr = options.attr || 'src';
    options.path = options.path || path;

    return function ($) {

		var proccessImport = function () {
			var file = '',
				path = options.path($(this).attr(options.attr));

			if ( fs.existsSync(path) ) {
				file = String( fs.readFileSync(path) );

				// merge attributes
				var attrs = this.attribs;
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

				var fileAST = $.load(file);
				var contentTag = fileAST('content');

				if (contentTag.length > 0) {
					var content = $(this).html();
					contentTag.replaceWith(content);
					file = fileAST.html();
				}
			} else {
				file = '';
			}

			$(this).replaceWith(file);
		};

        while ($(options.selector).length > 0) {
            $(options.selector).each(proccessImport);
        }
    };
};
