"use strict";

const Promise = require('bluebird');
const SelectorValidator = require('./Validation/SelectorValidator.js');

module.exports = class Validator {
    constructor(ruleLoader, cssObject) {
        this.ruleLoader = ruleLoader;
        this.cssObject = cssObject;
    }

    validate() {
        let elements = this.cssObject.children;
        let keys = Object.keys(elements);
        let validators = [];
        for (let i = 0; i < keys.length; i++) {
            let key = keys[i];
            let rule = elements[key];
            validators.push(this.validateRule(key, rule));
        }
        return Promise.all(validators);
    }

    validateRule(id, rule) {
        return Promise.all([
            this._validateSelector(id),
            this._validateAttributes(rule.attributes),
            this._validateChildren(rule.children),
        ]);
    }

    _validateSelector(selector) {
        selector = this._replace(selector, '\n', ' ');
        let validator = new SelectorValidator(this.ruleLoader.getSelectorRules());
        return validator.validate(selector)
    }

    _validateChildren(children) {

        let keys = Object.keys(children);
        let validators = [];
        for (let i = 0; i < keys.length; i++) {
            let key = keys[i];
            let rule = children[key];
            validators.push(this.validateRule(key, rule));
        }

        return Promise.all(validators)
    }

    _validateAttributes(attributes) {

        let keys = Object.keys(attributes);
        let validators = [];
        for (let i = 0; i < keys.length; i++) {
            let key = keys[i];
            let attribute = attributes[key];
        }
        return Promise.resolve([]);
    }


    _replace(str, find, replace) {
        return str.replace(new RegExp(find.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), 'g'), replace);
    };

}