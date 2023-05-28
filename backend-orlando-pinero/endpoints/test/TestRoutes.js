const express = require('express');
const router = express.Router();

router.get('/', (request, response) => {
    response.send('Hello World')
}
)

router.get('/json', (request, response) => {
    response.json({name:'JSON HALLO'})
}
)

module.exports = router;