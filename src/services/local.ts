import Local from "../models/Local";

const save = async (local = {})=> {
    return await Local.create(local);
}

const findAll = async (filter: object = {}) => {
    return await Local.find();
}

const findOne = async (filter: object = {}) => {
    return await Local.findOne(filter)
}

const updateOne = async (filter: object = {}, local: object = {}) => {
    return await Local.updateOne(filter, local);
}

const deleteOne = async (filter: object = {}) => {
    return await Local.deleteOne(filter);
}
export { save, findAll, findOne, updateOne, deleteOne }