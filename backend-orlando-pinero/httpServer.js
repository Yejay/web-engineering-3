const express = require('express');
const bodyParser = require('body-parser');
// const cors = require('cors');

const database = require('./database/db');

const testRoutes = require('./endpoints/test/TestRoutes');
const publicUserRoutes = require('./endpoints/user/PublicUserRoute');
const UserRoutes = require('./endpoints/user/UserRoute');
const degreeCourseRoute = require('./endpoints/publicDegreeCourse/DegreeCourseRoute');
const authenticationRoutes = require('./endpoints/authentication/AuthenticationRoute');
const degreeCourseApplicationRoute = require('./endpoints/degreeCourseApplication/degreeCourseAppRoute');
const { checkForAdmin } = require('./endpoints/user/UserService');

const app = express();
// This allows all routes to acces the application
// app.use(cors());
// This restricts it to only localhost
// app.use(
// 	cors({
// 		origin: 'http://localhost:3000', // replace this with your trusted origins
// 	})
// );
app.use(bodyParser.json());

app.use('/', testRoutes);
app.use('/api/publicUsers', publicUserRoutes);
app.use('/api/users', UserRoutes);
app.use('/api/degreeCourses', degreeCourseRoute);
app.use('/api/authenticate', authenticationRoutes);
app.use('/api/degreeCourseApplications', degreeCourseApplicationRoute);
app.use(function (req, res) {
	res.status(404).json({ Error: "Path doesn't exist" });
});

database.initDB(function (err, db) {
	if (err) {
		console.log(err);
	}
	if (db) {
		checkForAdmin(function (err, user) {
			if (user) {
				console.log('Default Admin created');
			} else if (err) {
				console.log('Error while creating default Administrator');
			} else {
				console.log('Admin already existing');
			}
		});
		console.log('Anbindung erfolgreich');
	} else {
		console.log('Anbindung von DB gescheitert');
	}
});

const port = 80;
app.listen(port, () => {
	console.log(`Example app listening on port http://localhost:${port}`);
});

const fs = require('fs');
const key = fs.readFileSync('./certificates/key.pem');
const cert = fs.readFileSync('./certificates/cert.pem');

const https = require('https');
const server = https.createServer({ key: key, cert: cert }, app);

app.get('/', (req, res) => {
	res.send('this is an secure server');
});
server.listen(443, () => {
	console.log('listening on 443');
});
