const express = require('express');

const blog = require('../../../models/Blog');
const vintageexpert = require("../../../models/vintageExpert");

const router = express.Router();

//Create vintageexpert
router.post('/vintageexpert/create', async (req, res) => {
    try {
        const newVintageexpert = new vintageexpert(req.body);
        await newVintageexpert .save();
        return res.status(200).json({
            success: "vintageexpert Created Successfully"
        });
    } catch (err) {
        return res.status(404).json({
            error: err.message
        });
    }
});

//get all vintagexpert
router.get('/vintageexpert/getAll', async (req, res) => {
    try {
        const AllVintageExpert = await vintageexpert .find();
        return res.status(200).json(AllVintageExpert);
    } catch (err) {
        return res.status(404).json({
            error: err.message
        });
    }
});

//get a vintageexpert
router.get('/vintageexpert/get/:id', async (req, res) => {
    try {
        const avintageexpert = await vintageexpert.findById(req.params.id);
        return res.status(200).json(avintageexpert);
    } catch (err) {
        return res.status(404).json({
            error: err.message
        });
    }
});

//update a vintageexpert
router.patch('/vintageexpert/update/:id', async (req, res) => {
    try {
        const updatedvintageexpert = await vintageexpert.findByIdAndUpdate(req.params.id,req.body);
        return res.status(200).json(updatedvintageexpert);
    } catch (err) {
        return res.status(404).json({
            error: err.message
        });
    }
});

//delete a vintageexpert
router.delete('/vintageexpert/delete/:id', async (req, res) => {
    try {
        const deletedvintageexpert = await vintageexpert.findByIdAndDelete(req.params.id);
        return res.status(200).json("vintageexpert deleted successfully...");
    } catch (err) {
        return res.status(404).json({
            error: err.message
        });
    }
});


//Create Blog
router.post('/blog/create', async (req, res) => {
    try {
        const newBlog = new blog(req.body);
        await newBlog .save();
        return res.status(200).json({
            success: "blog Created Successfully"
        });
    } catch (err) {
        return res.status(404).json({
            error: err.message
        });
    }
});

//get all blog
router.get('/blog/getAll', async (req, res) => {
    try {
        const AllBlog = await blog .find();
        return res.status(200).json(AllBlog);
    } catch (err) {
        return res.status(404).json({
            error: err.message
        });
    }
});

//get a blog
router.get('/blog/get/:id', async (req, res) => {
    try {
        const ablog= await blog.findById(req.params.id);
        return res.status(200).json(ablog);
    } catch (err) {
        return res.status(404).json({
            error: err.message
        });
    }
});

//update a blog
router.patch('/blog/update/:id', async (req, res) => {
    try {
        const updatedblog= await blog.findByIdAndUpdate(req.params.id,req.body);
        return res.status(200).json(updatedblog);
    } catch (err) {
        return res.status(404).json({
            error: err.message
        });
    }
});

//delete a blog
router.delete('/blog/delete/:id', async (req, res) => {
    try {
        const deletedblog = await blog.findByIdAndDelete(req.params.id);
        return res.status(200).json("blog deleted successfully...");
    } catch (err) {
        return res.status(404).json({
            error: err.message
        });
    }
});

module.exports=router;