const router = require('express').Router();
let Product = require('../models/product');

router.route('/list').get( (req, res) => {
    Product.find()
        .then(products => res.json(products))
        .catch(err => res.status(400).json(err));
});

router.route('/:id').get((req, res) => {
	Product.findById(req.params.id)
	  .then(product => res.json(product))
	  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post( async (req, res) => {
    const name = req.body.name;
    const description = req.body.description;
    const image = req.body.image;
    const category = req.body.category;
    const rating = Number(req.body.rating);
    const price = Number(req.body.price);
    const newProduct = new Product({name, description, image, category, rating, price});
    newProduct.save()
        .then( () => res.json('Product Added!'))
        .catch(err => res.status(400).json(err));
});

router.route('/remove/:id').delete((req, res) => {
    Product.findByIdAndDelete(req.params.id)
      .then(() => res.json('Product deleted!'))
      .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/edit/:id').put((req, res) => {
    Product.findById(req.params.id)
      .then((product) => {
        product.name = req.body.name;
        product.description = req.body.description;
        product.price = Number(req.body.price);
        product.image = req.body.image;
        product.category = req.body.category;
        product.rating = Number(req.body.rating);

        product.save()
          .then(() => res.json("Product updated!"))
          .catch(err => res.json(err));
      })
});

module.exports = router;