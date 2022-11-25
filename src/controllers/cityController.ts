import { Request, Response } from "express";
import { save, findAll, findOne, updateOne, deleteOne } from '../services/city'
import logger from "../utils/Logger";

const createCity = async (req: Request, res: Response) => {
    const city = req.body;

    try {
        const cityExists = await findOne({name: city.name});
        if(cityExists) {
            return res.status(400).json({message: 'City already exists'})
        }
        const createdCity = await save(city)
        return res.status(201).json(createdCity)
    } catch (error: any) {
        logger.error(`${error}`)
        return res.status(400).json({message: error.message})
    }
}

const findAllCities = async (req: Request, res: Response) => {
    try {
        const allCities = await findAll();
        return res.status(200).json(allCities);
    } catch (error: any) {
        logger.error(`${error}`)
        return res.status(400).json({message: error.message})
    }
}

const findCity = async (req: Request, res: Response) => {
    try {
        const city = await findOne({_id: req.params.id});
        if(!city) {
            return res.status(404).json({message: 'City not found'});
        }
        return res.status(200).json(city);
    } catch (error: any) {
        logger.error(`${error}`)
        return res.status(400).json({message: error.message})
    }
}

const updateCity = async (req: Request, res: Response) => {
    const cityID = req.params.id;

    try {
        const updatedCity = await updateOne({_id: cityID}, req.body);
        if(updatedCity.modifiedCount === 0) {
            return res.status(400).json({message: 'City not updated'})
        }
        return res.status(200).json({message: 'City updated with success'});
    } catch (error: any) {
        logger.error(`${error}`)
        return res.status(400).json({message: error.message})
    }
}

const deleteCity = async (req: Request, res: Response ) => {
    const cityID = req.params.id;
    
    try {
        const deletedCity = await deleteOne({_id: cityID});

        if(deletedCity.deletedCount === 0) {
            return res.status(400).json({message: 'City not deleted'})
        }

        return res.status(200).json({message: 'City deleted with success'});
    } catch (error: any) {
        logger.error(`${error}`)
        return res.status(400).json({message: error.message})
    }
}

export { createCity, findAllCities, findCity, updateCity, deleteCity }