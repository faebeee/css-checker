"use strict";

const unit = require('unit.js');
const cssChecker = require('../App');

describe('SelectorLength', function() {
    it('maxlength', (done) => {
        let rules = {
            selector: {
                maxLength: 1
            },
            attributes: {}
        };
        cssChecker.fromString('.test .test2 .test { width: 100%; }', rules)
            .then((result) => {
                test.fail('Test should fail due to invalid config')
            }, (errors) => {
                unit.array(errors).hasLength(1);
                done()
            })
            .catch((e) => {
                unit.fail(e)
            })
    })
});