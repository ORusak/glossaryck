/*
*
*/

'use strict'

const {
    performance,
    PerformanceObserver
} = require('perf_hooks');
const obs = new PerformanceObserver((list) => {
    console.log(list.getEntries());
    performance.clearGC();
});
obs.observe({ entryTypes: ['gc'] });
