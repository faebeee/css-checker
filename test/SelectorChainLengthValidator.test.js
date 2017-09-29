"use strict";

const unit = require('unit.js');
const cssChecker = require('../App');

const VALIDATOR = {
    selector: [
        require('../src/Validation/Selector/SelectorChainLengthValidator')
    ]
};

describe('SelectorChainLength', function () {

    it('invalid length', (done) => {
        let rules = {
            selector: {
                maxChainLength: 2
            },
            attributes: {}
        };

        cssChecker.fromString('.test .test2 .test, .asd asdf2, .foo { width: 100%; }', rules, VALIDATOR)
            .then((result) => {
                unit.array(result[0].selector.errors).hasLength(1);
                done();
            })
            .catch((e) => {
                unit.fail(e.message)
            })
    });

    it('valid length', (done) => {
        let rules = {
            selector: {
                maxChainLength: 1
            },
            attributes: {}
        };

        cssChecker.fromString('.test { width: 100%; }', rules, VALIDATOR)
            .then((result) => {
                unit.array(result[0].selector.errors).hasLength(0);
                done()
            })
            .catch((e) => {
                unit.fail(e)
            })
    });

    it('complex valid length', (done) => {
        let rules = {
            selector: {
                maxChainLength: 1
            },
            attributes: {}
        };

        cssChecker.fromString('.test, .test2, .test3 { width: 100%; }', rules, VALIDATOR)
            .then((result) => {
                unit.array(result[0].selector.errors).hasLength(0);
                done()
            })
            .catch((e) => {
                unit.fail(e)
            })
    });

    it('disabled', (done) => {
        let rules = {
            selector: {
            },
            attributes: {}
        };

        cssChecker.fromString('.test, .test2, .test3 { width: 100%; }', rules, VALIDATOR)
            .then((result) => {
                unit.array(result[0].selector.errors).hasLength(0);
                done()
            })
            .catch((e) => {
                unit.fail(e)
            })
    });
});
