// const path = require('path');
// const filename = path.join(__dirname, '../../logs/project.log');
//
// //you can change format according to you
// const log = require('simple-node-logger').createSimpleLogger( {
//     logFilePath:filename,
//     timestampFormat:'YYYY-MM-DD HH:mm:ss'}
// );

const myLogger = function (req, res, next) {
    const reqTemp = {
        query : req.query,
        body : req.body,
        method : req.method,
        url : req.originalUrl,
        params : req.params,
        remoteAddress : req._remoteAddress,
        startTime : req._startTime
    }
    console.log('LOGGED', reqTemp)
    console.log('LOGGED', res.getHeader('host'))
    // console.log('LOGGED', req.headers)

    next()
}



module.exports = myLogger;



// module.exports = function (options) {
//     return myLogger()
// }
