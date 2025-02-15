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
	if (!user) {
		return res.status(403).json({ message: 'Token inválido ou expirado.' });
	}

	req.user = user;
	next();
};

const checkScopePermission = () => {
	return async (req, res, next) => {
		const requiredScopes = req.body.scopes;
		const authHeader = req.headers['authorization'];
		const token = authHeader && authHeader.split(' ')[1];

		if (!token) {
			return res
				.status(401)
				.json({ message: 'Token de autenticação não fornecido.' });
		}

		try {
			const decoded = utils.verifyToken(token);

			const isAdmin = decoded.scopes.includes('admin');

			if (isAdmin) {
				req.user = decoded;
				return next();
			}

			const hasRequiredScopes = requiredScopes.every((scope) =>
				decoded.scopes.includes(scope)
			);

			if (!hasRequiredScopes) {
				return res.status(403).json({
					message: `Acesso negado. Você não possui todos os scopes necessários para realizar esta ação.`,
				});
			}

			if (requiredScopes.includes('admin')) {
				return res.status(403).json({
					message:
						'Acesso negado. Apenas admins podem adicionar o escopo admin.',
				});
			}

			req.user = decoded;
			next();
		} catch (error) {
			return res
				.status(403)
				.json({ message: 'Token inválido ou expirado.', error });
		}
	};
};

const onlyAdmin = () => {
	return async (req, res, next) => {
		const authHeader = req.headers['authorization'];
		const token = authHeader && authHeader.split(' ')[1];

		if (!token) {
			return res
				.status(401)
				.json({ message: 'Token de autenticação não fornecido.' });
		}

		try {
			const decoded = utils.verifyToken(token);

			const isAdmin = decoded.scopes.includes('admin');

			if (!isAdmin) {
				return res.status(403).json({
					message: 'Acesso negado. Apenas admins podem acessar esta rota.',
				});
			}

			req.user = decoded;
			next();
		} catch (error) {
			return res
				.status(403)
				.json({ message: 'Token inválido ou expirado.', error });
		}
	};
};

const onlyEditor = () => {
	return async (req, res, next) => {
		const authHeader = req.headers['authorization'];
		const token = authHeader && authHeader.split(' ')[1];

		if (!token) {
			return res
				.status(401)
				.json({ message: 'Token de autenticação não fornecido.' });
		}

		try {
			const decoded = utils.verifyToken(token);
			const isEditor = decoded.scopes.includes('editor');

			if (!isEditor) {
				return res.status(403).json({
					message: 'Acesso negado. Apenas editors podem acessar esta rota.',
				});
			}

			req.user = decoded;
			next();
		} catch (error) {
			return res
				.status(403)
				.json({ message: 'Token inválido ou expirado.', error });
		}
	};
};

module.exports = {
	validateUser,
	authenticateUser,
	checkScopePermission,
	onlyAdmin,
	onlyEditor,
};
