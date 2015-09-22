var plugin = require('../');
var postxml = require('postxml');
var expect = require('chai').expect;
var fs = require('fs');

var test = function (input, file, output, opts) {
    
    var proccessed = postxml([plugin(opts)]).process(input);

    if ( file != '' && ( file.indexOf('.htm') >= 0 || file.indexOf('.html') >= 0 ) ) {
        file = String( fs.readFileSync(process.cwd() + '/' + file) );
    }
    if (output != '') {
        file = output;
    }

    expect(proccessed).to.eql(file);
};

describe('postxml-import', function () {
    it('import file', function () {
        test(
            '<import src="test/block.htm"></import>',
            'test/block.htm',
            '',
            {}
        );
    });
    it('file does not exist', function () {
        test(
            '<import src="error.htm"></import>',
            '',
            '',
            {}
        );
    });
    it('import block', function () {
        test(
            '<import block="block"></import>',
            'blocks/block/block.htm',
            '',
            {}
        );
    });
    it('import block with additional attributes', function () {
        test(
            '<import block="block" mod="color:red" wrap=".g-section.g-section__content"></import>',
            '',
            '<div class="block" mod="color:red" wrap=".g-section.g-section__content"><a href="#">Link</a></div>',
            {}
        );
    });
});
