const auctions = require("../../../models/auctions.js");

const getAllAuctions = async (req, res, next) => {
  try {
    const allAuctions = await auctions.find();
    res.status(200).json(allAuctions);
  } catch (error) {
    next(error);
  }
};

const markExpired = async (req, res, next) => {
  try {
    const expireAuctions = await auctions.findByIdAndUpdate(
      req.params.id,
      { isExpired: true },
      { new: true }
    );
    if (!expireAuctions) {
      return res.status(404).json({ message: "Auction not found" });
    }
    res.status(200).json(expireAuctions);
  } catch (error) {
    next(error);
  }
};
const markFlagged = async (req, res, next) => {
  try {
    const FlagAuctions = await auctions.findByIdAndUpdate(
      req.params.id,
      { isFlagged: true },
      { new: true }
    );
    if (!FlagAuctions) {
      return res.status(404).json({ message: "Auction not found" });
    }
    res.status(200).json(FlagAuctions);
  } catch (error) {
    next(error);
  }
};

module.exports = { getAllAuctions, markExpired, markFlagged };
