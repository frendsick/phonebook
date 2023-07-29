const mongoose = require("mongoose");
require("dotenv").config();

const username = process.env.MONGO_USERNAME;
const password = process.env.MONGO_PASSWORD;
const mongoClusterUrl = process.env.MONGO_URL;
if (!username || !password || !mongoClusterUrl) {
    console.error("Cannot connect to MongoDB - missing environment variables");
    console.info("Please set the following environment variables:");
    console.info("MONGO_USERNAME");
    console.info("MONGO_PASSWORD");
    console.info("MONGO_URL");
    process.exit(1);
}

const table = "phonebook";
const url = `mongodb+srv://${username}:${password}@${mongoClusterUrl}/${table}?retryWrites=true&w=majority`;

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

const Person = mongoose.model("Person", personSchema);
const enableUpdateValidator = { runValidators: true };

exports.fetchPersons = () => Person.find({});
exports.fetchPersonById = (id) => Person.findById(id);
exports.savePerson = (person) => new Person(person).save();
exports.updatePerson = (id, person) => Person.findByIdAndUpdate(id, person, enableUpdateValidator);
exports.deletePersonById = (id) => Person.findByIdAndDelete(id);
exports.connectDatabase = async () => {
    try {
        await mongoose.connect(url);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error.message);
        process.exit(1);
    }
};
