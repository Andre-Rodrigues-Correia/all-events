import {Request, Response, NextFunction} from 'express'
import { isValidObjectId } from 'mongoose';

const cityCreateValidation = (req: Request, res: Response, next: NextFunction) => {
    const {name, state} = req.body;

    if(!name){
        return res.status(400).json({message: 'name is required'})
    }
    if(!state){
        return res.status(400).json({message: 'state ID is required'})
    }

    if(!isValidObjectId(state)) {
        return res.status(400).json({message: 'state ID is invalid'})
    }
    
    next()
}

export { cityCreateValidation }