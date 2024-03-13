const express = require('express');
const repairSpecialist = require('../../../models/repairSpecialist');


const router = express.Router();

router.post("/save", (req, res) => {
    let newSchema = new repairSpecialist(req.body);

    console.log(req.body);

    // Save the new repair specialist to the database
    newSchema.save()
        .then(newSchema => {
            // Respond with a success message
            return res.status(200).json({
                success: "Repair Specialist saved successfully"
            });
        })
        .catch(err => {
            // If an error occurs, handle it and respond with an error message
            return res.status(400).json({
                error: err.message
            });
        });
});


//get RS
router.get('/get', (req, res) => {
    repairSpecialist.find().exec()
        .then(repairSpecialists => {
            return res.status(200).json({
                success: true,
                existingRs: repairSpecialists
            });
        })
        .catch(err => {
            return res.status(400).json({
                error: err.message
            });
        });
});



//update rs

router.put('/update/:id', async (req, res) => {
    try {
        const updatedPost = await repairSpecialist.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true } 
        );
        console.log(req.body);
        return res.status(200).json({
            success: "Details updated successfully",
            
            data: updatedPost 
        });
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
});


//delete 
router.delete('/delete/:id', async (req, res) => {
    try {
        const deletedrepairSpecialist = await repairSpecialist.findByIdAndDelete(req.params.id).exec();
        
        if (!deletedrepairSpecialist) {
            return res.status(404).json({
                message: "Details not found for deletion"
            });
        }
        
        return res.json({
            message: "Deleted successfully",
            deletedrepairSpecialist
        });
    } catch (err) {
        return res.status(400).json({
            message: "Details deletion unsuccessful",
            error: err.message
        });
    }
});




module.exports = router;