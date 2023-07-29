const errorHandler = (err, _, res, next) => {
    console.error("Error:", err.message);
    console.log(err.name);
    switch (err.name) {
        case "CastError":
            return res.status(404).send({ error: "Unknown person ID" });
        case "BadPerson":
            return res.status(400).send({ error: "Badly formatted person object" });
        case "DuplicateError":
            return res.status(403).send({ error: "Database contains person with the same name" });
    }
    res.status(500).json({ error: "Unknown error" });
    next(err);
};

module.exports = errorHandler;
