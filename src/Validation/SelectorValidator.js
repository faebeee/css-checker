"use stirct";

module.exports = class SelectorValidator {
    constructor(selectorRules) {
        this.rules = selectorRules;
        this.validatorClasses = [
            require('./SelectorLength')
        ]
        this.valodators = [];

        this._load();
    }

    _load() {
        for (let i = 0; i < this.validatorClasses.length; i++) {
            let validatorClass = this.validatorClasses[i];
            this.valodators.push(new validatorClass(this.rules));
        }
    }

    validate(id) {
        return new Promise((res, rej) => {
            let errors = [];
            for (let i = 0; i < this.valodators.length; i++) {
                let validator = this.valodators[i];
                let result = validator.validate(id);
                if (result !== true) {
                    errors.push({
                        selector: id,
                        validator: validator.getName(),
                        errors: result
                    });
                }
            }

            if (errors.length > 0) {
                return rej(errors);
            }
            return res([]);
        })

    }
}