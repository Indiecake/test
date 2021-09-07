const {
    ORDER_COMPLETE,
    ORDER_FAILED
} = require('../events/points');

module.exports = {
    init: () => ({}),
    [ORDER_COMPLETE]: (state, {payload}) => ({
        ...state,
        ...payload,
        registered: true
    }),
    [ORDER_FAILED]: (state) => ({
        ...state,
        failed: true
    })
};