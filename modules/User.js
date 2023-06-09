const { model, Schema } = require('mongoose')

const UserSchema = new Schema({
    firstName: { type: String, },
    lastName: { type: String, },
    phone: { type: String, required: true },
    password: { type: String, required: true },
    place: {
        region: { type: String, }
    },
    passport: { type: String, },
    type: { type: String, },
    rol: {type: String, required: true  }
})

const User = model("User", UserSchema)
module.exports = User