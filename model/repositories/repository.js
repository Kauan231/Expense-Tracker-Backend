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

    async ReadByIdRaw(id) {
        let foundItem;
        try {
            foundItem = await Models[this.model].findOne({ where: { id: id } });
        } catch (err) {
            console.log('Database error', err);
            throw new DatabaseError('error executing findOne');
        } finally {
            return foundItem;
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

    async ReadByIdAndNestedPopulate(id, populate) {
        try {
            const buildInclude = (items) => {
                if (Array.isArray(items)) {
                    return items.map(i => buildInclude(i));
                }
                if (typeof items === 'object') {
                    return {
                        model: Models[items.model],
                        include: items.include ? buildInclude(items.include) : []
                    };
                }
                return { model: Models[items] };
            };

            const include = buildInclude(populate);

            const foundItem = await Models[this.model].findOne({
                where: { id },
                include
            });

            return foundItem?.dataValues;
        } catch (err) {
            console.log('Database error', err);
            throw new DatabaseError('error executing findOne');
        }
    }

    async ReadByIdAndNestedPopulateFromADate(id, populate) {
        try {
            const buildInclude = (items) => {
                if (Array.isArray(items)) {
                    return items.map(i => buildInclude(i));
                }

                if (typeof items === 'object') {
                    const includeObj = {
                        model: Models[items.model],
                        include: items.include ? buildInclude(items.include) : []
                    };

                    if (items.year && items.model === 'Invoice') {
                        const whereClause = [];

                        // Year filter
                        if (items.year) {
                            whereClause.push(
                                Models.Sequelize.where(
                                    Models.Sequelize.fn('strftime', '%Y', Models.Sequelize.col('date')),
                                    items.year.toString()
                                )
                            );
                        }

                        // Month filter (1-12)
                        if (items.month) {
                            // Ensure two digits for SQLite: '01', '02', ... '12'
                            const monthStr = String(items.month).padStart(2, '0');
                            whereClause.push(
                                Models.Sequelize.where(
                                    Models.Sequelize.fn('strftime', '%m', Models.Sequelize.col('date')),
                                    monthStr
                                )
                            );
                        }

                        includeObj.where = { [Models.Sequelize.Op.and]: whereClause };
                        includeObj.required = false; // keep parent even if no invoices match
                    }


                    return includeObj;
                }

                return { model: Models[items] };
            };

            const include = buildInclude(populate);

            const foundItem = await Models[this.model].findOne({
                where: { id },
                include
            });

            return foundItem?.dataValues;
        } catch (err) {
            console.log('Database error', err);
            throw new DatabaseError('error executing findOne');
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

    async ReadAllWithSkipLimit(skip = 0, limit = 12, year, month) {
        try {
            const query = {
                limit,
                offset: skip
            };

            // Build where clause for year/month if provided
            if (year || month) {
                const whereClause = [];

                if (year) {
                    whereClause.push(
                        Models.Sequelize.where(
                            Models.Sequelize.fn('strftime', '%Y', Models.Sequelize.col('date')),
                            year.toString()
                        )
                    );
                }

                if (month) {
                    const monthStr = String(month).padStart(2, '0'); // 01-12
                    whereClause.push(
                        Models.Sequelize.where(
                            Models.Sequelize.fn('strftime', '%m', Models.Sequelize.col('date')),
                            monthStr
                        )
                    );
                }

                query.where = { [Models.Sequelize.Op.and]: whereClause };
            }

            const foundItems = await Models[this.model].findAll(query);
            return foundItems;
        } catch (err) {
            console.log('Database error', err);
            throw new DatabaseError('error executing findAll');
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

    async DeleteByCustomField(id, customField) {
        try {
            await Models[this.model].destroy({ where: { [customField]: id } });
        } catch (err) {
            console.log('Database error', err);
            throw new DatabaseError('error executing destroy');
        }
    }

    async DeleteByCustomFieldsArray(pairs) {
        try {
            const where = {};
            pairs.forEach(([field, value]) => {
            where[field] = value;
            });

            await Models[this.model].destroy({ where });
        } catch (err) {
            console.log('Database error', err);
            throw new DatabaseError('error executing destroy');
        }
    }

    async DeleteByYear(year, field) {
        const startDate = new Date(year, 0, 1);   // Jan 1, 00:00:00
        const endDate = new Date(year, 11, 31, 23, 59, 59, 999); // Dec 31, 23:59:59
        return await Models[this.model].destroy({
            where: {
                [field]: {
                    [Op.between]: [startDate, endDate]
                }
            }
        });
    }
}

module.exports = Repository;