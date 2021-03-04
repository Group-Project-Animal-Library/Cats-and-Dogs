function errHandler (err, req, res) {
    if (err.errors) {
        let arr = [];
        for (let i = 0; i < err.errors.length; i++) {
            arr.push(err.errors[i].message)
        }
        msg = arr.join(', ')
        res.status(400).json({message: msg})
    } else if (err.message) {
        res.status(err.code).json({message: err.message})
    } else {
        res.status(500).json({message: 'Internal Server Error'})
    }
}

module.exports = errHandler