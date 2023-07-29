// This error handler middleware is not too useful
// but it demonstrates how custom middlewares could be used
const errorHandler = (err, _, res, next) => {
    console.error("Error:", err.message);
    switch (err.name) {
        case "CastError":
            return res.status(404).send({ error: "Unknown person ID" });
        case "ValidationError":
            return res.status(403).send({ error: err.message });
        case "DuplicateError":
            return res.status(403).send({ error: "Database contains person with the same name" });
    }
    res.status(500).json({ error: "Unknown error" });
    next(err);
};

module.exports = {
    errorHandler,
};
