/*
*
*/

'use strict'

const { performance } = require('perf_hooks');

performance.mark('A');

setTimeout(() => {
    performance.mark('B');
    performance.measure('A to B', 'A', 'B');
    
    console.log(performance.getEntries());
    const measure = performance.getEntriesByName('A to B')[0];
    
    console.log(measure.duration);
    // Prints the number of milliseconds between Mark 'A' and Mark 'B'
}, 1000);
