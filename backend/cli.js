const mongoose = require("mongoose");
require("dotenv").config();

if (process.argv.length !== 2 && process.argv.length !== 4) {
    console.log("Syntax: node mongo.js [<name> <number>]");
    process.exit(1);
}

const username = process.env.MONGO_USERNAME;
const password = process.env.MONGO_PASSWORD;
const mongoClusterUrl = process.env.MONGO_URL;
const table = "phonebook";
const url = `mongodb+srv://${username}:${password}@${mongoClusterUrl}/${table}?retryWrites=true&w=majority`;

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
});

const Person = mongoose.model("Person", personSchema);

async function showPhonebook() {
    await mongoose.connect(url);
    await Person.find({}).then((result) => {
        if (result.length === 0) console.log("Phonebook is empty");
        else {
            console.log("Phonebook:");
            result.forEach((person) => console.log(`${person.name} ${person.number}`));
        }
        mongoose.connection.close();
    });
}

async function addPersonToDatabase(person) {
    await mongoose.connect(url);
    await new Person(person).save().then(() => {
        console.log("person saved!");
        mongoose.connection.close();
    });
}

// Show phonebook and exit if no parameters are given
if (process.argv.length === 2) {
    showPhonebook();
    return;
}

// Add new person to the database
const person = {
    name: process.argv[2],
    number: process.argv[3],
};
addPersonToDatabase(person);
