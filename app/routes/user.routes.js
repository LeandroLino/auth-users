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
	router.put(
		'/:id/scopes',
		middleware.checkScopePermission(),
		user.upgradeScopes
	);
	router.get('/admin-only', middleware.onlyAdmin(), (req, res) => {
		res.json({ message: 'Esta rota é acessível apenas por admins.' });
	});
	router.get('/editor-only', middleware.onlyEditor(), (req, res) => {
		res.json({ message: 'Esta rota é acessível apenas por editors.' });
	});

	app.use('/api/user', router);
};
