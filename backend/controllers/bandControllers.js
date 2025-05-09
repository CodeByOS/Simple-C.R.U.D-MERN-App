const Band = require("../models/Band.js");

//* GET ALL BANDS
const getBands = async (req, res) => {
    try {
        const bands = await Band.find();
        if(!bands) res.status(404).json({ message: "No Bands Found..!" });

        res.status(200).json(bands);
    } catch (error) {
        res.status(400).json({ message: error });
    }
}

//* GET A BAND BY ID
const getBandByID = async (req, res) => {
    try {
        const { id } = req.params;
        const band = await Band.findById(id);
        if(!band) res.status(404).json({ message: "No Band Found..!" });

        res.status(200).json(band);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}
//* ADD A BAND
const addBand = async (req, res) => {
    try {
        const band = await Band.create(req.body);
        if(!band) res.status(404).json({ message: "Failed To Create A Band..!" });

        res.status(200).json({ message: "Created Band Successfuly.." });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

//* UPDATE BAND BY ID
const updateBandByID = async (req, res) => {
    try {
        const { id } = req.params;
        const band = await Band.findByIdAndUpdate(id, req.body);
        if(!band) res.status(404).json({ message: "Failed to Update the Band..!" });

        res.status(200).json({ message: "The Band Updated Successfuly.." });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

//* DELETE A BAND BY ID
const deleteBandByID = async (req, res) => {
    try {
        const { id } = req.params;
        const band = await Band.findByIdAndDelete(id);
        if(!band) res.status(404).json({ message: "Failed to Deleted This Band..!" });

        res.status(200).json({ message: "Deleted Band Successfuly.." });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

module.exports = {
    getBands,
    getBandByID,
    addBand,
    updateBandByID,
    deleteBandByID
};