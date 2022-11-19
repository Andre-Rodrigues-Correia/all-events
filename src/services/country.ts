import Country from "../models/Country";

const save = async (country: object = {}) => {
  return await Country.create(country);
};

const findAll = async () => {
   return await Country.find();
};

const findOne = async (filter: object) => {
   return await Country.findOne(filter)
 };

const updateOne = async (filter: object, countryUpdate: object) => {
   return await Country.updateOne(filter, countryUpdate);
};

const deleteOne = async (filter: object) => {
   return await Country.deleteOne(filter);
}

export { save, findAll, findOne, updateOne, deleteOne };