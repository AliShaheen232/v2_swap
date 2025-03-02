const express = require("express");
const router = express.Router();
const createInstance = require("./helper/contractInstance");
const config = require("config");
let web3;
let contract;

const _createInstance = async () => {
  let web3Obj = await createInstance(config.router);
  contract = web3Obj.contract;
  web3 = web3Obj.web3;
};

(async () => {
  try {
    _createInstance();
  } catch (error) {
    console.error("Error:", error);
  }
})();

router.get("/weth", async (req, res) => {
  try {
    const weth_address = await contract.methods.WETH().call();
    res.json({ WETH: weth_address });
  } catch (error) {
    res.status(500).send(error.message);
  }
});
router.get("/amountsOut", async (req, res) => {
  try {
    const tokenA = req.query.tokenA;
    const tokenB = req.query.tokenB;
    const amountIn = req.query.amount;

    const amountOut = await contract.methods
      .getAmountsOut(amountIn, [tokenA, tokenB])
      .call();
    res.json({ amountOut });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.get("/blocks", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const blocks = 1;
    // const blocks = await apiHelper.getPaginatedBlocks(page, limit);

    res.json(blocks);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
