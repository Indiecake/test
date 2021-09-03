const { RECORD_SPEND } = require('../events/virtualCards')
const { POINTS_EARNED } = require('../events/points');

function pointsEarned(workflow) {
    workflow.sideEffects.executeCommand({
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
    inital: 'init',
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