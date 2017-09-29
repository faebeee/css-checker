"use stirct";

module.exports = class AbstractSelectorValidator {
    constructor(rules) {
        this.rules = rules;
    }

    getName() {
        throw new Error('Not implemented');
    }
    validate(selector) {
        throw new Error('Not implemented');
    }
}