const express = require("express");
const cors = require("cors");
const app = express();
var corsOptions = {
  origin: "http://localhost:8081"
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 

//Routes
require("./app/routes/city.routes.js")(app);
require("./app/routes/comm_category.routes.js")(app);
require("./app/routes/community.routes.js")(app)
require("./app/routes/event_category.routes.js")(app);
require("./app/routes/event.routes.js")(app);
require("./app/routes/province.routes.js")(app);

//Sequelize
sequelize = require("./app/database/database.js");
sequelize.sync({ force: false });
app.get("/", (req, res) => {
  res.json({ message: "Bienvenido a la api de comunidades" });
});

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
