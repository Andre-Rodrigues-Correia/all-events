import State from "../models/State";

const save = async (state: object) => {
    return await State.create(state);
}

const findAll = async () => {
    return await State.find();
}

const findOne = async (filter: object = {}) => {
    return await State.findOne(filter);
}

const updateOne = async (filter: object = {}, stateUpdate: object) => {
    return await State.updateOne(filter, stateUpdate)
}

const deleteOne = async (filter: object = {}) => {
    return await State.deleteOne(filter);
}

export { save, findAll, findOne, updateOne, deleteOne };