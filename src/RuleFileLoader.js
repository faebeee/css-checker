"use strict";

module.exports = class RuleFileLoader {
    constructor(path) {
        if (typeof path === 'object') {
            this.rules = path;
        } else {
            this.rules = require(path);
        }

        if (!this.rules.selector || !this.rules.attributes) {
            throw new Error('Invalid config');
        }
        this.selectorRules = this.rules.selector;
        this.attributeRules = this.rules.attributes;
    }

    getSelectorRules() {
        return this.selectorRules;
    }

    getAttributeRules() {
        return this.attributeRules;
    }
}