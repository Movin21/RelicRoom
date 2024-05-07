const express = require("express");
const inform = require("../../models/inform.Model.js"); //import the created user model
const payment = require("../../models/payment.Model.js");
const Bids = require("../../models/bid.js");
const router = express.Router(); //use to create http rreqequests

//wins bidder inform details
router.post("/Icreate", async (req, res) => {
  try {
    const newinform = new inform(req.body);
    await newinform.save();
    return res.status(200).json({
      success: "infrom is successfully",
    });
  } catch (error) {
    return res.status(400).json({
      error: error.message,
    });
  }
});

//winns bidder see details
router.get("/Bidget/:bidderId", async (req, res) => {
  try {
    const bidderId = req.params.bidderId;

    const bidder = await inform.find({ bidderId });

    if (bidder.length > 0) {
      res.json({ message: "bidder details retrieved successfully", bidder });
    } else {
      return console.log("not found");
    }
  } catch (error) {
    console.log(error.message);
  }
});

//payment done
router.post("/Pcreate", async (req, res) => {
  try {
    const newpayment = new payment(req.body);
    await newpayment.save();
    return res.status(200).json({
      success: "Paymnet is successfully",
    });
  } catch (error) {
    return res.status(400).json({
      error: error.message,
    });
  }
});

//winns bidder Pay details
router.get("/Bidget/:bidderId", async (req, res) => {
  try {
    const { bidderId } = req.params;
    console.log(bidderId);

    const form = await payment.find({ bidderId });
    console.log(form);

    res.json(form);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

//get all bidders
router.get("/PgetAll", async (req, res) => {
  try {
    const paymentdetils = await payment.find();
    return res.status(200).json(paymentdetils);
  } catch (err) {
    return res.status(400).json({
      error: err.message,
    });
  }
});

//update a bidder
router.put("/updateP/:PayId", async (req, res) => {
  try {
    const updateForm = await payment.findByIdAndUpdate(
      req.params.PayId,
      {
        $set: {
          address: req.body.address,
          contactnumber: req.body.contactnumber,
          area: req.body.area,
        },
      },
      { new: true }
    );
    res.status(200).json(updateForm);
  } catch (error) {
    next(error);
  }
});

//delete a bidder
router.delete("/Pdelete/:idp", async (req, res) => {
  try {
    const Bidder = await payment.findByIdAndDelete(req.params.idp);
    return res.status(200).json({ msg: "payment details is deleted." });
  } catch (err) {
    return res.status(400).json({
      error: err.message,
    });
  }
});

//inform delelivery proccess
router.put("/updatestatus/:FormmId/status", async (req, res) => {
  try {
    const { FormmId } = req.params;
    const { status } = req.body;

    const updatedform = await payment.findByIdAndUpdate(
      FormmId,
      { status },
      { new: true }
    );

    if (!updatedform) {
      return console.log(" form not found");
    }

    res.status(200).json(updatedform);
  } catch (error) {
    console.log(error);
  }
});

//getcurrent bidder payment status
router.get("/Bidgetpay/:bidderId", async (req, res) => {
  try {
    const bidderId = req.params.bidderId;

    const bidder = await payment.find({ bidderId });

    if (bidder.length > 0) {
      res.json({ message: "bidder details retrieved successfully", bidder });
    } else {
      return console.log("not found");
    }
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = router;
