require("dotenv").config
const express = require("express")
const app = express()
const port = process.env.PORT || 8000
const mongoose = require("mongoose")
require("../server/db/connect.js")
const users = require("../server/db/UserSchema")
const cors = require("cors")
const router = require("./Routes/router")
const path = require('path');


app.use(cors())
app.use(express.json())
app.use(router)



app.use(express.static(path.join(__dirname, "./client/build")));
app.get("*", function (_, res) {
  res.sendFile(
    path.join(__dirname, "./client/build/index.html"),
    function (err) {
      res.status(500).send(err);
    }
  );
});

app.listen(port, ()=>{
    console.log(`server is created at port ${port}`);
})
