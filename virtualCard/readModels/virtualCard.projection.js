const {
    VIRTUAL_CARD_CAPTURE
} = require('../events/virtualCards')

const tableName = 'VirtualCards';

module.exports = {
    init: async store => {
        await store.defineTable(tableName, {
            id: {
                type: 'uuid',
                primaryKey: true,
            },
            userID: 'string',
            virtualCard: 'string',
            amount: 'number',
            createdAt: 'date',
            updatedAt: 'date'
        });
    },
    [VIRTUAL_CARD_CAPTURE]: async(store, event) => {
        const createdAt = new Date(event.timestamp);
        await store.insert(tableName, {
            id: event.aggregateID,
            user: event.payload.user,
            virtualCard: event.payload.virtualCard,
            amount: event.payload.amount,
            createdAt,
            updatedAt: createdAt
        });
    }
}