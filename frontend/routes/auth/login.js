const express = require('express');
const cookie = require('cookie');
const fetch = (...args) =>
    import('node-fetch').then(({default: fetch}) => fetch(...args));

const router = express.Router();

router.post('/api/users/login', async (req, res) => {
    const { email, password } = req.body;

    const body = JSON.stringify({ email, password });

    try {
        const apiResponse = await fetch(`${process.env.API_URL}/api/token/`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body,
        });

        const data = await apiResponse.json();

        if (apiResponse.status === 200) {
            // `access=${data.access}; HttpOnly; Max-Age: 1800;`
            // We can add these parameters manually or we can install a package
            // that handles that for us. npm cookie
            res.setHeader('Set-Cookie', [
                cookie.serialize('access', data.access, {
                    httpOnly: true,
                    maxAge: 60 * 30,
                    path: '/api/',
                    sameSite: 'strict',
                    secure: process.env.NODE_ENV === 'production'
                }),
                cookie.serialize('refresh', data.refresh, {
                    httpOnly: true,
                    maxAge: 60 * 60 * 24,
                    path: '/api/',
                    sameSite: 'strict',
                    secure: process.env.NODE_ENV === 'production'
                })
            ]);

            return res.status(200).json({ success: 'Logged in successfully'});
        } else {
            return res.status(apiResponse.status).json(data);
        }
    } catch(err) {
        return res.status(500).json({
            error: 'Something went wrong when logging in',
        });
    };
});

module.exports = router;
