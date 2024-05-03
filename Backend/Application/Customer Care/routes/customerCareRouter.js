const express = require('express');
const feedback = require("../../../models/feedbacks");
const suggestion = require("../../../models/suggestion");
const complaints = require("../../../models/complaints");
const faq = require("../../../models/FAQ");
const router = express.Router();

// Create Feedback
router.post('/feedback/create', async (req, res) => {
    try {
        const newFeedback = new feedback(req.body);
        await newFeedback .save();
        return res.status(200).json({
            success: "Feedback Created Successfully"
        });
    } catch (err) {
        return res.status(404).json({
            error: err.message
        });
    }
});

//get all feedbacks
router.get('/feedback/getAll', async (req, res) => {
    try {
        const allFeedbacks = await feedback.find();
        return res.status(200).json(allFeedbacks);
    } catch (err) {
        return res.status(404).json({
            error: err.message
        });
    }
});

//get a feedback
router.get('/feedback/get/:id', async (req, res) => {
    try {
        const afeedback = await feedback.findById(req.params.id);
        return res.status(200).json(afeedback);
    } catch (err) {
        return res.status(404).json({
            error: err.message
        });
    }
});

//update a feedback
/*router.patch('/feedback/update/:id', async (req, res) => {
    try {
        const updatedfeedback = await feedback.findByIdAndUpdate(req.params.id,req.body);
        return res.status(200).json(updatedfeedback);
    } catch (err) {
        return res.status(404).json({
            error: err.message
        });
    }
});*/

//delete a feedback
router.delete('/feedback/delete/:id', async (req, res) => {
    try {
        const deletedfeedback = await feedback.findByIdAndDelete(req.params.id);
        return res.status(200).json("Feedback deleted successfully...");
    } catch (err) {
        return res.status(404).json({
            error: err.message
        });
    }
});




// Create suggestion
router.post('/Suggestion/create', async (req, res) => {
    try {
        const newSuggestion = new suggestion(req.body);
        await newSuggestion .save();
        return res.status(200).json({
            success: "Suggestion Created Successfully"
        });
    } catch (err) {
        return res.status(404).json({
            error: err.message
        });
    }
});

//get all suggestions
router.get('/suggestion/getAll', async (req, res) => {
    try {
        const allSuggestion = await suggestion.find();
        return res.status(200).json(allSuggestion);
    } catch (err) {
        return res.status(404).json({
            error: err.message
        });
    }
});

//get a suggestion
router.get('/suggestion/get/:id', async (req, res) => {
    try {
        const aSuggestion = await suggestion.findById(req.params.id);
        return res.status(200).json(aSuggestion);
    } catch (err) {
        return res.status(404).json({
            error: err.message
        });
    }
});

/*//update a suggestion
router.patch('/suggestion/update/:id', async (req, res) => {
    try {
        const updatedSuggestion = await suggestion.findByIdAndUpdate(req.params.id,req.body);
        return res.status(200).json(updatedSuggestion);
    } catch (err) {
        return res.status(404).json({
            error: err.message
        });
    }
});*/

//delete a suggestion
router.delete('/suggestion/delete/:id', async (req, res) => {
    try {
        const deletedSuggestion = await suggestion.findByIdAndDelete(req.params.id);
        return res.status(200).json("suggestion deleted successfully...");
    } catch (err) {
        return res.status(404).json({
            error: err.message
        });
    }
});



// Create complaints
router.post('/complaints/create', async (req, res) => {
    try {
        const newComplaints = new complaints(req.body);
        await newComplaints .save();
        return res.status(200).json({
            success: "Complaints Created Successfully"
        });
    } catch (err) {
        return res.status(404).json({
            error: err.message
        });
    }
});

//get all Complaints
router.get('/complaints/getAll', async (req, res) => {
    try {
        const newComplaints = await complaints.find();
        return res.status(200).json(newComplaints);
    } catch (err) {
        return res.status(404).json({
            error: err.message
        });
    }
});

//get a complaints
router.get('/complaints/get/:id', async (req, res) => {
    try {
        const aComplaints = await complaints.findById(req.params.id);
        return res.status(200).json(aComplaints);
    } catch (err) {
        return res.status(404).json({
            error: err.message
        });
    }
});

/*//update a complaints
router.patch('/complaints/update/:id', async (req, res) => {
    try {
        const updatedComplaints = await complaints.findByIdAndUpdate(req.params.id,req.body);
        return res.status(200).json(updatedComplaints);
    } catch (err) {
        return res.status(404).json({
            error: err.message
        });
    }
});*/

//delete a complaints
router.delete('/complaints/delete/:id', async (req, res) => {
    try {
        const deletedComplaint = await complaints.findByIdAndDelete(req.params.id);
        return res.status(200).json("complaints deleted successfully...");
    } catch (err) {
        return res.status(404).json({
            error: err.message
        });
    }
});



// Create faq
router.post('/faq/create', async (req, res) => {
    try {
        const newfaq = new faq(req.body);
        await newfaq .save();
        return res.status(200).json({
            success: "faq Created Successfully"
        });
    } catch (err) {
        return res.status(404).json({
            error: err.message
        });
    }
});

//get all faq
router.get('/faq/getAll', async (req, res) => {
    try {
        const newfaq = await faq.find();
        return res.status(200).json(newfaq);
    } catch (err) {
        return res.status(404).json({
            error: err.message
        });
    }
});

//get a faq
router.get('/faq/get/:id', async (req, res) => {
    try {
        const afaq = await faq.findById(req.params.id);
        return res.status(200).json(afaq);
    } catch (err) {
        return res.status(404).json({
            error: err.message
        });
    }
});

//update a faq
router.patch('/faq/update/:id', async (req, res) => {
    try {
        const updatedfaq = await faq.findByIdAndUpdate(req.params.id,req.body);
        return res.status(200).json(updatedfaq);
    } catch (err) {
        return res.status(404).json({
            error: err.message
        });
    }
});

//delete a faq
router.delete('/faq/delete/:id', async (req, res) => {
    try {
        const deletedFAQ = await faq.findByIdAndDelete(req.params.id);
        return res.status(200).json("faq deleted successfully...");
    } catch (err) {
        return res.status(404).json({
            error: err.message
        });
    }
});



module.exports=router;