"use strict";

const path = require('path');
const CSSFileLoader = require('./src/CSSFileLoader');
const RuleFileLoader = require('./src/RuleFileLoader');
const Validator = require('./src/Validator');



let loader = new CSSFileLoader();



module.exports = function(cssFile, rules) {
    return loader.loadFile(path.resolve(__dirname, './data/file1.css'))
        .then((cssObject) => {
            return new Validator(new RuleFileLoader(rules), cssObject);
        })
        .then((validator) => {
            return validator.validate();
        })
}


module.exports.fromString = function(string, rules) {
    return loader.loadString(string)
        .then((cssObject) => {
            return new Validator(new RuleFileLoader(rules), cssObject);
        })
        .then((validator) => {
            return validator.validate();
        })
}