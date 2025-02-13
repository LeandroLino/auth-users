const { hashPassword } = require('../utils/user.utils');

const userAdapter = async (data) => {
	const { name, email, password, cpf } = data;

	const hashedPassword = await hashPassword(password);

	return {
		name: name.trim(),
		email: email.trim().toLowerCase(),
		password: hashedPassword,
		cpf: cpf ? cpf.replace(/\D/g, '') : null,
	};
};

module.exports = userAdapter;
