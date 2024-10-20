import React, { useState, useContext } from 'react';
import defaultimg from '../assets/imageupload.png';
import { UserContext } from './UserContext';
import { IoCloudUploadSharp } from "react-icons/io5";
import { IoClose } from "react-icons/io5";

const Product = () => {
  const { userEmail } = useContext(UserContext);
  const [color, setColor] = useState('#000000');
  const [colors, setColors] = useState([]);
  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState([]);
  const [previewImage, setPreviewImage] = useState(defaultimg);
  const [loading, setLoading] = useState(false);

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

  const handleImageClick = () => {
    document.getElementById('fileInput').click();
  };

  const handleImageRemove = (index) => {
    setImages(images.filter((_, i) => i !== index));
    if (previewImage === images[index]) {
      setPreviewImage(images[0] || defaultimg);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const productDetails = {
      name: productName,
      price: price,
      description: description,
      colors: colors,
      images: images,
      creator_email: userEmail,
    };

    try {
      const response = await fetch('https://task-d5dy.onrender.com/create_product', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productDetails),
      });

      const result = await response.json();
      if (response.ok) {
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
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-full bg-white">
      <div className="header w-full bg-white">
        <h1 className='text-lg font-semibold uppercase mb-2'>Add new product</h1>
      </div>
      <div className="w-full grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-20 py-4 min-h-[70%]">
        <div className="bg-white h-full flex items-start justify-start flex-col">
          <h2 className='text-lg font-medium capitalize mb-2'>Preview</h2>
          <div
            className="img_preview w-full max-h-[250px] md:max-h-[330px] bg-zinc-100 rounded-xl relative flex items-center justify-center overflow-hidden cursor-pointer"
            onClick={handleImageClick}
          >
            {previewImage === defaultimg ? (
              <div className="flex items-center justify-center w-full h-[250px] md:h-[350px]">
                <img src={defaultimg} alt="Default Preview" className="object-contain w-20" />
              </div>
            ) : (
              <img
                src={previewImage}
                alt="Main Product"
                className="object-cover object-center rounded-lg w-full h-full"
              />
            )}
            <label className="uploader px-5 py-2 bg-neutral-700 rounded-tl-sm text-white absolute bottom-0 right-0 text-sm font-normal cursor-pointer flex items-center justify-center gap-2">
              <IoCloudUploadSharp className='text-base' /> Upload
              <input
                id="fileInput"
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
                  className="relative h-28 min-w-28 w-28 bg-zinc-100 rounded-lg cursor-pointer"
                  onClick={() => setPreviewImage(image)}
                >
                  <img src={image} alt={`Image ${index + 1}`} className="h-full w-full object-cover rounded-lg" />
                  <button
                    className="absolute top-1 right-1 bg-red-700 text-neutral-700 rounded-full p-1"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleImageRemove(index);
                    }}
                  >
                    <IoClose />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="bg-white h-full flex items-start justify-start flex-col">
          <h2 className='text-lg font-medium capitalize mb-2'>Basic Information</h2>
          <form onSubmit={handleSubmit} className='h-auto w-full flex flex-col gap-5'>
            <label className="font-normal text-base">
              Product Name
              <input
                type="text"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                className="border-[1px] border-gray-400 rounded w-full px-3 py-2 font-normal text-sm mt-1 focus:outline-none focus:ring focus:ring-violet-300"
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
                className="border-[1px] border-gray-400 rounded w-full px-3 py-2 font-normal text-sm mt-1 focus:outline-none focus:ring focus:ring-violet-300"
                placeholder="Enter price"
                required
              />
            </label>
            <label className="font-normal text-base">
              Description
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="border-[1px] border-gray-400 rounded w-full px-3 py-2 font-normal text-sm mt-1 resize-none focus:outline-none focus:ring focus:ring-violet-300"
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
                  className="border-[1px] border-gray-400 rounded px-3 py-1 font-normal text-sm focus:outline-none focus:ring focus:ring-violet-300"
                  placeholder="#000000"
                />
                <button
                  type="button"
                  onClick={addColor}
                  className="bg-violet-500 hover:bg-violet-600 transition-colors duration-200 px-4 py-[7px] rounded text-white font-normal text-xs"
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
            <button
              type="submit"
              className={`bg-violet-500 hover:bg-violet-600 transition-colors duration-200 px-10 py-2 rounded w-fit text-white font-normal text-base ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={loading}
            >
              {loading ? 'Adding...' : 'Save'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Product;
