const Tasks = require('../models/Task');

const getAllTasks = async(req, res) => {

    try {
        const tasks = await Tasks.find({});
        res.status(200).json({ tasks })
    } catch (error) {
        res.status(404).json({ msg: error });

    }
}
const getTask = async(req, res) => {
    try {
        const taskID = req.params.id;
        const task = await Tasks.findOne({ _id: taskID });
        if (!task) {
            res.status(200).json({ msg: 'Task not found' });
        } else {
            res.status(200).json({ task });
        }
    } catch (error) {
        res.status(404).json({ msg: error })
    }
}
const createTask = async(req, res) => {
    try {
        const tasks = await Tasks.create(req.body);
        res.status(200).json({ tasks });
    } catch (error) {
        res.status(500).json({ msg: error });
    }

};

const deleteTask = async(req, res) => {
    try {
        const taskID = req.params.id;
        const task = await Tasks.findOneAndDelete({ _id: taskID });
        if (!task) {
            res.status(404).json({ msg: "Task not found" });
        } else {
            res.status(200).json({ task });
        }
    } catch (error) {
        res.status(500).json({ msg: error });
    }


};

const updateTask = async(req, res) => {
    try {
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

    } catch (error) {
        res.status(500).json({ msg: error });
    }


};
module.exports = {
    getAllTasks,
    getTask,
    createTask,
    updateTask,
    deleteTask
}