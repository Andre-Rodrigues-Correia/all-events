import { Request, Response } from "express";
import { save, findAll, findOne, updateOne, deleteOne } from "../services/type";
import logger from "../utils/Logger";

const createType = async (req: Request, res: Response) => {
    try {

        const typeExists = await findOne({name: req.body.name});

        if(typeExists) {
            return res.status(400).json({message: 'Type already exists'});
        }

        const createdType = await save(req.body)
        return res.status(200).json(createdType)
        
    } catch (error: any) {
        logger.error(`${error}`)
        return res.status(400).json({message: error.message})
    }
}

const findAllType = async (req: Request, res: Response) => {
    try {
        const allTypes = await findAll();

        return res.status(200).json(allTypes);
    } catch (error: any) {
        logger.error(`${error}`)
        return res.status(400).json({message: error.message})
    }
}

const findType = async (req: Request, res: Response) => {
    const typeId = req.params.id;
    try {
        const type = await findOne({_id: typeId});

        if(!type) {
            return res.status(200).json({message: 'type not found'});
        }

        return res.status(200).json(type);
    } catch (error: any) {
        logger.error(`${error}`)
        return res.status(400).json({message: error.message})
    }
}

const updateType = async (req: Request, res: Response) => {
    const typeID = req.params.id;

    try {
        const updatedType = await updateOne({_id: typeID}, req.body);
        
        if(updatedType.modifiedCount === 0) {
            return res.status(400).json({message: 'Type not updated'})
        }
        return res.status(200).json({message: 'Type updated with success'});
    } catch (error: any) {
        logger.error(`${error}`)
        return res.status(400).json({message: error.message})
    }
}

const deleteType = async (req: Request, res: Response ) => {
    const typeID = req.params.id;
    
    try {
        const deletedType = await deleteOne({_id: typeID});

        if(deletedType.deletedCount === 0) {
            return res.status(400).json({message: 'Type not deleted'})
        }

        return res.status(200).json({message: 'Type deleted with success'});
    } catch (error: any) {
        logger.error(`${error}`)
        return res.status(400).json({message: error.message})
    }
}


export { createType, findAllType, findType, updateType, deleteType };