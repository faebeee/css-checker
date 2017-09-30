'use strict';

const blessed = require('blessed');
const contrib = require('blessed-contrib');

module.exports = class Renderer {
    constructor(data) {
        this.screen = blessed.screen();
        this.data = data;
        this.screen.key(['escape', 'q', 'C-c'], function (ch, key) {
            return process.exit(0);
        });


        this.print();
    }

    print() {
        let table = contrib.table(
            {
                keys: true,
                fg: 'white',
                selectedFg: 'white',
                selectedBg: 'blue',
                interactive: true,
                label: 'Result',
                border: {type: "line", fg: "cyan"},
                columnWidth: [3, 50, 30],
                columnSpacing : 10,
                width: "100%",
                
            });

        //allow control the table with the keyboard
        table.focus();

        let data = [];
        for (let i = 0; i < this.data.length; i++) {
            let result = this.data[i].selector;
            let attributesResults = this.data[i].attributes;
        
            if (result.errors) {
                for (let x = 0; x < result.errors.length; x++) {
                    let error = result.errors[x];
                    data.push(['SEL', result.selector, error.validator])
                }
            }
            
            for(let i = 0; i < attributesResults.length; i++){
                let attributesResult = attributesResults[i];
                if(attributesResult.errors){
                for (let x = 0; x < attributesResult.errors.length; x++) {
                    let error = attributesResult.errors[x];
                    data.push(['ATT', attributesResult.selector, error.validator])
                }
                }
            }
        }

        table.setData(
            {
                headers: ['Category', 'Selector', 'Validator'],
                data
            });
        this.screen.append(table); //must append before setting data

        this.screen.render()
    }
};