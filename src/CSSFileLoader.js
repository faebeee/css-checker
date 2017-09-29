
"use strict";

const cssjson = require('cssjson');
const fs = require('fs');

module.exports = class CSSFileLoader {
    constructor() {
        this.cssObject = null;
    }

    /**
     *
     * @returns {null|*}
     */
    getCssObject() {
        return this.cssObject;
    }

    /**
     *
     * @param path
     * @returns {*|Object|Promise.<TResult>}
     */
    loadFile(path) {
        return this._getCSSContent(path)
            .then((content) => {
                this.cssObject = cssjson.toJSON(content);
                return this.cssObject;
            })
    }

    /**
     *
     * @param css
     * @returns {Promise}
     */
    loadString(css) {
        return new Promise((res, rej) => {
            this.cssObject = cssjson.toJSON(css);
            return res(this.cssObject);
        })
    }

    /**
     *
     * @param path
     * @returns {Promise}
     * @private
     */
    _getCSSContent(path) {
        return new Promise((res, rej) => {
            fs.readFile(path, 'utf8', (err, contents) => {
                if (err) {
                    throw err;
                }
                return res(contents)
            });
        })
    }
}