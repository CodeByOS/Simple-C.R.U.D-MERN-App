const router = require("express").Router();
const { getBands , getBandByID , addBand , updateBandByID , deleteBandByID} = require("../controllers/bandControllers");

router.get("/", getBands);
router.get("/:id", getBandByID);
router.post("/", addBand);
router.patch("/:id", updateBandByID);
router.delete("/:id", deleteBandByID);

module.exports = router