const { CustomError }= require('../errors/custom-error')

const errorHandler = (err, req, res, next)=>{
    if (err instanceof CustomError){
        return res.status(err.statusCode).json({
            err: err.message,
        })
    }
    return res.status(500).json({
        err: err.message
    })
}

module.exports = errorHandler