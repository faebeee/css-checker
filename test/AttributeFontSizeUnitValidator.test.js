"use strict";

const unit = require('unit.js');
const cssChecker = require('../App');

const VALIDATOR = {
    attribute: [
        require('../src/Validation/Attribute/FontSizeUnitValidator')
    ]
};

describe('AttributeFontSizeUnitValidator', function () {

    it('valid unit', (done) => {
        let rules = {
            selector: {
            },
            attributes: {
                fontSizeUnit : 'rem'
            }
        };

        cssChecker.fromString('#test {font-size: 1.2rem;}', rules, VALIDATOR)
            .then((result) => {
                unit.array(result[0].selector.errors).hasLength(0);
                done();
            })
            .catch((e) => {
                unit.fail(e.message)
            })
    });

    it('invalid unit', (done) => {
        let rules = {
            selector: {
            },
            attributes: {
                fontSizeUnit : 'rem'
            }
        };

        cssChecker.fromString('#test { font-size: 12px; }', rules, VALIDATOR)
            .then((result) => {
                unit.array(result[0].attributes[0].errors).hasLength(1);
                done();
            })
            .catch((e) => {
                unit.fail(e.message)
            })
    });


    it('disabled', (done) => {
        let rules = {
            selector: {
            },
            attributes: {
            }
        };

        cssChecker.fromString('#test { font-size: 12px; }', rules, VALIDATOR)
            .then((result) => {
                unit.array(result[0].attributes[0].errors).hasLength(0);
                done();
            })
            .catch((e) => {
                unit.fail(e.message)
            })
    });

});
