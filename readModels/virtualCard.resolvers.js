const tablename = 'VirtualCards';

module.exports = {
    get: async (store, {id, position}) => {
        if(!id) return null;
        return await store.findOne(tablename, {id}, {position});
    },
    list: async (store, args) => {
        return await store.find(tablename, null, {
            position: args.position
        });
    },
}