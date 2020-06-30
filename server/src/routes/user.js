const express = require('express')
const router = new express.Router()
const auth = require('../config/auth')
const User = require('../models/user')
const Speakeasy = require('speakeasy')

router.post('/signup', async (req, res) => {
    const user = new User(req.body)

    try {
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({ user, token })
    } catch (e) {
        res.status(400).send(e)
    }
})

router.post('/signin', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({ user, token })
    } catch (e) {
        res.status(400).send()
    }
})

router.post('/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()

        res.send()
    } catch (e) {
        res.status(500).send()
    }
})

// router.post('/logoutAll', auth, async (req, res) => {
//     try {
//         req.user.tokens = []
//         await req.user.save()
//         res.send()
//     } catch (e) {
//         res.status(500).send()
//     }
// })

router.get('/vote', auth, async (req, res) => {
    res.send(req.user)
})

// router.get('/users/:id', async (req, res) => {
//     const _id = req.params.id

//     try {
//         const user = await User.findById(_id)

//         if (!user) {
//             return res.status(404).send()
//         }
//         res.send(user)
//     } catch (e) {
//         res.status(500).send()
//     }
// })

router.post('/totp', (req, res, next) => {
    const secret = Speakeasy.generateSecret({ length: 20 })
    res.send({ "secret": secret.base32 })
})

router.post('/totp-generate', (req, res, next) => {
    res.send({
        'token': Speakeasy.totp({
            secret: req.body.secret,
            encoding: 'base32'
        }),
        'remaining': (60 - Math.floor((new Date().getTime() / 1000.0 % 60)))
    })
})
router.post('/totp-validate', (req, res, next) => {
    res.send({
        'valid': Speakeasy.totp.verify({
            secret: req.body.secret,
            encoding: 'base32',
            token: req.body.token,
            window: 0
        })
    })
})

module.exports = router