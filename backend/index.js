const { connectDatabase, Person } = require("./mongo");

const express = require("express");
const app = express();
app.use(express.json());
app.use(express.static("build"));
require("dotenv").config();

// Allow requests from other origins
const cors = require("cors");
app.use(cors());

// Configure request logging with `morgan` middleware
const morgan = require("morgan");
morgan.token("body", function (req, _) {
    return JSON.stringify(req.body);
});
app.use(morgan(":method :url :status :res[content-length] - :response-time ms :body"));

// Use ejs for rendering templated HTML files
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

let persons = [
    {
        id: 1,
        name: "Arto Hellas",
        number: "040-123456",
    },
    {
        id: 2,
        name: "Ada Lovelace",
        number: "39-44-5323523",
    },
    {
        id: 3,
        name: "Dan Abramov",
        number: "12-43-234345",
    },
    {
        id: 4,
        name: "Mary Poppendick",
        number: "39-23-6423122",
    },
];

// === VIEWS ===
app.get("/info", async (_, response) => {
    const persons = await fetchPersons();
    const personCount = persons.length;
    const timeNow = new Date();
    response.render("info", { personCount, timeNow });
});

// === API ===
function fetchPersons() {
    return Person.find({}).then((persons) => persons);
}

app.get("/api/persons", async (_, response) => {
    const persons = await fetchPersons();
    response.json(persons);
});

app.get("/api/persons/:id", async (request, response) => {
    const _id = request.params.id;
    const persons = await fetchPersons();
    const person = persons.find((person) => person._id === _id);

    if (person) response.json(person);
    else response.status(404).end();
});

app.post("/api/persons", async (request, response) => {
    const { name, number } = request.body;

    // Error handling
    if (!name || !number) {
        return response.status(400).json({
            error: "name or number is missing",
        });
    }
    const personExists = persons.some((person) => person.name === name);
    if (personExists) {
        return response.status(403).json({
            error: `Phonebook already contains ${name}`,
        });
    }

    // Save new person to the database and return the added person's information
    const person = {
        name,
        number,
    };
    await new Person(person).save();
    response.json(person);
});

app.delete("/api/persons/:id", async (request, response) => {
    const _id = request.params.id;
    await Person.deleteOne({ _id }).catch((error) => {
        console.error(`Could not delete person : ${error}`);
        response.status(404).end();
    });
    response.status(204).end(); // Person was deleted
});

connectDatabase().then(() => {
    const PORT = process.env.PORT || 3001;
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});
