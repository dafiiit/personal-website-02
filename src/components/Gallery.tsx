import React from 'react';

const Gallery: React.FC = () => {
  const images = [
    '/images/image1.jpg',  // Local image file
    '/images/image2.jpg',  // Local image file
    '/images/image3.jpg',  // Local image file
    // Add more local image paths here...
  ];

  return (
    <div className="text-white p-4">
      <h2 className="text-2xl font-bold mb-4">Gallery</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((image, index) => (
          <div key={index} className="relative w-full h-auto">
            <img
              src={image}
              alt={`Image ${index + 1}`}
              className="w-full h-full object-contain rounded-lg"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
