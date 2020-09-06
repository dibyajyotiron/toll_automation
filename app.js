require("dotenv").config();
const logger = require("./services/logger");
const express = require("express");
const app = express();
const port = process.env.PORT || 4000;

require("colors");
require("express-async-errors");
require("./services/cors")(app);
require("./services/db")(app);
require("./services/morgan")(app);

require("./routes/index")(app);

app.listen(port, () => logger.info(`Server started on ${port}...`));
