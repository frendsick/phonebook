const mongoose = require("mongoose");

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: 3,
        required: [true, "Name is required"],
    },
    number: {
        type: String,
        validate: {
            validator: function (v) {
                return /^\d{2,3}-\d+$/.test(v);
            },
            message: (props) => `${props.value} is not a valid phone number!`,
        },
        minLength: [9, "Not enough numbers"], // 8 numbers and the hyphen
        required: [true, "Phone number is required"],
    },
});

module.exports = mongoose.model("Person", personSchema);
