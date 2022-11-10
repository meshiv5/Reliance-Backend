const express = require("express");
const router = express.Router();
const { getData, getSingleData } = require("../../Utils/Products/product-query");

router.get("/", async (req, res) => {
  const { q } = req.query;
  const data = await getData(q);
  res.send(data);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const data = await getSingleData(id);
  res.send(data);
});

module.exports = router;
