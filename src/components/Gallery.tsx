import React from 'react';

const Gallery: React.FC = () => {
  const images = [
    '/images/1.jpg',  // Local image file
    '/images/2.jpg',  // Local image file
    '/images/3.jpg',  // Local image file
    '/images/4.jpg',
    '/images/5.jpg',
    '/images/6.jpeg',
    '/images/7.jpeg',
    '/images/8.jpeg',
    '/images/9.jpg',
    '/images/10.jpg',

  ];

  return (
    <div className="text-white p-4 bg-black min-h-screen">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((image, index) => (
          <div key={index} className="relative w-full h-auto">
            <img
              src={image}
              alt={`Image ${index + 1}`}
              className="w-full h-full object-contain "
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
