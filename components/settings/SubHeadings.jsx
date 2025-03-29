import React from 'react'

const SubHeadings = ({ img, title }) => {
  return (
    <div className='w-full px-6 py-4 mb-5 rounded-md bg-gray-50 flex gap-3 items-center'>
      <img src={img} alt={title} className='w-8 h-8' />
      <p className="text-gray-500 text-lg capitalize">{title}</p>
    </div>
  );
};

export default SubHeadings;