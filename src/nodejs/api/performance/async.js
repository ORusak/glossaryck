/*
*
*/

'use strict'

const async = require('async_hooks')
const {
    performance,
    PerformanceObserver,
} = require('perf_hooks')

const set = new Set()

const hook = async.createHook({
    init (id, type) {
        if (type === 'Timeout') {
            set.add(id)
            
            performance.mark(`Start timeout${id}`)
        }
    },
    
    destroy (id) {
        if(set.has(id)) {
    
            performance.mark(`End timeout${id}`)
            performance.measure(
                `Timeout${id}`,
                `Start timeout${id}`,
                `End timeout${id}`
            )
        }
    }
})

hook.enable()

const obs = new PerformanceObserver((list, self) => {
    const entry = list.getEntries()[0]
    
    console.log(`${entry.name}: ${entry.duration}`);
    
    performance.clearMarks()
    performance.clearMeasures()
    
    obs.disconnect()
})

obs.observe({ entryTypes: ['measure'], buffered: true })

setTimeout(() => {
    console.log('Hi')
}, 1000)
