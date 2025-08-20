const { convertToADto } = require('../utils/mapper');
const { SendError, SendResult, SendCreated, SendDeleted } = require('../utils/responses');
const { ReadAllWithSkipLimitDto } = require('../model/dtos/readWithSkipLimitDto');
const { ReadByIdDto } = require('../model/dtos/readByIdDto');

class CommonRoutes {
    constructor(controller) {
        this.controller = controller;
    }

    async Get(req, res) {
        let createdDto;
        try {
            createdDto = new ReadAllWithSkipLimitDto(req.query);
        } catch (e) {
            return SendError(res, e);
        }
        let results;
        try {
            results = await this.controller.ReadAllWithSkipLimit(createdDto);
        } catch (e) {
            return SendError(res, e);
        }

        return SendResult(res, results);
    };

    async ReadById(req, res) {
        let createdDto;
        try {
            createdDto = new ReadByIdDto(req.params);
        } catch (e) {
            return SendError(res, e);
        }
        let results;
        try {
            results = await this.controller.ReadById(createdDto.id);
        } catch (e) {
            return SendError(res, e);
        }

        return SendResult(res, results);
    };

    async Create(req, res) {
        const convertedBody = convertToADto(new this.emptyStateDto(), req.body);
        let createDto;
        try {
            createDto = new this.createDto(...Object.values(convertedBody));
        } catch (e) {
            return SendError(res, e);
        }

        let result;
        try {
            result = await this.controller.Create(createDto);
        } catch (e) {
            return SendError(res, e);
        }

        return SendCreated(res, result);
    };

    async Delete(req, res) {
        let createdDto;
        try {
            createdDto = new ReadByIdDto(req.params);
        } catch (e) {
            return SendError(res, e);
        }
        try {
            await this.controller.Delete(createdDto.id);
        } catch (e) {
            return SendError(res, e);
        }

        return SendDeleted(res);
    }
}


module.exports = CommonRoutes;