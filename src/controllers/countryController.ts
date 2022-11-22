import { save, findAll, findOne, updateOne, deleteOne } from '../services/country'
import {Request, Response } from 'express'
import logger from "../utils/Logger";

const createCountry = async (req: Request, res: Response) => {

    try {
        const countryExists = await findOne({name: req.body.name});
        if(countryExists) {
            return res.status(400).json({message: 'Country already exists'});
        }

        const createdCountry = await save(req.body);
        return res.status(201).json(createdCountry);
    } catch (error: any) {
        logger.error(`${error}`)
        return res.status(400).json({message: error.message})
    }  
};

const findAllCountries = async (req: Request, res: Response) => {
    try {
        const allCountries = await findAll();
        return res.status(200).json(allCountries);
    } catch (error: any) {
        logger.error(`Erro na aplicação: ${error.message}`)
        return res.status(400).json({message: error.message})
    }
};

const findCountry = async (req: Request, res: Response) => {
    const id: string = req.params.id;

    try {
        const country = await findOne({_id: id});

        if(!country){
            return res.status(404).json({message: 'Country not found'});
        }

        return res.status(200).json(country);
    } catch (error: any) {
        logger.error(`Erro na aplicação: ${error.message}`);
        return res.status(400).json({message: error.message});
    }
};

const updateCountry = async (req: Request, res: Response) => {
    const id: string = req.params.id;

    try {
        const country = await updateOne({_id: id}, req.body);
        if(country.modifiedCount === 0){
            return res.status(404).json({message: 'Country not updated'});
        }
        return res.status(200).json({message: 'Country updated with success'});
    } catch (error: any) {
        logger.error(`Erro na aplicação: ${error.message}`)
        return res.status(400).json({message: error.message})
    }
};

const deleteCountry = async (req: Request, res: Response) => {
    const id = req.params.id;

    try {
        const country = await deleteOne({_id: id});
        if(country.deletedCount === 0) {
            return res.status(404).json({message: 'Country not deleted'});
        }

        return res.status(200).json({message: 'Country deleted with success'});
    } catch (error: any) {
        logger.error(`Erro na aplicação: ${error.message}`)
        return res.status(400).json({message: error.message})
    }
};


export { createCountry, findAllCountries, findCountry, updateCountry, deleteCountry }