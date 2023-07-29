const app = require("./app");
const mongo = require("./utils/mongo");

mongo.connectDatabase().then(() => {
    const PORT = process.env.PORT || 3001;
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});
