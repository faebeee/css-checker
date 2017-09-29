css-checker
===

[![CircleCI](https://circleci.com/gh/faebeee/css-checker.svg?style=svg)](https://circleci.com/gh/faebeee/css-checker)

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


