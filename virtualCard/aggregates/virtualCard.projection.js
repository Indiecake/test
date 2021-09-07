const {
    RECORD_SPEND
} = require('../events/virtualCards');

module.exports = {
    init: () => ({}),
    [RECORD_SPEND]: (state, {payload}) => ({
        ...state,
        ...payload,
        registered: true
    })
};