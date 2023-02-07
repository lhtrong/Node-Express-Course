const Products = require('../models/product');

const getAllProductStatic = async(req, res) => {
    const product = await Products.find({})
        .sort('name')
        .select('name price')
        .limit(10)
        .skip(5);
    res.status(200).json({ product, nbHits: product.length });
}

const getAllProduct = async(req, res) => {
    try {

        const { name, featured, company, sort, fields, numberFilters } = req.query;
        const queryObject = {};
        if (name) {
            queryObject.name = { $regex: '.*' + name + '.*', $options: 'i' }
        }
        if (featured) {
            queryObject.featured = featured === 'true' ? true : false;
        }
        if (company) {
            queryObject.company = company
        }
        if (numberFilters) {
            const operatorMap = {
                '>': '$gt',
                '>=': '$gte',
                '<': '$lt',
                '<=': '$lte',
                '=': '$eq'
            };
            const regEx = /\b(<|<=|=|>|>=)\b/g
            const filter = numberFilters.replace(regEx, (match) => `-${operatorMap[match]}-`);
            filter.split(',').forEach((item) => {
                const [field, operator, value] = item.split('-');
                queryObject[field] = {
                    [operator]: value
                }
            })
        }
        console.log(queryObject)


        let result = Products.find(queryObject);
        if (sort) {
            sortList = sort.split(',').join(' ');
            result = result.sort(sortList);
        } else {
            result = result.sort('createdAt');
        }
        if (fields) {
            fieldList = fields.split(',').join(' ');
            result = result.select(fieldList);
        }
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const skip = (page - 1) * limit;
        result = result.skip(skip).limit(limit);
        const products = await result
        res.status(200).json({ products })
    } catch (error) {
        res.status(404).json({ msg: error });
    }



}

module.exports = { getAllProduct, getAllProductStatic }