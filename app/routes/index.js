// exportar el modulo
module.exports = function (app) {

    require("./city.routes.js")(app);
    require("./comm_category.routes.js")(app);
    require("./community.routes.js")(app);
    require("./event_category.routes.js")(app);
    require("./event.routes.js")(app);
    require("./province.routes.js")(app);
    require("./user.routes.js")(app);
}