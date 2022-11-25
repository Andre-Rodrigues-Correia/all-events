import { Request, Response, NextFunction } from "express";

const categoryCreateValidation = async (req: Request, res: Response, next: NextFunction) =>{
    const { name } = req.body;

    if(!name) {
        return res.status(400).json({message: 'name is required'})
    }

    next()
}

export { categoryCreateValidation }