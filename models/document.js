'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Document extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      Document.belongsTo(models.Invoice, {
        foreignKey: 'invoiceId'
      })
    }
  }

  /*
    Types:
    0: receipt
    1: billet
  */

  Document.init({
    documentPath: DataTypes.STRING,
    type: DataTypes.INTEGER,
    invoiceId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Document',
  });
  return Document;
};