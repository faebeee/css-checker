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
        fontSizeUnit : 'rem'
    }
};

cssChecker(__dirname+'/../data/file1.css', rules)
    .then((result) => {
        console.log(result);
        cssChecker.render(result);
    })
    .catch((e) => {
        unit.fail(e.message)
    });
