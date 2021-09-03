const { RECORD_SPEND, SPEND_RECORDED } = require('../events/virtualCards');


function RecordSpend(workflow) {
    workflow.sideEffects.executeCommand({
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
    inital: 'init',
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