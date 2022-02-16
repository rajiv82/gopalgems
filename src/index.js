require("./db/connection");
const express = require("express");
const Users = require("../src/schema/users");
const usersRouter = require("../src/routes/users");

const port = process.env.PORT || 3000;

const cors = require('cors');



const app = express();
app.use(cors());
app.use(express.json());
app.use(usersRouter);

app.listen(port, () => {
  console.log("Gopal Gems service is running on port: " + port);
});
