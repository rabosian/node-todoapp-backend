const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors")
const bodyParser = require("body-parser");
const indexRouter = require("./routes/index")

const PORT_NUMBER = 4000
const app = express();
app.use(cors())
app.use(bodyParser.json()); // map request to req.body
app.use('/api', indexRouter) // will concatenate /api in front of router path e.g. /tasks -> /api/tasks

const mongoURI = `mongodb://localhost:27017/todoList`;

mongoose
  .connect(mongoURI)
  .then(() => console.log("DB connected"))
  .catch((err) => console.log("DB connection failed"));

app.listen(PORT_NUMBER, () => {
    console.log("server running on " + PORT_NUMBER)
})
