const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

async function matchPassword(password, userPassword) {
	return await bcrypt.compare(password, userPassword);
}

const generateToken = (user) => {
	return jwt.sign(
		{
			id: user.id,
			email: user.email,
			name: user.name,
		},
		process.env.SECRET_KEY,
		{ expiresIn: '1h' }
	);
};

const verifyToken = (token) => {
	try {
		return jwt.verify(token, process.env.SECRET_KEY);
	} catch (error) {
		return null;
	}
};

const hashPassword = async (password) => {
	const saltRounds = 10;
	const hashedPassword = await bcrypt.hash(password, saltRounds);
	return hashedPassword;
};

function validateCPF(cpf) {
	cpf = cpf.replace(/\D/g, '');

	if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) {
		return false;
	}

	let sum = 0;
	for (let i = 0; i < 9; i++) {
		sum += parseInt(cpf.charAt(i)) * (10 - i);
	}
	let remainder = (sum * 10) % 11;
	if (remainder === 10 || remainder === 11) {
		remainder = 0;
	}
	if (remainder !== parseInt(cpf.charAt(9))) {
		return false;
	}

	sum = 0;
	for (let i = 0; i < 10; i++) {
		sum += parseInt(cpf.charAt(i)) * (11 - i);
	}
	remainder = (sum * 10) % 11;
	if (remainder === 10 || remainder === 11) {
		remainder = 0;
	}
	if (remainder !== parseInt(cpf.charAt(10))) {
		return false;
	}

	return true;
}

// Exporte a função validateCPF
module.exports = {
	validateCPF,
	hashPassword,
	matchPassword,
	generateToken,
	verifyToken,
};
