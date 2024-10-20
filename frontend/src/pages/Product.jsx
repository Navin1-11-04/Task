import React, { useState, useContext } from 'react';
import { AuthContext } from './UserContext'; // Adjust the import based on your context path
import defaultimg from '../assets/imageupload.png'; // Your default image path
import axios from 'axios';

const Product = () => {
  const { currentWorkerEmail } = useContext(AuthContext); // Get current worker email from context
  const [color, setColor] = useState('#000000');
  const [colors, setColors] = useState([]);
  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState([]);
  const [previewImage, setPreviewImage] = useState(defaultimg); // Set default image initially

  const addColor = () => {
    if (colors.includes(color)) return;
    setColors([...colors, color]);
    setColor('#000000');
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map((file) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      return new Promise((resolve) => {
        reader.onloadend = () => {
          resolve(reader.result);
        };
      });
    });

    Promise.all(newImages).then((loadedImages) => {
      setImages((prevImages) => [...prevImages, ...loadedImages]);
      if (loadedImages.length && previewImage === defaultimg) {
        setPreviewImage(loadedImages[0]); // Set first uploaded image as preview if no preview is set
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const productDetails = {
        name: productName,
        price: price,
        description: description,
        colors: colors,
        images: images, // Send images as base64 strings
        worker_email: currentWorkerEmail, // Use the actual worker email from context
    };

    // Debugging: Log the product details
    console.log("Product details being sent:", productDetails);

    try {
        const response = await axios.post('http://localhost:5000/create_product', productDetails);
        alert(response.data.message);

        // Reset form fields after successful submission
        setProductName('');
        setPrice('');
        setDescription('');
        setColors([]);
        setImages([]);
        setPreviewImage(defaultimg);
    } catch (error) {
        console.error("Error creating product:", error.response?.data || error.message);
        alert('Error creating product: ' + (error.response?.data?.error || error.message));
    }
};


  return (
    <div className="w-full h-full bg-white px-5 sm:px-10 md:px-14">
      <div className="header w-full pt-2 bg-white border-b-[1px] pb-1">
        <h1 className='text-xl font-semibold uppercase'>Add new product</h1>
      </div>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-5 py-4 min-h-[50%]">
        {/* Preview Section */}
        <div className="bg-white h-full flex items-start justify-start flex-col pe-5">
          <h2 className='text-lg font-medium capitalize mb-2'>Preview</h2>
          <div className="img_preview w-full max-h-[250px] md:max-h-[350px] bg-zinc-100 rounded-xl relative flex items-center justify-center overflow-hidden">
            {previewImage === defaultimg ? (
              <div className="flex items-center justify-center w-full h-[250px] md:h-[350px]">
                <img src={defaultimg} alt="Default Preview" className="object-contain w-full h-full p-24" />
              </div>
            ) : (
              <img
                src={previewImage}
                alt="Main Product"
                className="object-cover object-center rounded-lg w-full"
              />
            )}
            <label className="uploader px-5 py-2 rounded-full bg-zinc-800 text-white absolute bottom-2 right-2 text-sm font-normal cursor-pointer">
              Upload
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>
          </div>
          <div className="images_scroll w-full overflow-hidden py-2 px-[2px] mt-3">
            <div className="container w-full overflow-x-auto flex items-start justify-start gap-3">
              {images.map((image, index) => (
                <div
                  key={index}
                  className="h-28 min-w-28 w-28 bg-zinc-100 rounded-lg cursor-pointer"
                  onClick={() => setPreviewImage(image)}
                >
                  <img src={image} alt={`Image ${index + 1}`} className="h-full w-full object-cover rounded-lg" />
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Form Section */}
        <div className="bg-white h-full flex items-start justify-start flex-col pl-5">
          <h2 className='text-lg font-medium capitalize mb-2'>Basic Information</h2>
          <form onSubmit={handleSubmit} className='h-auto w-full flex flex-col gap-5'>
            <label className="font-normal text-base">
              Product Name
              <input
                type="text"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                className="border-[1px] border-gray-400 rounded w-full px-3 py-2 font-normal text-sm mt-1 focus:outline-none focus:ring focus:ring-cyan-300"
                placeholder="Enter product name"
                required
              />
            </label>
            <label className="font-normal text-base">
              Price
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="border-[1px] border-gray-400 rounded w-full px-3 py-2 font-normal text-sm mt-1 focus:outline-none focus:ring focus:ring-cyan-300"
                placeholder="Enter product price"
                required
              />
            </label>
            <label className="font-normal text-base">
              Description
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="border-[1px] border-gray-400 rounded w-full px-3 py-2 font-normal text-sm mt-1 focus:outline-none focus:ring focus:ring-cyan-300"
                placeholder="Enter product description"
                required
              />
            </label>
            <div className="colors_container flex flex-col">
              <label className="font-normal text-base">
                Colors
                <div className="flex items-center">
                  <input
                    type="color"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    className="border-[1px] border-gray-400 rounded w-full mt-1"
                  />
                  <button type="button" onClick={addColor} className="ml-2 p-2 bg-blue-500 text-white rounded">
                    Add Color
                  </button>
                </div>
              </label>
              <div className="mt-2">
                {colors.map((c, index) => (
                  <span key={index} className="inline-block bg-gray-200 rounded-full px-3 py-1 mr-2">
                    {c}
                  </span>
                ))}
              </div>
            </div>
            <button type="submit" className="mt-5 p-2 bg-green-500 text-white rounded">Create Product</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Product;
