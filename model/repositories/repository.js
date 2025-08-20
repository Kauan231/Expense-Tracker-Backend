const { Op } = require('sequelize');
const Models = require('../../models');
const { DatabaseError } = require('../../utils/errors');

class Repository {
    constructor(Model) {
        this.model = Model;
    }

    async Create(createDto) {
        let registeredItem;
        try {
            registeredItem = await Models[this.model].create(createDto);
        } catch (err) {
            console.log('Database error', err);
            throw new DatabaseError('error executing create');
        }
        return registeredItem.dataValues;
    }

    async BulkCreate(itemsToCreate) {
        let registeredItems;
        try {
            registeredItems = await Models[this.model].bulkCreate(itemsToCreate);
        } catch (err) {
            console.log('Database error', err);
            throw new DatabaseError('error executing bulkCreate');
        }
        return registeredItems;
    }

    async ReadById(id) {
        let foundItem;
        try {
            foundItem = await Models[this.model].findOne({ where: { id: id } });
        } catch (err) {
            console.log('Database error', err);
            throw new DatabaseError('error executing findOne');
        } finally {
            return foundItem?.dataValues;
        }
    }

    async ReadByIdAndPopulate(id, populate) {
        let foundItem;
        try {
            foundItem = await Models[this.model].findOne({ where: { id: id }, include: Array.isArray(populate) ? populate.map(item => Models[item]) : Models[populate] });
        } catch (err) {
            console.log('Database error', err);
            throw new DatabaseError('error executing findOne');
        } finally {
            return foundItem?.dataValues;
        }
    }

    async ReadManyByCustomField(field, value) {
        let foundItems;
        try {
            foundItems = await Models[this.model].findAll({ where: { [field]: value } });
        } catch (err) {
            console.log('Database error', err);
            throw new DatabaseError('error executing findAll');
        } finally {
            return foundItems;
        }
    }

    async ReadOneByCustomField(field, value) {
        let foundItems;
        try {
            foundItems = await Models[this.model].findOne({ where: { [field]: value } });
        } catch (err) {
            console.log('Database error', err);
            throw new DatabaseError('error executing findOne');
        } finally {
            return foundItems;
        }
    }

    async ReadManyByCustomFieldWithSelect(field, value, select) {
        let foundItems;
        try {
            foundItems = await Models[this.model].findAll({
                where: { [field]: value },
                attributes: Array.isArray(select) ? select : [select]
            });
        } catch (err) {
            console.log('Database error', err);
            throw new DatabaseError('error executing findAll');
        } finally {
            return foundItems;
        }
    }

    async ReadManyByCustomFieldWithOperator(fieldToFind, valueToFind, fieldToAskCondition, operator, condition) {
        let foundItems;
        try {
            foundItems = await Models[this.model].findAll({
                where: {
                    [fieldToFind]: valueToFind,
                    [fieldToAskCondition]: {
                        [Op[operator]]: condition
                    }
                }
            });
        } catch (err) {
            console.log('Database error', err);
            throw new DatabaseError('error executing findAll');
        } finally {
            return foundItems;
        }
    }

    async ReadManyByManyCustomFieldsWithMultipleOperators(
        fieldsToCheck = [
            {
                field: 'field',
                value: 'value'
            }
        ],
        conditionsToCheck = [
            {
                field: 'field',
                operator: 'operation',
                condition: 'condition'
            }
        ]) {
        let foundItems;
        let query = {};

        for (const fieldToCheck of fieldsToCheck) {
            query = {
                ...query,
                [fieldToCheck.field]: fieldToCheck.value
            };
        }

        for (const conditionToCheck of conditionsToCheck) {
            query = {
                ...query,
                [conditionToCheck.field]: {
                    [Op[conditionToCheck.operator]]: conditionToCheck.condition
                }
            };
        }

        try {
            foundItems = await Models[this.model].findAll({
                where: query
            });
        } catch (err) {
            console.log('Database error', err);
            throw new DatabaseError('error executing findAll');
        } finally {
            return foundItems;
        }
    }

    async ReadAll() {
        let foundItems;
        try {
            foundItems = await Models[this.model].findAll();
        } catch (err) {
            console.log('Database error', err);
            throw new DatabaseError('error executing findAll');;
        } finally {
            return foundItems;
        }
    }

    async ReadAllWithSkipLimit(skip, limit) {
        const query = skip == 0 ? { limit: limit } : { offset: skip, limit: limit };
        let foundItems;
        try {
            foundItems = await Models[this.model].findAll(query);
        } catch (err) {
            console.log('Database error', err);
            throw new DatabaseError('error executing findAll');;
        } finally {
            return foundItems;
        }
    }

    async Delete(id) {
        try {
            await Models[this.model].destroy({ where: { id: id } });
        } catch (err) {
            console.log('Database error', err);
            throw new DatabaseError('error executing destroy');
        }
    }
}

module.exports = Repository;