import Country from "../models/Country";

const save = async (country: object = {}) => {
  return await Country.create(country);
};

const findAll = async () => {
   return await Country.find();
};

const findOne = async (filter: string) => {
    return await Country.findById(filter);
 };

export { save, findAll, findOne };