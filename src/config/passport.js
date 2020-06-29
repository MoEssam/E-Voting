// const passport = require('passport')
// const JwtStrategy = require('passport-jwt').Strategy
// const { ExtractJwt } = require('passport-jwt')
// const { JWT_SECRET } = require('./keys')
// const User = require('../models/user')

// passport.use(new JwtStrategy({
//     jwtFromRequest: ExtractJwt.fromHeader('authorization'),
//     secretOrKey: JWT_SECRET
// }, async (payload, done) => {
//     try {
//         const user = await User.findById(payload._id)
//         if (!user) {
//             return done(null, false)
//         }

//         done(null, user)
//     } catch (e) {
//         done(e, false)
//     }
// }))