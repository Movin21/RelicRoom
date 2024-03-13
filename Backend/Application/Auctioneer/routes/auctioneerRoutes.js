const express = require('express');
const auctioneer = require('../../../models/auctionnerModel');
const router = express.Router();

// Create auctioneer
router.post('/create', async (req, res) => {
    try {
        const newAuctioneer = new auctioneer(req.body);
        await newAuctioneer.save();
        return res.status(200).json({
            success: "Auctioneer Created Successfully"
        });
    } catch (err) {
        return res.status(400).json({
            error: err.message
        });
    }
});

// Get all auctioneers
router.get('/getAll', async (req, res) => {
    try {
        const allAuctioneers = await auctioneer.find();
        return res.status(200).json(allAuctioneers);
    } catch (err) {
        return res.status(400).json({
            error: err.message
        });
    }
});

// Get an auctioneer
router.get('/getOne/:id', async (req, res) => {
    try {
        const Auctioneer = await auctioneer.findById(req.params.id);
        return res.status(200).json(Auctioneer);
    } catch (err) {
        return res.status(400).json({
            error: err.message
        });
    }
});

// Update an auctioneer
router.patch('/update/:id', async (req, res) => {
    try {
        const Auctioneer = await auctioneer.findByIdAndUpdate(req.params.id,req.body,{new:true});
        return res.status(200).json(Auctioneer);
    } catch (err) {
        return res.status(400).json({
            error: err.message
        });
    }
});


// Delete an auctioneer
router.delete('/delete/:id', async (req, res) => {
    try {
        const Auctioneer = await auctioneer.findByIdAndDelete(req.params.id);
        return res.status(200).json({msg:"Auctioneer Deleted"});
    } catch (err) {
        return res.status(400).json({
            error: err.message
        });
    }
});
module.exports = router;
