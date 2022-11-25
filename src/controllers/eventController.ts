import { Request, Response } from "express";
import { save, findAll, findOne, updateOne, deleteOne } from "../services/event";
import logger from "../utils/Logger";

const createEvent = async (req: Request, res: Response) => {

    try {
        const eventExists = await findOne({name: req.body.name});

        if(eventExists) {
            return res.status(400).json({message: 'Event already exists'});
        }

        const createdEvent = await save(req.body)
        return res.status(201).json(createdEvent)
    } catch (error: any) {
        logger.error(`${error}`)
        return res.status(400).json({message: error.message})
    }
}

const findAllEvent = async (req: Request, res: Response) => {
    try {
        const allEvents = await findAll();

        return res.status(200).json(allEvents);
    } catch (error: any) {
        logger.error(`${error}`)
        return res.status(400).json({message: error.message})
    }
}

const findEvent = async (req: Request, res: Response) => {
    const eventId = req.params.id;
    try {
        const event = await findOne({_id: eventId});

        if(!event) {
            return res.status(200).json({message: 'event not found'});
        }

        return res.status(200).json(event);
    } catch (error: any) {
        logger.error(`${error}`)
        return res.status(400).json({message: error.message})
    }
}

const updateEvent = async (req: Request, res: Response) => {
    const eventID = req.params.id;

    try {
        const updatedEvent = await updateOne({_id: eventID}, req.body);
        
        if(updatedEvent.modifiedCount === 0) {
            return res.status(400).json({message: 'Event not updated'})
        }
        return res.status(200).json({message: 'Event updated with success'});
    } catch (error: any) {
        logger.error(`${error}`)
        return res.status(400).json({message: error.message})
    }
}

const deleteEvent = async (req: Request, res: Response ) => {
    const eventID = req.params.id;
    
    try {
        const deletedEvent = await deleteOne({_id: eventID});

        if(deletedEvent.deletedCount === 0) {
            return res.status(400).json({message: 'Event not deleted'})
        }

        return res.status(200).json({message: 'Event deleted with success'});
    } catch (error: any) {
        logger.error(`${error}`)
        return res.status(400).json({message: error.message})
    }
}


export { createEvent, findAllEvent, findEvent, updateEvent, deleteEvent };