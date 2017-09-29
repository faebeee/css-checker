"use strict";

const unit = require('unit.js');
const cssChecker = require('../App');

const VALIDATOR = {
    selector : [
        require('../src/Validation/Selector/SelectorNameLengthValidator')
    ]
};

describe('SelectorNameLengthValidator', function () {


    it('invalid length', (done) => {
        let rules = {
            selector: {
                maxNameLength: 1
            },
            attributes: {}
        };

        cssChecker.fromString('.test .test2 .test { width: 100%; }', rules, VALIDATOR)
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
                maxNameLength: 20
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

    it('multiple selectors', (done) => {
        let rules = {
            selector: {
                maxNameLength: 20
            },
            attributes: {}
        };

        cssChecker.fromString('.test { width: 100%; } .test2 .test{background-color: blue;}', rules, VALIDATOR)
            .then((result) => {
                unit.array(result).hasLength(2);
                unit.array(result[0].selector.errors).hasLength(0);
                done()
            })
            .catch((e) => {
                unit.fail(e)
            })
    });

    it('invalid multiple selectors', (done) => {
        let rules = {
            selector: {
                maxNameLength: 1
            },
            attributes: {}
        };

        cssChecker.fromString('.test .asddf{ width: 100%; } .test2 .test3{background-color: blue;}', rules, VALIDATOR)
            .then((result) => {
                unit.array(result).hasLength(2);
                unit.string(result[0].selector.selector).is('.test .asddf');
                unit.array(result[0].selector.errors).hasLength(1);

                unit.string(result[1].selector.selector).is('.test2 .test3');
                unit.array(result[1].selector.errors).hasLength(1);
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

        cssChecker.fromString('.test .asddf{ width: 100%; } .test2 .test3{background-color: blue;}', rules, VALIDATOR)
            .then((result) => {
                unit.array(result).hasLength(2);
                unit.array(result[0].selector.errors).hasLength(0);
                unit.array(result[1].selector.errors).hasLength(0);
                done()
            })
            .catch((e) => {
                unit.fail(e)
            })
    });

});
