const utils = require('../utils/user.utils');
const userAdapter = require('../adapters/user.adapter');

const validateUser = async (req, res, next) => {
	const { name, email, password, cpf } = req.body;

	if (!name || !email || !password) {
		return res.status(400).json({
			message: 'Campos obrigatórios faltando: name, email ou password.',
		});
	}

	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	if (!emailRegex.test(email)) {
		return res.status(400).json({ message: 'Email inválido.' });
	}

	if (cpf && !utils.validateCPF(cpf)) {
		return res.status(400).json({
			message: 'CPF inválido.',
		});
	}

	try {
		const adaptedData = await userAdapter(req.body);

		req.adaptedData = adaptedData;

		next();
	} catch (error) {
		return res.status(500).json({
			message: 'Erro ao processar os dados do usuário.',
			error: error.message,
		});
	}
};

const authenticateUser = (req, res, next) => {
	const authHeader = req.headers['authorization'];
	const token = authHeader && authHeader.split(' ')[1];

	if (!token) {
		return res
			.status(401)
			.json({ message: 'Token de autenticação não fornecido.' });
	}

	const user = utils.verifyToken(token);
	console.log(user);
	if (!user) {
		return res.status(403).json({ message: 'Token inválido ou expirado.' });
	}

	req.user = user;
	next();
};

module.exports = { validateUser, authenticateUser };
