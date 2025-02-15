const { sequelize } = require('../models');
const UserModel = require('../models/user');

describe('User Model', () => {
	beforeAll(async () => {
		await sequelize.sync();
	});

	afterEach(async () => {
		await UserModel.destroy({ where: {} });
	});

	afterAll(async () => {
		await sequelize.close();
	});

	it('should create a new user', async () => {
		const userData = {
			name: 'John Doe',
			email: 'johndoe@example.com',
		};

		const user = await UserModel.create(userData);

		expect(user.name).toBe(userData.name);
		expect(user.email).toBe(userData.email);
	});

	it('should retrieve an existing user', async () => {
		const existingUser = {
			name: 'Jane Smith',
			email: 'janesmith@example.com',
		};

		await UserModel.create(existingUser);

		const user = await UserModel.findOne({
			where: { email: existingUser.email },
		});

		expect(user.name).toBe(existingUser.name);
		expect(user.email).toBe(existingUser.email);
	});
});
