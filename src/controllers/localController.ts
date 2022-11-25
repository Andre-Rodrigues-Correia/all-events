import { Request, Response } from "express";
import { save, findAll, findOne, updateOne, deleteOne } from "../services/local";
import logger from "../utils/Logger";

const createLocal = async (req: Request, res: Response) => {

    try {
        const localExists = await findOne({name: req.body.name});

        if(localExists) {
            return res.status(400).json({message: 'Local already exists'});
        }

        const createdLocal = await save(req.body)
        return res.status(201).json(createdLocal)
    } catch (error: any) {
        logger.error(`${error}`)
        return res.status(400).json({message: error.message})
    }
}

const findAllLocal = async (req: Request, res: Response) => {
    try {
        const allLocals = await findAll();

        return res.status(200).json(allLocals);
    } catch (error: any) {
        logger.error(`${error}`)
        return res.status(400).json({message: error.message})
    }
}

const findLocal = async (req: Request, res: Response) => {
    const localId = req.params.id;
    try {
        const local = await findOne({_id: localId});

        if(!local) {
            return res.status(200).json({message: 'local not found'});
        }

        return res.status(200).json(local);
    } catch (error: any) {
        logger.error(`${error}`)
        return res.status(400).json({message: error.message})
    }
}

const customFind = async (req: Request, res: Response) => {
    const id = req.params.id;
    const condition:string = req.params.findCodition;

    const filter = {[`address.${condition}`]: id}

    try {
        const events = await findAll(filter);
        if(!events || events.length === 0) {
            return res.status(400).json({message: 'events not found'});
        }

        return res.status(200).json(events);

    } catch (error:any) {
        logger.error(`${error}`)
        return res.status(400).json({message: error.message})
    }
}

const updateLocal = async (req: Request, res: Response) => {
    const localID = req.params.id;

    try {
        const updatedLocal = await updateOne({_id: localID}, req.body);
        
        if(updatedLocal.modifiedCount === 0) {
            return res.status(400).json({message: 'Local not updated'})
        }
        return res.status(200).json({message: 'Local updated with success'});
    } catch (error: any) {
        logger.error(`${error}`)
        return res.status(400).json({message: error.message})
    }
}

const deleteLocal = async (req: Request, res: Response ) => {
    const localID = req.params.id;
    
    try {
        const deletedLocal = await deleteOne({_id: localID});

        if(deletedLocal.deletedCount === 0) {
            return res.status(400).json({message: 'Local not deleted'})
        }

        return res.status(200).json({message: 'Local deleted with success'});
    } catch (error: any) {
        logger.error(`${error}`)
        return res.status(400).json({message: error.message})
    }
}


export { createLocal, findAllLocal, findLocal, customFind, updateLocal, deleteLocal };