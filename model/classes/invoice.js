const BaseModel = require('./baseModel');

class Invoice extends BaseModel {
    id;
    dueDate;
    month;
    year;
    cost;
    status;
    invoiceTrackerId;
    constructor(data={
        id:'',
        name:'',
        dueDate:0
    }) {
        if(data.dataValues != undefined) {
            data = data.dataValues;
        }
        super();
        this.id = data.id;
        this.name = data.name;
        this.dueDate = data.dueDate;
    }
}

module.exports = Invoice;