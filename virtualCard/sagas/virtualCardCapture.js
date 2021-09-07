const { RECORD_SPEND, SPEND_RECORDED } = require('../events/virtualCards');


async function RecordSpend(workflow) {
    console.log("Record spend", workflow.event.aggregateId)
    await workflow.sideEffects.executeCommand({
        aggregateName: 'recordSpend',
        aggregateId: workflow.event.aggregateId,
        type: 'processSpend',
        payload: {
            ...workflow.payload
        }
    });
}

function afterRecordSpend(workflow) {
    console.log('Spend recorded', workflow.event.aggregateId);
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