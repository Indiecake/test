const {
    POINTS_EARNED,
    POINTS_FAILED
} = require('../events/points');

const tableName = 'Points';

module.exports = {
    init: async store => {
        await store.defineTable(tableName, {
            id: {
                type: 'uuid',
                primaryKey: true
            },
            pointsAmount: 'number',
            userID: 'string',
            transactionID: 'string',
            createAt: 'date',
            updateAt: 'date'
        });
    },
    [POINTS_EARNED]: async(store, event) => {
        const createdAt = new Date(event.timestamp);
        await store.insert(tableName, {
            id: event.aggregateID,
            transactionID: event.transactionID,
            pointsAmount: event.pointsAmount,
            userID: event.userID,
            createdAt
        });
    },
    [POINTS_FAILED]: async(store, event) => {
        await store.insert(tableName, {
            userID: event.userID,
            transactionID: event.transactionID
        })
    }
}
