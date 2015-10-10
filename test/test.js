var plugin = require('../');
var postxml = require('postxml');
var expect = require('chai').expect;
var fs = require('fs');

var test = function (input, file, output, opts) {
    
    var proccessed = postxml([plugin(opts)]).process(input);

    if ( file != '' && ( file.indexOf('.htm') >= 0 || file.indexOf('.html') >= 0 ) ) {
        file = String( fs.readFileSync(file) );
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
            ''
        );
    });
    it('file does not exist', function () {
        test(
            '<import src="error.htm"></import>',
            '',
            ''
        );
    });
    it('import several files', function () {
        test(
            '<import src="test/block.htm"></import><import src="test/header.htm"></import>',
            '',
            '<div class="b-block"><div class="b-block__element"></div></div><header></header>'
        );
    });
    it('import block', function () {
        test(
            '<import block="block"></import>',
            'blocks/block/block.htm',
            '',
            {
                selector: 'import[block]',
                attr: 'block',
                path: function (block) {
                    return 'blocks/' + block + '/' + block + '.htm'
                }
            }
        );
    });
    it('import block with additional attributes', function () {
        test(
            '<import block="block" mod="color:red" wrap=".g-section.g-section__content"></import>',
            '',
            '<div class="block" mod="color:red" wrap=".g-section.g-section__content"><a href="#">Link</a></div>',
            {
                selector: 'import[block]',
                attr: 'block',
                path: function (block) {
                    return 'blocks/' + block + '/' + block + '.htm'
                }
            }
        );
    });
    it('import block with additional classes', function () {
        test(
            '<import block="block" class=" bg"></import>',
            '',
            '<div class="block bg"><a href="#">Link</a></div>',
            {
                selector: 'import[block]',
                attr: 'block',
                path: function (block) {
                    return 'blocks/' + block + '/' + block + '.htm'
                }
            }
        );
    });
    it('import link', function () {
        test(
            '<link rel="import" href="test/block.htm"></link>',
            '',
            '<div class="b-block" rel="import"><div class="b-block__element"></div></div>',
            {
                selector: 'link[rel=import][href]',
                attr: 'href'
            }
        );
    });
});
