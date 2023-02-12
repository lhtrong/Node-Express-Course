const {
    getAllJobs,
    getJob,
    createJob,
    updateJob,
    deleteJob
} = require('../controllers/jobs');
const express = require('express');
const router = express.Router();


router.route('/').get(getAllJobs).post(createJob)
router.route('/:id').get(getJob).delete(deleteJob).patch(updateJob)

module.exports = router;