"use strict";

const unit = require('unit.js');
const cssChecker = require('../App');

let rules = {
    selector: {
        maxNameLength: 10,
        maxChainLength: 2,
        allowId : false
    },
    attributes: {
        fontSizeUnit : "rem"
    }
};

cssChecker.fromString('.test .test2 .test, .test #id { width: 100%; } #id{background:blue;} .MyVeeeeeeeeeeryLongName{width:100%; font-size : 14px;}', rules)
    .then((result) => {
        cssChecker.render(result);
    })
    .catch((e) => {
        unit.fail(e.message)
    });
