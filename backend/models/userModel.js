const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const plm = require('passport-local-mongoose');

const userSchema = new Schema(
    {
    firstname: {
        type: String,
          required: true,      
    },
    lastname: {
        type: String,
         required: true,     
    },
    email: {
          type: String,
          required: true,
          unique: true
    },
    roll: {
        type: String,
        required: true,
        unique: true
    },
    admin: {
        type: Boolean,
        default: false
    }
}
);

userSchema.plugin(plm);
module.exports = mongoose.model('User', userSchema);