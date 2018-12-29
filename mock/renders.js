module.exports = {
    normal: (req, res) => {
        res.jsonp({
            body: res.locals.data,
            code: 200,
            msg: '操作成功'
        })
    },

    ser_error: (req, res) => {
        res.status(500).jsonp({
            error: 'inner server error'
        })
    }
}