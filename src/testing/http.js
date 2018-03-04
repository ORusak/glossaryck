const http = {

    execute () {
        throw new Error('not access');
        return Promise.resolve({ id: 1 })
    }
}


module.exports = http
