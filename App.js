"use strict";

const CSSFileLoader = require('./src/CSSFileLoader');
const RuleFileLoader = require('./src/RuleFileLoader');
const Validator = require('./src/Validator');
const Renderer = require('./src/Renderer');

let loader = new CSSFileLoader();

/**
 * @param {String} cssFile - path to css file
 * @param {Object} rules - rules configuration
 * @param {Object} validators
 */
module.exports = function(cssFile, rules, validators ) {
    return loader.loadFile(cssFile)
        .then((cssObject) => {
            return new Validator(new RuleFileLoader(rules), cssObject, validators );
        })
        .then((validator) => {
            return validator.validate();
        });
};

/**
 * @param {String} string - css content
 * @param {Object} rules - rules configuration
 * @param {Object} validators
 */
module.exports.fromString = function(string, rules, validators) {
    return loader.loadString(string)
        .then((cssObject) => {
            return new Validator(new RuleFileLoader(rules), cssObject, validators);
        })
        .then((validator) => {
            return validator.validate();
        });
};

module.exports.render = function( data ){
    new Renderer(data);
};