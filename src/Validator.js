"use strict";

const Promise = require('bluebird');
const SelectorValidator = require('./Validation/SelectorValidator.js');
const AttributeValidator = require('./Validation/AttributeValidator');

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
        this.validators = validators || {selector: null, attribute : null};

        this.selectorValidator = new SelectorValidator(this.ruleLoader.getSelectorRules(), this.validators.selector);
        this.attributeValidator = new AttributeValidator(this.ruleLoader.getAttributeRules(), this.validators.attribute);

    }

    /**
     *
     * @returns {Promise.<*[]>}
     */
    validate() {
        let elements = this.cssObject.children;
        return this._validateChildren(elements);
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
            this._validateAttributes(id, rule.attributes),
            //this._validateChildren(rule.children),
        ])
            .then((results) => {
                return {
                    selector: results[0],
                    attributes: results[1],
                    //children : results[2],
                };
            });
    }

    /**
     *
     * @param selector
     * @returns {*}
     * @private
     */
    _validateSelector(selector) {
        selector = this._replace(selector, '\n', ' ');
        return this.selectorValidator.validate(selector)
    }

    /**
     *
     * @private
     * @param {String} selector
     * @param {String} attribute
     * @param {String} value
     */
    _validateAttribute(selector, attribute, value) {
        return this.attributeValidator.validate(selector, attribute, value)
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
     * @param selector
     * @param attributes
     * @returns {Promise.<Array>}
     * @private
     */
    _validateAttributes(selector, attributes) {
        let keys = Object.keys(attributes);
        let validators = [];
        for (let i = 0; i < keys.length; i++) {
            let key = keys[i];
            let attribute = attributes[key];
            validators.push(this._validateAttribute(selector, key, attribute));
        }
        return Promise.all(validators);
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