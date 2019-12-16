module.exports = async (untilGetResult, callback) => {
    try {
        const data = await untilGetResult
        return callback(data)
    } catch (error) {
        return callback(error)
    }
};