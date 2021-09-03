const { VIRTUAL_CARD_CAPTURE } = require('../events/virtualCards')
const tablename = 'VitualCards';

module.exports = {
    init: async store => {
        await store.defineTable(tablename, {
            id: {
                type: 'uuid',
                primaryKey: true,
            },
            user: 'string',
            virtualCard: 'string',
            createdAt: 'date',
            updatedAt: 'date'
        });
    },
    [VIRTUAL_CARD_CAPTURE]: async(store, event) => {
        const createdAt = new Date(event.timestamp);
        await store.insert(tablename, {
            id: event.aggregateID,
            user: event.payload.user,
            virtualCard: event.payload.virtualCard,
            createdAt,
            updatedAt: createdAt
        });
    }
}