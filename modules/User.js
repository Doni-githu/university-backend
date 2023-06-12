const { model, Schema } = require('mongoose')

const UserSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    phone: { type: String, required: true },
    password: { type: String },
    place: {
        region: { type: String, required: true },
        tuman: { type: String, required: true }
    },
    passport: { type: String, required: true },
    type: { type: String, required: true },
    rol: { type: String, required: true },
    lang: { type: String, required: true },
    time: { type: String, required: true },
    price: { type: String, required: true },
    date_of_birth: { type: String, required: true },
    father_name: { type: String, required: true }
})

const User = model("User", UserSchema)
module.exports = User