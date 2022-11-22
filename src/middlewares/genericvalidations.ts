import {Request, Response, NextFunction} from 'express'
import { isValidObjectId } from "mongoose";

const validateId = (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    
    if(isValidObjectId(id)){
        next()
    } else {
        return res.status(400).json({message: 'invalid ID'})
    }
}

export {validateId}