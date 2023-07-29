const viewsRouter = require("express").Router();
const mongo = require("../utils/mongo");

// === VIEWS ===
viewsRouter.get("/info", async (_, response) => {
    const persons = await mongo.fetchPersons();
    const personCount = persons.length;
    const timeNow = new Date();
    response.render("info", { personCount, timeNow });
});

module.exports = viewsRouter;
