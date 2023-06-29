const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());

app.use(cors({
    origin: '*'
}));

const tokenKey = "this-is-a-key-for-jwt-token"

//TODO - move to DB
const users = [
    {
        id: 1,
        email: 'test@example.com',
        password: bcrypt.hashSync('password', 10),
        token: ''
    },
    {
        id: 2,
        email: 'test2@example.com',
        password: bcrypt.hashSync('password2', 10),
        token: ''
    }
];

app.use(cors("*"));

app.post('/login', (req, res) => {
    console.log(req.body);
    const { email, password } = req.body;
    const user = users.find(user => user.email === email);
    if (!user) {
        return res.status(401).json({ message: 'No user found' });
    }
    if (!bcrypt.compareSync(password, user.password)) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign({ id: user.id }, tokenKey, {expiresIn: '1h'});
    user.token = token;
    console.log("Sending user + token: " + token);
    return res.status(200).json(user);
});

app.listen(3000, () => {
    console.log('Server started on port 3000');
}
);