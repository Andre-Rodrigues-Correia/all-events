import City from "../models/City";

const save = async (city: object) => {
    return await City.create(city);
}

const findAll = async () => {
    return await City.find();
}

const findOne = async (filter: object = {}) => {
    return await City.findOne(filter);
}

const updateOne = async (filter: object = {}, city: object = {}) => {
    return City.updateOne(filter, city);
}

const deleteOne = async (filter: object = {}) => {
    return await City.deleteOne(filter);
}

export { save, findAll, findOne, updateOne, deleteOne }