const express = require('express');
const https = require('https');
const path = require('path');
const fs = require('fs');
const dotenv = require('dotenv').config();
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

const database = require('./database/Database');

const userService = require('./endpoints/user/UserService');

const userRoutes = require('./endpoints/user/UserRoute');
const publicUserRoutes = require('./endpoints/user/PublicUserRoute');
const authenticationRoutes = require('./endpoints/authentication/AuthenticationRoute');
const degreeCourseRoutes = require('./endpoints/degreeCourse/DegreeCourseRoute');
const degreeCourseApplicationRoutes = require('./endpoints/degreeCourseApplication/DegreeCourseApplicationRoute');

const HTTPPORT = process.env.HTTPPORT;
const HTTPSPORT = process.env.HTTPSPORT;

const sslServer = https.createServer(
	{
		key: fs.readFileSync(path.join(__dirname, 'certificates', 'key.pem')),
		cert: fs.readFileSync(path.join(__dirname, 'certificates', 'cert.pem')),
	},
	app
);

// Middlewares
app.use('*', cors());
app.use('', cors());

app.use(function (req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
	res.header('Access-Control-Expose-Headers', 'Authorization');
	next();
});
app.use(bodyParser.json());

app.use(express.json());
app.use('/api/users', userRoutes);
app.use('/api/publicUsers', publicUserRoutes);
app.use('/api/authenticate', authenticationRoutes);
app.use('/api/degreeCourses', degreeCourseRoutes);
app.use('/api/degreeCourseApplications', degreeCourseApplicationRoutes);
// Default route for error handling
app.use((req, res) => {
	res.status(404).json({ error: 'This route does not exist!' });
});

app.listen(HTTPPORT, () => {
	console.log('Http app listening on port http://localhost/80');
});
console.log('\n--------------------------------------------------------------------------');
sslServer.listen(HTTPSPORT, () => {
	console.log(`SECURE SERVER ON PORT: ${HTTPSPORT}`);
	console.log(`Example app listening on port https://localhost:${HTTPSPORT}`);
});

database.initializeDatabase((err, db) => {
	if (db) {
		userService.createDefaultServerAdmin();
		console.log(`MONGODB CONNECTED`);
		console.log('--------------------------------------------------------------------------\n');
	} else {
		console.log(`MONGODB CONNECTION FAILED\n`);
		console.log('--------------------------------------------------------------------------\n');
	}
});
