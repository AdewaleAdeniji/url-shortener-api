require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const isUrl = require("is-url");
var bodyParser = require("body-parser");
const services = require("./services");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors({ origin: "*" }));
app.post("/shorten", async (req, res) => {
  // const url = req.params.url;
  const url = req?.body?.url;
  const isURL = isUrl(url);
  if (!isURL)
    return res.status(400).send({
      message: "Link is not a valid URL",
    });
  try {
    const linkify = await services.shortenURL(url);
    return res.send(linkify.data)
  } catch(err) {
    //console.log(err);
    return res.status(400).send({ message: "Request Failed" });
  }
  return res.sendStatus(200);
});
app.get("*", async (_, res) => {
  return res.sendStatus(404);
});
app.post("*", async (_, res) => {
  return res.sendStatus(404);
});
const port = process.env.PORT;
app.listen(port || 3001, () => {
  console.log(`Server is running on port - ${port}`);
});
module.exports = app;
