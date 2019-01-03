module.exports = (req, res, next) => {
    if (req.method = 'POST') {
        req.method = 'GET'
        console.log('entry post api channel')
    }
    next();
}