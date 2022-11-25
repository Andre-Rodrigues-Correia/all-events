import Event from "../models/Event";

const save = async (event = {})=> {
    return await Event.create(event);
}

const findAll = async () => {
    return await Event.find();
}

const findOne = async (filter: object = {}) => {
    return await Event.findOne(filter)
}

const updateOne = async (filter: object = {}, event: object = {}) => {
    return await Event.updateOne(filter, event);
}

const deleteOne = async (filter: object = {}) => {
    return await Event.deleteOne(filter);
}
export { save, findAll, findOne, updateOne, deleteOne }