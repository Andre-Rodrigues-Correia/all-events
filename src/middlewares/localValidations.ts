import { Request, Response, NextFunction } from "express";

const localCreateValidation = async (req: Request, res: Response, next: NextFunction) =>{
    const { name, description, value, type, address } = req.body;

    if(!name) {
        return res.status(400).json({message: 'name is required'})
    }

    if(!description) {
        return res.status(400).json({message: 'description is required'})
    }

    if(!value) {
        return res.status(400).json({message: 'value is required'})
    }

    if(!type || type.length < 1) {
        return res.status(400).json({message: 'type requires at least one type'})
    }

    if(!address || !address?.street || !address?.district || !address?.number || !address?.country || !address?.state || !address?.city) {
        return res.status(400).json({message: 'addres must contain street, district, number, country, state and country'})
    }

    next()
}

export { localCreateValidation }