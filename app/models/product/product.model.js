module.exports = (sequelize, Sequelize) => {
	const Product = sequelize.define('product', {
		name: {
			type: Sequelize.STRING,
		},
		value: {
			type: Sequelize.STRING,
		},
	});

	return Product;
};
