import express from 'express';
import mongoose from 'mongoose';
import Validator from '../utils/todovalidator.js'
const {config} = pkg;
import pkg from 'dotenv';

// Importing models
import Todo from '../models/todo.js';


class Todo_ {

 /**
   * Finding all todos  
   * @param {Object[]} req - Request
   * @param {Object[]} res - Response
   * @returns {Object[]} Response Object with its status
   */ 
async findAll (req, res) {

        try {
            const todos = await Todo.find()
            res.json({
                status: "Success",
                message: "todos retrieved successfully",
                payload: todos
            })
         }  catch (err) {
            res.status(500).json({ message: err.message })
         }
  
        }

 /**
   * Creating one todo
   * @param {Object[]} req - Request
   * @param {Object[]} res - Response
   * @returns {Object[]} Response Object with its status
   */
async createOne (req, res)  {
    const { error } = Validator.todoValidator(req.body)
        
    if (error) {
        res.status(400).json({ message : error.message })
      }
            const todo = new Todo({
                title : req.body.title,
                description : req.body.description,
                priority : req.body.priority
            })
            try {
                const newTodo = await todo.save()
                res.json({
                    status: "Success",
                    message: "todo created successfully",
                    newTodo
                })
            } catch (err) {
                res.status(400).json({ message : err.message })
            }
    }

 /**
   * Findind one todo
   * @param {Object[]} req - Request
   * @param {Object[]} res - Response
   * @returns {Object[]} Response Object with its status
   * 
   */
async findOne (req, res)  {
        try {      
          const todo = await Todo.findById(req.params.id)      
            res.json({
                payload: todo
            })
         }  catch (err) {
            res.status(500).json({ message: err.message })
         }
    
        }


 /**
   * Deleting one todo
   * @param {Object[]} req - Request
   * @param {Object[]} res - Response
   * @returns {Object[]} Response Object with its status
   * 
   */
  
async deleteOne (req, res) {
        
    const todo = await Todo.findById(req.params.id)      
    try {
        todo.remove()
        res.json({
            success: true,
            message: "todo deleted!"
        })
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
    }


 /**
   * Updating one todo
   * @param {Object[]} req - Request
   * @param {Object[]} res - Response
   * @returns {Object[]} Response Object with its status
   * 
   */
async updateOne (req, res)  {
    const todo = await Todo.findById(req.params.id)      
    
    if (req.body.title !== null) {
        todo.title = req.body.title
    }
    if (req.body.description !== null) {
        todo.description = req.body.description
    }
    if (req.body.priority !== null) {
        todo.priority = req.body.priority
    }
    try {
        todo.save()
        const todoUpdated = await Todo.findById(req.params.id)

        res.json({
            success: true,
            message: "Todo updated!"
        })
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}
}

export default new Todo_;
