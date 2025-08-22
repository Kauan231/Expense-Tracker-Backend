const BaseModel = require('./baseModel');

class Document extends BaseModel {
    documentPath;
    type;
    invoiceId;
    constructor(data={
        documentPath:'',
        type:0,
        invoiceId:0
    }) {
        if(data.dataValues != undefined) {
            data = data.dataValues;
        }
        super();
        this.documentPath = data.documentPath;
        this.type = data.type;
        this.invoiceId = data.invoiceId;
    }
}

module.exports = Document;