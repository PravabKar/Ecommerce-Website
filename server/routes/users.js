const router = require('express').Router();
let User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


router.route('/').get( (req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json(err));
});


router.route('/:id').get((req, res) => {
	User.findById(req.params.id)
	  .then(activity => res.json(activity))
	  .catch(err => res.status(400).json('Error: ' + err));
});


router.route('/register').post( async (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const address = req.body.address;
    const oldpassword = req.body.password;
    const password = await bcrypt.hash(oldpassword, 10)
    const newUser = new User({name, email, password, address});
    newUser.save()
        .then( () => res.json('User Added!'))
        .catch(err => res.status(400).json(err));
})


router.route('/login').post( async (req, res) => {
	const user = await User.findOne({
		email: req.body.email,
	})
	if (!user) {
		return { status: 'error', error: 'Invalid login' }
	}
	const isPasswordValid = await bcrypt.compare(
		req.body.password,
		user.password
	)
	if (isPasswordValid) {
		const token = jwt.sign(
			{
				name: user.name,
				email: user.email,
			},
			'secret123'
		)
		return res.json({ status: 'ok', user: token })
	} else {
		return res.json({ status: 'error', user: false })
	}
})


router.route('/:id').delete((req, res) => {
    User.findByIdAndDelete(req.params.id)
      .then(() => res.json('User deleted!'))
      .catch(err => res.status(400).json('Error: ' + err));
  });


router.route('/auth').post( async (req, res) => {
	const token = req.headers['x-access-token']
	
	try {
		const decoded = jwt.verify(token, 'secret123')
		const email = decoded.email
		const user = await User.findOne({ email: email })

		return res.json({ status: 'ok', user: user })
	} catch (error) {
		console.log(error)
		res.json({ status: 'error', error: 'invalid token' })
	}
})


module.exports = router;
