const {
    RECORD_SPEND
} = require('../events/virtualCards');


module.exports = {
    spendRecorded: async(command, state/* , context */) => {
        //TODO define Validations
        return {
            type: RECORD_SPEND,
            payload: {
                amount: command.payload.amount,
                user: command.payload.userID
            }
        };
    }
}
