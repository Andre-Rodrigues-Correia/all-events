import { Request, Response } from "express";
import { save, findAll, findOne, updateOne, deleteOne } from "../services/category";
import logger from "../utils/Logger";

const createCategory = async (req: Request, res: Response) => {
    try {

        const categoryExists = await findOne({_name: req.body.name});

        if(categoryExists) {
            return res.status(400).json({message: 'Category already exists'});
        }

        const createdCategory = await save(req.body)
        return res.status(200).json(createdCategory)
        
    } catch (error: any) {
        logger.error(`${error}`)
        return res.status(400).json({message: error.message})
    }
}

const findAllCategory = async (req: Request, res: Response) => {
    try {
        const allCategories = await findAll();

        return res.status(200).json(allCategories);
    } catch (error: any) {
        logger.error(`${error}`)
        return res.status(400).json({message: error.message})
    }
}

const findCategory = async (req: Request, res: Response) => {
    const categoryId = req.params.id;
    try {
        const category = await findOne({_id: categoryId});

        if(!category) {
            return res.status(200).json({message: 'category not found'});
        }

        return res.status(200).json(category);
    } catch (error: any) {
        logger.error(`${error}`)
        return res.status(400).json({message: error.message})
    }
}

const updateCategory = async (req: Request, res: Response) => {
    const categoryID = req.params.id;

    try {
        const updatedCategory = await updateOne({_id: categoryID}, req.body);
        
        if(updatedCategory.modifiedCount === 0) {
            return res.status(400).json({message: 'Category not updated'})
        }
        return res.status(200).json({message: 'Category updated with success'});
    } catch (error: any) {
        logger.error(`${error}`)
        return res.status(400).json({message: error.message})
    }
}

const deleteCategory = async (req: Request, res: Response ) => {
    const categoryID = req.params.id;
    
    try {
        const deletedCategory = await deleteOne({_id: categoryID});

        if(deletedCategory.deletedCount === 0) {
            return res.status(400).json({message: 'Category not deleted'})
        }

        return res.status(200).json({message: 'Category deleted with success'});
    } catch (error: any) {
        logger.error(`${error}`)
        return res.status(400).json({message: error.message})
    }
}


export { createCategory, findAllCategory, findCategory, updateCategory, deleteCategory };