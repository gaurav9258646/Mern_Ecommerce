import React, { useEffect, useState } from "react";
import { Upload, Trash2, Image as ImageIcon } from "lucide-react";

const Gallery = () => {
  const [gallery, setGallery] = useState([]);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);

  const url = import.meta.env.VITE_SERVER_URL;

  useEffect(() => {
    fetchGallery();
  }, []);

  const fetchGallery = async () => {
    try {
      const res = await fetch(`${url}/gallery`);
      const data = await res.json();

      if (data.success) {
        setGallery(data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpload = async () => {
    if (!title || !image) {
      return alert("Title and Image are required");
    }

    try {
      const formData = new FormData();

      formData.append("title", title);
      formData.append("category", category);
      formData.append("image", image);

      const res = await fetch(`${url}/gallery`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formData,
      });

      const data = await res.json();

      if (!data.success) {
        return alert(data.message);
      }

      alert("Image Uploaded Successfully");

      setTitle("");
      setCategory("");
      setImage(null);

      fetchGallery();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this image?"
    );

    if (!confirmDelete) return;

    try {
      const res = await fetch(`${url}/gallery/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const data = await res.json();

      if (data.success) {
        fetchGallery();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-blue-100 p-3 rounded-2xl">
            <ImageIcon className="w-6 h-6 text-blue-600" />
          </div>

          <div>
            <h1 className="text-3xl font-bold text-slate-800">
              Gallery Management
            </h1>
            <p className="text-gray-500">
              Upload and manage hospital gallery images
            </p>
          </div>
        </div>

        {/* Upload Card */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 mb-8">

          <h2 className="text-xl font-semibold mb-5">
            Upload New Image
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

            <input
              type="text"
              placeholder="Image Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border border-gray-300 rounded-xl px-4 py-3"
            />

            <input
              type="text"
              placeholder="Category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="border border-gray-300 rounded-xl px-4 py-3"
            />

            <input
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
              className="border border-gray-300 rounded-xl px-4 py-3"
            />
          </div>

          <button
            onClick={handleUpload}
            className="mt-5 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl flex items-center gap-2"
          >
            <Upload size={18} />
            Upload Image
          </button>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

          {gallery.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-60 object-cover"
              />

              <div className="p-4">
                <h3 className="font-bold text-lg text-slate-800">
                  {item.title}
                </h3>

                <p className="text-gray-500 text-sm mt-1">
                  {item.category}
                </p>

                <button
                  onClick={() => handleDelete(item._id)}
                  className="mt-4 w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-xl flex justify-center items-center gap-2"
                >
                  <Trash2 size={18} />
                  Delete
                </button>
              </div>
            </div>
          ))}

        </div>
      </div>
    </div>
  );
};

export default Gallery;