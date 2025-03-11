import React from 'react'

const StatsCard = ({ title, value, icon }) => {
  return (
    <div className="border border-gray-200 rounded-md p-5 w-full md:w-[47%] lg:w-[24%]">
      <p className="text-gray-500 text-sm">{title}</p>
      <div className="mt-8 flex justify-between items-center">
        <h2 className='font-bold text-3xl text-gray-900'>{value}</h2>
        <img src={icon} alt={title} width={30} height={30} />
      </div>
    </div>
  )
}

export default StatsCard;