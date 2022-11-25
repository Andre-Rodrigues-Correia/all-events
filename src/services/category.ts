import Category from "../models/Category";

const save = async (category = {})=> {
    return await Category.create(category);
}

const findAll = async () => {
    return await Category.find();
}

const findOne = async (filter: object = {}) => {
    return await Category.findOne(filter)
}

const updateOne = async (filter: object = {}, category: object = {}) => {
    return await Category.updateOne(filter, category);
}

const deleteOne = async (filter: object = {}) => {
    return await Category.deleteOne(filter);
}
export { save, findAll, findOne, updateOne, deleteOne }