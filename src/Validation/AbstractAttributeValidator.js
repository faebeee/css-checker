"use stirct";

module.exports = class AbstractAttributeValidator{
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
     * @param attribute
     * @param value
     */
    validate(attribute, value) {
        throw new Error('Not implemented');
    }
};