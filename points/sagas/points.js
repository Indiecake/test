const {
    ORDER_FAILED,
    ORDER_COMPLETE,
    POINTS_EARNED,
    POINTS_FAILED,
    ORDER_ASSET
} = require('../events/points');

async function OrderAsset(workflow) {
    console.log('Start new order');
    //Gemini stuff
}

async function PointsEarned(workflow) {
    console.log('PointsEarned', workflow.event.aggregateId);
    await workflow.sideEffects.executeCommand({
        aggregateName: 'PointsEarned',
        aggregateId: workflow.event.aggregateId,
        type: 'PointsAllocated',
        payload: {
            ...workflow.payload
        }
    });
}

async function PointsFailed(workflow) {
    console.log('PointsFailed', workflow.event.aggregateId);
    await workflow.sideEffects.executeCommand({
        aggregateName: 'PointsFailed',
        aggregateId: workflow.event.aggregateId,
        type: 'PointsFailed',
        payload: {
            ...workflow.payload
        }
    });
}

module.exports = {
    name: 'Points',
    version: 1,
    initial: 'init',
    context: {changeCount: 0},
    steps: {
        init: {
            on: {
                [ORDER_ASSET]: 'orderAsset'
            }
        },
        orderAsset: {
            actions: [OrderAsset],
            on: {
                [ORDER_FAILED]: 'orderFailed',
                [ORDER_COMPLETE]: 'orderComplete'
            }
        },
        orderFailed: {
            actions: [PointsFailed],
            on: {
                [POINTS_FAILED]: 'done'
            }
        },
        orderComplete: {
            actions: [PointsEarned],
            on: {
                [POINTS_EARNED]: 'done'
            }
        }
    }
}