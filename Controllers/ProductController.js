const { Product } = require('../models')

class ProductController {

    async spa(req, res) {
        let spaList = await Product.findAll()
        console.log(spaList);
        res.send(spaList)
    }

    async spaMore(req,res) {
        let spaInfo = await Product.findOne({where: {id: req.body.id}})
        console.log(spaInfo);
        res.send(spaInfo)
    }

  
}

module.exports = {
    ProductController: new ProductController
}