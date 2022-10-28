const TaskModel = require("../models/Task")
const asyncWrapper = require('../middleware/async')
const {createCustomError} = require('../errors/custom-error')

// we have move try and catch block in asyncWrapper wrpper
const getAllTasks = asyncWrapper(async (req, res) => {
    const allTasks = await TaskModel.find({})
    res.status(200).json({ allTasks })
})

const createTask =asyncWrapper(async (req, res) => {

    const taskBody = await TaskModel.create(req.body)
    res.status(201).json({ taskBody })
})

const getTask =asyncWrapper(async (req, res,next) => {
    const {id: taskID} = req.params
    const taskFound = await TaskModel.findOne({_id:taskID});
    if(!taskFound){
       return next(createCustomError(`No task with id : ${taskID}`, 404))
    }
    res.status(200).json({ taskFound })
    
})

const deleteTask =asyncWrapper(async (req, res) => {
    const {id: taskID} = req.params
    const taskFound = await TaskModel.findOneAndDelete({_id:taskID});
    if(!taskFound){
        return next(createCustomError(`No task with id : ${taskID}`, 404))
    }
    res.status(200).json({ taskFound })
})

// without wrapper and without error class it will look like this
const updateTask = async (req, res) => {
    try {
        const {id: taskID} = req.params
        const taskFound = await TaskModel.findOneAndUpdate({_id:taskID}, req.body,{
            new: true,
            runValidators: true,
            // overwrite is for PUT operation , main diff betw put and patch is put will replace the whole item and patch will do partial replacement
            // overwrite: true,
        });
        if(!taskFound){
            return res.status(404).json({msg:`No task found with id : ${taskID}`})
        //    using error class below
            // return next(createCustomError(`No task with id : ${taskID}`, 404))
        }
        res.status(200).json({ taskFound })
    } catch (error) {
        res.status(500).json({ msg:error })
    }
}
module.exports = {
    getAllTasks, createTask, getTask, updateTask, deleteTask
}