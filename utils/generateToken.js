const jwt = require('jsonwebtoken');

exports.generateToken = (userInfo) => {
    const { email, role } = userInfo;

    const payload = {
        email,
        role
    }

    const token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '8h'
    })

    return token;
}