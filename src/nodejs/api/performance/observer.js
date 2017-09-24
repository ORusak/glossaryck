/*
*
*/

'use strict'

const {
    performance,
    PerformanceObserver
} = require('perf_hooks')

const obs = new PerformanceObserver((list, obsSelf) => {
    
    console.log(list.getEntries())
})

obs.observe({ entryTypes: ['mark'], buffered: false})

for(let i = 0; i < 3; i++) {
    performance.mark(`test${i}`)
}
