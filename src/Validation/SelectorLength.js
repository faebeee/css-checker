"use stirct";

const AbstractValidator = require('./AbstractSelectorValidator');

module.exports = class SelectorLengthValidator extends AbstractValidator {
    getName() {
        return "SelectorLengthValidator"
    }

    validate(selector) {
        let parts = selector.split(' ');

        if (parts.length > this.rules.maxLength) {
            return 'Selector too complex';
        }

        return true;
    }
}