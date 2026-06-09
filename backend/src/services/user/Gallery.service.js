const Gallery = require("../../models/Gallery");

const createGalleryDB = async (data) => {
    return await Gallery.create(data);
};

const getAllGalleryDB = async () => {
    return await Gallery.find().sort({ createdAt: -1 });
};

const getGalleryByIdDB = async (id) => {
    return await Gallery.findById(id);
};

const deleteGalleryDB = async (id) => {
    return await Gallery.findByIdAndDelete(id);
};

module.exports = {
    createGalleryDB,
    getAllGalleryDB,
    getGalleryByIdDB,
    deleteGalleryDB,
};