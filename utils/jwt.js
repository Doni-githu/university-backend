const jwt = require('jsonwebtoken');

const makeToken = userId => {
    const token = jwt.sign({ userId }, 'Doniyor')
    return token
}

const decodeToken = token => {
    const userId = jwt.decode(token, {complete: true}).payload.userId
    return userId
}

module.exports = {
    decodeToken,
    makeToken
}