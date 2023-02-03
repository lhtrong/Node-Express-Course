const Tasks = require('../models/Task');
const asyncWrapper = require('../middleware/async');

const getAllTasks = asyncWrapper(async(req, res) => {
    const tasks = await Tasks.find({});
    res.status(200).json({ tasks: tasks, status: 'success' });
})
const getTask = asyncWrapper(async(req, res) => {

    const taskID = req.params.id;
    const task = await Tasks.findOne({ _id: taskID });
    if (!task) {
        res.status(200).json({ msg: 'Task not found' });
    } else {
        res.status(200).json({ task });
    }
})
const createTask = asyncWrapper(async(req, res) => {
    const tasks = await Tasks.create(req.body);
    res.status(200).json({ tasks });
});

const deleteTask = asyncWrapper(async(req, res) => {
    const taskID = req.params.id;
    const task = await Tasks.findOneAndDelete({ _id: taskID });
    if (!task) {
        res.status(404).json({ msg: "Task not found" });
    } else {
        res.status(200).json({ task });
    }
});

const updateTask = asyncWrapper(async(req, res) => {
    const taskID = req.params.id;
    const task = await Tasks.findByIdAndUpdate({ _id: taskID }, req.body, {
        new: true,
        runValidators: true
    });
    if (!task) {
        res.status(404).json({ msg: `Not found task with id ${taskID}` });
    } else {
        res.status(200).json({ task });
    }
});
module.exports = {
    getAllTasks,
    getTask,
    createTask,
    updateTask,
    deleteTask
}