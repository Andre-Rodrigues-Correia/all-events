import { Request, Response, NextFunction } from "express";

const eventCreateValidation = async (req: Request, res: Response, next: NextFunction) =>{
    const { name, description, organizer, value, type, address, start_date, end_date } = req.body;

    if(!name) {
        return res.status(400).json({message: 'name is required'})
    }

    if(!description) {
        return res.status(400).json({message: 'description is required'})
    }

    if(!organizer) {
        return res.status(400).json({message: 'organizer is required'})
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

    if(!start_date) {
        return res.status(400).json({message: 'start_date is required'})
    }

    if(!end_date) {
        return res.status(400).json({message: 'end_date is required'})
    }

    next()
}

export { eventCreateValidation }