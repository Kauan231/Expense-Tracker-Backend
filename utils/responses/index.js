module.exports = {
    SendError(res, e) {
        res.status(e.statusCode).send({ type: e.constructor.name, message: e.message });
    },
    SendResult(res, resultsToSend) {
        res.status(200).send({ type: 'Search result', result: resultsToSend });
    },
    SendCreated(res, result) {
        res.status(201).send({ type: 'Resource Created', result: result });
    },
    SendDeleted(res) {
        res.status(202).send({ type: 'Resource Deleted'});
    }
};