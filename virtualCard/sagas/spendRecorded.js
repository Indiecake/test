const { SPEND_RECORDED } = require('../events/virtualCards')
const { POINTS_EARNED } = require('../../points/events/points');

async function pointsEarned(workflow) {
    await workflow.sideEffects.executeCommand({
        aggregateName: 'pointsEarned',
        aggregateId: workflow.event.aggregateId,
        type: 'update',
        payload: {
            points: workflow.context.oldPoints + workflow.event.payload.points
        }
    })
}

module.exports = {
    name: 'SpendRecorded',
    version: 1,
    initial: 'init',
    context: { changeCount: 0 },
    steps: {
        init: {
            on: {
                [SPEND_RECORDED]: 'spendRecorded'
            }
        },
        spendRecorded: {
            actions: [pointsEarned],
            on: {
                [POINTS_EARNED]: 'done'
            }
        }
    }
}