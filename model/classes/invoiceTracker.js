const BaseModel = require('./baseModel');

class InvoiceTracker extends BaseModel {
    id;
    name;
    dueDate;
    constructor(data={
        id:'',
        name:'',
        dueDate:0
    }) {
        console.log("data legal", data)

        if(data.dataValues != undefined) {
            data = data.dataValues;
        }
        super();
        this.id = data.id;
        this.name = data.name;
        this.dueDate = data.dueDate;
    }
}

module.exports = InvoiceTracker;