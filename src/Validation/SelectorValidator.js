"use stirct";

module.exports = class SelectorValidator {
    /**
     *
     * @param selectorRules
     * @param {Array} validators
     */
    constructor(selectorRules, validators) {
        this.rules = selectorRules;
        this.validatorClasses = validators || [
            require('./Selector/SelectorNameLengthValidator'),
            require('./Selector/SelectorIdValidator'),
            require('./Selector/SelectorChainLengthValidator'),
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
     * @param id
     * @returns {Promise}
     */
    validate(id) {
        return new Promise((res, rej) => {
            let data = {
                selector: id,
            };

            let errors = [];

            for (let i = 0; i < this.valodators.length; i++) {
                let validator = this.valodators[i];
                let result = validator.validate(id);
                if(result !== true && result) {
                    errors.push({
                        validator: validator.getName(),
                        messages: result === true ? [] : result
                    });
                }
            }
            data['errors'] = errors;
            return res(data);
        });
    }

};