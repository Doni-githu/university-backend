const router = require('express').Router();
const User = require('../modules/User');
const { makeToken, decodeToken } = require('../utils/jwt');
const bcrypt = require('bcrypt')

router.post('/', async (req, res, next) => {
    const { phone } = req.body;

    const candidate = await User.findOne({ phone });

    if (candidate) {
        res.status(400).json({
            message: 'Bu telefon nomer ishlatilabti!'
        });
        next()
        return
    }



    const user = await User.create({
        ...req.body,
    })
    const accessToken = makeToken(user._id)
    res.status(200).json({
        user,
        token: accessToken
    })
})
router.get('/all', async (req, res) => {
    const users = await User.find({ rol: 'student' }).lean()

    res.status(200).send(users)
})

router.get('/', async (req, res) => {
    const userId = decodeToken(req.headers.authorization.replace('Token ', ''))

    const user = await User.findById(userId)

    res.status(200).json(user)
})

router.get('/:id', async (req, res) => {
    const id = req.params.id
    const profile = await User.findById(id).lean()
    res.status(200).send(profile)
})

router.post('/login', async (req, res, next) => {
    const existUser = await User.findOne({ phone: req.body.phone })

    if (!existUser) {
        res.status(400).json({
            message: 'Akkount topilmadi'
        })
        return
    }

    if (req.body.phone === '+998770141667') {
        if (req.body.password !== existUser.password) {
            res.status(400).json({
                message: "Parol notog'ri kiritilgan"
            })
            return
        }

        const token = makeToken(existUser._id)
        res.status(200).json({
            token,
            user: existUser,
            rol: existUser.rol
        })
        return
        next()
    }

    // const compare = bcrypt.compare(existUser.password, password)

    // if (!compare) {
    //     res.status(400).json({
    //         message: "Parol notog'ri kiritilgan"
    //     })
    //     return
    // }

    const token = makeToken(existUser._id)
    res.status(200).json({
        token,
        user: existUser,
        rol: existUser.rol
    })
})
module.exports = router;