
module.exports = function (dependency) {

    return {
        async getUser (ctx, id) {
            const {http} = dependency
            return await http.execute()
        },
        
        async updateUser (ctx, id, data) {
            const {http} = dependency
            return await http.execute(data)
        }
    }
}
