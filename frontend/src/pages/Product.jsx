import React, { useState, useContext } from 'react';
import defaultimg from '../assets/imageupload.png';
import { UserContext } from './UserContext'; // Adjust the path as necessary

const Product = () => {
  const { userEmail } = useContext(UserContext); // Get the userEmail from context
  const [color, setColor] = useState('#000000');
  const [colors, setColors] = useState([]);
  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState([]);
  const [previewImage, setPreviewImage] = useState(defaultimg);

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
        setPreviewImage(loadedImages[0]);
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
      images: images,
      creator_email: userEmail, // Add the worker_email
    };

    try {
      const response = await fetch('https://task-server-ns5r.onrender.com/create_product', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productDetails),
      });

      const result = await response.json();
      console.log('Product Response:', result);
      // Handle success or error here
      if (response.ok) {
        // Reset form
        setProductName('');
        setPrice('');
        setDescription('');
        setColors([]);
        setImages([]);
        setPreviewImage(defaultimg);
      } else {
        alert(result.error || 'Error creating product.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="w-full h-full bg-white px-5 sm:px-10 md:px-14">
      <div className="header w-full pt-2 bg-white border-b-[1px] pb-1">
        <h1 className='text-xl font-semibold uppercase'>Add new product</h1>
      </div>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-5 py-4 min-h-[50%]">
        <div className="bg-white h-full flex items-start justify-start flex-col pe-5">
          <h2 className='text-lg font-medium capitalize mb-2'>Preview</h2>
          <div className="img_preview w-full max-h-[250px] md:max-h-[350px] bg-zinc-100 rounded-xl relative flex items-center justify-center overflow-hidden">
            {previewImage === defaultimg ? (
              <div className="flex items-center justify-center w-full h-[250px] md:h-[350px]">
                <img src={defaultimg} alt="Default Preview" className="object-contain w-20" />
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
                placeholder="Enter price"
                required
              />
            </label>
            <label className="font-normal text-base">
              Description
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="border-[1px] border-gray-400 rounded w-full px-3 py-2 font-normal text-sm mt-1 resize-none focus:outline-none focus:ring focus:ring-cyan-300"
                placeholder="Enter product description"
                required
              ></textarea>
            </label>
            <label className="font-normal text-base">
              Colors
              <div className="flex items-center mt-1 gap-2">
                <input
                  type="color"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  className="w-9 h-9 border-none cursor-pointer bg-transparent"
                />
                <input
                  type="text"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  className="border-[1px] border-gray-400 rounded px-3 py-1 font-normal text-sm focus:outline-none focus:ring focus:ring-cyan-300"
                  placeholder="#000000"
                />
                <button
                  type="button"
                  onClick={addColor}
                  className="bg-cyan-500 hover:bg-cyan-600 transition-colors duration-200 px-4 py-[7px] rounded text-white font-normal text-xs"
                >
                  Add
                </button>
              </div>
              <div className="flex flex-wrap mt-2">
                {colors.map((c, index) => (
                  <div
                    key={index}
                    className="w-8 h-8 mr-2 mb-2 rounded-full"
                    style={{ backgroundColor: c }}
                  ></div>
                ))}
              </div>
            </label>
            <button type="submit" className="bg-cyan-500 hover:bg-cyan-600 transition-colors duration-200 px-10 py-2 rounded w-fit text-white font-normal text-base">
              Save
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Product;