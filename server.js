const express = require("express");
const serveStatic = require("serve-static");
const app = express();

app.use(serveStatic(__dirname + "/dist"));
const puerto = process.env.PORT || 8087;

app.listen(puerto)
.on("error",err => {
  console.log(err);
});
console.log("Escuchando por el puerto: ",puerto);
//npm run dev
