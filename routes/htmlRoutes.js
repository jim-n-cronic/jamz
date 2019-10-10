const path = require('path');

module.exports = (app) => {
    /*
    app.get("/login", (req,resp) => {
        // ******* FIX THIS ISHHHHHHHH!
        resp.sendFile(path.join(__dirname, ""));
    });
    */
    app.get("/", (req,resp) => {
        // console.log(path.join(__dirname, '../views'))
        resp.sendFile(path.join(__dirname, "../views/index.html"));
    });
}