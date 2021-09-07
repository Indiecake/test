const tableName = 'Points';

module.exports = {
    get: async(store, {id, position}) => {
        if(!id) return null;
        return await store.findOne(tableName, {id}, {position});
    },
    list: async (store, args) => {
        return await store.find(tableName, null, {
            position: args.position
        })
    }
}