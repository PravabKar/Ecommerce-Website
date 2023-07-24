const router = require('express').Router();
let Order = require('../models/order');

router.route('/').get( (req, res) => {
    Order.find()
        .then(orders => res.json(orders))
        .catch(err => res.status(400).json(err));
});

router.route('/:id').get((req, res) => {
	Order.findById(req.params.id)
	  .then(order => res.json(order))
	  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/addtocart').post( async (req, res) => {
    const user_id = req.body.user_id;
    const product_id = req.body.product_id;
    const product_name = req.body.product_name;
    const product_image = req.body.product_image;
    const order_address = req.body.order_address;
    const order_price = Number(req.body.order_price);
    const order_completed = Boolean(false);
    const newOrder = new Order({user_id, product_id, product_name, product_image, order_address, order_price, order_completed});
    newOrder.save()
        .then( () => res.json('Added to Cart!'))
        .catch(err => res.status(400).json(err));
});

router.route('/removefromcart/:id').delete((req, res) => {
    Order.findByIdAndDelete(req.params.id)
      .then(() => res.json('Product removed from Cart!'))
      .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/placeorder/:id').put((req, res) => {
    Order.findById(req.params.id)
      .then((order) => {
        order.order_address = req.body.order_address;
        // order.order_price = Number(req.body.order_price);
        order.order_completed = Boolean(true);

        order.save()
          .then(() => res.json("Order Placed!"))
          .catch(err => res.json(err));
      })
});

router.route('/cart/:id').get((req, res) => {
  Order.find( {"user_id": req.params.id } ).find({"order_completed": false})
	  .then(order => res.json(order))
	  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/history/:id').get((req, res) => {
  Order.find( {"user_id": req.params.id } ).find({"order_completed": true})
	  .then(order => res.json(order))
	  .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;