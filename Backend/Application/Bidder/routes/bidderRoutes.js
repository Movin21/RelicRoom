const express = require('express');
const bidder = require('../../../models/bidderModel'); //import the created user model
const router = express.Router(); //use to create http rreqequests

//create bidder
router.post('/create', async (req, res) => {
    try {
        const newBidder = new bidder(req.body);
        await newBidder.save();
        return res.status(200).json({
            success: "Bidder is created successfully"
        });
    } catch (error) {
        return res.status(400).json({
            error: error.message
        });
    }
});

//get all bidders
router.get('/getAll', async (req, res) => {
    try {
        const allBidders = await bidder.find();
        return res.status(200).json(allBidders);
    } catch (err) {
        return res.status(400).json({
            error: err.message
        });
    }
});

//get an bidder
router.get('/getOne/:id', async (req, res) => {
    try {
        const Bidder = await bidder.findById(req.params.id);
        return res.status(200).json(Bidder);
    } catch (err) {
        return res.status(400).json({
            error: err.message
        });
    }
});
 

//update a bidder
router.patch('/update/:id', async (req, res) => {
    try {
        const Bidder = await bidder.findByIdAndUpdate(req.params.id,req.body,{new:true});
        return res.status(200).json(Bidder);
    } catch (err) {
        return res.status(400).json({
            error: err.message
        });
    }
});

//delete a bidder
router.delete('/delete/:id', async (req, res) => {
    try {
        const Bidder = await bidder.findByIdAndDelete(req.params.id);
        return res.status(200).json({msg:"Bidder is deleted."});
    } catch (err) {
        return res.status(400).json({
            error: err.message
        });
    }
});

module.exports = router;
