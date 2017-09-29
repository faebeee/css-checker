"use strict";

const path = require('path');
const CSSFileLoader = require('./src/CSSFileLoader');
const RuleFileLoader = require('./src/RuleFileLoader');
const Validator = require('./src/Validator');



let loader = new CSSFileLoader();

loader.loadFile(path.resolve(__dirname, './data/file1.css'))
    .then((cssObject) => {
        return new Validator(new RuleFileLoader(path.resolve(__dirname, './data/rules.json')), cssObject);
    })
    .then((validator) => {
        return validator.validate();
    })
    .then((result) => {
        console.log(result);
    })
    .catch((e) => {
        console.error(e);
    })