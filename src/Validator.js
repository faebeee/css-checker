"use strict";

const Promise = require('bluebird');
const SelectorValidator = require('./Validation/SelectorValidator.js');

module.exports = class Validator {
    /**
     *
     * @param ruleLoader
     * @param cssObject
     * @param {Object} validators
     */
    constructor(ruleLoader, cssObject, validators) {
        this.ruleLoader = ruleLoader;
        this.cssObject = cssObject;
        this.validators = validators || { selector: null};
    }

    /**
     *
     * @returns {Promise.<*[]>}
     */
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

    /**
     *
     * @param id
     * @param rule
     * @returns {Promise.<TResult>}
     */
    validateRule(id, rule) {
        return Promise.all([
            this._validateSelector(id),
            this._validateAttributes(rule.attributes),
            this._validateChildren(rule.children),
        ])
            .then((results) => {
                return {
                    selector: results[0],
                    attributes: results[1],
                    //children : results[2],
                };
            })
    }

    /**
     *
     * @param selector
     * @returns {*}
     * @private
     */
    _validateSelector(selector) {
        selector = this._replace(selector, '\n', ' ');
        let validator = new SelectorValidator(this.ruleLoader.getSelectorRules(), this.validators.selector);
        return validator.validate(selector)
    }

    /**
     *
     * @param children
     * @returns {Promise.<*[]>}
     * @private
     */
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

    /**
     *
     * @param attributes
     * @returns {Promise.<Array>}
     * @private
     */
    _validateAttributes(attributes) {

        let keys = Object.keys(attributes);
        let validators = [];
        for (let i = 0; i < keys.length; i++) {
            let key = keys[i];
            let attribute = attributes[key];
        }
        return Promise.resolve([]);
    }

    /**
     *
     * @param str
     * @param find
     * @param replace
     * @returns {string|XML|*|void}
     * @private
     */
    _replace(str, find, replace) {
        return str.replace(new RegExp(find.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), 'g'), replace);
    };
};