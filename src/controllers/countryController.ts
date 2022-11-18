import { save, findAll, findOne } from '../services/country'
import {Request, Response, NextFunction} from 'express'
import logger from "../utils/Logger";

const createCountry = async (req: Request, res: Response) => {

    try {
        const createdCountry = await save(req.body);
        res.status(201).json(createdCountry);
    } catch (error: any) {
        logger.error(`${error}`)
        return res.status(400).json({message: error.message})
    }  
};

const findAllCountries = async (req: Request, res: Response) => {
    try {
        const allCountries = await findAll();
        res.status(200).json(allCountries);
    } catch (error: any) {
        logger.error(`Erro na aplicação: ${error.message}`)
        return res.status(400).json({message: error.message})
    }
};

const findCountry = async (req: Request, res: Response) => {
    const id: string = req.params.id;

    try {
        const country = await findOne(id);
        res.status(200).json(country);
    } catch (error: any) {
        logger.error(`Erro na aplicação: ${error.message}`)
        return res.status(400).json({message: error.message})
    }
};


export { createCountry, findAllCountries, findCountry }