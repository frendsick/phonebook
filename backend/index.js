const {
    connectDatabase,
    deletePersonById,
    fetchPersons,
    fetchPersonById,
    savePerson,
    updatePerson,
} = require("./mongo");
const errorHandler = require("./errorHandler");
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

// === VIEWS ===
app.get("/info", async (_, response) => {
    const persons = await fetchPersons();
    const personCount = persons.length;
    const timeNow = new Date();
    response.render("info", { personCount, timeNow });
});

// === API ===
app.get("/api/persons", async (_, response) => {
    const persons = await fetchPersons();
    response.json(persons);
});

app.get("/api/persons/:id", async (request, response) => {
    const id = request.params.id;
    const person = await fetchPersonById(id);
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
    const persons = await fetchPersons();
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
    await savePerson(person);
    response.json(person);
});

app.put("/api/persons/:id", async (request, response, next) => {
    const id = request.params.id;
    const { name, number } = request.body;
    const person = {
        name,
        number,
    };
    await updatePerson(id, person).catch((error) => next(error));
    response.json(person); // Person was updated
});

app.delete("/api/persons/:id", async (request, response, next) => {
    const id = request.params.id;
    await deletePersonById(id).catch((error) => next(error));
    response.status(204).end(); // Person was deleted
});

app.use(errorHandler);

connectDatabase().then(() => {
    const PORT = process.env.PORT || 3001;
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});
