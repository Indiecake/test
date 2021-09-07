const {
    SPEND_RECORDED
} = require('../events/virtualCards');

const {
    ConflictError,
    BadRequestError
} = require('../../errors');

module.exports = {
    recordSpend: async(command, state/* , context */) => {
        if(state.registered) throw new ConflictError('Spend already registered');
        if(!command.payload.userID) throw new BadRequestError('Please provide an userID');
        if(!command.payload.virtualCard) throw new BadRequestError('Please provide a card');
        if(!command.payload.amount) throw new BadRequestError('Please provide the amount of transaction');

        return {
            type: SPEND_RECORDED,
            payload: {
                amount: command.payload.amount,
                userID: command.payload.userID,
                virtualCard: command.payload.virtualCard,
            }
        };
    }
}
