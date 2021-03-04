const bcrypt = require('bcryptjs');

const generatePW = (password) => {
    return bcrypt.hashSync(password, 10);
}

const comparePW = (password, hashedPW) => {
    return bcrypt.compareSync(password, hashedPW);
}

module.exports = {
    generatePW,
    comparePW
}