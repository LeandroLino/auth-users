const { sequelize } = require('../models'); // Importe a instância do Sequelize
const UserModel = require('../models/user'); // Importe o modelo que deseja testar

describe('User Model', () => {
	beforeAll(async () => {
		// Antes de executar os testes, sincronize o modelo com o banco de dados de teste
		await sequelize.sync();
	});

	afterEach(async () => {
		// Após cada teste, limpe a tabela do banco de dados
		await UserModel.destroy({ where: {} });
	});

	afterAll(async () => {
		// Após todos os testes, encerre a conexão com o banco de dados
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

	// ... outros testes
});
