const personsApiRouter = require("express").Router();
const mongo = require("../utils/mongo");

// === API ===
personsApiRouter.get("/", async (_, response) => {
    const persons = await mongo.fetchPersons();
    response.json(persons);
});

personsApiRouter.get("/:id", async (request, response, next) => {
    const id = request.params.id;
    const person = await mongo.fetchPersonById(id).catch((error) => next(error));
    if (person) response.json(person);
    else response.status(404).end();
});

personsApiRouter.post("/", async (request, response, next) => {
    const { name, number } = request.body;
    const persons = await mongo.fetchPersons();

    // Do not allow saving persons with the same name
    const personExists = persons.some((person) => person.name === name);
    if (personExists) {
        const error = Error(`Phonebook already contains ${name}`);
        error.name = "DuplicateError";
        next(error);
    }

    // Save new person to the database and return the added person's information
    const person = {
        name,
        number,
    };
    await mongo
        .savePerson(person)
        .then(() => response.json(person))
        .catch((error) => next(error));
});

personsApiRouter.put("/:id", async (request, response, next) => {
    const id = request.params.id;
    const { name, number } = request.body;
    const person = {
        name,
        number,
    };
    await mongo
        .updatePerson(id, person)
        .then(() => response.json(person))
        .catch((error) => next(error));
});

personsApiRouter.delete("/:id", async (request, response, next) => {
    const id = request.params.id;
    await mongo.deletePersonById(id).catch((error) => next(error));
    response.status(204).end(); // Person was deleted
});

module.exports = personsApiRouter;
