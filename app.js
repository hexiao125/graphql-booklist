const express = require("express");
const graphqlHTTP = require("express-graphql");
const schema = require("./schema/schema");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const app = express();

//allow cross-origin requests
app.use(cors());

//connect to mongoDB
const URL_DB =
  "mongodb+srv://Xiao:test123@cluster0-qrpds.mongodb.net/test?retryWrites=true";
mongoose.connect(URL_DB, { useNewUrlParser: true });

mongoose.connection.once("open", () => {
  console.log("connected to database");
});

//bind express with graphql
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true
  })
);

//serve static files from the React app
app.use(express.static(path.join(__dirname, "client/build")));

// the catch-all handler
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`now listeing for requests on port ${port}`);
});
