const Blackrik = require('blackrik');

module.exports = {
    aggregates: [
        {
            name: 'virtualCard',
            commands: require('./virtualCard/aggregates/virtualCard.commands'),
            projection: require('./virtualCard/aggregates/virtualCard.projection')
        },
        {
            name: 'points',
            commands: require('./points/aggregates/points.commands'),//
            projection: require('./points/aggregates/points.projection')//
        }
    ],
    readModels: [
        {
            name: 'virtualCard',
            projection: require('./virtualCard/readModels/virtualCard.projection'),
            resolver: require('./virtualCard/readModels/virtualCard.resolvers'),
            adapter: 'default'
        },
        {
            name: 'points',
            projection: require('./points/readModels/points.projection'),//
            resolver: require('./points/readModels/points.resolvers'),//
            adapter: 'default'
        }
    ],
    sagas: [
        {
            name: 'spendRecorded',
            source: require('./virtualCard/sagas/spendRecorded'),
            adapter: 'default'
        },
        {
            name: 'virtualCardCapture',
            source: require('./virtualCard/sagas/virtualCardCapture')
        },
        {
            name: 'points',
            source: require('./points/sagas/points')
        }
    ],
    adapter: 'default',
    readModelStoreAdapters: {
        default: {
            module: Blackrik.ADAPTERS.READMODELSTORE.MySQL,
            args: {
                host: 'localhost',
                database: 'virtualCardReadmodelstore',
                user: 'root',
                password: '1234'
            }
        }
    },
    eventStoreAdapter: {
        module: Blackrik.ADAPTERS.EVENTSTORE.MySQL,
        args: {
            host: 'localhost',
            database: 'virtualCardEventstore',
            user: 'root',
            password: '1234'
        }
    },
    eventBusAdapter: {
        module: Blackrik.ADAPTERS.EVENTBUS.Kafka,
        args: {
            brokers: ['localhost:9092']
        }
    },
    server: {
        config: {
            port: 3000,
            skipDefaultMiddlewares:false
        },
        middlewares: [
            (req, res, next) => (req.test =21) && next(),
            [
                '/test',
                (req, res, next) => (req.test = 42) && next()
            ]
        ],
        routes: [
            {
                method: 'GET',
                path: '/test',
                callback: (req, res) => {
                    console.log('call to test', req.test);
                    res.json({middlewareValue: req.test});
                }
            }
        ]
    }
}