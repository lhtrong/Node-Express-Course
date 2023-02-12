const Jobs = require('../models/Job');
const { StatusCodes } = require('http-status-codes');
const {
    CustomAPIError,
    UnauthenticatedError,
    NotFoundError,
    BadRequestError,
} = require('../errors/index');
const Job = require('../models/Job');

const getAllJobs = async(req, res) => {

    // res.send("Get all jobs");
    const jobs = await Job.find({ createdBy: req.user.userID }).sort('createdBy');
    res.status(StatusCodes.OK).json({ jobs, count: jobs.length });
};
const getJob = async(req, res) => {
    const userID = req.user.userID;
    const jobID = req.params.id;

    const job = await Job.findOne({
        _id: jobID,
        createdBy: userID,
    })
    if (!job) {
        throw new NotFoundError(`Job not found with id ${jobID}`);
    }
    res.status(StatusCodes.OK).json({ job });


};
const createJob = async(req, res) => {
    req.body.createdBy = req.user.userID;
    const job = await Job.create(req.body);
    res.status(StatusCodes.CREATED).json({ job });
};
const updateJob = async(req, res) => {
    const {
        body: { company, position },
        user: { userID },
        params: { id: jobID }
    } = req;
    if (!company || !position) {
        throw new BadRequestError('Please provide company and position');
    }
    const job = await Job.findByIdAndUpdate({ _id: jobID, createdBy: userID }, req.body, {
        new: true,
        runValidators: true
    })
    if (!job) {
        throw new NotFoundError('No job found with id ' + jobID)
    }
    res.status(StatusCodes.OK).json({ job })
};
const deleteJob = async(req, res) => {
    const {
        user: { userID },
        params: { id: jobID }
    } = req;

    const job = await Job.findByIdAndRemove({ _id: jobID, createdBy: userID })
    if (!job) {
        throw new NotFoundError('No job found with id ')
    }
    res.status(StatusCodes.OK).send('Hi');


};

module.exports = {
    getAllJobs,
    getJob,
    createJob,
    updateJob,
    deleteJob
}