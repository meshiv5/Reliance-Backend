const express = require("express");
const router = express.Router();

router.get("/:extra", async (req, res) => {
  const url = req.url;
  res.redirect(`https://www.reliancedigital.in/medias${url}`);
});

module.exports = router;
