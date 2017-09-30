"use stirct";

const AbstractValidator = require('../AbstractSelectorValidator');
const CssDom = require('cssdom');

module.exports = class SelectorChainLengthValidator extends AbstractValidator {
    getName() {
        return "SelectorChainLengthValidator"
    }


    setup(){
        this.rules.maxChainLength = this.rules.maxChainLength === undefined ? null : this.rules.maxChainLength;
    }


    validate(selector) {
        if(this.rules.maxChainLength === null){
            return;
        }

        let css = new CssDom(selector+'{}');
        let selectors = css.dom[0].selectors;
        if(!selectors){
            return;
        }
        for(let i = 0; i < selectors.length; i++){
            let selector = selectors[i];
            if(selector.split(' ').length > this.rules.maxChainLength){
                return 'Selector is too long!';
            }
        }


        return true;
    }
};