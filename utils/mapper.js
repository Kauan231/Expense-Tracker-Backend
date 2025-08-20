convertToADto = (OriginDto, ObjectToConvert) => {
    const result = {};
    for (const key of Object.keys(OriginDto)) {
        result[key] = ObjectToConvert[key];
    }
    return result;
};

module.exports = { convertToADto };