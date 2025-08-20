class Controller {
    constructor(repository) {
        this.repository = repository;
    }

    async ReadById(id = 0) {
        return await this.repository.ReadById(id);
    }

    async ReadAllWithSkipLimit(data = { skip, limit }) {
        return await this.repository.ReadAllWithSkipLimit(data);
    }

    async Delete(id = 0) {
        return await this.repository.Delete(id);
    }
}

module.exports = Controller;