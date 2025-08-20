'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class InvoiceTracker extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  InvoiceTracker.init({
    Name: DataTypes.STRING,
    dueDate: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'InvoiceTracker',
  });
  return InvoiceTracker;
};