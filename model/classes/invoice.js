const BaseModel = require('./baseModel');

class Invoice extends BaseModel {
    id;
    date;
    cost;
    status;
    invoiceTrackerId;
    constructor(data={
        id:'',
        name:'',
        date:new Date(),
        cost: 0,
        status: 0
    }) {
        if(data.dataValues != undefined) {
            data = data.dataValues;
        }
        super();
        this.id = data.id;
        this.name = data.name;
        this.date = data.date;
        this.cost = data.cost;
        this.status = data.status;
        this.invoiceTrackerId = data.invoiceTrackerId;
    }
}

module.exports = Invoice;