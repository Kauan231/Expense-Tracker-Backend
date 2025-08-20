class Dto {
    toObject() {
        return {...this};
    }
    getValues() {
        return Object.values(this);
    }
}

module.exports = Dto;