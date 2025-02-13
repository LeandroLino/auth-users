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

		return res.status(201).json(newUser);
	} catch (error) {
		return res.status(500).json({
			message: 'Erro ao criar usuário.',
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

		return res.status(201).json(user);
	} catch (error) {
		return res.status(403).json({
			message: 'Erro ao fazer login',
			error: error.message,
		});
	}
};
