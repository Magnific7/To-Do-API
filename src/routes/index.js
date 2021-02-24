import express from 'express';

import Todo from '../models/todo.js';
import todoController from '../controllers/todo.js'

import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./../../swagger.json";


const router = express.Router();
router.use(express.json());
router.get("/api-docs", swaggerUi.setup(swaggerDocument));

/**
 *  * Route for finding all todos {POST}
 * @name /todo
 * @param {string} path - Express path
 */
    router.get('/', todoController.findAll)

 /**
 * Route for creating a todo {GET}
 * @name /todo
 * @param {string} path - Express path
 */
    router.post('/', todoController.createOne);


/**
 * Route displaying single toto {GET}
 * @name /todo/:id
 * @param {string} path - Express path
 */
    router.get('/:id',todoController.findOne)
    /**
 * Route deleting a single todo {DELETE}
 * @name todo/:id
 * @param {string} path - Express path
 */
    router.delete('/:id',todoController.deleteOne)
    
        /**
 * Route updating a single todo {PATCH}
 * @name todo/:id
 * @param {string} path - Express path
 */
    .patch('/:id',todoController.updateOne)
    
 export default router;
