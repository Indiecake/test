const { RECORD_SPEND, SPEND_RECORDED } = require('../events/virtualCards');


async function RecordSpend(workflow) {
    await workflow.sideEffects.executeCommand({
        aggregateName: 'recordSpend',
        aggregateId: workflow.event.aggregateId,
        type: 'create',
        payload: {
            amount: workflow.context.oldAmount + workflow.event.payload.amount
        }
    })
}

module.exports = {
    name: 'VirtualCardCapture',
    version: 1,
    initial: 'init',
    context: {changeCount: 0},
    steps: {
        init: {
            on: {
                [RECORD_SPEND]: 'recordSpend'
            }
        },
        recordSpend: {
            actions: [RecordSpend],
            on: {
                [SPEND_RECORDED]: 'done'
            }
        }
    }
}