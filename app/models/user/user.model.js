module.exports = (sequelize, Sequelize) => {
	const User = sequelize.define('user', {
		name: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		email: {
			type: Sequelize.STRING,
			allowNull: false,
			unique: true,
		},
		password: {
			type: Sequelize.STRING(255),
			allowNull: false,
		},
		cpf: {
			type: Sequelize.STRING,
		},
		isDeleted: {
			type: Sequelize.BOOLEAN,
			defaultValue: false,
			allowNull: false,
		},
	});

	return User;
};
