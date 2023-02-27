const express = require('express');
const router = express.Router();

const { searchJobs, searchJobsTesting } = require('../controllers/search')

router.route('/').get(searchJobs);
router.route('/static').get(searchJobsTesting);

module.exports = router;