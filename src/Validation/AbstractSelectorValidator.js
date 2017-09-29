"use stirct";

module.exports = class AbstractSelectorValidator {
    /**
     *
     * @param rules
     */
    constructor(rules) {
        this.rules = rules;

        this.setup();
    }

    setup(){

    }

    /**
     *
     */
    getName() {
        throw new Error('Not implemented');
    }

    /**
     *
     * @param selector
     */
    validate(selector) {
        throw new Error('Not implemented');
    }
};