const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");
const authentication = require("./middlewares/authentication");
const Controller = require("./Controller/Controller");

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post("/register", Controller.userRegister);
app.post("/login", Controller.userLogin);

app.use(authentication);

app.get("/jobs", Controller.getJobs);
app.get("/job/:id", Controller.getJob);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
