const express = require('express');
const router = express.Router();

const authenticationService = require('./AuthenticationService');

router.get('/', (req, res) => {
	if (req.headers.authorization) {
		const base64Credentials = req.headers.authorization.split(' ')[1];
		const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
		const [username, password] = credentials.split(':');
		authenticationService.createSessionToken(username, password, (error, token) => {
			if (token) {
				// prettier-ignore
				res.status(200).header('Authorization', 'Bearer ' + token).json({ message: 'Authorization successful' });
			} else {
				res.status(401).json({ error: 'Not Authorized' });
			}
		});
	} else {
		res.status(400).json({ error: 'Not Authorized!' });
	}
});

module.exports = router;
