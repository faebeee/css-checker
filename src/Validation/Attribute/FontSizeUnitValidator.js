'use stirct';

const AbstractValidator = require('../AbstractAttributeValidator');
const unit = require('parse-unit');

module.exports = class FontSizeUnitValidator extends AbstractValidator {

    getName() {
        return 'FontSizeUnitValidator';
    }

    setup() {
        this.rules.fontSizeUnit = this.rules.fontSizeUnit || null;
    }

    /**
     *
     * @param attr
     * @param value
     */
    validate(attr, value) {
        if (attr !== 'font-size' || this.rules.fontSizeUnit === null) {
            return;
        }

        let parsedUnit = unit(value);
        if (parsedUnit[1] !== this.rules.fontSizeUnit) {
            return 'Prefer using ' + this.rules.fontSizeUnit + ' as unit';
        }

        return true;
    }
};