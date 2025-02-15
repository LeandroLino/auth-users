'use strict';

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.bulkInsert(
			'users',
			[
				{
					name: 'Admin',
					email: 'admin@example.com',
					password: 'senhaSegura123',
					cpf: '00000000000',
					isDeleted: false,
					scopes: JSON.stringify(['admin']),
					createdAt: new Date(),
					updatedAt: new Date(),
				},
			],
			{}
		);
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.bulkDelete(
			'Users',
			{ email: 'admin@example.com' },
			{}
		);
	},
};
