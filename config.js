const Blackrik = require('blackrik');

module.exports = {
    aggregates: [
        {
            name: 'virtualCard',
            commands: require('./aggregates/virtualCard.commands'),
            projection: require('./aggregates/virtualCard.projections')
        }
    ],
    readModels: [
        {
            name: 'virtualCard',
            projection: require('./readModels/virtualCard.projection'),
            resolver: require('./readModels/virtualCard.resolvers'),
            adapter: 'default'
        }
    ],
    sagas: [
        {
            name: 'spendRecorded',
            source: require('./sagas/spendRecorded'),
            adapter: 'default'
        },
        {
            name: 'virtualCardCapture',
            source: require('./sagas/virtualCardCapture')
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