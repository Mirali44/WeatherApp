import React from 'react'

function ForeCast({title, data}) {
  return (
    <div>
      <div className="flex items-center justify-start my-6">
        <p className="text-white font-medium uppercase">{title}</p>
      </div>
      <hr className="my-2" />
      <div className="flex flex-row items-center justify-between text-white">
        {data.map((data, index) => (
          <div className="flex flex-col items-center justify-center" key={index}>
            <p className="font-light text-sm">{data.title}</p>
            <img
              src={data.icon}
              className="w-12 my-1"
            />
            <p className="font-medium">{data.temp}°</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ForeCast