const errHandler = (err, req, res, next) => {
    res.status(500).send({ msg: err });
};
module.exports = errHandler