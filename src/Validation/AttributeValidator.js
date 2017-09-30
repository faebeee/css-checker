'use strict';

module.exports = class AttributeValidator {
    /**
     *
     * @param rules
     * @param {Array} validators
     */
    constructor(rules, validators) {
        this.rules = rules;
        this.validatorClasses = validators || [
            require('./Attribute/FontSizeUnitValidator')
        ];


        this.valodators = [];
        this._load();
    }

    /**
     *
     * @private
     */
    _load() {
        for (let i = 0; i < this.validatorClasses.length; i++) {
            let validatorClass = this.validatorClasses[i];
            this.valodators.push(new validatorClass(this.rules));
        }
    }

    /**
     *
     * @returns {Promise}
     * @param selector
     * @param {String} attribute
     * @param {String} value
     */
    validate(selector, attribute, value) {
        return new Promise((res, rej) => {
            let errors = [];
            for (let i = 0; i < this.valodators.length; i++) {
                let validator = this.valodators[i];
                let result = validator.validate(attribute, value);
                if (result !== true && result) {
                    errors.push({
                        validator: validator.getName(),
                        messages: result === true ? [] : result
                    });
                }
            }
            
            if(errors.length > 0){
                return res({
                    selector,
                    errors
                });
            }
            return res({
                    selector,
                });
        });
    }
};