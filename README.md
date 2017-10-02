styleguide
===

[![CircleCI](https://circleci.com/gh/faebeee/css-checker.svg?style=svg)](https://circleci.com/gh/faebeee/css-checker)

ToDos
===
- Add `line-height` unit validator

Setup
===
install

    npm install css-styleguide-validator --save-dev
    
create your file to validate the css

    "use strict";
    
    const unit = require('unit.js');
    const styleguide = require('css-styleguide-validator');
    
    let rules = {
        selector: {
            maxChainLength: 3,
            maxNameLength : 20,
            allowId : false
        },
        attributes: {}
    };
    
    styleguide.fromString('.test .test2 .test { width: 100%; } #id{background:blue;}', rules)
        .then((result) => {
            styleguide.render(result);
        })
        .catch((e) => {
            unit.fail(e.message)
        });
        
this code will give you a result like


[![result](./doc/result.png)](https://circleci.com/gh/faebeee/css-checker)


you can also load the CSS from a file

 
    ...
    styleguide.fromFile('path/to/file.css', rules)
        .then((result) => {
            cssChecker.render(result);
        })
        .catch((e) => {
            unit.fail(e.message)
        });


Implemented Rules
====

### Selector validation

#### SelectorChainLengthValidator

Validate the css selector chain.

    maxChainLength: 3

validates the selector chain like `.foo .bar .baz` that has a value of 3


#### SelectorNameLengthValidator

Validate the css selector name length to keep your names simple

    maxNameLength: 20

validates the selector chain like `.foo` that has a value of 3

#### SelectorIdValidator

Avoid writing IDs

    allowId: false


