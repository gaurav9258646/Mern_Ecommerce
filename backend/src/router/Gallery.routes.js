const express = require("express");
const router = express.Router();

const upload = require("../Middleware/upload");

const {
    createGallery,
    getAllGallery,
    getGalleryById,
    deleteGallery,
} = require("../controllers/user/gallery.controller");

// Upload Gallery Image
router.post(
    "/",
    upload.single("image"),
    createGallery
);

// Get All Gallery Images
router.get("/", getAllGallery);

// Get Single Gallery Image
router.get("/:id", getGalleryById);


router.delete("/:id", deleteGallery);

module.exports = router;