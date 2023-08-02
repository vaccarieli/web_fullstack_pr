const express = require("express");
const app = express();

const db = require("./models");

PORT = 3001;
db.sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});
