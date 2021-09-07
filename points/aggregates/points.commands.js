const {
    POINTS_ALLOCATED, POINTS_FAILED
} = require('../events/points');

const {
    ConflictError,
    BadRequestError
} = require('../../errors');

module.exports = {
    PointsAllocated: async(command, state/* , context*/) => {
        if(!command.payload.transactionID) throw new BadRequestError('Please provide an transactionID');
        if(!command.payload.pointsAmount) throw new BadRequestError('Please provide the amount of points');
        if(!command.payload.userID) throw new BadRequestError('Please provide an transactionID');
        return {
            type: POINTS_ALLOCATED,
            payload: {
                pointsAmount: command.payload.pointsAmount,
                transactionID: command.payload.transactionID,
                userID: command.payload.userID
            }
        }
    },
    PointsFailed: async(command, state/* , context*/) => {
        if(!command.payload.transactionID) throw new BadRequestError('Please provide an transactionID');

        return {
            type: POINTS_FAILED,
            payload: {
                transactionID: command.payload.transactionID
            }
        }
    }
}