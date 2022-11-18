import {Request, Response, NextFunction} from 'express'

const countryCreateValidation = (req: Request, res: Response, next: NextFunction) => {
    const {name, coin} = req.body;

    if(!name){
        return res.status(400).json({message: 'name is required'})
    }
    if(!coin){
        return res.status(400).json({message: 'coin is required'})
    }

    next()
}

export {countryCreateValidation}