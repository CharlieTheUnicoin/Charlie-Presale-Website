const express = require("express");
const router = express.Router();
const axios = require("axios");
const ethers = require("ethers");

router.get("/current-ton-price", async (req, res) => {
  try {
    const response = await axios.get(process.env.TON_PRICE_ENDPOINT, {
      headers: {
        Accepts: "application/json",
        "x-cg-pro-api-key": process.env.TON_PRICE_API_KEY,
      },
      params: {
        x_cg_pro_api_key: process.env.TON_PRICE_API_KEY,
        ids: "toncoin",
        vs_currencies: "usd",
      },
    });
    console.log(response);
    return res.status(200).json({ ok: true, data: response.data.data });
  } catch (err) {
    console.log("fetch ton price error: ", err);
  }
});

router.post("/buy-with-ton", async (req, res) => {
  try {
    const { data } = req.body;
    console.log("Transaction Hash:", data);

    const abiCoder = new ethers.AbiCoder();
    const encodedData = abiCoder.encode(
      ["string", "string"],
      [data, process.env.SECRET_KEY]
    );

    const encodedHash = ethers.keccak256(encodedData);
    console.log("Encoded Hash:", encodedHash);
  } catch (err) {
    console.log("buy with ton error: ", err);
  }
});

module.exports = router;
