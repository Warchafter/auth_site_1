const express = require('express');
const fetch = (...args) =>
    import('node-fetch').then(({default: fetch}) => fetch(...args));

const router = express.Router();
router.post('/api/users/register', async (req, res) => {
    // const body = JSON.stringify(req.body);
    // This is another method of doing both lines below

    const { first_name, last_name, email, password } = req.body;

    const body = JSON.stringify({
        first_name,
        last_name,
        email,
        password
    });

    try {
        const apiResponse = await fetch(`${process.env.API_URL}/api/users/register`, {
            method: 'POST',
            headers:{
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body,
        });

        const data = await apiResponse.json();

        return res.status(apiResponse.status).json(data);
    } catch(err) {
        return res.status(500).json({
            erro: 'Something went wrong while registering the account!'
        });
    };
});


module.exports = router;