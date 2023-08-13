const express = require("express");
const path = require("path");
const app = express();
const cors = require("cors");

const db = require("./models");

app.use(express.json()); // Use json parser middleware to parse JSON data
app.use(cors()); // Use cors parser middleware to parse JSON data

app.use("/images", express.static(path.join(__dirname, "/images")));

const postCss = require("./routes/CSS");
app.use("/css", postCss);

const postApp = require("./routes/Posts");
app.use("/posts", postApp);

const postGames = require("./routes/Games");
app.use("/games", postGames);

PORT = 3001;
db.sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});
