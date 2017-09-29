"use stirct";

const AbstractValidator = require('../AbstractSelectorValidator');

module.exports = class SelectorIdValidator extends AbstractValidator {
    getName() {
        return "SelectorIdValidator"
    }

    setup(){
        this.rules.allowId = this.rules.allowId === undefined ? null : this.rules.allowId;
    }

    validate(selector) {
        if (this.rules.allowId === null) {
            return true;
        }

        let hasHash = !!~selector.indexOf('#');

        if (hasHash && this.rules.allowId === false) {
            return 'IDs should be avoided';
        }

        return true;
    }
};