import {Request, Response, NextFunction} from 'express'
import { isValidObjectId } from 'mongoose';

const stateCreateValidation = (req: Request, res: Response, next: NextFunction) => {
    const {name, initials, country} = req.body;

    if(!name){
        return res.status(400).json({message: 'name is required'})
    }
    if(!initials){
        return res.status(400).json({message: 'initials is required'})
    }

    if(!country){
        return res.status(400).json({message: 'country ID is required'})
    }
    
    if(!isValidObjectId(country)){
        return res.status(400).json({message: 'country ID is invalid'})
    }

    next()
}

export {stateCreateValidation}