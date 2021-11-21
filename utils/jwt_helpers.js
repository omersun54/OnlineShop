const jwt = require('jsonwebtoken');

function jwtTokens ({id,username}) {
    console.log("jwt tokens fonk çalıştı")
    const user = {  id,username}
    const accessToken = jwt.sign(user,process.env.ACCESS_TOKEN_SECRET,{expiresIn:'20h'})
    const refreshToken = jwt.sign(user,process.env.REFRESH_TOKEN_SECRET,{expiresIn:'5m'})
}

module.exports={jwtTokens}
