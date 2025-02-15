const express = require('express');
const cors = require('cors');

const app = express();

var corsOptions = {
	origin: 'http://localhost:3000',
};

app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

const db = require('./app/models');

setTimeout(() => {
	db.sequelize
		.sync()
		.then(() => {
			console.log('Synced db.');
		})
		.catch((err) => {
			console.log('Failed to sync db: ' + err.message);
		});
}, 10000);

// // drop the table if it already exists
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });

require('./app/routes/user.routes')(app);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}.`);
});
