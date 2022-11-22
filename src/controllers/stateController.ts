import {Request, Response} from 'express'
import logger from "../utils/Logger";
import { save, findAll, findOne, updateOne, deleteOne } from '../services/state';
import State from '../models/State';


const createState = async (req: Request, res: Response) => {
    const state = req.body;

    try {
        const stateExists = await findOne({name: state.name})
        if(stateExists){
            return res.status(400).json({message: 'State already exists'});
        }

        const createdState = await save(state);
        return res.status(201).json(createdState);
    } catch (error: any) {
        logger.error(error);
        return res.status(400).json({message: error.message})
    }
};

const findAllStates = async (req: Request, res: Response) => {
    try {
        const allStates = await findAll();

        return res.status(200).json(allStates);
    } catch (error: any) {
        logger.error(error);
        return res.status(400).json({message: error.message})
    }
}

const findState = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const state = await findOne({_id: id});

        if(!state){
            return res.status(404).json({message: 'State not found'});
        }

        return res.status(200).json(state);
    } catch (error: any) {
        logger.error(error);
        return res.status(400).json({message: error.message})
    }
}

const updateState = async (req: Request, res: Response) => {
    const stateID = req.params.id;

    try {
        const state = await updateOne({_id: stateID}, req.body);

        if(state.modifiedCount === 0){
            return res.status(404).json({message: 'State not updated'});
        }

        return res.status(200).json({message: 'State updated with success'})
        
    } catch (error: any) {
        logger.error(error);
        return res.status(400).json({message: error.message})
    }
}
const deleteState = async (req: Request, res: Response) => {
    const stateID = req.params.id;

    try {

        const state = await deleteOne({_id: stateID});

        if(state.deletedCount === 0) {
            return res.status(404).json({message: 'State not deleted'});
        }

        return res.status(200).json({message: 'State deleted with success'})
    } catch (error: any) {
        logger.error(error);
        return res.status(400).json({message: error.message})
    }
}



export { createState, findAllStates, findState, updateState, deleteState}