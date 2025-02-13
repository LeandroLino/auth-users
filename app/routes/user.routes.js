module.exports = (app) => {
	const user = require('../controllers/user/user.controller.js');
	const middleware = require('../middlewares/user.middleware.js');

	var router = require('express').Router();

	router.get('/', user.health);
	router.post('/', middleware.validateUser, user.register);
	router.post('/login', user.login);
	router.get('/auth', middleware.authenticateUser, (req, res) => {
		res.status(200).send({
			message: 'OK',
		});
	});

	app.use('/api/user', router);
};
