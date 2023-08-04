const express = require("express");
const app = express();
const cors = require("cors");

const db = require("./models");

app.use(express.json()); // Use json parser middleware to parse JSON data
app.use(cors()); // Use cors parser middleware to parse JSON data

const postApp = require("./routes/Posts");

app.use("/posts", postApp);

PORT = 3001;
db.sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});
