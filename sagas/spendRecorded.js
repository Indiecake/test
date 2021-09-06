const { RECORD_SPEND } = require('../events/virtualCards')
const { POINTS_EARNED } = require('../events/points');

async function pointsEarned(workflow) {
    await workflow.sideEffects.executeCommand({
        aggregateName: 'points',
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
                [RECORD_SPEND]: 'recordSpend'
            }
        },
        recordSpend: {
            actions: [pointsEarned],
            on: {
                [POINTS_EARNED]: 'done'
            }
        }
    }
}