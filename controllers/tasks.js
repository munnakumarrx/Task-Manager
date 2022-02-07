const {createCustomError} = require('../errors/custom-error')
const asyncWrapper = require('../middleware/async')
const Task = require('../models/tasks')

const getAllTasks = asyncWrapper(async (req, res)=> {
    const tasks = await Task.find()
    res.status(200).json({
        data: tasks
    })
})

const getTask = asyncWrapper(async (req, res, next)=>{
    const task = await Task.findById(req.params.id)
    if (!task){
        return next(createCustomError(`task doesn't exist with id ${req.params.id}`, 404))
    }
    res.status(200).json({
        data: task
    })
})

const createTask = asyncWrapper(async (req, res)=>{
    await Task.create(req.body)
    res.status(201).json("created")
})

const updateTask = asyncWrapper(async (req, res, next)=>{
    // console.log(req.body)
    const task = await Task.findByIdAndUpdate(req.params.id,
        {...req.body},
        {new:true, runValidators:true})
    if (!task){
        return next(createCustomError(`task doesn't exist with id ${req.params.id}`, 404))
    }
    res.status(200).json({
        data: task
    })
})

const deleteTask = asyncWrapper(async (req, res, next)=> {
    const task = await Task.findByIdAndRemove(req.params.id)
    if (!task) {
        return next(createCustomError(`task doesn't exist with id ${req.params.id}`, 404))
    }
    res.status(200).json("deleted successfully")
})

module.exports = {
    getAllTasks,
    getTask,
    createTask,
    updateTask,
    deleteTask
}