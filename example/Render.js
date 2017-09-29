"use strict";

const unit = require('unit.js');
const cssChecker = require('../App');

let rules = {
    selector: {
        maxLength: 1,
        allowId : false
    },
    attributes: {}
};

cssChecker.fromString('.test .test2 .test { width: 100%; } #id{background:blue;}', rules)
    .then((result) => {
        cssChecker.render(result);
    })
    .catch((e) => {
        unit.fail(e.message)
    });
