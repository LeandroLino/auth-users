const db = require('../../models');
const utils = require('../../utils/user.utils');
const User = db.user;
const Op = db.Sequelize.Op;

exports.health = (req, res) => {
	res.status(200).send({
		message: 'OK',
	});
};

exports.register = async (req, res) => {
	try {
		const { name, email, password, cpf } = req.adaptedData;

		const newUser = await User.create({
			name,
			email,
			password,
			cpf,
		});

		const token = utils.generateToken(newUser);

		return res.status(201).json({ token: token });
	} catch (error) {
		return res.status(400).json({
			error: error.message,
		});
	}
};

exports.login = async (req, res) => {
	if (!req.body.email || !req.body.password) {
		res.status(400).send({
			message: 'Content can not be empty!',
		});
		return;
	}

	try {
		const { email, password } = req.body;
		const condition = email ? { email: { [Op.like]: `%${email}%` } } : null;
		const user = await User.findOne({ where: condition });

		if (user == null) {
			throw new Error('Wrong email or password!');
		}
		const hashPassword = user.password;
		if (!(await utils.matchPassword(password, hashPassword))) {
			throw new Error('Wrong email or password!');
		}

		const token = utils.generateToken(user);

		return res.status(201).json({ token: token });
	} catch (error) {
		return res.status(403).json({
			error: error.message,
		});
	}
};

exports.upgradeScopes = async (req, res) => {
	const { id } = req.params;
	const { scopes } = req.body;

	try {
		const user = await User.findByPk(id);
		if (!user) {
			return res.status(404).json({ message: 'Usuário não encontrado.' });
		}

		user.scopes = [...new Set([...user.scopes, ...scopes])];
		await user.save();

		return res.status(200).json(user);
	} catch (error) {
		return res
			.status(500)
			.json({ message: 'Erro ao atualizar scopes.', error: error.message });
	}
};
