"use stirct";

const AbstractValidator = require('../AbstractSelectorValidator');
const CssDom = require('cssdom');

module.exports = class SelectorNameLengthValidator extends AbstractValidator {
    getName() {
        return "SelectorNameLengthValidator";
    }

    setup(){
        this.rules.maxNameLength = this.rules.maxNameLength === undefined ? null : this.rules.maxNameLength;
    }


    validate(selector) {
        if(this.rules.maxNameLength === null){
            return;
        }

        let css = new CssDom(selector+'{}');
        let selectors = css.dom[0].selectors;
        for(let i = 0; i < selectors.length; i++){
            let selector = selectors[i];
            let names = selector.split(' ');
            for(let x = 0; x < names.length; x++){
                let name = names[x];
                if(name.length > this.rules.maxNameLength){
                    return 'Selector name for '+name+' is too long!';
                }
            }
        }


        return true;
    }
};