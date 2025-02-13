module.exports = (app) => {
	const user = require('../controllers/user/user.controller.js');
	const validateUser = require('../middlewares/user.middleware.js');

	var router = require('express').Router();

	router.get('/', user.health);
	router.post('/', validateUser, user.register);
	router.post('/login', user.login);

	app.use('/api/user', router);
};
