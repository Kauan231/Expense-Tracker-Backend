class BaseModel {
    toObject() {
        return {...this};
    }
    getValues() {
        return Object.values(this);
    }
}

module.exports = BaseModel;