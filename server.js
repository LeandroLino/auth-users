const express = require('express');
const cors = require('cors');
const routes = require('./app/routes/product.routes');

const app = express();

var corsOptions = {
	origin: 'http://localhost:3000',
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const db = require('./app/models');

// Aguarda 10 segundos antes de tentar conectar
setTimeout(() => {
	db.sequelize
		.sync()
		.then(() => {
			console.log('Synced db.');
		})
		.catch((err) => {
			console.log('Failed to sync db: ' + err.message);
		});
}, 10000); // 10 segundos

// // drop the table if it already exists
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });

app.get('/', (req, res) => {
	res.json({ message: 'Welcome to bezkoder application.' });
});

require('./app/routes/product.routes')(app);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}.`);
});
