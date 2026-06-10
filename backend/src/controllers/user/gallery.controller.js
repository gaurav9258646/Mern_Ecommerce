const {
    createGalleryDB,
    getAllGalleryDB,
    getGalleryByIdDB,
    deleteGalleryDB,
} = require("../../services/user/Gallery.service");

// Create Gallery
const createGallery = async (req, res) => {
    try {
        console.log(req.body);
        console.log(req.file);
        const { title, category, image: imageUrl } = req.body;

        const image = req.file?.path || imageUrl;

        if (!title || !image) {
            return res.status(400).json({
                success: false,
                message: "Title and image are required",
            });
        }

        const gallery = await createGalleryDB({
            title,
            category,
            image,
        });

        res.status(201).json({
            success: true,
            message: "Gallery image uploaded successfully",
            data: gallery,
        });
    } catch (error) {
        console.log(error);

        res.status(500).json({
            success: false,
            message: "Failed to upload image",
            error: error.message,
        });
    }
};
// Get All Gallery Images
const getAllGallery = async (req, res) => {
    try {
        const gallery = await getAllGalleryDB();

        res.status(200).json({
            success: true,
            count: gallery.length,
            data: gallery,
        });
    } catch (error) {
        console.log(error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch gallery",
            error: error.message,
        });
    }
};

// Get Gallery By ID
const getGalleryById = async (req, res) => {
    try {
        const gallery = await getGalleryByIdDB(req.params.id);

        if (!gallery) {
            return res.status(404).json({
                success: false,
                message: "Gallery image not found",
            });
        }

        res.status(200).json({
            success: true,
            data: gallery,
        });
    } catch (error) {
        console.log(error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch gallery image",
            error: error.message,
        });
    }
};

// Delete Gallery Image
const deleteGallery = async (req, res) => {
    try {
        const gallery = await deleteGalleryDB(req.params.id);

        if (!gallery) {
            return res.status(404).json({
                success: false,
                message: "Gallery image not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Gallery image deleted successfully",
        });
    } catch (error) {
        console.log(error);

        res.status(500).json({
            success: false,
            message: "Failed to delete gallery image",
            error: error.message,
        });
    }
};

module.exports = {
    createGallery,
    getAllGallery,
    getGalleryById,
    deleteGallery,
};