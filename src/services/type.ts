import Type from "../models/Type";

const save = async (type = {})=> {
    return await Type.create(type);
}

const findAll = async () => {
    return await Type.find();
}

const findOne = async (filter: object = {}) => {
    return await Type.findOne(filter)
}

const updateOne = async (filter: object = {}, type: object = {}) => {
    return await Type.updateOne(filter, type);
}

const deleteOne = async (filter: object = {}) => {
    return await Type.deleteOne(filter);
}
export { save, findAll, findOne, updateOne, deleteOne }