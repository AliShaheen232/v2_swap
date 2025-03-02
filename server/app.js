const express = require("express");
const app = express();
const cors = require("cors");
const createInstance = require("./helper/contractInstance");
const api = require("./api");
const config = require("config");

const PORT = 5600;
let web3;
let contract;

const _createInstance = async () => {
  let web3Obj = await createInstance(config.router);
  web3 = web3Obj.web3;
  contract = web3Obj.contract;
};

(async () => {
  try {
    _createInstance();
  } catch (error) {
    console.error("Error:", error);
  }
})();

app.use(express.json());
app.use(cors());
app.use("/api", api);

app.get("/", (req, res) => {
  res.send({
    message: "Hello",
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
