const bcrypt = require('bcrypt');
const createError = require('http-errors')

const hashing  = async (string) => {
    try {
        const salt = await bcrypt.genSalt(10)
        const hashString = await bcrypt.hash(string, salt)
        
        return hashString
    } catch (error) {
        throw createError(error)
    }
}

const compareHashing = async (string, compareString) => {
    try {
        return await bcrypt.compare(string, compareString)
    } catch (error) {
        throw createError(error)
    }
}

module.exports = {
    hashing,
    compareHashing
}