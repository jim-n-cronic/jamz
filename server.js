const express = require('express');
const app = express();
//const bodyPar = require('body-parser');
const exphbs = require('express-handlebars');
const PORT = process.env.PORT || 6969;


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//require('dotenv').config();
// ========================
/*
var Spotify = require('node-spotify-api');
var spotify = new Spotify({
    id:"aa5b93766b58460c95274aadcc8d5fab",
    secret:"1ae85d4a780449d2bdf1bb4a31b9a0d1"
  });  
   
  spotify
    .request('https://api.spotify.com/v1/tracks/7yCPwWs66K8Ba5lFuU2bcx')
    .then(function(data) {
      console.log(data); 
    })  
    .catch(function(err) {
      console.error(`an error has occured:: ${err}`); 
    });      
    */ 
//========================   

//app.use(express.static("public"));



// \\ GET htmlRoutes //
require("./routes/htmlRoutes")(app);
// \\ GET apiRoutes //
//require("./app/routing/apiRoutes")(app);


// -****- LISTEN -****-
app.listen(PORT, () => console.log(`Listening on port# ${PORT}`));
