const errorHandler = (err, _, res, next) => {
    console.error("Error:", err.message);
    if (err.name === "CastError") {
        return res.status(404).send({ error: "Unknown person ID" });
    }
    res.status(500).json({ error: "Unknown error" });
    next(err);
};

module.exports = errorHandler;
