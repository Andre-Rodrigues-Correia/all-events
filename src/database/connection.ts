import mongoose from "mongoose";
import logger from "../utils/Logger";

const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;
const DB_STAGING = process.env.DB_STAGING || '';
const DB_PROD = process.env.DB_PROD || '';
const ENVIRONMENT = process.env.ENVIRONMENT;

const connectDB = async () => {   
    try {
        if(ENVIRONMENT === 'staging'){
            const connect = await mongoose.connect(DB_STAGING);
            logger.info(`conexão com o banco de dados em ${ENVIRONMENT} realizada com sucesso!`)
        }else{
            const connect = await mongoose.connect(DB_PROD);
            logger.info(`conexão com o banco de dados em ${ENVIRONMENT} realizada com sucesso!`)
        }
    } catch (error: any) {
        logger.error(`Erro na aplicação: ${error.message}`)
    }

};

export {connectDB};