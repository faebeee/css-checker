"use strict";

const unit = require('unit.js');
const cssChecker = require('../App');

let rules = {
    selector: {
        maxNameLength: 10,
        maxChainLength: 2,
        allowId : false
    },
    attributes: {}
};

cssChecker.fromString('.test .test2 .test, .test #id { width: 100%; } #id{background:blue;} .MyVeeeeeeeeeeryLongName{width:100%}', rules)
    .then((result) => {
        cssChecker.render(result);
    })
    .catch((e) => {
        unit.fail(e.message)
    });
