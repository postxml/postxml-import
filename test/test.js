var plugin = require('../');
var postxml = require('postxml');
var expect = require('chai').expect;
var fs = require('fs');

var test = function (input, output, opts) {

    var proccessed = postxml(input, [plugin(opts)]);

    if ( output.indexOf('.htm') != -1 ) {
        output = String( fs.readFileSync(__dirname + '/' + output) );
    }

    expect(proccessed).to.eql(output);
};

describe('poxtxml-import', function () {
    it('import file', function () {
        test(
            '<import src="test/block.htm"></import>',
            'block.htm',
            {}
        );
    });
    it('file does not exist', function () {
        test(
            '<import src="error.htm"></import>',
            '',
            {}
        );
    });
});
