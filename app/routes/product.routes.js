module.exports = (app) => {
	const product = require('../controllers/product/product.controller.js');

	var router = require('express').Router();

	// Create a new product
	router.get('/', product.health);

	router.post('/', product.create);

	// Retrieve all product
	router.get('/list', product.findAll);

	// Retrieve all published product
	router.get('/value', product.findAllValue);

	// Retrieve a single product with id
	router.get('/:id', product.findOne);

	// Update a product with id
	router.put('/:id', product.update);

	// Delete a product with id
	router.delete('/:id', product.delete);

	// Delete all product
	router.delete('/', product.deleteAll);

	app.use('/api', router);
};
