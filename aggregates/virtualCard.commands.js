const {
    SPEND_RECORDED
} = require('../events/virtualCards');


module.exports = {
    spendRecorded: async(command, state/* , context */) => {
        //TODO define Validations
        return {
            type: SPEND_RECORDED,
            payload: {
                amount: command.payload.amount,
                user: command.payload.userID
            }
        };
    }
}
