"use strict";

module.exports = class RuleFileLoader {
    constructor(path) {
        this.rules = require(path);
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