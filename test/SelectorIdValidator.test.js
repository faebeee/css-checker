"use strict";

const unit = require('unit.js');
const cssChecker = require('../App');

const VALIDATOR = {
    selector: [
        require('../src/Validation/Selector/SelectorIdValidator')
    ]
};

describe('SelectorId', function () {

    it('disallow ID', (done) => {
        let rules = {
            selector: {
                allowId: false
            },
            attributes: {}
        };

        cssChecker.fromString('#test { width: 100%; }', rules, VALIDATOR)
            .then((result) => {
                unit.array(result[0].selector.errors).hasLength(1);
                done();
            })
            .catch((e) => {
                unit.fail(e.message)
            })
    });

    it('complex disallow ID', (done) => {
        let rules = {
            selector: {
                allowId: false
            },
            attributes: {}
        };

        cssChecker.fromString('.hello #test { width: 100%; }', rules, VALIDATOR)
            .then((result) => {
                unit.array(result[0].selector.errors).hasLength(1);
                done();
            })
            .catch((e) => {
                unit.fail(e.message)
            })
    });

    it('allow ID', (done) => {
        let rules = {
            selector: {
                allowId: true
            },
            attributes: {}
        };

        cssChecker.fromString('#test { width: 100%; }', rules, VALIDATOR)
            .then((result) => {
                unit.array(result[0].selector.errors).hasLength(0);
                done();
            })
            .catch((e) => {
                unit.fail(e.message)
            })
    });

    it('complex allow ID', (done) => {
        let rules = {
            selector: {
                allowId: true
            },
            attributes: {}
        };

        cssChecker.fromString('.test {height:100%} #test { width: 100%; }', rules, VALIDATOR)
            .then((result) => {
                unit.array(result[0].selector.errors).hasLength(0);
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
            attributes: {}
        };

        cssChecker.fromString('#test { width: 100%; }', rules, VALIDATOR)
            .then((result) => {
                unit.array(result[0].selector.errors).hasLength(0);
                done();
            })
            .catch((e) => {
                unit.fail(e.message)
            })
    });
});
