const getAllProductStatic = async(req, res) => {
    res.json({ msg: "Product Static testing route" })
}

const getAllProduct = async(req, res) => {
    res.json({ msg: "Product tesing route" })
}

module.exports = { getAllProduct, getAllProductStatic }