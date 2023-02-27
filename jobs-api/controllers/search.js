const Jobs = require('../models/Job');

const searchJobsTesting = async(req, res) => {
    const product = await Jobs.find({})
        .sort('name')
        .select('name price')
        .limit(10)
        .skip(5);
    res.status(200).json({ product, nbHits: product.length });
}

const searchJobs = async(req, res) => {
    try {

        const { status, company, position, sort } = req.query;
        const queryObject = {};
        if (position) {
            queryObject.position = { $regex: '.*' + position + '.*', $options: 'i' }
        }

        if (company) {
            queryObject.company = { $regex: '.*' + company + '.*', $options: 'i' }
        }
        if (status) {
            queryObject.status = status;
        }

        let result = Jobs.find(queryObject);
        if (sort) {
            sortList = sort.split(',').join(' ');
            result = result.sort(sortList);
        } else {
            result = result.sort('createdAt');
        }
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const skip = (page - 1) * limit;
        result = result.skip(skip).limit(limit);
        const Jobs = await result
        res.status(200).json({ Jobs })
    } catch (error) {
        res.status(404).json({ msg: error });
    }



}

module.exports = { searchJobs, searchJobsTesting }